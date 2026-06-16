import type { Course } from './types';

// Curso de JavaScript desde cero. Cada lección es un programa que el alumno
// construye paso a paso. Las `solution` son código JS válido; al unir los pasos
// completados el programa corre nativo en el navegador y muestra su salida.

export const javascriptCourse: Course = {
  slug: 'javascript',
  language: 'javascript',
  title: 'JavaScript desde cero',
  tagline: 'Curso interactivo',
  description:
    'El lenguaje de la web. Aprendé programando línea por línea, con autocompletado guiado y ejecución real en tu navegador — sin instalar nada.',
  icon: 'tabler:brand-javascript',
  runtimeLabel: 'node',
  modules: [
    {
      title: 'Primeros pasos',
      description: 'Tu primer programa, cómo guardar datos y los tipos básicos.',
      lessons: [
        {
          slug: 'hola-mundo',
          title: 'Hola, mundo',
          summary: 'Tu primera línea de código: mostrar un mensaje en pantalla.',
          minutes: 5,
          intro:
            '<p>Todo programa empieza por comunicarse. En JavaScript, la forma de mostrar texto es <code>console.log()</code>: una instrucción que escribe en la <strong>consola</strong>. Vas a escribir tu primera línea con ayuda del autocompletado.</p>',
          glossary: ['consola', 'string', 'comentario'],
          steps: [
            {
              instruction: 'Mostrá un saludo en la consola',
              explanation:
                'Usamos [[consola|console.log()]] para imprimir en pantalla. El texto va entre comillas porque es un [[string]] (una cadena de texto).',
              solution: 'console.log("Hola, mundo");',
              hint: 'Escribí console.log, abrí paréntesis y poné "Hola, mundo" entre comillas.',
            },
            {
              instruction: 'Agregá un comentario explicando el código',
              explanation:
                'Un [[comentario]] empieza con <code>//</code>. La computadora lo ignora; es solo para vos y otras personas que lean el código.',
              solution: '// Mi primer programa en JavaScript',
              hint: 'Las dos barras // marcan el inicio de un comentario de una línea.',
            },
            {
              instruction: 'Mostrá un segundo mensaje',
              explanation: 'Cada instrucción termina con punto y coma <code>;</code> y va en su propia línea.',
              solution: 'console.log("Estoy aprendiendo a programar");',
              hint: 'Repetí console.log con otro texto entre comillas.',
            },
          ],
        },
        {
          slug: 'variables',
          title: 'Variables',
          summary: 'Guardá datos en memoria con nombres para reutilizarlos.',
          minutes: 8,
          intro:
            '<p>Una <strong>variable</strong> es una caja con nombre donde guardás un valor. En JavaScript moderno se crean con <code>const</code> (valor fijo) o <code>let</code> (valor que puede cambiar).</p>',
          glossary: ['variable', 'valor', 'declarar', 'string', 'consola'],
          steps: [
            {
              instruction: 'Creá una variable con tu nombre',
              explanation:
                '[[declarar|const]] crea una [[variable]] que no va a cambiar. A la derecha del <code>=</code> va el [[valor]], en este caso un [[string]].',
              solution: 'const nombre = "Ada";',
              hint: 'const, el nombre de la variable, un = y el valor "Ada" entre comillas.',
            },
            {
              instruction: 'Creá una variable que pueda cambiar',
              explanation:
                'Usamos [[declarar|let]] cuando el valor va a cambiar más adelante. Acá guardamos una edad (un número, sin comillas).',
              solution: 'let edad = 36;',
              hint: 'let nombre = valor. Los números no llevan comillas.',
            },
            {
              instruction: 'Cambiá el valor de la variable edad',
              explanation:
                'Como <code>edad</code> se creó con <code>let</code>, podemos reasignarla sin volver a escribir <code>let</code>.',
              solution: 'edad = 37;',
              hint: 'Solo el nombre, el = y el nuevo valor. Sin let.',
            },
            {
              instruction: 'Mostrá las dos variables juntas',
              explanation:
                '[[consola|console.log]] puede recibir varios valores separados por coma y los muestra en orden.',
              solution: 'console.log(nombre, edad);',
              hint: 'console.log(nombre, edad);',
            },
          ],
        },
        {
          slug: 'tipos-de-datos',
          title: 'Tipos de datos',
          summary: 'Texto, números, booleanos: los ladrillos básicos.',
          minutes: 8,
          intro:
            '<p>Cada valor tiene un <strong>tipo</strong>. Los más usados al empezar son: <code>string</code> (texto), <code>number</code> (números) y <code>boolean</code> (verdadero/falso). El operador <code>typeof</code> te dice de qué tipo es un valor.</p>',
          glossary: ['string', 'numero', 'booleano', 'operador'],
          steps: [
            {
              instruction: 'Guardá un texto',
              explanation: 'Un [[string]] siempre va entre comillas (simples o dobles).',
              solution: 'const ciudad = "Buenos Aires";',
              hint: 'const ciudad = "Buenos Aires";',
            },
            {
              instruction: 'Guardá un número decimal',
              explanation: 'Un [[numero]] se escribe sin comillas. Usá punto para los decimales.',
              solution: 'const temperatura = 21.5;',
              hint: 'Sin comillas, y el decimal con punto: 21.5',
            },
            {
              instruction: 'Guardá un booleano',
              explanation: 'Un [[booleano]] solo puede ser <code>true</code> o <code>false</code>. Sin comillas.',
              solution: 'const estaSoleado = true;',
              hint: 'El valor es true (sin comillas).',
            },
            {
              instruction: 'Mostrá el tipo de cada valor',
              explanation: 'El [[operador]] <code>typeof</code> devuelve el nombre del tipo de un valor.',
              solution: 'console.log(typeof ciudad, typeof temperatura, typeof estaSoleado);',
              hint: 'console.log(typeof ciudad, typeof temperatura, typeof estaSoleado);',
            },
          ],
        },
      ],
    },
    {
      title: 'Operaciones y texto',
      description: 'Calcular con números y construir texto dinámico.',
      lessons: [
        {
          slug: 'operadores',
          title: 'Operadores aritméticos',
          summary: 'Sumar, restar, multiplicar y dividir.',
          minutes: 7,
          intro:
            '<p>Los <strong>operadores</strong> aritméticos te permiten calcular: <code>+</code> suma, <code>-</code> resta, <code>*</code> multiplica, <code>/</code> divide y <code>%</code> da el resto de una división.</p>',
          glossary: ['operador', 'variable', 'numero'],
          steps: [
            {
              instruction: 'Definí el precio de un producto',
              explanation: 'Guardamos un [[numero]] en una [[variable]] para usarlo en los cálculos.',
              solution: 'const precio = 1000;',
              hint: 'const precio = 1000;',
            },
            {
              instruction: 'Calculá el IVA (21%)',
              explanation:
                'El [[operador]] <code>*</code> multiplica. Multiplicar por <code>0.21</code> da el 21% del precio.',
              solution: 'const iva = precio * 0.21;',
              hint: 'precio * 0.21',
            },
            {
              instruction: 'Sumá el precio y el IVA para el total',
              explanation: 'El operador <code>+</code> suma dos números.',
              solution: 'const total = precio + iva;',
              hint: 'precio + iva',
            },
            {
              instruction: 'Mostrá el total',
              explanation: 'Imprimimos el resultado en la consola.',
              solution: 'console.log(total);',
              hint: 'console.log(total);',
            },
          ],
        },
        {
          slug: 'strings',
          title: 'Texto y plantillas',
          summary: 'Unir texto y variables con template strings y métodos.',
          minutes: 9,
          intro:
            '<p>Para construir texto con variables adentro usamos <strong>template strings</strong>: comillas invertidas <code>`</code> con <code>${ }</code> para insertar valores. Los strings también tienen <strong>métodos</strong> como <code>.toUpperCase()</code>.</p>',
          glossary: ['string', 'template', 'interpolacion', 'metodo', 'variable'],
          steps: [
            {
              instruction: 'Guardá un nombre',
              explanation: 'Un [[string]] común con comillas dobles.',
              solution: 'const nombre = "Grace";',
              hint: 'const nombre = "Grace";',
            },
            {
              instruction: 'Armá un saludo con interpolación',
              explanation:
                'Un [[template|template string]] usa comillas invertidas <code>`</code>. Dentro, <code>${nombre}</code> hace [[interpolacion|interpolación]]: inserta el valor de la variable.',
              solution: 'const saludo = `Hola, ${nombre}!`;',
              hint: 'Usá comillas invertidas ` y ${nombre} dentro del texto.',
            },
            {
              instruction: 'Convertí el saludo a mayúsculas',
              explanation:
                'Un [[metodo|método]] es una función que pertenece al valor. <code>.toUpperCase()</code> devuelve el texto en mayúsculas.',
              solution: 'const enMayusculas = saludo.toUpperCase();',
              hint: 'saludo.toUpperCase()',
            },
            {
              instruction: 'Mostrá el resultado',
              explanation: 'Imprimimos el texto transformado.',
              solution: 'console.log(enMayusculas);',
              hint: 'console.log(enMayusculas);',
            },
          ],
        },
      ],
    },
    {
      title: 'Decisiones y repetición',
      description: 'Hacer que el programa tome decisiones y repita tareas.',
      lessons: [
        {
          slug: 'condicionales',
          title: 'Condicionales',
          summary: 'Ejecutar código solo si se cumple una condición.',
          minutes: 10,
          intro:
            '<p>Un <strong>condicional</strong> <code>if / else</code> ejecuta un bloque solo si una condición es verdadera. Las condiciones se construyen con operadores de comparación como <code>&gt;=</code>, <code>===</code> (igualdad estricta).</p>',
          glossary: ['condicional', 'booleano', 'operador', 'variable'],
          steps: [
            {
              instruction: 'Definí una edad para evaluar',
              explanation: 'Empezamos con una [[variable]] que vamos a comparar.',
              solution: 'const edad = 20;',
              hint: 'const edad = 20;',
            },
            {
              instruction: 'Abrí un condicional que verifique si es mayor de edad',
              explanation:
                'El [[condicional]] empieza con <code>if</code> y una condición entre paréntesis. <code>edad &gt;= 18</code> es un [[operador]] de comparación que da un [[booleano]].',
              solution: 'if (edad >= 18) {',
              hint: 'if (edad >= 18) {',
            },
            {
              instruction: 'Mostrá el mensaje para mayores',
              explanation: 'Este código solo se ejecuta si la condición fue verdadera. Va indentado dentro del bloque.',
              solution: '  console.log("Podés votar");',
              hint: 'Dos espacios de sangría y console.log(...).',
            },
            {
              instruction: 'Agregá el caso contrario',
              explanation: '<code>else</code> define qué pasa cuando la condición es falsa.',
              solution: '} else {',
              hint: '} else {',
            },
            {
              instruction: 'Mostrá el mensaje para menores',
              explanation: 'Este bloque corre solo si <code>edad &gt;= 18</code> fue falso.',
              solution: '  console.log("Todavía no podés votar");',
              hint: '  console.log("Todavía no podés votar");',
            },
            {
              instruction: 'Cerrá el condicional',
              explanation: 'La llave <code>}</code> cierra el bloque <code>else</code> y termina el condicional.',
              solution: '}',
              hint: 'Solo la llave de cierre }',
            },
          ],
        },
        {
          slug: 'bucles',
          title: 'Bucles',
          summary: 'Repetir código sin reescribirlo, con for.',
          minutes: 9,
          intro:
            '<p>Un <strong>bucle</strong> <code>for</code> repite un bloque un número de veces. Tiene tres partes: inicio (<code>let i = 1</code>), condición (<code>i &lt;= 5</code>) y paso (<code>i++</code>, que suma 1 a <code>i</code>).</p>',
          glossary: ['bucle', 'variable', 'operador', 'interpolacion', 'template'],
          steps: [
            {
              instruction: 'Abrí un bucle que cuente del 1 al 5',
              explanation:
                'El [[bucle]] <code>for</code> arranca con <code>i = 1</code>, sigue mientras <code>i &lt;= 5</code> y en cada vuelta hace <code>i++</code> (suma 1).',
              solution: 'for (let i = 1; i <= 5; i++) {',
              hint: 'for (let i = 1; i <= 5; i++) {',
            },
            {
              instruction: 'Mostrá el número en cada vuelta',
              explanation:
                'Dentro del bucle, <code>i</code> toma un valor distinto en cada repetición. Lo mostramos con un [[template|template string]].',
              solution: '  console.log(`Vuelta ${i}`);',
              hint: '  console.log(`Vuelta ${i}`);',
            },
            {
              instruction: 'Cerrá el bucle',
              explanation: 'La llave <code>}</code> cierra el cuerpo del bucle.',
              solution: '}',
              hint: 'Solo }',
            },
          ],
        },
      ],
    },
    {
      title: 'Estructuras y funciones',
      description: 'Empaquetar lógica y organizar colecciones de datos.',
      lessons: [
        {
          slug: 'funciones',
          title: 'Funciones',
          summary: 'Empaquetar lógica reutilizable con parámetros y return.',
          minutes: 10,
          intro:
            '<p>Una <strong>función</strong> es un bloque de código con nombre que podés reutilizar. Recibe <strong>parámetros</strong> (datos de entrada) y puede <strong>retornar</strong> un resultado.</p>',
          glossary: ['funcion', 'parametro', 'argumento', 'retornar', 'template', 'interpolacion'],
          steps: [
            {
              instruction: 'Declará una función que reciba un nombre',
              explanation:
                'Definimos una [[funcion|función]] con <code>function</code>. Entre paréntesis va el [[parametro|parámetro]] <code>nombre</code>.',
              solution: 'function saludar(nombre) {',
              hint: 'function saludar(nombre) {',
            },
            {
              instruction: 'Retorná un saludo personalizado',
              explanation:
                '[[retornar|return]] devuelve un valor a quien llamó la función. Usamos [[interpolacion|interpolación]] para incluir el nombre.',
              solution: '  return `Hola, ${nombre}!`;',
              hint: '  return `Hola, ${nombre}!`;',
            },
            {
              instruction: 'Cerrá la función',
              explanation: 'La llave <code>}</code> cierra el cuerpo de la función.',
              solution: '}',
              hint: 'Solo }',
            },
            {
              instruction: 'Llamá a la función con un argumento',
              explanation:
                'Para usarla, escribimos su nombre y le pasamos un [[argumento]]. El resultado se muestra en consola.',
              solution: 'console.log(saludar("Linus"));',
              hint: 'console.log(saludar("Linus"));',
            },
          ],
        },
        {
          slug: 'arrays',
          title: 'Arrays',
          summary: 'Listas ordenadas de valores y cómo recorrerlas.',
          minutes: 10,
          intro:
            '<p>Un <strong>array</strong> es una lista ordenada de valores en una sola variable. Cada elemento tiene un <strong>índice</strong> que empieza en 0. <code>.push()</code> agrega elementos y <code>.length</code> dice cuántos hay.</p>',
          glossary: ['array', 'indice', 'metodo', 'bucle'],
          steps: [
            {
              instruction: 'Creá un array de lenguajes',
              explanation: 'Un [[array]] se escribe con corchetes <code>[]</code> y sus elementos separados por coma.',
              solution: 'const lenguajes = ["JavaScript", "Python"];',
              hint: 'const lenguajes = ["JavaScript", "Python"];',
            },
            {
              instruction: 'Agregá un elemento al final',
              explanation: 'El [[metodo|método]] <code>.push()</code> agrega un valor al final del array.',
              solution: 'lenguajes.push("Rust");',
              hint: 'lenguajes.push("Rust");',
            },
            {
              instruction: 'Mostrá el primer elemento',
              explanation: 'Accedemos por [[indice|índice]]. El primero es el <code>0</code>, no el 1.',
              solution: 'console.log(lenguajes[0]);',
              hint: 'lenguajes[0]',
            },
            {
              instruction: 'Mostrá cuántos elementos hay',
              explanation: '<code>.length</code> devuelve la cantidad de elementos del array.',
              solution: 'console.log(lenguajes.length);',
              hint: 'lenguajes.length',
            },
          ],
        },
        {
          slug: 'objetos',
          title: 'Objetos',
          summary: 'Agrupar datos relacionados con pares clave-valor.',
          minutes: 9,
          intro:
            '<p>Un <strong>objeto</strong> agrupa datos relacionados como pares <code>clave: valor</code>. Se escribe con llaves <code>{ }</code> y accedés a cada dato con un punto: <code>objeto.clave</code>.</p>',
          glossary: ['objeto', 'valor', 'interpolacion', 'template'],
          steps: [
            {
              instruction: 'Creá un objeto que describa una persona',
              explanation: 'Un [[objeto]] se abre con <code>{</code>. Adentro van pares <code>clave: valor</code>.',
              solution: 'const persona = {',
              hint: 'const persona = {',
            },
            {
              instruction: 'Agregá la propiedad nombre',
              explanation: 'Cada propiedad es <code>clave: valor</code>. Si hay más, se separan con coma.',
              solution: '  nombre: "Margaret",',
              hint: '  nombre: "Margaret",',
            },
            {
              instruction: 'Agregá la propiedad profesion',
              explanation: 'La última propiedad no necesita coma final (aunque se permite).',
              solution: '  profesion: "Ingeniera",',
              hint: '  profesion: "Ingeniera",',
            },
            {
              instruction: 'Cerrá el objeto',
              explanation: 'La llave <code>}</code> cierra la definición del objeto.',
              solution: '};',
              hint: '};',
            },
            {
              instruction: 'Mostrá una propiedad del objeto',
              explanation: 'Accedemos a un [[valor]] con punto: <code>persona.nombre</code>.',
              solution: 'console.log(`${persona.nombre} es ${persona.profesion}`);',
              hint: 'persona.nombre y persona.profesion dentro de un template string.',
            },
          ],
        },
      ],
    },
  ],
};
