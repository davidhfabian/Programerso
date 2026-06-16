import type { Course, Lesson } from './types';
import { javascriptCourse } from './javascript';
import { pythonCourse } from './python';
import { glossary } from './glossary';

export * from './types';
export { glossary };

export const courses: Course[] = [javascriptCourse, pythonCourse];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

/** Devuelve todas las lecciones de un curso en orden, aplanando los módulos. */
export function flattenLessons(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons);
}

export function getLesson(course: Course, lessonSlug: string): Lesson | undefined {
  return flattenLessons(course).find((l) => l.slug === lessonSlug);
}

/** Lección siguiente/anterior dentro del curso (para navegación lineal). */
export function getAdjacentLessons(course: Course, lessonSlug: string): { prev?: Lesson; next?: Lesson } {
  const all = flattenLessons(course);
  const idx = all.findIndex((l) => l.slug === lessonSlug);
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}

export function totalLessons(course: Course): number {
  return flattenLessons(course).length;
}

export function totalMinutes(course: Course): number {
  return flattenLessons(course).reduce((sum, l) => sum + l.minutes, 0);
}

/** Sólo las entradas de glosario que una lección referencia. Para serializar al cliente. */
export function lessonGlossary(lesson: Lesson): Record<string, { term: string; definition: string }> {
  const keys = new Set<string>();
  for (const k of lesson.glossary ?? []) keys.add(k);
  // También recoger los referenciados inline con [[clave]] dentro de las explicaciones.
  for (const step of lesson.steps) {
    const re = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(step.explanation))) {
      keys.add(m[1].trim().toLowerCase());
    }
  }
  const out: Record<string, { term: string; definition: string }> = {};
  for (const k of keys) {
    if (glossary[k]) out[k] = glossary[k];
  }
  return out;
}
