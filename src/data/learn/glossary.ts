import type { GlossaryEntry } from './types';

// Glosario compartido. Las explicaciones de las lecciones referencian estos
// términos con `[[termino]]` y el editor muestra la definición en un tooltip.
// La clave es en minúsculas y sin acentos para hacer el match robusto.

export const glossary: Record<string, GlossaryEntry> = {
  variable: {
    term: 'Variable',
    definition:
      'Un nombre que apunta a un valor guardado en memoria. Te permite reutilizar y cambiar datos sin repetirlos.',
  },
  valor: {
    term: 'Valor',
    definition: 'El dato concreto que guarda una variable: un número, un texto, true/false, una lista, etc.',
  },
  string: {
    term: 'String (cadena)',
    definition: 'Texto. Se escribe entre comillas, por ejemplo "Hola" o \'Hola\'. Sirve para palabras y frases.',
  },
  numero: {
    term: 'Número',
    definition: 'Un valor numérico con el que podés hacer cálculos: enteros (10) o decimales (3.14).',
  },
  booleano: {
    term: 'Booleano',
    definition: 'Un valor que solo puede ser verdadero o falso (true / false). Es la base de las decisiones.',
  },
  funcion: {
    term: 'Función',
    definition:
      'Un bloque de código con nombre que ejecuta una tarea. La definís una vez y la podés llamar (usar) muchas veces.',
  },
  parametro: {
    term: 'Parámetro',
    definition:
      'Una variable de entrada que recibe una función. Al llamarla le pasás un valor para ese parámetro (un argumento).',
  },
  argumento: {
    term: 'Argumento',
    definition: 'El valor concreto que le pasás a una función cuando la llamás, y que ocupa el lugar del parámetro.',
  },
  retornar: {
    term: 'Retornar (return)',
    definition: 'Cuando una función devuelve un resultado al lugar desde donde se la llamó usando la palabra return.',
  },
  condicional: {
    term: 'Condicional',
    definition: 'Una estructura (if / else) que ejecuta código solo si se cumple una condición verdadera.',
  },
  bucle: {
    term: 'Bucle',
    definition: 'Una estructura que repite un bloque de código varias veces (for, while) sin reescribirlo.',
  },
  array: {
    term: 'Array (arreglo)',
    definition: 'Una lista ordenada de valores guardados en una sola variable. Se accede por su posición (índice).',
  },
  lista: {
    term: 'Lista',
    definition: 'En Python, una colección ordenada y modificable de valores. Equivale al array de otros lenguajes.',
  },
  indice: {
    term: 'Índice',
    definition: 'La posición de un elemento en una lista o array. Empieza en 0: el primer elemento es el índice 0.',
  },
  objeto: {
    term: 'Objeto',
    definition: 'Una colección de pares clave: valor. Agrupa datos relacionados bajo nombres descriptivos.',
  },
  diccionario: {
    term: 'Diccionario',
    definition: 'En Python, una colección de pares clave: valor. Buscás valores por su clave en lugar de por posición.',
  },
  operador: {
    term: 'Operador',
    definition: 'Un símbolo que combina valores: aritméticos (+, -, *, /) o de comparación (>, <, ===, ==).',
  },
  comentario: {
    term: 'Comentario',
    definition:
      'Una nota en el código que la computadora ignora. Sirve para explicar qué hace el código a las personas.',
  },
  consola: {
    term: 'Consola',
    definition: 'La salida de texto del programa. console.log (JS) y print (Python) escriben mensajes ahí.',
  },
  declarar: {
    term: 'Declarar',
    definition:
      'Crear una variable por primera vez, reservando su nombre. En JS con let/const; en Python al asignarle un valor.',
  },
  interpolacion: {
    term: 'Interpolación',
    definition:
      'Insertar el valor de una variable dentro de un texto. En JS con `${variable}`; en Python con f"{variable}".',
  },
  fstring: {
    term: 'f-string',
    definition: 'Un texto en Python que empieza con f y permite insertar variables entre llaves: f"Hola {nombre}".',
  },
  template: {
    term: 'Template string',
    definition: 'Un texto en JS escrito con comillas invertidas (`) que permite interpolar variables con ${ }.',
  },
  metodo: {
    term: 'Método',
    definition: 'Una función que pertenece a un valor y se llama con un punto, por ejemplo texto.toUpperCase().',
  },

  // ── Era de la IA ────────────────────────────────────────────────
  ia: {
    term: 'IA (inteligencia artificial)',
    definition:
      'Programas que aprenden patrones de muchísimos datos para generar texto, código o respuestas. No "entienden": predicen lo más probable.',
  },
  llm: {
    term: 'LLM (modelo de lenguaje)',
    definition:
      'Large Language Model: una IA entrenada con enormes cantidades de texto y código que predice la siguiente palabra. Es lo que hay detrás de ChatGPT, Claude o Copilot.',
  },
  agente: {
    term: 'Agente de IA',
    definition:
      'Una IA que no sólo responde: planifica, usa herramientas, ejecuta pasos y modifica archivos por su cuenta para cumplir un objetivo (ej. Claude Code, Cursor).',
  },
  prompt: {
    term: 'Prompt',
    definition:
      'La instrucción que le das a una IA. Cuanto más claro y con más contexto, mejor es el resultado. Especificar bien es la nueva habilidad clave.',
  },
  'vibe-coding': {
    term: 'Vibe coding',
    definition:
      'Término de Andrej Karpathy (2025): programar describiendo lo que querés y aceptando lo que la IA genera, sin mirar el código en detalle. Sirve para prototipos; es riesgoso para producción.',
  },
  alucinacion: {
    term: 'Alucinación',
    definition:
      'Cuando una IA inventa algo que suena correcto pero es falso: una función que no existe, una librería inventada o un dato erróneo. Por eso hay que verificar siempre.',
  },
  especificar: {
    term: 'Especificar',
    definition:
      'Describir con precisión qué tiene que hacer un programa: entradas, salidas, casos límite. Una buena especificación es la mitad de la solución.',
  },
  descomponer: {
    term: 'Descomponer',
    definition:
      'Partir un problema grande en pasos pequeños y manejables. Es la habilidad central de programar, con o sin IA.',
  },
  depurar: {
    term: 'Depurar (debug)',
    definition:
      'Encontrar y corregir errores en un programa. Implica leer el código, entender qué hace y compararlo con lo que debería hacer.',
  },
  bug: {
    term: 'Bug',
    definition:
      'Un error en el código que hace que el programa se comporte mal. Puede romper el programa o, peor, dar un resultado incorrecto sin avisar.',
  },
  verificar: {
    term: 'Verificar',
    definition:
      'Confirmar que el código hace lo correcto: ejecutándolo, leyéndolo y probándolo con casos. Imprescindible cuando el código lo escribió una IA.',
  },
  refactor: {
    term: 'Refactorizar',
    definition: 'Reescribir código para que sea más claro o simple sin cambiar lo que hace.',
  },
  revision: {
    term: 'Revisión de código',
    definition:
      'Leer código con ojo crítico buscando errores, riesgos de seguridad y cosas poco claras antes de confiar en él. Lo que hacés con tu propio código y con el de la IA.',
  },
  abstraccion: {
    term: 'Abstracción',
    definition:
      'Esconder los detalles complejos detrás de un nombre simple (una función, un módulo) para poder pensar en grande sin perderte en lo chico.',
  },
  contexto: {
    term: 'Contexto',
    definition:
      'La información que le das a la IA (el código existente, el objetivo, las reglas). A más contexto relevante, mejores respuestas.',
  },
  sintaxis: {
    term: 'Sintaxis',
    definition: 'Las reglas de escritura de un lenguaje: dónde van los paréntesis, las comas, la sangría. Si te equivocás, el programa no corre.',
  },
};
