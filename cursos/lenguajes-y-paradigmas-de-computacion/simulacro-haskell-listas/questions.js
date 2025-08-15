// Base de datos de preguntas sobre listas en Haskell
const questionsDB = [
    {
        id: 1,
        question: "¿Cuál es la sintaxis correcta para crear una lista vacía en Haskell?",
        options: ["[]", "{}", "()", "nil"],
        correct: 0,
        explanation: "En Haskell, una lista vacía se representa con corchetes vacíos [].",
        reference: "Página 5 - Sintaxis básica de listas",
        category: "sintaxis"
    },
    {
        id: 2,
        question: "¿Qué función devuelve el primer elemento de una lista?",
        options: ["first", "head", "top", "front"],
        correct: 1,
        explanation: "La función 'head' devuelve el primer elemento de una lista no vacía.",
        reference: "Página 11 - Funciones comunes sobre listas",
        category: "funciones"
    },
    {
        id: 3,
        question: "¿Cuál es el resultado de la expresión [1,2,3] ++ [4,5]?",
        options: ["[1,2,3,4,5]", "[1,2,3][4,5]", "Error", "[4,5,1,2,3]"],
        correct: 0,
        explanation: "El operador ++ concatena dos listas, uniendo la segunda al final de la primera.",
        reference: "Página 8 - Operadores de listas",
        category: "operadores"
    },
    {
        id: 4,
        question: "¿Qué función devuelve todos los elementos de una lista excepto el primero?",
        options: ["rest", "tail", "body", "remainder"],
        correct: 1,
        explanation: "La función 'tail' devuelve todos los elementos excepto el primero (head).",
        reference: "Página 11 - Funciones comunes sobre listas",
        category: "funciones"
    },
    {
        id: 5,
        question: "¿Cuál es la sintaxis correcta para el operador cons en Haskell?",
        code: "1 : [2,3,4]",
        options: ["[1,2,3,4]", "Error de sintaxis", "[1:[2,3,4]]", "1,2,3,4"],
        correct: 0,
        explanation: "El operador : (cons) agrega un elemento al inicio de una lista, resultando en [1,2,3,4].",
        reference: "Página 6 - Operador cons",
        category: "operadores"
    },
    {
        id: 6,
        question: "¿Qué función devuelve la longitud de una lista?",
        options: ["size", "count", "length", "len"],
        correct: 2,
        explanation: "La función 'length' devuelve el número de elementos en una lista.",
        reference: "Página 13 - Función length",
        category: "funciones"
    },
    {
        id: 7,
        question: "¿Cuál es el resultado de reverse [1,2,3,4]?",
        options: ["[1,2,3,4]", "[4,3,2,1]", "Error", "[4,1,3,2]"],
        correct: 1,
        explanation: "La función 'reverse' invierte el orden de los elementos en una lista.",
        reference: "Página 13 - Función reverse",
        category: "funciones"
    },
    {
        id: 8,
        question: "¿Qué expresión crea una lista de números del 1 al 5?",
        options: ["[1..5]", "[1,2,3,4,5]", "range(1,5)", "Todas las anteriores"],
        correct: 3,
        explanation: "Tanto [1..5] (notación de rango) como [1,2,3,4,5] (enumeración explícita) crean la misma lista.",
        reference: "Página 7 - Notación de rangos",
        category: "sintaxis"
    },
    {
        id: 9,
        question: "¿Cuál es el resultado de take 3 [1,2,3,4,5]?",
        options: ["[1,2,3]", "[3,4,5]", "[1,2,3,4,5]", "Error"],
        correct: 0,
        explanation: "La función 'take n' devuelve los primeros n elementos de una lista.",
        reference: "Página 14 - Función take",
        category: "funciones"
    },
    {
        id: 10,
        question: "¿Qué función verifica si una lista está vacía?",
        options: ["empty", "isNull", "null", "isEmpty"],
        correct: 2,
        explanation: "La función 'null' verifica si una lista está vacía, devolviendo True o False.",
        reference: "Página 12 - Función null",
        category: "funciones"
    },
    {
        id: 11,
        question: "¿Cuál es el resultado de drop 2 [1,2,3,4,5]?",
        options: ["[1,2]", "[3,4,5]", "[2,3,4,5]", "[1,3,4,5]"],
        correct: 1,
        explanation: "La función 'drop n' elimina los primeros n elementos y devuelve el resto.",
        reference: "Página 14 - Función drop",
        category: "funciones"
    },
    {
        id: 12,
        question: "¿Qué tipo de dato tiene la expresión ['a', 'b', 'c']?",
        options: ["String", "[Char]", "Char", "[String]"],
        correct: 1,
        explanation: "Una lista de caracteres tiene tipo [Char]. En Haskell, String es sinónimo de [Char].",
        reference: "Página 4 - Tipos de listas",
        category: "tipos"
    },
    {
        id: 13,
        question: "¿Cuál es la sintaxis correcta para una lista infinita de números naturales?",
        options: ["[1..]", "[1,2,3...]", "infinite [1]", "[1 to infinity]"],
        correct: 0,
        explanation: "[1..] crea una lista infinita comenzando en 1, gracias a la evaluación perezosa de Haskell.",
        reference: "Página 9 - Listas infinitas",
        category: "sintaxis"
    },
    {
        id: 14,
        question: "¿Qué hace la función elem?",
        code: "elem 3 [1,2,3,4,5]",
        options: ["Devuelve True", "Devuelve False", "Devuelve 3", "Error"],
        correct: 0,
        explanation: "La función 'elem' verifica si un elemento está en la lista. Como 3 está en [1,2,3,4,5], devuelve True.",
        reference: "Página 15 - Función elem",
        category: "funciones"
    },
    {
        id: 15,
        question: "¿Cuál es el resultado de last [1,2,3,4]?",
        options: ["1", "4", "[4]", "Error"],
        correct: 1,
        explanation: "La función 'last' devuelve el último elemento de una lista no vacía.",
        reference: "Página 11 - Funciones comunes sobre listas",
        category: "funciones"
    },
    {
        id: 16,
        question: "¿Qué expresión concatena múltiples listas?",
        code: "concat [[1,2], [3,4], [5,6]]",
        options: ["[1,2,3,4,5,6]", "[[1,2], [3,4], [5,6]]", "Error", "[1,2][3,4][5,6]"],
        correct: 0,
        explanation: "La función 'concat' aplana una lista de listas en una sola lista.",
        reference: "Página 16 - Función concat",
        category: "funciones"
    },
    {
        id: 17,
        question: "¿Cuál es la diferencia entre [1,2,3] y (1,2,3)?",
        options: ["No hay diferencia", "[1,2,3] es lista, (1,2,3) es tupla", "(1,2,3) es lista, [1,2,3] es tupla", "Ambas son listas"],
        correct: 1,
        explanation: "Los corchetes [] definen listas, los paréntesis () definen tuplas. Son tipos diferentes.",
        reference: "Página 3 - Diferencia entre listas y tuplas",
        category: "tipos"
    },
    {
        id: 18,
        question: "¿Qué hace la expresión [x | x <- [1..10], even x]?",
        options: ["Lista de números pares del 1 al 10", "Lista de números impares", "Error de sintaxis", "Lista vacía"],
        correct: 0,
        explanation: "Es una list comprehension que genera números pares del 1 al 10: [2,4,6,8,10].",
        reference: "Página 17 - List comprehensions",
        category: "comprension"
    },
    {
        id: 19,
        question: "¿Cuál es el resultado de sum [1,2,3,4]?",
        options: ["10", "[1,2,3,4]", "4", "Error"],
        correct: 0,
        explanation: "La función 'sum' calcula la suma de todos los elementos numéricos de una lista.",
        reference: "Página 16 - Funciones de agregación",
        category: "funciones"
    },
    {
        id: 20,
        question: "¿Qué función aplica otra función a todos los elementos de una lista?",
        options: ["apply", "map", "transform", "each"],
        correct: 1,
        explanation: "La función 'map' aplica una función a cada elemento de una lista, devolviendo una nueva lista.",
        reference: "Página 18 - Función map",
        category: "funciones"
    }
];

// Función para obtener preguntas aleatorias
function getRandomQuestions(count = 10) {
    const shuffled = [...questionsDB].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
