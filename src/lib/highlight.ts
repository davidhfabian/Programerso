// Resaltador de sintaxis mínimo y sin dependencias para JS y Python.
// Devuelve HTML con el texto ESCAPADO y los tokens envueltos en <span>.
// Pensado para código de currículum / del alumno mostrado en sólo lectura.

const JS_KW = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'of', 'in', 'new', 'typeof',
  'class', 'extends', 'super', 'this', 'true', 'false', 'null', 'undefined', 'break', 'continue', 'do',
  'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw', 'await', 'async', 'import', 'export',
  'from', 'yield', 'instanceof', 'delete', 'void',
]);

const PY_KW = new Set([
  'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or', 'import', 'from', 'as',
  'class', 'True', 'False', 'None', 'pass', 'break', 'continue', 'with', 'try', 'except', 'finally', 'raise',
  'lambda', 'global', 'nonlocal', 'yield', 'is', 'del', 'assert', 'async', 'await',
]);

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const JS_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|(\s+)|([^\s\w$])/g;
const PY_RE =
  /(#[^\n]*)|(f?'(?:\\.|[^'\\])*'|f?"(?:\\.|[^"\\])*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|(\s+)|([^\s\w])/g;

/** Resalta `code` para `lang`. Para lenguajes sin soporte devuelve el texto escapado. */
export function highlight(code: string, lang: string): string {
  if (lang !== 'javascript' && lang !== 'python') return escapeHtml(code);
  const kw = lang === 'python' ? PY_KW : JS_KW;
  const re = lang === 'python' ? PY_RE : JS_RE;
  let out = '';
  for (const m of code.matchAll(re)) {
    if (m[1]) {
      out += `<span class="tok-com">${escapeHtml(m[1])}</span>`;
    } else if (m[2]) {
      out += `<span class="tok-str">${escapeHtml(m[2])}</span>`;
    } else if (m[3]) {
      out += `<span class="tok-num">${escapeHtml(m[3])}</span>`;
    } else if (m[4]) {
      const word = m[4];
      const after = code[(m.index ?? 0) + word.length];
      if (kw.has(word)) out += `<span class="tok-kw">${escapeHtml(word)}</span>`;
      else if (after === '(') out += `<span class="tok-fn">${escapeHtml(word)}</span>`;
      else out += escapeHtml(word);
    } else if (m[5]) {
      out += m[5];
    } else if (m[6]) {
      out += `<span class="tok-punct">${escapeHtml(m[6])}</span>`;
    }
  }
  return out;
}
