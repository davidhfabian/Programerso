// Modelo de datos del sistema de aprendizaje interactivo (`/aprende`).
// Un curso → módulos → lecciones → pasos. Cada lección es un programa que se
// construye paso a paso: el alumno escribe una línea por paso con autocompletado
// guiado, y al validar se ejecuta el programa acumulado para mostrar la salida.

/** Lenguajes soportados por el motor de ejecución en el navegador. */
export type LearnLanguage = 'javascript' | 'python';

/**
 * Un paso dentro de una lección. El alumno debe reproducir `solution`
 * (con ayuda del autocompletado) para avanzar.
 */
export interface LessonStep {
  /** Instrucción corta de qué hacer en este paso. */
  instruction: string;
  /**
   * Explicación del concepto. Soporta marcado `[[termino]]` o
   * `[[termino|texto visible]]` que se enlaza con el glosario y muestra
   * una definición al pasar/hacer click.
   */
  explanation: string;
  /** La/s línea/s de código que el alumno debe producir en este paso. */
  solution: string;
  /** Pista opcional, visible bajo demanda. */
  hint?: string;
}

/** Una lección: un único programa ejecutable construido a lo largo de sus pasos. */
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
}

/** Agrupación temática de lecciones dentro de un curso. */
export interface CourseModule {
  title: string;
  description: string;
  lessons: Lesson[];
}

/** Un curso completo de un lenguaje. */
export interface Course {
  slug: LearnLanguage;
  language: LearnLanguage;
  title: string;
  tagline: string;
  description: string;
  /** Nombre de icono `astro-icon` (set tabler). */
  icon: string;
  /** Prompt/etiqueta mostrada en el editor (ej. `node`, `python3`). */
  runtimeLabel: string;
  modules: CourseModule[];
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}
