import type { Course } from './types';

// Curso de Python desde cero. Las `solution` son código Python válido. Al unir
// los pasos completados el programa corre en el navegador con Pyodide (Python
// compilado a WebAssembly) y muestra su salida real.

export const pythonCourse: Course = {
  slug: 'python',
  language: 'python',
  title: 'Python desde cero',
  tagline: 'Curso interactivo',
  description:
    'El lenguaje más usado para empezar. Claro, legible y poderoso. Programá línea por línea con autocompletado guiado y ejecución real en el navegador.',
  icon: 'tabler:brand-python',
  runtimeLabel: 'python3',
  modules: [
    {
      title: 'Primeros pasos',
      description: 'Tu primer programa, variables y los tipos básicos.',
      lessons: [
        {
          slug: 'hola-mundo',
          title: 'Hola, mundo',
          summary: 'Tu primera línea de Python: mostrar texto con print.',
          minutes: 5,
          intro:
            '<p>En Python mostrás texto con <code>print()</code>. Es de las cosas más simples del lenguaje y por eso es ideal para empezar. El texto va entre comillas porque es un <strong>string</strong>.</p>',
          glossary: ['consola', 'string', 'comentario'],
          steps: [
            {
              instruction: 'Mostrá un saludo',
              explanation: '[[consola|print()]] escribe en pantalla. El texto entre comillas es un [[string]].',
              solution: 'print("Hola, mundo")',
              hint: 'print("Hola, mundo")',
            },
            {
              instruction: 'Agregá un comentario',
              explanation: 'En Python un [[comentario]] empieza con <code>#</code>. La computadora lo ignora.',
              solution: '# Mi primer programa en Python',
              hint: 'Empezá la línea con # y escribí tu nota.',
            },
            {
              instruction: 'Mostrá un segundo mensaje',
              explanation: 'En Python las instrucciones no llevan punto y coma: una por línea.',
              solution: 'print("Estoy aprendiendo a programar")',
              hint: 'print("...") con otro texto.',
            },
          ],
        },
        {
          slug: 'variables',
          title: 'Variables',
          summary: 'Guardá datos con nombres. En Python no hace falta let ni const.',
          minutes: 7,
          intro:
            '<p>Una <strong>variable</strong> guarda un valor con un nombre. En Python se crea con solo asignar: <code>nombre = valor</code>. No necesitás palabras como <code>let</code> o <code>const</code>.</p>',
          glossary: ['variable', 'valor', 'declarar', 'string', 'numero'],
          steps: [
            {
              instruction: 'Creá una variable con un nombre',
              explanation:
                'En Python [[declarar|declarás]] una [[variable]] asignándole un [[valor]] con <code>=</code>. Acá el valor es un [[string]].',
              solution: 'nombre = "Ada"',
              hint: 'nombre = "Ada"',
            },
            {
              instruction: 'Creá una variable numérica',
              explanation: 'Un [[numero]] va sin comillas.',
              solution: 'edad = 36',
              hint: 'edad = 36',
            },
            {
              instruction: 'Cambiá el valor de edad',
              explanation: 'Reasignar es volver a usar <code>=</code> con el mismo nombre.',
              solution: 'edad = 37',
              hint: 'edad = 37',
            },
            {
              instruction: 'Mostrá las dos variables',
              explanation: '[[consola|print]] puede recibir varios valores separados por coma.',
              solution: 'print(nombre, edad)',
              hint: 'print(nombre, edad)',
            },
          ],
        },
        {
          slug: 'tipos-de-datos',
          title: 'Tipos de datos',
          summary: 'str, int, float y bool: los tipos básicos.',
          minutes: 8,
          intro:
            '<p>Cada valor tiene un <strong>tipo</strong>: <code>str</code> (texto), <code>int</code> (entero), <code>float</code> (decimal) y <code>bool</code> (verdadero/falso). La función <code>type()</code> te dice el tipo de un valor.</p>',
          glossary: ['string', 'numero', 'booleano', 'operador'],
          steps: [
            {
              instruction: 'Guardá un texto',
              explanation: 'Un [[string]] (tipo <code>str</code>) va entre comillas.',
              solution: 'ciudad = "Buenos Aires"',
              hint: 'ciudad = "Buenos Aires"',
            },
            {
              instruction: 'Guardá un decimal',
              explanation: 'Un [[numero]] decimal es de tipo <code>float</code>. Usá punto.',
              solution: 'temperatura = 21.5',
              hint: 'temperatura = 21.5',
            },
            {
              instruction: 'Guardá un booleano',
              explanation:
                'Un [[booleano]] en Python es <code>True</code> o <code>False</code>, con mayúscula inicial.',
              solution: 'esta_soleado = True',
              hint: 'El valor es True con T mayúscula.',
            },
            {
              instruction: 'Mostrá el tipo de cada valor',
              explanation: 'La función <code>type()</code> devuelve el tipo de un valor.',
              solution: 'print(type(ciudad), type(temperatura), type(esta_soleado))',
              hint: 'print(type(ciudad), type(temperatura), type(esta_soleado))',
            },
          ],
        },
      ],
    },
    {
      title: 'Operaciones y texto',
      description: 'Calcular con números y construir texto con f-strings.',
      lessons: [
        {
          slug: 'operadores',
          title: 'Operadores aritméticos',
          summary: 'Sumar, multiplicar y dividir en Python.',
          minutes: 7,
          intro:
            '<p>Los <strong>operadores</strong> aritméticos de Python: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> (división con decimales) y <code>**</code> (potencia).</p>',
          glossary: ['operador', 'variable', 'numero'],
          steps: [
            {
              instruction: 'Definí el precio de un producto',
              explanation: 'Una [[variable]] con un [[numero]].',
              solution: 'precio = 1000',
              hint: 'precio = 1000',
            },
            {
              instruction: 'Calculá el IVA (21%)',
              explanation: 'El [[operador]] <code>*</code> multiplica. <code>0.21</code> es el 21%.',
              solution: 'iva = precio * 0.21',
              hint: 'precio * 0.21',
            },
            {
              instruction: 'Calculá el total',
              explanation: 'El operador <code>+</code> suma.',
              solution: 'total = precio + iva',
              hint: 'precio + iva',
            },
            {
              instruction: 'Mostrá el total',
              explanation: 'Imprimimos el resultado.',
              solution: 'print(total)',
              hint: 'print(total)',
            },
          ],
        },
        {
          slug: 'strings',
          title: 'Texto y f-strings',
          summary: 'Insertar variables en texto y usar métodos de string.',
          minutes: 9,
          intro:
            '<p>Para insertar variables dentro de un texto, Python usa <strong>f-strings</strong>: un texto que empieza con <code>f</code> y permite escribir <code>{variable}</code> entre llaves. Los strings tienen <strong>métodos</strong> como <code>.upper()</code>.</p>',
          glossary: ['string', 'fstring', 'interpolacion', 'metodo', 'variable'],
          steps: [
            {
              instruction: 'Guardá un nombre',
              explanation: 'Un [[string]] común.',
              solution: 'nombre = "Grace"',
              hint: 'nombre = "Grace"',
            },
            {
              instruction: 'Armá un saludo con una f-string',
              explanation:
                'Una [[fstring|f-string]] empieza con <code>f</code> y hace [[interpolacion|interpolación]]: <code>{nombre}</code> se reemplaza por su valor.',
              solution: 'saludo = f"Hola, {nombre}!"',
              hint: 'Empezá con f" y poné {nombre} dentro.',
            },
            {
              instruction: 'Convertí el saludo a mayúsculas',
              explanation: 'El [[metodo|método]] <code>.upper()</code> devuelve el texto en mayúsculas.',
              solution: 'en_mayusculas = saludo.upper()',
              hint: 'saludo.upper()',
            },
            {
              instruction: 'Mostrá el resultado',
              explanation: 'Imprimimos el texto transformado.',
              solution: 'print(en_mayusculas)',
              hint: 'print(en_mayusculas)',
            },
          ],
        },
      ],
    },
    {
      title: 'Decisiones y repetición',
      description: 'Tomar decisiones y repetir tareas. Atención a la indentación.',
      lessons: [
        {
          slug: 'condicionales',
          title: 'Condicionales',
          summary: 'if / else en Python: la indentación define el bloque.',
          minutes: 10,
          intro:
            '<p>Un <strong>condicional</strong> <code>if</code> ejecuta código si una condición es verdadera. En Python <strong>la indentación (sangría) define el bloque</strong>: las líneas internas van con 4 espacios. La línea del <code>if</code> termina en dos puntos <code>:</code>.</p>',
          glossary: ['condicional', 'booleano', 'operador', 'variable'],
          steps: [
            {
              instruction: 'Definí una edad',
              explanation: 'Una [[variable]] para comparar.',
              solution: 'edad = 20',
              hint: 'edad = 20',
            },
            {
              instruction: 'Escribí el if con la condición',
              explanation:
                'El [[condicional]] empieza con <code>if</code>, la condición, y termina en <code>:</code>. <code>edad &gt;= 18</code> usa un [[operador]] de comparación.',
              solution: 'if edad >= 18:',
              hint: 'if edad >= 18:',
            },
            {
              instruction: 'Mostrá el mensaje para mayores',
              explanation:
                'El cuerpo del <code>if</code> va con 4 espacios de [[booleano|sangría]]. Esa indentación es obligatoria en Python.',
              solution: '    print("Podés votar")',
              hint: 'Cuatro espacios y luego print(...).',
            },
            {
              instruction: 'Agregá el caso contrario',
              explanation: '<code>else:</code> (sin sangría) define qué pasa si la condición es falsa.',
              solution: 'else:',
              hint: 'else:',
            },
            {
              instruction: 'Mostrá el mensaje para menores',
              explanation: 'De nuevo 4 espacios para el cuerpo del <code>else</code>.',
              solution: '    print("Todavía no podés votar")',
              hint: '    print("Todavía no podés votar")',
            },
          ],
        },
        {
          slug: 'bucles',
          title: 'Bucles',
          summary: 'Repetir con for y range.',
          minutes: 8,
          intro:
            '<p>Un <strong>bucle</strong> <code>for</code> recorre una secuencia. <code>range(1, 6)</code> genera los números del 1 al 5 (el final no se incluye). El cuerpo va indentado con 4 espacios.</p>',
          glossary: ['bucle', 'variable', 'fstring', 'interpolacion'],
          steps: [
            {
              instruction: 'Escribí un for del 1 al 5',
              explanation:
                'El [[bucle]] <code>for</code> recorre <code>range(1, 6)</code>: los números 1, 2, 3, 4 y 5. La línea termina en <code>:</code>.',
              solution: 'for i in range(1, 6):',
              hint: 'for i in range(1, 6):',
            },
            {
              instruction: 'Mostrá el número en cada vuelta',
              explanation:
                'En cada repetición <code>i</code> vale un número distinto. Lo mostramos con una [[fstring|f-string]]. Recordá los 4 espacios.',
              solution: '    print(f"Vuelta {i}")',
              hint: '    print(f"Vuelta {i}")',
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
          summary: 'Definir funciones con def, parámetros y return.',
          minutes: 10,
          intro:
            '<p>Una <strong>función</strong> se define con <code>def</code>. Recibe <strong>parámetros</strong> y puede <strong>retornar</strong> un resultado con <code>return</code>. El cuerpo va indentado.</p>',
          glossary: ['funcion', 'parametro', 'argumento', 'retornar', 'fstring', 'interpolacion'],
          steps: [
            {
              instruction: 'Definí una función que reciba un nombre',
              explanation:
                'Una [[funcion|función]] se crea con <code>def</code>. Entre paréntesis va el [[parametro|parámetro]] y la línea termina en <code>:</code>.',
              solution: 'def saludar(nombre):',
              hint: 'def saludar(nombre):',
            },
            {
              instruction: 'Retorná un saludo personalizado',
              explanation:
                '[[retornar|return]] devuelve un valor. Usamos una [[fstring|f-string]] con [[interpolacion|interpolación]]. Va con 4 espacios.',
              solution: '    return f"Hola, {nombre}!"',
              hint: '    return f"Hola, {nombre}!"',
            },
            {
              instruction: 'Llamá a la función con un argumento',
              explanation: 'Para usarla pasamos un [[argumento]] y mostramos el resultado.',
              solution: 'print(saludar("Linus"))',
              hint: 'print(saludar("Linus"))',
            },
          ],
        },
        {
          slug: 'listas',
          title: 'Listas',
          summary: 'Colecciones ordenadas: crear, agregar y recorrer.',
          minutes: 10,
          intro:
            '<p>Una <strong>lista</strong> guarda varios valores ordenados. Se escribe con corchetes <code>[]</code>. Cada elemento tiene un <strong>índice</strong> que empieza en 0. <code>.append()</code> agrega y <code>len()</code> cuenta.</p>',
          glossary: ['lista', 'indice', 'metodo', 'bucle'],
          steps: [
            {
              instruction: 'Creá una lista de lenguajes',
              explanation: 'Una [[lista]] usa corchetes y separa elementos con coma.',
              solution: 'lenguajes = ["Python", "JavaScript"]',
              hint: 'lenguajes = ["Python", "JavaScript"]',
            },
            {
              instruction: 'Agregá un elemento al final',
              explanation: 'El [[metodo|método]] <code>.append()</code> agrega un valor al final.',
              solution: 'lenguajes.append("Rust")',
              hint: 'lenguajes.append("Rust")',
            },
            {
              instruction: 'Mostrá el primer elemento',
              explanation: 'Accedemos por [[indice|índice]]. El primero es el <code>0</code>.',
              solution: 'print(lenguajes[0])',
              hint: 'lenguajes[0]',
            },
            {
              instruction: 'Mostrá cuántos elementos hay',
              explanation: 'La función <code>len()</code> devuelve la cantidad de elementos.',
              solution: 'print(len(lenguajes))',
              hint: 'len(lenguajes)',
            },
          ],
        },
        {
          slug: 'diccionarios',
          title: 'Diccionarios',
          summary: 'Pares clave-valor para datos con nombre.',
          minutes: 9,
          intro:
            '<p>Un <strong>diccionario</strong> guarda pares <code>clave: valor</code> entre llaves <code>{ }</code>. En lugar de buscar por posición, buscás por clave: <code>persona["nombre"]</code>.</p>',
          glossary: ['diccionario', 'valor', 'fstring', 'interpolacion'],
          steps: [
            {
              instruction: 'Creá un diccionario que describa una persona',
              explanation: 'Un [[diccionario]] se escribe con llaves y pares <code>"clave": valor</code>.',
              solution: 'persona = {"nombre": "Margaret", "profesion": "Ingeniera"}',
              hint: 'persona = {"nombre": "Margaret", "profesion": "Ingeniera"}',
            },
            {
              instruction: 'Mostrá una propiedad del diccionario',
              explanation:
                'Accedemos a un [[valor]] por su clave entre corchetes: <code>persona["nombre"]</code>. Lo mostramos con una [[fstring|f-string]].',
              solution: 'print(f\'{persona["nombre"]} es {persona["profesion"]}\')',
              hint: 'Usá persona["nombre"] y persona["profesion"] dentro de una f-string.',
            },
          ],
        },
      ],
    },
  ],
};
