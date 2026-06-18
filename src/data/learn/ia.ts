import type { Course } from './types';

// Curso insignia: "Programar en la era de la IA".
// Enseña lo que importa hoy que la IA escribe gran parte del código: leer y
// predecir código, depurar, especificar y descomponer, trabajar con asistentes
// de IA, y sobre todo REVISAR y VERIFICAR lo que la IA genera (vibe coding con
// red de seguridad). Usa todos los tipos de ejercicio. El lenguaje es JavaScript
// para que los ejemplos se ejecuten de verdad en el navegador.

export const iaCourse: Course = {
  slug: 'ia',
  language: 'javascript',
  title: 'Programar en la era de la IA',
  tagline: 'El curso que no existía',
  description:
    'Hoy la IA escribe código. Lo valioso es saber leerlo, depurarlo, pedirlo bien y verificarlo. Este curso te enseña a trabajar con asistentes de IA y a hacer "vibe coding" sin pegarte un tiro en el pie.',
  icon: 'tabler:robot',
  runtimeLabel: 'ia',
  level: 'principiante',
  featured: true,
  outcome:
    'Vas a poder dirigir a un asistente de IA, entender qué hace cada línea que produce y detectar cuándo se equivoca.',
  modules: [
    // ── Módulo 1 ───────────────────────────────────────────────────
    {
      title: 'Qué cambió (y qué no)',
      description: 'Por qué hoy programar es otra cosa, y por qué entender el código importa más que nunca.',
      lessons: [
        {
          slug: 'la-nueva-forma',
          title: 'La nueva forma de programar',
          summary: 'Qué significa programar cuando la IA escribe el código.',
          minutes: 6,
          tags: ['ia', 'mentalidad'],
          glossary: ['ia', 'llm', 'agente', 'vibe-coding'],
          intro:
            '<p>Durante décadas, programar fue <strong>escribir cada línea a mano</strong>. Eso cambió. Hoy una <strong>IA</strong> puede generar funciones enteras a partir de una frase. Pero eso no te vuelve innecesario: te cambia el trabajo. Veamos de qué se trata ahora.</p>',
          steps: [
            {
              kind: 'info',
              instruction: 'El cambio en una frase',
              explanation:
                'Antes el cuello de botella era <strong>escribir</strong> el código. Ahora el cuello de botella es <strong>saber qué pedir</strong> y <strong>darte cuenta si lo que volvió está bien</strong>. La IA es rapidísima escribiendo; vos sos quien decide, dirige y verifica.',
            },
            {
              kind: 'info',
              instruction: 'Tu nuevo rol',
              explanation:
                'Pensalo como pasar de ser <strong>albañil</strong> a ser <strong>arquitecto y capataz</strong>: la IA pone los ladrillos, pero vos definís qué se construye, revisás que las paredes no se caigan y entendés el plano. Para eso, igual tenés que saber cómo se levantan las paredes.',
            },
            {
              kind: 'quiz',
              instruction: 'Elegí la afirmación correcta',
              explanation: 'Pensá en qué cambió realmente.',
              question: 'En la era de la IA, ¿qué es lo más valioso que puede aportar una persona que programa?',
              choices: [
                {
                  text: 'Memorizar la [[sintaxis]] de muchos lenguajes de memoria',
                  feedback: 'La IA ya recuerda la sintaxis. Memorizarla dejó de ser lo escaso.',
                },
                {
                  text: 'Escribir código más rápido que la IA',
                  feedback: 'Imposible competir en velocidad de tipeo con una IA.',
                },
                {
                  text: 'Especificar bien el problema y verificar que la solución sea correcta',
                  correct: true,
                  feedback: '¡Exacto! Decir con precisión qué querés y juzgar si está bien: eso es lo escaso hoy.',
                },
                {
                  text: 'Nada: la IA ya hace todo sola',
                  feedback: 'La IA se equivoca seguido. Alguien tiene que entender y verificar.',
                },
              ],
            },
            {
              kind: 'info',
              instruction: 'Lo que NO cambió',
              explanation:
                'Para revisar lo que la IA escribe, tenés que <strong>poder leerlo</strong>. Para pedir bien, tenés que <strong>entender qué es posible</strong>. Por eso los fundamentos —variables, condicionales, bucles, funciones— siguen siendo la base. No los aprendés para tipearlos: los aprendés para <strong>pensar</strong> y <strong>juzgar</strong>.',
            },
          ],
        },
        {
          slug: 'por-que-entender',
          title: 'Por qué entender el código importa más',
          summary: 'Los datos: el código de IA tiene más errores. Vos sos la red de seguridad.',
          minutes: 7,
          tags: ['ia', 'mentalidad', 'calidad'],
          glossary: ['bug', 'alucinacion', 'verificar', 'revision'],
          intro:
            '<p>La IA es impresionante, pero <strong>no es confiable al 100%</strong>. Escribe código que <em>parece</em> correcto y a veces no lo es. Los números lo confirman.</p>',
          steps: [
            {
              kind: 'info',
              instruction: 'El dato que tenés que conocer',
              explanation:
                'Un estudio de 2025 que revisó 470 cambios de código reales encontró que el código <strong>co-escrito con IA</strong> tenía <strong>~1,7× más errores graves</strong> y <strong>2,74× más vulnerabilidades de seguridad</strong> que el escrito por personas. La IA acelera… y también acelera los errores si nadie mira.',
            },
            {
              kind: 'quiz',
              instruction: 'Interpretá el dato',
              explanation: 'No es para no usar IA, es para usarla bien.',
              question: '¿Qué conclusión es la correcta?',
              choices: [
                {
                  text: 'No hay que usar IA para programar nunca',
                  feedback: 'Demasiado extremo. La IA es muy útil; el punto es supervisarla.',
                },
                {
                  text: 'Hay que revisar y verificar lo que la IA escribe, no aceptarlo a ciegas',
                  correct: true,
                  feedback: 'Eso es. La IA propone; vos disponés (y verificás).',
                },
                {
                  text: 'Si compila, está bien',
                  feedback: 'Que compile no significa que haga lo correcto. Muchos bugs no rompen el programa.',
                },
              ],
            },
            {
              kind: 'info',
              instruction: 'Alucinaciones',
              explanation:
                'A veces la IA <strong>inventa</strong> cosas: una función que no existe, una librería falsa, un dato erróneo. Se llama [[alucinacion|alucinación]] y suena tan convincente como lo verdadero. La única defensa es <strong>probarlo y leerlo</strong>.',
            },
            {
              kind: 'predict',
              instruction: '¿Este código hace lo que dice su nombre?',
              explanation:
                'Una IA escribió esta función para saber si un número es par. Leela con cuidado antes de mirar la salida. <code>%</code> es el resto de dividir; un número es par si su resto al dividir por 2 es <strong>0</strong>.',
              code: 'function esPar(n) {\n  return n % 2 === 1;\n}\nconsole.log(esPar(4));',
              choices: [
                { text: '<pre>true</pre>', feedback: 'Eso sería lo correcto… pero mirá la condición: dice === 1.' },
                {
                  text: '<pre>false</pre>',
                  correct: true,
                  feedback: '4 % 2 es 0, y 0 === 1 es false. ¡La función está MAL! Debería comparar con 0. Esto es un bug silencioso.',
                },
              ],
              reveal:
                'Detectaste un <strong>bug que la IA podría haber escrito</strong>: el código corre sin error, pero la respuesta es incorrecta. Leer con atención te salvó.',
            },
          ],
        },
      ],
    },

    // ── Módulo 2 ───────────────────────────────────────────────────
    {
      title: 'Leer código es el nuevo superpoder',
      description: 'Si podés predecir qué hace un programa con sólo leerlo, podés revisar cualquier cosa.',
      lessons: [
        {
          slug: 'predecir-salida',
          title: 'Predecir la salida',
          summary: 'Leé el código y adelantá qué va a imprimir, sin ejecutarlo.',
          minutes: 8,
          tags: ['leer', 'fundamentos'],
          glossary: ['operador', 'variable'],
          intro:
            '<p>El mejor ejercicio para entender código es <strong>predecir su salida</strong> antes de correrlo. Si tu predicción acierta, entendiste. Si no, aprendés justo dónde te confundiste.</p>',
          steps: [
            {
              kind: 'predict',
              instruction: '¿Qué imprime?',
              explanation:
                'La multiplicación se hace <strong>antes</strong> que la suma (precedencia de [[operador|operadores]]), igual que en matemática.',
              code: 'console.log(2 + 3 * 4);',
              choices: [
                { text: '<pre>20</pre>', feedback: 'Eso sería si sumaras primero. Pero * va antes que +.' },
                { text: '<pre>14</pre>', correct: true, feedback: '3*4 = 12, y 12+2 = 14. ¡Precedencia!' },
                { text: '<pre>24</pre>', feedback: 'Revisá: 2 + (3*4).' },
              ],
            },
            {
              kind: 'predict',
              instruction: 'Seguí el valor de la variable',
              explanation:
                'Recorré el bucle en tu cabeza: <code>total</code> arranca en 0 y se le suma <code>i</code> en cada vuelta (1, 2 y 3).',
              code: 'let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total += i;\n}\nconsole.log(total);',
              choices: [
                { text: '<pre>3</pre>', feedback: 'Esa sería la última i, no la suma acumulada.' },
                { text: '<pre>6</pre>', correct: true, feedback: '0+1+2+3 = 6. Rastreaste el estado correctamente.' },
                { text: '<pre>7</pre>', feedback: 'Cuidado: el bucle va de 1 a 3, no a 4.' },
              ],
            },
            {
              kind: 'predict',
              instruction: 'Escribí la salida exacta',
              explanation:
                'No hay opciones: escribí vos la salida. El <code>+</code> entre textos los <strong>une</strong> (concatena).',
              code: 'const nombre = "Ada";\nconsole.log("Hola, " + nombre + "!");',
              expectedOutput: 'Hola, Ada!',
              hint: 'Uní los tres pedazos: "Hola, " + "Ada" + "!"',
            },
            {
              kind: 'predict',
              instruction: 'El último elemento',
              explanation:
                'En una lista, las posiciones empiezan en 0. La última posición es <code>length - 1</code>.',
              code: 'const xs = [10, 20, 30];\nconsole.log(xs[xs.length - 1]);',
              choices: [
                { text: '<pre>30</pre>', correct: true, feedback: 'length es 3, 3-1 = 2, y xs[2] es 30.' },
                { text: '<pre>undefined</pre>', feedback: 'Eso pasaría con xs[3]. Acá restamos 1.' },
                { text: '<pre>20</pre>', feedback: 'Ese es xs[1]. La última posición es length-1 = 2.' },
              ],
            },
          ],
        },
        {
          slug: 'leer-funciones',
          title: 'Leer funciones ajenas',
          summary: 'Entender qué hace una función que no escribiste vos (ni la IA te explica).',
          minutes: 8,
          tags: ['leer', 'funciones'],
          glossary: ['funcion', 'parametro', 'retornar', 'condicional'],
          intro:
            '<p>La IA te va a dar funciones todo el tiempo. Saber leer una función —qué recibe, qué devuelve, qué decide— es lo que te permite confiar (o no) en ella.</p>',
          steps: [
            {
              kind: 'predict',
              instruction: '¿Qué devuelve?',
              explanation:
                'Un [[condicional]] con <code>?</code> (ternario): <code>condición ? siValor : noValor</code>. Si la condición es verdadera devuelve el primero, si no el segundo.',
              code: 'function clasificar(edad) {\n  return edad >= 18 ? "adulto" : "menor";\n}\nconsole.log(clasificar(17));',
              choices: [
                { text: '<pre>adulto</pre>', feedback: '17 no es >= 18, así que va por la otra rama.' },
                { text: '<pre>menor</pre>', correct: true, feedback: '17 >= 18 es false ⇒ devuelve "menor".' },
              ],
            },
            {
              kind: 'predict',
              instruction: 'Una función con bucle',
              explanation: 'Leé qué acumula la función y qué devuelve al final.',
              code: 'function sumarHasta(n) {\n  let s = 0;\n  for (let i = 1; i <= n; i++) {\n    s += i;\n  }\n  return s;\n}\nconsole.log(sumarHasta(4));',
              choices: [
                { text: '<pre>10</pre>', correct: true, feedback: '1+2+3+4 = 10. Leíste el bucle perfecto.' },
                { text: '<pre>4</pre>', feedback: 'Esa es n, no la suma.' },
                { text: '<pre>24</pre>', feedback: 'Eso sería 1*2*3*4 (producto), no la suma.' },
              ],
            },
            {
              kind: 'quiz',
              instruction: '¿Qué hace esta función, en palabras?',
              explanation: 'Leer no es sólo predecir un número: es entender la <em>intención</em>.',
              code: 'function f(texto) {\n  return texto.split("").reverse().join("");\n}',
              question: 'En una frase, ¿qué hace <code>f("hola")</code>?',
              choices: [
                { text: 'Pone el texto en mayúsculas', feedback: 'No hay nada de mayúsculas acá.' },
                {
                  text: 'Devuelve el texto al revés ("aloh")',
                  correct: true,
                  feedback: 'Sí: lo parte en letras, las da vuelta y las vuelve a unir.',
                },
                { text: 'Cuenta cuántas letras tiene', feedback: 'Eso sería .length, no reverse.' },
              ],
            },
          ],
        },
      ],
    },

    // ── Módulo 3 ───────────────────────────────────────────────────
    {
      title: 'Depurar: encontrar y arreglar errores',
      description: 'El código de la IA viene con bugs. Acá aprendés a cazarlos y corregirlos.',
      lessons: [
        {
          slug: 'tu-primer-bug',
          title: 'Tu primer bug',
          summary: 'Un programa que casi funciona. Encontrá el error y arreglalo.',
          minutes: 8,
          tags: ['depurar', 'fundamentos'],
          glossary: ['bug', 'depurar', 'operador'],
          intro:
            '<p>Depurar es comparar lo que el programa <strong>hace</strong> con lo que <strong>debería hacer</strong>, y cerrar la diferencia. Vamos a arreglar bugs reales. Tenés un editor: cambialo y tocá <strong>Comprobar</strong>.</p>',
          steps: [
            {
              kind: 'fix',
              instruction: 'doble(5) debería dar 10, pero no lo da',
              explanation:
                'Esta función dice que duplica un número, pero algo no cierra. <strong>Doblar</strong> es multiplicar por 2, no sumar 2. Arreglá el [[operador]].',
              buggyCode: 'function doble(n) {\n  return n + 2;\n}\nconsole.log(doble(5));',
              expectedOutput: '10',
              hint: 'Cambiá el + por un * (multiplicar por 2).',
              referenceSolution: 'function doble(n) {\n  return n * 2;\n}\nconsole.log(doble(5));',
              reveal: 'El nombre prometía una cosa y el código hacía otra. Ese desajuste es el bug más común de la IA.',
            },
            {
              kind: 'fix',
              instruction: 'La suma del 1 al 5 debería ser 15',
              explanation:
                'Este bucle quiere sumar 1+2+3+4+5 = 15, pero le falta llegar al 5. Es un clásico error <strong>"por uno"</strong> (off-by-one): la condición corta una vuelta antes.',
              buggyCode: 'let suma = 0;\nfor (let i = 1; i < 5; i++) {\n  suma += i;\n}\nconsole.log(suma);',
              expectedOutput: '15',
              hint: 'Con i < 5 el bucle llega hasta 4. Necesitás i <= 5.',
              referenceSolution: 'let suma = 0;\nfor (let i = 1; i <= 5; i++) {\n  suma += i;\n}\nconsole.log(suma);',
            },
          ],
        },
        {
          slug: 'el-bug-silencioso',
          title: 'El bug silencioso',
          summary: 'No hay mensaje de error: el resultado simplemente está mal. El más peligroso.',
          minutes: 9,
          tags: ['depurar', 'calidad', 'ia'],
          glossary: ['bug', 'verificar', 'condicional'],
          intro:
            '<p>Los peores bugs no rompen nada: el programa corre feliz y te da un resultado <strong>incorrecto</strong>. Como nadie avisa, sólo los detectás si <strong>verificás</strong> el resultado. La IA produce muchos de estos.</p>',
          steps: [
            {
              kind: 'fix',
              instruction: 'esMayor(10, 3) debería decir true',
              explanation:
                'Una IA escribió esta función para saber si <code>a</code> es mayor que <code>b</code>. Corre sin errores… pero compará bien: ¿está usando el operador correcto?',
              buggyCode: 'function esMayor(a, b) {\n  return a < b;\n}\nconsole.log(esMayor(10, 3));',
              expectedOutput: 'true',
              hint: '"a mayor que b" se escribe a > b, no a < b.',
              referenceSolution: 'function esMayor(a, b) {\n  return a > b;\n}\nconsole.log(esMayor(10, 3));',
            },
            {
              kind: 'fix',
              instruction: 'El saludo debería decir "Hola, Grace"',
              explanation:
                'Acá el bug está en cómo se arma el texto. La función debería devolver <code>Hola, Grace</code> pero mezcla las cosas. Leé qué se concatena.',
              buggyCode: 'function saludar(nombre) {\n  return "Hola, " + "nombre";\n}\nconsole.log(saludar("Grace"));',
              expectedOutput: 'Hola, Grace',
              hint: 'La variable nombre NO va entre comillas. "nombre" es el texto literal; nombre es el valor.',
              referenceSolution: 'function saludar(nombre) {\n  return "Hola, " + nombre;\n}\nconsole.log(saludar("Grace"));',
              reveal: 'Diferencia clave: <code>"nombre"</code> es el texto, <code>nombre</code> es el valor de la variable. Un error de una comilla.',
            },
            {
              kind: 'quiz',
              instruction: 'La moraleja',
              explanation: 'Pensá cómo te protegés de los bugs silenciosos.',
              question: '¿Cuál es la mejor forma de cazar un bug silencioso?',
              choices: [
                { text: 'Confiar en que si no hay error, está bien', feedback: 'Justo eso es lo que los deja pasar.' },
                {
                  text: 'Probar el código con un caso del que ya sabés la respuesta',
                  correct: true,
                  feedback: 'Sí: si sabés que doble(5) debe dar 10 y da otra cosa, lo cazaste.',
                },
                { text: 'Leerlo una vez rápido', feedback: 'Mejor que nada, pero probar con casos conocidos es más confiable.' },
              ],
            },
          ],
        },
      ],
    },

    // ── Módulo 4 ───────────────────────────────────────────────────
    {
      title: 'Especificar y descomponer',
      description: 'La IA es tan buena como tu pedido. Aprendé a decir exactamente qué querés.',
      lessons: [
        {
          slug: 'decir-exactamente',
          title: 'Decir exactamente qué querés',
          summary: 'La ambigüedad es el enemigo. Una buena especificación es media solución.',
          minutes: 7,
          tags: ['especificar', 'ia', 'prompt'],
          glossary: ['especificar', 'prompt', 'contexto'],
          intro:
            '<p>Si le pedís a la IA algo vago, te da algo vago (o equivocado). <strong>[[especificar|Especificar]]</strong> es decir con precisión: qué entra, qué sale, y qué pasa en los casos raros.</p>',
          steps: [
            {
              kind: 'quiz',
              instruction: 'Elegí el mejor pedido',
              explanation: 'Un buen [[prompt]] da contexto, entradas, salidas y casos límite.',
              question: 'Querés una función que valide un email. ¿Cuál es la mejor instrucción para la IA?',
              choices: [
                { text: '"Hacé algo para los emails"', feedback: 'Vaguísimo. ¿Validar? ¿enviar? ¿guardar?' },
                { text: '"Validá emails"', feedback: 'Mejor, pero ¿qué cuenta como válido? ¿qué devuelve?' },
                {
                  text: '"Función validarEmail(texto) que devuelva true si tiene formato nombre@dominio.algo y false si no. Probala con 3 ejemplos."',
                  correct: true,
                  feedback: 'Excelente: nombre, entrada, salida, criterio y verificación. Eso es especificar.',
                },
              ],
            },
            {
              kind: 'quiz',
              instruction: 'Los casos límite',
              explanation: 'Lo que olvidás especificar es donde aparecen los bugs.',
              question: 'Pedís "una función que divida a entre b". ¿Qué caso límite conviene aclarar?',
              choices: [
                {
                  text: 'Qué hacer si b es 0 (no se puede dividir por cero)',
                  correct: true,
                  feedback: '¡Sí! El caso límite olvidado es la fuente clásica de errores.',
                },
                { text: 'De qué color mostrar el resultado', feedback: 'Eso no es parte del cálculo.' },
                { text: 'Nada, dividir es obvio', feedback: 'Dividir por 0 no es obvio para el programa: hay que decidirlo.' },
              ],
            },
            {
              kind: 'info',
              instruction: 'La regla de oro',
              explanation:
                'Si vos no podés explicar en palabras qué tiene que hacer el programa, la IA <strong>tampoco</strong> va a poder. Especificar bien no es un paso previo a programar: <strong>es</strong> programar.',
            },
          ],
        },
        {
          slug: 'descomponer-problemas',
          title: 'Descomponer un problema',
          summary: 'Partir algo grande en pasos chiquitos que sí podés resolver (o pedir).',
          minutes: 9,
          tags: ['descomponer', 'pensamiento'],
          glossary: ['descomponer', 'abstraccion', 'funcion'],
          intro:
            '<p>Nadie resuelve "hacé una tienda online" de una. Se <strong>[[descomponer|descompone]]</strong>: catálogo, carrito, pago… y cada parte en pasos aún más chicos. Esta es la habilidad que más se transfiere, con IA o sin IA.</p>',
          steps: [
            {
              kind: 'quiz',
              instruction: 'Ordená el pensamiento',
              explanation: 'Descomponer es ir de lo grande a lo chico.',
              question: 'Querés "calcular el promedio de una lista de notas". ¿Cuál es la mejor descomposición?',
              choices: [
                {
                  text: '1) Sumar todas las notas. 2) Contar cuántas son. 3) Dividir la suma por la cantidad.',
                  correct: true,
                  feedback: 'Perfecto: tres pasos chicos, cada uno fácil de programar o pedir.',
                },
                { text: '1) Hacer el promedio.', feedback: 'Eso es el problema entero, no una descomposición.' },
                { text: '1) Abrir el editor. 2) Escribir código.', feedback: 'Eso es operativo, no la lógica del problema.' },
              ],
            },
            {
              kind: 'challenge',
              instruction: 'Implementá el paso 3: dividir',
              explanation:
                'Ya tenemos la suma (15) y la cantidad (3). Escribí una función <code>promedio(suma, cantidad)</code> que devuelva la división, y mostrá el resultado. Debe imprimir <code>5</code>.',
              starter: 'function promedio(suma, cantidad) {\n  // devolvé la división\n}\nconsole.log(promedio(15, 3));',
              checks: [{ type: 'equals', value: '5', label: 'promedio(15, 3) imprime 5' }],
              referenceSolution:
                'function promedio(suma, cantidad) {\n  return suma / cantidad;\n}\nconsole.log(promedio(15, 3));',
              hint: 'return suma / cantidad;',
            },
            {
              kind: 'info',
              instruction: 'Por qué funciona',
              explanation:
                'Cada paso chico se vuelve una <strong>[[funcion|función]]</strong> con nombre. Eso es <strong>[[abstraccion|abstracción]]</strong>: una vez que <code>promedio()</code> existe y confiás en ella, podés olvidarte de cómo funciona por dentro y usarla como un ladrillo.',
            },
          ],
        },
      ],
    },

    // ── Módulo 5 ───────────────────────────────────────────────────
    {
      title: 'Trabajar con un asistente de IA',
      description: 'Cómo pedir, cómo iterar y cómo darle contexto a un agente de IA.',
      lessons: [
        {
          slug: 'como-pedir',
          title: 'Cómo pedirle a la IA',
          summary: 'Contexto, objetivo, restricciones y ejemplos: la anatomía de un buen prompt.',
          minutes: 8,
          tags: ['prompt', 'ia', 'agente'],
          glossary: ['prompt', 'contexto', 'agente', 'llm'],
          intro:
            '<p>Un <strong>[[agente|agente de IA]]</strong> (como Claude Code o Cursor) puede leer tu proyecto y editar archivos. Pero sigue dependiendo de cómo le pedís. Veamos qué hace un pedido potente.</p>',
          steps: [
            {
              kind: 'quiz',
              instruction: 'Contexto primero',
              explanation: 'La IA no ve lo que vos ves si no se lo decís.',
              question: '¿Por qué conviene darle [[contexto]] (el código existente, el objetivo) a la IA?',
              choices: [
                {
                  text: 'Porque sin contexto adivina, y suele adivinar mal o reinventar lo que ya existe',
                  correct: true,
                  feedback: 'Exacto: el contexto la ancla a tu proyecto real en vez de a un promedio genérico.',
                },
                { text: 'Porque le gusta leer', feedback: 'La IA no tiene gustos; el contexto mejora la precisión.' },
                { text: 'No conviene, es perder tiempo', feedback: 'Al revés: ahorra las idas y vueltas por respuestas fuera de lugar.' },
              ],
            },
            {
              kind: 'quiz',
              instruction: 'Elegí el prompt más efectivo',
              explanation: 'Buen prompt = objetivo + restricciones + cómo verificar.',
              question: 'Querés ordenar una lista de números de menor a mayor en tu archivo utils.js.',
              choices: [
                { text: '"ordená esto"', feedback: '¿Qué? ¿cómo? ¿dónde? Demasiado abierto.' },
                {
                  text: '"En utils.js, agregá una función ordenar(numeros) que devuelva una copia ordenada de menor a mayor, sin modificar la original. Mostrá un ejemplo con [3,1,2]."',
                  correct: true,
                  feedback: 'Dónde, qué, con qué restricción (no mutar) y cómo verificarlo. Ideal.',
                },
                { text: '"hacé el mejor código posible"', feedback: '"Mejor" no significa nada sin un objetivo concreto.' },
              ],
            },
            {
              kind: 'info',
              instruction: 'Iterar es normal',
              explanation:
                'Rara vez sale perfecto a la primera. Lo normal es <strong>iterar</strong>: "casi, pero también tiene que manejar la lista vacía", "ahora hacelo más simple". Tratá a la IA como un colaborador rápido al que le das feedback preciso.',
            },
          ],
        },
        {
          slug: 'leer-lo-que-propone',
          title: 'Leer lo que la IA propone',
          summary: 'Antes de aceptar un cambio, entendelo. Practiquemos.',
          minutes: 8,
          tags: ['revision', 'ia', 'leer'],
          glossary: ['revision', 'verificar', 'bug'],
          intro:
            '<p>Cuando la IA te propone código, aparece el momento clave: <strong>aceptar o no</strong>. Esa decisión sólo es tuya si <em>entendiste</em> lo que propone.</p>',
          steps: [
            {
              kind: 'predict',
              instruction: 'La IA propuso esta función. ¿Qué imprime?',
              explanation:
                'Antes de aceptarla, predecí su salida. Filtra los números mayores a 2.',
              code: 'function mayoresA2(xs) {\n  return xs.filter((n) => n > 2);\n}\nconsole.log(mayoresA2([1, 2, 3, 4]));',
              choices: [
                { text: '<pre>[3,4]</pre>', correct: true, feedback: 'Sí: deja sólo los que cumplen n > 2.' },
                { text: '<pre>[1,2]</pre>', feedback: 'Esos son los que NO cumplen. filter deja los que cumplen.' },
                { text: '<pre>[1,2,3,4]</pre>', feedback: 'filter descarta los que no cumplen la condición.' },
              ],
            },
            {
              kind: 'quiz',
              instruction: 'El reflejo correcto',
              explanation: 'Pensá tu flujo de trabajo con IA.',
              question: 'La IA te da 40 líneas de código que parecen funcionar. ¿Qué hacés?',
              choices: [
                { text: 'Lo acepto y sigo, total anduvo', feedback: 'Ahí entran los bugs y vulnerabilidades de los que hablamos.' },
                {
                  text: 'Lo leo, lo pruebo con un par de casos y reviso los puntos riesgosos antes de aceptar',
                  correct: true,
                  feedback: 'Ese es el hábito profesional: confiar pero verificar.',
                },
                { text: 'Lo borro y lo escribo todo a mano', feedback: 'Desperdiciás la ayuda. El punto es supervisar, no rechazar.' },
              ],
            },
          ],
        },
      ],
    },

    // ── Módulo 6 ───────────────────────────────────────────────────
    {
      title: 'Vibe coding: fluir con la IA (con red)',
      description: 'Qué es de verdad, cuándo conviene, cuándo es peligroso y cómo hacerlo bien.',
      lessons: [
        {
          slug: 'que-es-vibe-coding',
          title: '¿Qué es el "vibe coding"?',
          summary: 'El término de Karpathy, explicado y puesto en su lugar.',
          minutes: 7,
          tags: ['vibe-coding', 'ia'],
          glossary: ['vibe-coding', 'llm', 'agente'],
          intro:
            '<p>En 2025 Andrej Karpathy popularizó el <strong>[[vibe-coding|vibe coding]]</strong>: "te entregás a las vibras y casi te olvidás de que el código existe". Describís lo que querés, la IA lo hace, vos probás. Suena mágico. Veamos la letra chica.</p>',
          steps: [
            {
              kind: 'quiz',
              instruction: 'La definición',
              explanation: 'Captá la idea central.',
              question: '¿Qué describe mejor el "vibe coding" en su forma pura?',
              choices: [
                {
                  text: 'Pedirle a la IA lo que querés y aceptar lo que genera sin leer el código en detalle',
                  correct: true,
                  feedback: 'Esa es la idea: fluir con la IA priorizando el resultado sobre entender cada línea.',
                },
                { text: 'Escribir todo el código a mano con buena música', feedback: 'No: justamente el vibe coding delega el escribir a la IA.' },
                { text: 'Programar sin computadora', feedback: 'No tiene que ver con eso.' },
              ],
            },
            {
              kind: 'quiz',
              instruction: 'La distinción de Simon Willison',
              explanation:
                'El creador de Django, Simon Willison, marcó un límite muy citado.',
              question:
                'Si la IA escribió todo el código PERO vos lo revisaste, probaste y entendiste, según Willison eso es…',
              choices: [
                {
                  text: 'Usar la IA como asistente de tipeo — NO es vibe coding',
                  correct: true,
                  feedback: 'Tal cual: el vibe coding es precisamente NO mirar. Si revisás y entendés, es otra cosa (más profesional).',
                },
                { text: 'Vibe coding puro', feedback: 'Al revés: revisar y entender es lo opuesto al vibe coding.' },
                { text: 'Hacer trampa', feedback: 'Para nada: usar IA y verificar es una práctica sana y recomendada.' },
              ],
            },
            {
              kind: 'info',
              instruction: 'La frase para recordar',
              explanation:
                '"Si un LLM escribió cada línea de tu código, pero lo revisaste, probaste y entendiste, <strong>eso no es vibe coding: es usar el LLM como asistente de tipeo</strong>." — Simon Willison. El vibe coding de verdad es soltar el control. Útil… a veces.',
            },
          ],
        },
        {
          slug: 'cuando-si-cuando-no',
          title: 'Cuándo sí y cuándo no',
          summary: 'Prototipo de fin de semana: dale. Código que maneja plata o datos: cuidado.',
          minutes: 7,
          tags: ['vibe-coding', 'criterio'],
          glossary: ['vibe-coding', 'verificar', 'bug'],
          intro:
            '<p>El vibe coding no es bueno ni malo: <strong>depende del contexto</strong>. La misma técnica que es genial para explorar una idea es peligrosa para un sistema serio.</p>',
          steps: [
            {
              kind: 'quiz',
              instruction: '¿Vibe coding o cautela?',
              explanation: 'Pensá en el costo de que algo salga mal.',
              question: 'Estás haciendo un jueguito tonto para mostrarle a un amigo esta tarde. ¿Conviene vibe coding?',
              choices: [
                {
                  text: 'Sí: es un prototipo descartable, el costo de un error es casi cero',
                  correct: true,
                  feedback: 'Exacto, este es el caso ideal: explorar rápido sin riesgo.',
                },
                { text: 'No, jamás hay que usar IA así', feedback: 'Para un prototipo descartable es perfecto. La cautela se reserva para lo serio.' },
              ],
            },
            {
              kind: 'quiz',
              instruction: 'El otro extremo',
              explanation: 'Acá el costo de un bug es alto.',
              question: 'Estás programando el cálculo de los sueldos de una empresa. ¿Vibe coding a ciegas?',
              choices: [
                {
                  text: 'No: hay plata y datos sensibles en juego. Hay que leer, probar y verificar todo.',
                  correct: true,
                  feedback: 'Correcto. Recordá: el código de IA trae 2,74× más vulnerabilidades. Acá no se suelta el control.',
                },
                { text: 'Sí, total la IA es muy buena', feedback: 'Demasiado riesgo. Un bug silencioso acá le paga mal a la gente.' },
              ],
            },
            {
              kind: 'info',
              instruction: 'La regla práctica',
              explanation:
                'Cuanto <strong>más cuesta un error</strong> (plata, datos personales, seguridad, algo que otros usan), <strong>menos</strong> vibe coding a ciegas y <strong>más</strong> revisión. Cuanto más descartable y exploratorio, más libre podés fluir.',
            },
          ],
        },
      ],
    },

    // ── Módulo 7 ───────────────────────────────────────────────────
    {
      title: 'Revisar y verificar',
      description: 'El cierre: cómo auditar código de IA y comprobar que de verdad hace lo correcto.',
      lessons: [
        {
          slug: 'nunca-a-ciegas',
          title: 'Nunca confíes a ciegas',
          summary: 'Un caso real: la IA entrega código que parece perfecto y tiene una trampa.',
          minutes: 9,
          tags: ['revision', 'verificar', 'ia'],
          glossary: ['revision', 'verificar', 'bug', 'alucinacion'],
          intro:
            '<p>Juntemos todo. Te toca el rol que importa: la IA ya escribió el código, vos sos quien <strong>revisa antes de aprobar</strong>.</p>',
          steps: [
            {
              kind: 'predict',
              instruction: 'Revisión 1: predecí la salida',
              explanation:
                'La IA dice que esta función calcula el precio con 10% de descuento. Antes de aprobar, predecí qué da para 100.',
              code: 'function conDescuento(precio) {\n  return precio - precio * 0.9;\n}\nconsole.log(conDescuento(100));',
              choices: [
                { text: '<pre>90</pre>', feedback: 'Eso sería lo correcto para un 10% off… pero hacé la cuenta exacta.' },
                {
                  text: '<pre>10</pre>',
                  correct: true,
                  feedback: '¡Bug! Resta el 90% (precio*0.9), dejando sólo el 10%. La IA confundió descontar con quedarse el descuento.',
                },
              ],
              reveal: 'Parecía un 10% de descuento y en realidad cobraba el 10% del precio. La revisión lo atrapó.',
            },
            {
              kind: 'fix',
              instruction: 'Revisión 2: arreglá el descuento',
              explanation:
                'Confirmaste el bug anterior. Ahora arreglalo: con 10% de descuento, 100 debería quedar en <strong>90</strong>.',
              buggyCode: 'function conDescuento(precio) {\n  return precio - precio * 0.9;\n}\nconsole.log(conDescuento(100));',
              expectedOutput: '90',
              hint: 'El descuento es el 10% (0.1). O bien precio - precio*0.1, o bien precio*0.9.',
              referenceSolution: 'function conDescuento(precio) {\n  return precio - precio * 0.1;\n}\nconsole.log(conDescuento(100));',
            },
          ],
        },
        {
          slug: 'verificar-con-pruebas',
          title: 'Verificar con una prueba',
          summary: 'La forma más confiable de saber si algo anda: una comprobación que da true o false.',
          minutes: 9,
          tags: ['verificar', 'pruebas', 'ia'],
          glossary: ['verificar', 'revision'],
          intro:
            '<p>La mejor defensa contra el código dudoso de la IA es una <strong>prueba</strong>: una línea que compara el resultado real con el esperado y te dice <code>true</code> o <code>false</code>. Si da true, andás bien.</p>',
          steps: [
            {
              kind: 'challenge',
              instruction: 'Escribí una prueba',
              explanation:
                'La IA te dio la función <code>sumar</code>. Abajo, escribí <strong>una línea</strong> que imprima <code>true</code> si <code>sumar(2, 3)</code> da 5. Usá <code>===</code> para comparar.',
              starter: 'function sumar(a, b) {\n  return a + b;\n}\n// Escribí una prueba que imprima true si sumar(2,3) es 5:\n',
              checks: [{ type: 'equals', value: 'true', label: 'La prueba imprime true' }],
              referenceSolution: 'function sumar(a, b) {\n  return a + b;\n}\nconsole.log(sumar(2, 3) === 5);',
              hint: 'console.log(sumar(2, 3) === 5);',
              reveal: 'Eso es verificar: convertir "creo que anda" en "lo comprobé y da true".',
            },
            {
              kind: 'challenge',
              instruction: 'Cazá el código mentiroso con una prueba',
              explanation:
                'Esta función <code>triple</code> debería multiplicar por 3, pero la IA se equivocó. NO la arregles: escribí una prueba que imprima <code>false</code> para <strong>demostrar</strong> que está mal (probá con triple(2), que debería dar 6).',
              starter: 'function triple(n) {\n  return n + 3;\n}\n// Probá que está mal: imprimí triple(2) === 6 (debería dar false)\n',
              checks: [{ type: 'equals', value: 'false', label: 'La prueba imprime false (revela el bug)' }],
              referenceSolution: 'function triple(n) {\n  return n + 3;\n}\nconsole.log(triple(2) === 6);',
              hint: 'console.log(triple(2) === 6); — como triple(2) da 5, 5 === 6 es false.',
              reveal: 'Una prueba no sólo confirma lo bueno: <strong>expone lo malo</strong>. Es tu mejor aliada contra la IA distraída.',
            },
            {
              kind: 'info',
              instruction: 'El checklist para revisar código de IA',
              explanation:
                'Cerramos con tu nueva caja de herramientas. Antes de aprobar código de una IA: <strong>1)</strong> ¿entiendo qué hace cada parte? <strong>2)</strong> ¿lo probé con un caso del que sé la respuesta? <strong>3)</strong> ¿pensé los casos límite (vacío, cero, negativo)? <strong>4)</strong> ¿hay datos sensibles o seguridad en juego? Si pasás estos cuatro, podés confiar. Si no, seguí revisando.',
            },
            {
              kind: 'quiz',
              instruction: 'Graduación',
              explanation: 'Última pregunta del curso.',
              question: 'Después de todo esto, ¿cuál es tu rol en la era de la IA?',
              choices: [
                {
                  text: 'Dirigir, entender y verificar: la IA escribe, pero yo decido y respondo por el resultado',
                  correct: true,
                  feedback: '¡Eso es! Ese criterio es lo que te vuelve valioso. Felicitaciones: completaste el curso.',
                },
                { text: 'Apretar Tab y aceptar todo', feedback: 'Aprendiste justamente por qué eso es peligroso.' },
                { text: 'Competir con la IA escribiendo más rápido', feedback: 'El juego no es ese: es dirigir y verificar.' },
              ],
              reveal: 'Terminaste <strong>Programar en la era de la IA</strong>. Ahora sabés trabajar CON la IA sin perder el control. 🎓',
            },
          ],
        },
      ],
    },
  ],
};
