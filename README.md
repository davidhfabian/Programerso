# Programerso

Aprendé a programar desde cero **escribiendo código real**. Programerso es una
plataforma de cursos interactivos: el editor te sugiere qué escribir línea por
línea, te explica cada término al instante y ejecuta tu programa de verdad en el
navegador — sin instalar nada.

## Cómo funciona

- **Autocompletado guiado**: a medida que escribís, el editor muestra con _ghost
  text_ lo que sigue. Lo aceptás con `Tab` o tocando el chip de sugerencia.
- **Cada término, explicado**: los conceptos subrayados muestran su definición en
  un tooltip al pasar o hacer click.
- **Ejecución real**: JavaScript corre nativo en el navegador; Python corre con
  [Pyodide](https://pyodide.org) (Python compilado a WebAssembly). La salida real
  aparece en la consola.
- **Progreso**: se guarda localmente (localStorage); podés reiniciar cuando quieras.

## Cursos

- **JavaScript desde cero** — 10 lecciones (hola mundo, variables, tipos,
  operadores, strings, condicionales, bucles, funciones, arrays, objetos).
- **Python desde cero** — 10 lecciones equivalentes (incluye listas y diccionarios).

## Stack

- [Astro 5](https://astro.build) (output estático)
- [Tailwind CSS](https://tailwindcss.com)
- [astro-icon](https://github.com/natemoo-re/astro-icon) (Tabler)
- Fuente [Geist](https://vercel.com/font) (self-hosted)
- [Pyodide](https://pyodide.org) (ejecución de Python en el navegador)

## Desarrollo

```bash
pnpm install      # instalar dependencias
pnpm run dev      # servidor de desarrollo (localhost:4321)
pnpm run build    # build estático a ./dist/
pnpm run preview  # previsualizar el build
pnpm run check    # type-check con astro check
```

## Estructura

```
src/
├── components/CodeTutor.astro     # editor-tutor interactivo (motor)
├── data/learn/                    # currículum: cursos, lecciones, glosario
│   ├── javascript.ts
│   ├── python.ts
│   ├── glossary.ts
│   └── types.ts
├── layouts/Layout.astro           # layout base (header, footer, tema)
├── pages/
│   ├── index.astro                # catálogo de cursos
│   ├── [course].astro             # índice de un curso
│   └── [course]/[lesson].astro    # lección interactiva
└── styles/global.css              # tokens de diseño + Tailwind
```

### Agregar lecciones

Las lecciones son datos. Editá `src/data/learn/javascript.ts` o `python.ts`:
cada lección es un programa que se construye paso a paso, y cada paso define la
`solution` (el código a producir), su `explanation` (con términos `[[clave]]` del
glosario) y un `hint` opcional.
