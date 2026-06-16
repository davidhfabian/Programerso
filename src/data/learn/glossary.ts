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
};
