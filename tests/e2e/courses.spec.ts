import { test } from '@playwright/test';
import { courses, flattenLessons } from '../../src/data/learn/index';
import { playLesson } from './helpers';

// Para CADA curso y CADA lección: jugarla de punta a punta y verificar que se
// puede completar con los datos del propio currículum (soluciones/opciones).
for (const course of courses) {
  test.describe(course.title, () => {
    for (const lesson of flattenLessons(course)) {
      test(`${course.slug}/${lesson.slug} — ${lesson.title}`, async ({ page }) => {
        await playLesson(page, course.slug, lesson.slug);
      });
    }
  });
}
