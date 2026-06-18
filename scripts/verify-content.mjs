// Verificador de contenido ejecutable. Corre la solución de referencia (o el
// código mostrado) de cada paso runnable del curso de IA y comprueba que su
// salida coincide con lo esperado / los checks. Atrapa ejercicios irresolvibles.
//
// Uso: node --experimental-strip-types scripts/verify-content.mjs
import { iaCourse } from '../src/data/learn/ia.ts';

// ── Mini-runner JS (espejo de src/lib/runner.ts, sin DOM) ────────
const FunctionCtor = Function;
function runJs(code) {
  const logs = [];
  const fmt = (v) => {
    if (typeof v === 'string') return v;
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  };
  const sandbox = { log: (...a) => logs.push(a.map(fmt).join(' ')) };
  let fn;
  try {
    fn = FunctionCtor('console', `"use strict";\n${code}`);
  } catch (e) {
    return { ok: false, output: 'SYNTAX: ' + e.message };
  }
  try {
    fn(sandbox);
    return { ok: true, output: logs.join('\n') };
  } catch (e) {
    return { ok: false, output: `${e.name}: ${e.message}` };
  }
}

const normalize = (s) =>
  String(s)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/g, ''))
    .join('\n')
    .replace(/\n+$/g, '')
    .trim();

function evaluateChecks(output, checks) {
  const out = normalize(output);
  return checks.map((c) => {
    let passed = false;
    if (c.type === 'equals') passed = out === normalize(c.value);
    else if (c.type === 'includes') passed = out.includes(c.value.trim());
    else if (c.type === 'matches') passed = new RegExp(c.value).test(out);
    return { label: c.label, passed };
  });
}

const stripTags = (s) => s.replace(/<[^>]+>/g, '').trim();

// ── Recorrer el curso ────────────────────────────────────────────
let problems = 0;
let checked = 0;
for (const mod of iaCourse.modules) {
  for (const lesson of mod.lessons) {
    lesson.steps.forEach((step, i) => {
      const where = `${lesson.slug} · paso ${i + 1} (${step.kind})`;

      if (step.kind === 'predict' && step.code) {
        const res = runJs(step.code);
        checked++;
        if (!res.ok) {
          console.log(`❌ ${where}: el código falla → ${res.output}`);
          problems++;
          return;
        }
        const out = normalize(res.output);
        if (step.choices && step.choices.length) {
          const correct = step.choices.find((c) => c.correct);
          if (!correct) {
            console.log(`❌ ${where}: no hay opción marcada como correcta`);
            problems++;
            return;
          }
          const expected = normalize(stripTags(correct.text));
          if (expected !== out) {
            console.log(`❌ ${where}: opción correcta dice "${expected}" pero el código imprime "${out}"`);
            problems++;
          }
        } else if (step.expectedOutput != null) {
          if (normalize(step.expectedOutput) !== out) {
            console.log(`❌ ${where}: expectedOutput "${normalize(step.expectedOutput)}" ≠ salida real "${out}"`);
            problems++;
          }
        }
      }

      if (step.kind === 'fix') {
        // El código roto NO debe cumplir; la solución de referencia SÍ.
        if (step.referenceSolution) {
          checked++;
          const res = runJs(step.referenceSolution);
          if (!res.ok) {
            console.log(`❌ ${where}: la solución de referencia falla → ${res.output}`);
            problems++;
          } else if (step.expectedOutput != null && normalize(res.output) !== normalize(step.expectedOutput)) {
            console.log(
              `❌ ${where}: la referencia imprime "${normalize(res.output)}" ≠ expectedOutput "${normalize(step.expectedOutput)}"`
            );
            problems++;
          }
          // confirmar que el código roto efectivamente NO cumple
          if (step.buggyCode && step.expectedOutput != null) {
            const bug = runJs(step.buggyCode);
            if (bug.ok && normalize(bug.output) === normalize(step.expectedOutput)) {
              console.log(`⚠️  ${where}: el buggyCode ya cumple expectedOutput (no hay bug que arreglar)`);
              problems++;
            }
          }
        }
      }

      if (step.kind === 'challenge' && step.referenceSolution) {
        checked++;
        const res = runJs(step.referenceSolution);
        if (!res.ok) {
          console.log(`❌ ${where}: la solución de referencia falla → ${res.output}`);
          problems++;
        } else if (step.checks && step.checks.length) {
          const results = evaluateChecks(res.output, step.checks);
          const failed = results.filter((r) => !r.passed);
          if (failed.length) {
            console.log(`❌ ${where}: la referencia NO pasa checks: ${failed.map((f) => f.label).join('; ')}`);
            console.log(`     salida real: "${normalize(res.output)}"`);
            problems++;
          }
        }
      }
    });
  }
}

console.log(`\n${problems === 0 ? '✅' : '⚠️'} Verificados ${checked} pasos ejecutables · ${problems} problema(s).`);
process.exit(problems === 0 ? 0 : 1);
