# Simulacro Haskell - Listas

Una aplicación web interactiva para practicar conceptos de listas en Haskell con un sistema de simulacro cronometrado.

## Características

- ✅ **10 preguntas aleatorias** de una base de datos de 20 preguntas
- ⏱️ **60 segundos por pregunta** con temporizador visual
- 🎯 **Retroalimentación detallada** con explicaciones y referencias a páginas
- 📱 **Diseño responsivo** y elegante
- 🔄 **Preguntas aleatorias** en cada intento
- 📊 **Métricas de rendimiento** (tiempo promedio, puntuación, etc.)
- 👁️ **Modo de revisión** para repasar todas las respuestas

## Temas Cubiertos

### Sintaxis Básica
- Listas vacías `[]`
- Operador cons `:`
- Notación de rangos `[1..5]`
- Listas infinitas `[1..]`

### Funciones Comunes
- `head`, `tail`, `last`
- `length`, `reverse`
- `take`, `drop`
- `sum`, `concat`
- `null`, `elem`

### Operadores
- Concatenación `++`
- Cons `:`

### Conceptos Avanzados
- List comprehensions
- Función `map`
- Tipos de datos `[Char]`, `String`

## Cómo Usar

1. **Abrir** el archivo `index.html` en un navegador web
2. **Leer** las instrucciones en la pantalla de inicio
3. **Hacer clic** en "Comenzar Simulacro"
4. **Responder** las 10 preguntas dentro del tiempo límite
5. **Revisar** los resultados y retroalimentación
6. **Usar** el modo de revisión para repasar respuestas

## Estructura del Proyecto

```
simulacro-haskell-listas/
├── index.html          # Estructura principal de la aplicación
├── styles.css          # Estilos CSS con diseño moderno
├── script.js           # Lógica principal de la aplicación
├── questions.js        # Base de datos de preguntas
└── README.md           # Este archivo
```

## Funcionalidades Técnicas

### Temporizador
- Cuenta regresiva de 60 segundos por pregunta
- Cambios visuales según tiempo restante (amarillo < 20s, rojo < 10s)
- Avance automático cuando se agota el tiempo

### Sistema de Puntuación
- Respuestas correctas vs incorrectas
- Tiempo promedio de respuesta
- Porcentaje de aciertos

### Retroalimentación
- Explicación detallada para cada pregunta
- Referencias a páginas del material de estudio
- Identificación visual de respuestas correctas e incorrectas

### Interfaz de Usuario
- Diseño moderno con gradientes y sombras
- Animaciones suaves
- Totalmente responsivo (móvil, tablet, desktop)
- Iconos de Font Awesome
- Tipografía profesional (Inter + JetBrains Mono para código)

## Personalización

### Agregar Nuevas Preguntas
Edita el archivo `questions.js` y agrega objetos con la siguiente estructura:

```javascript
{
    id: 21,
    question: "Tu pregunta aquí",
    code: "código opcional", // opcional
    options: ["opción 1", "opción 2", "opción 3", "opción 4"],
    correct: 0, // índice de la respuesta correcta
    explanation: "Explicación de la respuesta",
    reference: "Página X - Tema",
    category: "categoria"
}
```

### Modificar Tiempo
Cambia la variable `timeLeft: 60` en `script.js` línea 19 y línea 152.

### Cambiar Número de Preguntas
Modifica el valor `10` en las funciones `getRandomQuestions(10)` y actualiza los textos correspondientes.

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con custom properties y grid/flexbox
- **JavaScript ES6+** - Lógica de aplicación
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía (Inter, JetBrains Mono)

## Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Móviles iOS/Android

## Licencia

Este proyecto es de uso educativo y está basado en conceptos fundamentales de Haskell para el curso de Lenguajes de Programación.
