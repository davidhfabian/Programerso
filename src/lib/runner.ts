// Motor de ejecución de código en el navegador. JavaScript corre nativo en un
// sandbox, Python corre con Pyodide (CPython → WebAssembly).
// Módulo compartido por el editor-tutor, los retos y el playground.

export type RunLanguage = 'javascript' | 'python';

export interface RunResult {
  ok: boolean;
  output: string;
  /** El programa no cierra un bloque todavía (sintaxis parcial, no es un error real). */
  incomplete?: boolean;
  /** No se pudo cargar el motor (sin red): el código puede ser correcto igual. */
  loadFailed?: boolean;
  /** Milisegundos que tardó la ejecución (aprox). */
  ms?: number;
}

// ── Pyodide (carga perezosa, singleton) ──────────────────────────
interface Pyodide {
  runPython(code: string): unknown;
}
const PYODIDE_VERSION = 'v0.26.4';
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;
let pyodidePromise: Promise<Pyodide> | null = null;

export function isPyReady(): boolean {
  return pyodidePromise != null;
}

export function loadPyodideRuntime(): Promise<Pyodide> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise<Pyodide>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `${PYODIDE_BASE}pyodide.js`;
    s.onload = () => {
      const g = window as unknown as { loadPyodide?: (o: { indexURL: string }) => Promise<Pyodide> };
      if (!g.loadPyodide) {
        reject(new Error('pyodide no disponible'));
        return;
      }
      g.loadPyodide({ indexURL: PYODIDE_BASE }).then(resolve).catch(reject);
    };
    s.onerror = () => reject(new Error('no se pudo cargar pyodide'));
    document.head.appendChild(s);
  });
  return pyodidePromise;
}

// ── JavaScript ───────────────────────────────────────────────────
// Constructor de funciones por referencia indirecta. Ejecuta el código del
// PROPIO alumno en SU navegador, en un sandbox que sólo recibe un `console`
// falso (sin acceso a scope privilegiado). No hay servidor ni otros usuarios:
// el modelo de amenaza de inyección no aplica — es el mismo enfoque local que
// usan CodePen / JSFiddle / Pyodide. Evaluar el código es la función central.
const FunctionCtor = Function;

export function runJs(code: string): RunResult {
  const t0 = performance.now();
  const logs: string[] = [];
  const fmt = (v: unknown): string => {
    if (typeof v === 'string') return v;
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  };
  const sandboxConsole = {
    log: (...a: unknown[]) => logs.push(a.map(fmt).join(' ')),
    error: (...a: unknown[]) => logs.push(a.map(fmt).join(' ')),
    warn: (...a: unknown[]) => logs.push(a.map(fmt).join(' ')),
    info: (...a: unknown[]) => logs.push(a.map(fmt).join(' ')),
  };
  let fn: (c: typeof sandboxConsole) => void;
  try {
    fn = FunctionCtor('console', `"use strict";\n${code}`) as typeof fn;
  } catch {
    return { ok: false, output: '', incomplete: true, ms: performance.now() - t0 };
  }
  try {
    fn(sandboxConsole);
    return { ok: true, output: logs.join('\n'), ms: performance.now() - t0 };
  } catch (e) {
    const partial = logs.length ? logs.join('\n') + '\n' : '';
    return {
      ok: false,
      output: partial + String(e instanceof Error ? `${e.name}: ${e.message}` : e),
      ms: performance.now() - t0,
    };
  }
}

// ── Python ───────────────────────────────────────────────────────
export async function runPy(code: string): Promise<RunResult> {
  const t0 = performance.now();
  let py: Pyodide;
  try {
    py = await loadPyodideRuntime();
  } catch {
    return { ok: false, output: '', loadFailed: true, ms: performance.now() - t0 };
  }
  try {
    py.runPython('import sys, io\n_ct_buf = io.StringIO()\nsys.stdout = _ct_buf\nsys.stderr = _ct_buf');
    py.runPython(code);
    const out = py.runPython('_ct_buf.getvalue()');
    py.runPython('sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__');
    return { ok: true, output: String(out), ms: performance.now() - t0 };
  } catch (e) {
    let captured = '';
    try {
      captured = String(py.runPython('_ct_buf.getvalue()') ?? '');
    } catch {
      /* noop */
    }
    try {
      py.runPython('sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__');
    } catch {
      /* noop */
    }
    const msg = String(e instanceof Error ? e.message : e);
    const incomplete = /unexpected EOF|expected an indented block|invalid syntax/i.test(msg);
    const tail = msg.split('\n').slice(-3).join('\n');
    return {
      ok: false,
      output: incomplete ? '' : (captured ? captured + '\n' : '') + tail,
      incomplete,
      ms: performance.now() - t0,
    };
  }
}

/** Ejecuta código en el lenguaje dado. */
export function run(language: RunLanguage, code: string): RunResult | Promise<RunResult> {
  return language === 'python' ? runPy(code) : runJs(code);
}

// ── Normalización y comprobaciones de salida ─────────────────────
/** Normaliza salida para comparar: recorta y unifica fin de línea/espacios al final. */
export function normalizeOutput(s: string): string {
  return s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/g, ''))
    .join('\n')
    .replace(/\n+$/g, '')
    .trim();
}

export type Check = { type: 'equals' | 'includes' | 'matches'; value: string; label: string };

export interface CheckResult {
  label: string;
  passed: boolean;
}

/** Evalúa una lista de comprobaciones contra la salida del programa. */
export function evaluateChecks(output: string, checks: Check[]): CheckResult[] {
  const out = normalizeOutput(output);
  return checks.map((c) => {
    let passed = false;
    try {
      if (c.type === 'equals') passed = out === normalizeOutput(c.value);
      else if (c.type === 'includes') passed = out.includes(c.value.trim());
      else if (c.type === 'matches') passed = new RegExp(c.value).test(out);
    } catch {
      passed = false;
    }
    return { label: c.label, passed };
  });
}
