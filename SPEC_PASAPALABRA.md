# 📖 Especificaciones Técnicas: Juego del Rosco (Pasapalabra)

Este documento sirve como guía para cualquier desarrollador o agente de IA que trabaje en este proyecto, asegurando la continuidad de la lógica y la experiencia de usuario.

## 🧠 Lógica de Contenido (Las 3 Reglas de Oro)
Para evitar la frustración de los niños y asegurar el valor educativo:
1.  **Validación de Letra**: Toda respuesta DEBE empezar por la letra indicada o contenerla explícitamente. Se debe indicar en la pregunta: `(Empieza por ...)` o `(Contiene la ...)`.
2.  **Tratamiento de Plurales**: Si la palabra buscada es un plural, la pregunta DEBE comenzar con el prefijo "En plural: ...".
    *   *Ejemplo*: "En plural: Animales que nadan (Contiene la F) -> DELFINES".
3.  **Dificultad Nivel Catequesis**: Las definiciones deben ser teológicamente correctas pero sencillas para niños de 7 a 12 años.

## 💰 Sistema de Puntuación y Recompensas
El sistema ha evolucionado de un modelo competitivo a uno colaborativo/individual:
*   **Puntos**: 2 estrellas por cada acierto (`hits`).
*   **Distribución**: No se premia solo al ganador. Al finalizar el juego, **CADA EQUIPO** recibe los puntos correspondientes a sus aciertos multiplicado por 2. 
*   **Destinatarios**: Todos los alumnos (`studentIds`) dentro de la lista de un equipo reciben la misma cantidad de puntos.
*   **Prevención de Duplicados**: Se utiliza el flag `pasapalabra.pointsAwarded` para asegurar que los puntos se otorguen una sola vez al cambiar el estado a `finished`.

## 🏗️ Estructura del Estado (State)
El objeto `pasapalabra` en `App.jsx` debe mantener esta estructura:
```javascript
{
  rosco: [],       // Array de { letter, question, answer, status: 'pending'|'success'|'error' }
  currentIdx: 0,   // Índice de la letra actual
  timeLeft: 300,   // Tiempo en segundos
  status: 'playing', // 'playing' | 'finished'
  teams: [],       // Array de { name, studentIds, hits, errors }
  currentTeamIdx: 0,
  isPaused: false,
  inputValue: '',
  showAnswer: null, // Si es != null, se muestra el modal de corrección
  pointsAwarded: false // Crítico para el useEffect de premios
}
```

## 🎨 Interfaz y Layout (UI)
*   **Tamaño del Rosco**: El contenedor del Rosco debe ser de **700px x 700px**.
*   **Radio de Letras**: El radio de posicionamiento de las burbujas de letras es de **310px** para evitar solapamientos con el cuadro central.
*   **Cuadro de Preguntas**: Ancho fijo de **340px**, centrado mediante `position: absolute` y `transform: translate(-50%, -50%)`.
*   **Feedback Visual**: 
    *   Azul: Pendiente
    *   Verde: Acierto
    *   Rojo: Error
    *   Burbuja actual: Escala 1.3x y borde blanco grueso.

## 🔄 Flujo de Turnos
1.  **Acierto**: Suena `success`, se marca en verde y el turno SIGUE en el mismo equipo. El índice avanza a la siguiente letra pendiente.
2.  **Error**: Suena `error`, se marca en rojo, se muestra la palabra correcta (`showAnswer`) y el juego se pausa. Al pulsar "Continuar", el turno PASA al siguiente equipo.
3.  **Pasapalabra**: Se salta la letra (sigue pendiente) y el turno PASA al siguiente equipo.

---
*Documento de referencia para la evolución del Proyecto Catequesis 2026* ⛪✨
