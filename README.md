# Programerso

**Aprendé a programar de verdad, no a memorizar.** Programerso es una plataforma
de cursos interactivos pensada para la era de la IA: escribís y ejecutás código
real en el navegador, predecís salidas, depurás bugs y resolvés retos — y aprendés
lo que hoy hace la diferencia: **leer, especificar y verificar código, y trabajar
con asistentes de IA sin perder el control**.

Sin instalar nada. Sin backend. Todo tu progreso vive en tu navegador.

## Qué la hace distinta

- **6 tipos de ejercicio**, no sólo "copiá esta línea":
  - **Escribir** — autocompletado guiado con _ghost text_ + `Tab`.
  - **Concepto** — tarjetas que explican una idea.
  - **Quiz** — opción múltiple con feedback inmediato.
  - **Predecir** — "¿qué imprime este código?" antes de ejecutarlo.
  - **Depurar** — arreglá código roto; se valida ejecutándolo.
  - **Reto** — escribí tu solución desde cero, validada por _checks_ sobre su salida.
- **Ejecución real**: JavaScript nativo en el navegador y Python con
  [Pyodide](https://pyodide.org) (CPython → WebAssembly).
- **Curso insignia "Programar en la era de la IA"**: vibe coding, leer y depurar
  código, especificar, prompting y cómo **revisar y verificar** lo que la IA genera.
- **Gamificación con criterio**: XP, niveles y rangos, racha diaria, logros,
  meta diaria y mapa de actividad. Confetti y toasts al subir de nivel.
- **Repaso espaciado (SRS)**: las lecciones vuelven para repaso cuando estás por
  olvidarlas.
- **Cuenta local + certificados**: creás un perfil (sin contraseñas), y al
  terminar un curso desbloqueás un **diploma imprimible** con tu nombre.
- **Buscador ⌘K**, **glosario** con tooltips en contexto, **playground** libre,
  **PWA** instalable y offline, **SEO** (sitemap, OpenGraph).

## Cursos

- **Programar en la era de la IA** — 14 lecciones · 7 módulos (la nueva forma de
  programar, leer código, depurar, especificar, trabajar con IA, vibe coding,
  revisar y verificar).
- **JavaScript desde cero** — 10 lecciones.
- **Python desde cero** — 10 lecciones.

## Stack

- [Astro 5](https://astro.build) (output estático) + [Tailwind CSS](https://tailwindcss.com)
- [astro-icon](https://github.com/natemoo-re/astro-icon) (Tabler), fuente [Geist](https://vercel.com/font)
- [Pyodide](https://pyodide.org) para Python en el navegador
- Sin dependencias de runtime extra: gamificación, confetti y SRS son código propio.

## Desarrollo

```bash
pnpm install          # instalar dependencias
pnpm run dev          # servidor de desarrollo (localhost:4321)
pnpm run build        # build estático a ./dist/
pnpm run preview      # previsualizar el build
pnpm run check        # type-check con astro check
pnpm run verify       # check + verificación de contenido + build
```

### Verificación de contenido

`pnpm run verify:content` ejecuta la solución de referencia de cada ejercicio
runnable del curso de IA y comprueba que su salida coincide con lo esperado y que
los _checks_ pasan — así ningún ejercicio queda irresoluble.

## Arquitectura

```
src/
├── components/
│   ├── CodeTutor.astro            # motor del tutor: 6 tipos de ejercicio + ejecución
│   └── CommandPalette.astro       # buscador global ⌘K
├── lib/
│   ├── runner.ts                  # ejecución JS/Python + normalización + checks
│   └── store.ts                   # progreso, XP, niveles, racha, logros, SRS, perfil
├── data/learn/                    # currículum como datos
│   ├── ia.ts  javascript.ts  python.ts
│   ├── glossary.ts  types.ts  index.ts
├── layouts/Layout.astro           # header con stats, celebración, PWA, SEO
├── pages/
│   ├── index.astro                # catálogo
│   ├── [course].astro             # índice de curso
│   ├── [course]/[lesson].astro    # lección interactiva
│   ├── progreso.astro             # dashboard (XP, racha, metas, logros, certificados)
│   ├── perfil.astro               # cuenta local + certificados
│   ├── certificado/[course].astro # diploma imprimible
│   ├── glosario.astro  playground.astro
│   └── sitemap.xml.ts
└── styles/global.css              # tokens de diseño + Tailwind
scripts/verify-content.mjs         # verificador de ejercicios runnable
```

### Agregar contenido

Las lecciones son **datos**. Cada paso (`LessonStep` en `types.ts`) declara su
`kind` (`type`, `info`, `quiz`, `predict`, `fix`, `challenge`) y los campos que ese
tipo necesita. Un paso sin `kind` se interpreta como `type` (retrocompatible). Mirá
`src/data/learn/ia.ts` para ejemplos de cada tipo, y corré `pnpm run verify:content`
después de agregar ejercicios ejecutables.
