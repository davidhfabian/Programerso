// Modelo de datos del sistema de aprendizaje interactivo.
// Un curso → módulos → lecciones → pasos. Una lección es una secuencia de pasos
// que el alumno resuelve uno a uno. Hay varios TIPOS de paso (`kind`):
//
//   • 'type'      — escribir una línea de código con autocompletado guiado (el
//                   programa se construye acumulando estos pasos y se ejecuta).
//   • 'info'      — tarjeta conceptual sin input; se avanza con un botón.
//   • 'quiz'      — opción múltiple conceptual.
//   • 'predict'   — "¿qué imprime este código?" (opción múltiple o salida exacta).
//   • 'fix'       — depurar: arreglar código roto; se valida ejecutándolo.
//   • 'challenge' — escribir una solución desde cero; se valida por su salida/tests.
//
// El modelo es retrocompatible: un paso sin `kind` se interpreta como 'type'.

/** Lenguajes con motor de ejecución en el navegador. `none` = lecciones conceptuales. */
export type LearnLanguage = 'javascript' | 'python' | 'none';

/** Tipos de paso soportados por el motor. */
export type StepKind = 'type' | 'info' | 'quiz' | 'predict' | 'fix' | 'challenge';

/** Una opción de un paso de opción múltiple (quiz / predict). */
export interface Choice {
  /** Texto de la opción (puede contener `code` HTML simple). */
  text: string;
  /** Marca la opción correcta. */
  correct?: boolean;
  /** Retroalimentación mostrada al elegir esta opción (correcta o no). */
  feedback?: string;
}

/** Una comprobación de un paso `challenge`: se evalúa contra la salida del programa. */
export interface OutputCheck {
  /** Tipo de comprobación sobre la salida (stdout) del programa del alumno. */
  type: 'equals' | 'includes' | 'matches';
  /** Valor esperado (texto exacto, subcadena, o fuente de RegExp según `type`). */
  value: string;
  /** Descripción legible de qué se está verificando (para el checklist). */
  label: string;
}

/**
 * Un paso dentro de una lección. Los campos relevantes dependen de `kind`.
 * Mantener `kind` opcional preserva la compatibilidad con los pasos 'type'
 * existentes, que sólo definen `instruction`, `explanation`, `solution` y `hint`.
 */
export interface LessonStep {
  /** Tipo de paso. Ausente ⇒ 'type'. */
  kind?: StepKind;
  /** Instrucción corta de qué hacer en este paso. */
  instruction: string;
  /**
   * Explicación del concepto. Soporta marcado `[[termino]]` o
   * `[[termino|texto visible]]` que se enlaza con el glosario.
   */
  explanation: string;
  /** Pista opcional, visible bajo demanda. */
  hint?: string;
  /** Mensaje opcional mostrado al resolver el paso (refuerzo). */
  reveal?: string;

  // ── kind: 'type' ───────────────────────────────────────────────
  /** La/s línea/s de código que el alumno debe producir (y que se acumulan). */
  solution?: string;

  // ── kind: 'quiz' | 'predict' (opción múltiple) ─────────────────
  /** Pregunta a responder (si difiere de `instruction`). */
  question?: string;
  /** Opciones de respuesta. Para predecir salida, `text` es una salida posible. */
  choices?: Choice[];

  // ── kind: 'predict' (salida) / lectura de código ───────────────
  /** Código mostrado en modo lectura (para predecir su salida o estudiarlo). */
  code?: string;
  /**
   * Salida esperada exacta (stdout normalizado). Para `predict` de texto libre
   * o como comprobación rápida de `fix`/`challenge`.
   */
  expectedOutput?: string;

  // ── kind: 'fix' ────────────────────────────────────────────────
  /** Código roto que el alumno edita para arreglarlo. */
  buggyCode?: string;

  // ── kind: 'challenge' ──────────────────────────────────────────
  /** Código inicial opcional dentro del editor del reto. */
  starter?: string;
  /** Comprobaciones sobre la salida del programa del alumno. */
  checks?: OutputCheck[];
  /** Solución de referencia (se puede revelar tras varios intentos). */
  referenceSolution?: string;
}

/** Una lección: una secuencia de pasos de uno o varios tipos. */
export interface Lesson {
  slug: string;
  title: string;
  /** Resumen de una línea para listados. */
  summary: string;
  /** Minutos estimados. */
  minutes: number;
  /** Introducción conceptual (HTML simple) mostrada antes de programar. */
  intro: string;
  steps: LessonStep[];
  /** Términos de glosario referenciados, para tooltips. */
  glossary?: string[];
  /** Etiquetas de habilidad/concepto, para repaso espaciado y dashboard. */
  tags?: string[];
}

/** Agrupación temática de lecciones dentro de un curso. */
export interface CourseModule {
  title: string;
  description: string;
  lessons: Lesson[];
}

/** Nivel aproximado de un curso, para señalizar dificultad. */
export type CourseLevel = 'principiante' | 'intermedio' | 'avanzado';

/** Un curso completo. */
export interface Course {
  slug: string;
  /** Lenguaje de ejecución del curso (`none` para cursos conceptuales). */
  language: LearnLanguage;
  title: string;
  tagline: string;
  description: string;
  /** Nombre de icono `astro-icon` (set tabler). */
  icon: string;
  /** Prompt/etiqueta mostrada en el editor (ej. `node`, `python3`). */
  runtimeLabel: string;
  /** Nivel para señalizar dificultad en el catálogo. */
  level?: CourseLevel;
  /** Marca el curso como destacado/nuevo en el catálogo. */
  featured?: boolean;
  /** Una frase de "qué vas a poder hacer" al terminar. */
  outcome?: string;
  modules: CourseModule[];
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}
