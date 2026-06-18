import type { APIRoute } from 'astro';
import { courses, flattenLessons } from '~/data/learn';

// Sitemap generado a partir del currículum. Incluye páginas fijas, cursos y
// todas las lecciones. La URL base sale de `site` en astro.config.
export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? 'https://programerso.app/').replace(/\/$/, '');
  const urls: string[] = ['/', '/progreso', '/glosario', '/playground', '/perfil'];

  for (const course of courses) {
    urls.push(`/${course.slug}`);
    urls.push(`/certificado/${course.slug}`);
    for (const lesson of flattenLessons(course)) {
      urls.push(`/${course.slug}/${lesson.slug}`);
    }
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
