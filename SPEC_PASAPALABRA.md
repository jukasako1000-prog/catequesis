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
  pointsAwarded: false, // Crítico para el useEffect de premios
  isPerfectStreak: true // Bonus si se completa sin fallos ni pasapalabras
}
```

## 📱 Optimización para Tabletas y Proyectores
Para garantizar una experiencia fluida con teclados externos (tipo Rii) y en pantallas táctiles:
1.  **Sin Teclado Virtual**: El campo de entrada usa `inputMode="none"` para evitar que el sistema despliegue el teclado táctil, dejando espacio libre para el juego.
2.  **Cursor Invisible**: Se aplica `caret-color: transparent` para ocultar el cursor parpadeante, mejorando la inmersión y evitando barras de herramientas de texto automáticas.
3.  **Botones Táctiles**: Los botones de `COMPROBAR` y `PASAPALABRA` tienen un padding ampliado (**12px**) y esquinas redondeadas (**12px**) para facilitar la pulsación con el dedo.
4.  **Modo Cine (Fullscreen)**: Se incluye un botón con el icono `Maximize` que activa el modo pantalla completa nativo del navegador para ocultar barras de direcciones y menús.
5.  **Control de Zoom**: Se incluye un control lateral de zoom (50% a 150%) para adaptar la escala del juego a diferentes proyectores o tamaños de aula.

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
2.  **Error**: Suena `error`, se marca en rojo, se muestra la palabra correcta (`showAnswer`) y el juego se pausa.
    *   **Bypass de Espera**: Durante la pausa de error, pulsar de nuevo `COMPROBAR` (o Enter) saltará inmediatamente a la siguiente pregunta sin esperar el temporizador de 3 segundos.
3.  **Pasapalabra**: Se salta la letra (sigue pendiente) y el turno PASA al siguiente equipo.

## 🛠️ Robustez Técnica
*   **Normalización**: Las respuestas se comparan eliminando tildes (`normalize("NFD")`), espacios y convirtiendo a mayúsculas.
*   **Security Checks**: El handler de respuestas tiene protecciones contra objetos nulos para evitar cierres inesperados si los datos del Rosco están incompletos.

---
*Documento de referencia para la evolución del Proyecto Catequesis 2026* ⛪✨
