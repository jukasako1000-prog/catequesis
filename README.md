# 🎓 Catequesis de Confirmación - Camino al Cielo

Aplicación web interactiva para gestionar puntos, asistencia y juegos educativos en clases de catequesis.

## 📋 Descripción General

Esta aplicación permite al catequista:
- **Gestionar alumnos**: Añadir estudiantes, asignar avatares, controlar asistencia
- **Sistema de puntos (Estrellas ✨)**: Premiar buen comportamiento, respuestas correctas, asistencia
- **Juegos educativos por temas**: Quiz, Rosco Pasapalabra, El Intruso, Ordena la Historia, Adivinar la Frase
- **Ranking y podio**: Visualización de los 5 mejores en el podio y lista completa.
- **Historial completo**: Registro de todas las sesiones con estadísticas

## 🎮 Estructura de Temas

Cada tema en `AULA_TEMAS` debe contener:

```javascript
"Nombre del Tema": {
  icon: "🎯",  // Emoji representativo
  
  // 1. CUESTIONARIO RÁPIDO (Individual)
  questions: [
    { 
      id: 1, 
      question: "¿Pregunta aquí?", 
      options: ["Opción A", "Opción B", "Opción C", "Opción D"], 
      correct: 0  // Índice de la respuesta correcta (0-3)
    },
    // Mínimo 3 preguntas por tema
  ],
  
  // 2. ADIVINAR LA FRASE (Equipos)
  phrases: [
    "FRASE COMPLETA EN MAYÚSCULAS",
    "OTRA FRASE IMPORTANTE",
    "TERCERA FRASE CLAVE"
  ],
  
  // 3. ROSCO PASAPALABRA (Equipos o Individual)
  rosco: [
    { letter: "A", question: "Pregunta que empieza por A", answer: "RESPUESTA" },
    { letter: "B", question: "Pregunta que empieza por B", answer: "RESPUESTA" },
    // ... Una pregunta por cada letra del abecedario (26 letras)
    // Para letras difíciles (K, W, X, Y, Z), usar: label: "Contiene la X"
    { letter: "X", label: "Contiene la X", question: "Nuestra ....... al conocer a Jesús", answer: "EXPERIENCIA" },
  ],
  
  // 4. EL INTRUSO (Equipos)
  intrusos: [
    { 
      options: ["Opción 1", "Opción 2", "Opción 3", "Intruso"], 
      correct: 3,  // Índice del intruso
      explanation: "Explicación de por qué es el intruso" 
    },
    // Mínimo 2 desafíos
  ],
  
  // 5. ORDENA LA HISTORIA (Equipos)
  historias: [
    {
      title: "Título de la historia",
      items: [
        "Primer evento cronológico",
        "Segundo evento",
        "Tercer evento",
        "Cuarto evento"
      ]
    }
  ]
}
```

## 🎯 Puntuación de Juegos

| Juego | Modo | Puntos por Acierto | Notas |
|-------|------|-------------------|-------|
| **Cuestionario Rápido** | Individual | +5 estrellas | -2 por fallo |
| **Rosco Pasapalabra** | Equipos/Individual | +2 estrellas por palabra | Para todo el equipo |
| **El Intruso** | Equipos | +5 estrellas | Por cada intruso identificado |
| **Ordena la Historia** | Equipos | +5 estrellas | Al completar el orden |
| **Adivinar la Frase** | Equipos | +10 estrellas | Para el equipo ganador |

### Bonificaciones Especiales
- **Asistencia**: +10 estrellas extra cada 10 días consecutivos
- **Buen Comportamiento**: +10 estrellas extra cada 10 medallas acumuladas
- **Lectura**: +10 estrellas extra cada 10 méritos de lectura

## 🎨 Interfaz de Usuario

### Botones Principales
- **Botón ℹ️ (Información)**: Ubicado en la **esquina inferior derecha** de cada juego
- **Botón ? (Quiz Individual)**: En cada alumno, acceso directo al cuestionario rápido
- **Sección "Juegos"**: Acceso a todos los juegos por equipos desde el menú superior

### Flujo de Juego Individual
1. Clic en botón `?` del alumno
2. Selección del tema
3. **Directamente al Cuestionario Rápido** (sin menú intermedio)
4. Responder pregunta → +5 o -2 puntos
5. Volver a temas para elegir otro

### Flujo de Juego por Equipos
1. Ir a pestaña "Juegos" en el menú superior
2. Seleccionar tema
3. Elegir tipo de juego (Rosco, Intruso, Historia, Frase)
4. Crear equipos (mínimo 2)
5. Jugar y recibir puntos

## 📁 Estructura de Archivos

```
CATEQUESIS APP/
├── src/
│   ├── App.jsx          # Componente principal con toda la lógica
│   ├── index.css        # Estilos globales y animaciones
│   └── main.jsx         # Punto de entrada
├── public/
│   └── AVATARES/        # Imágenes de avatares de alumnos
├── README.md            # Este archivo
└── package.json         # Dependencias del proyecto
```

## 🔧 Tecnologías Utilizadas

- **React** (Vite)
- **Framer Motion** (animaciones)
- **Canvas Confetti** (celebraciones)
- **Lucide React** (iconos)
- **LocalStorage** (persistencia de datos)

### 📱 Optimizaciones para Tablets y Proyectores
La aplicación está diseñada para su uso en aulas con hardware específico:
- **Modo Pantalla Completa**: Botón dedicado para ocultar la interfaz del navegador.
- **Control de Zoom**: Ajuste dinámico de escala (50%-150%) para proyectores de baja resolución.
- **Compatibilidad con Teclados (tipo Rii)**:
    - `inputMode="none"` para evitar que aparezca el teclado virtual en pantalla.
    - `caret-color: transparent` para ocultar el cursor y evitar distracciones visuales.
- **Diseño Táctil**: Botones de juego con áreas de pulsación ampliadas para un manejo cómodo.

## 📝 Cómo Añadir un Nuevo Tema

### Paso 1: Preparar el Contenido
Necesitas tener listo:
- ✅ **3+ preguntas** de opción múltiple
- ✅ **3 frases** importantes del tema
- ✅ **26 palabras** para el Rosco (A-Z)
- ✅ **2+ desafíos** de "El Intruso"
- ✅ **1 historia** con 4 eventos cronológicos

### Paso 2: Ubicar el Objeto AULA_TEMAS
En `App.jsx`, busca la constante `AULA_TEMAS` (aproximadamente línea 7-200).

### Paso 3: Añadir el Nuevo Tema
Copia la estructura de un tema existente y modifica:

```javascript
const AULA_TEMAS = {
  // ... temas existentes ...
  
  "Tu Nuevo Tema": {
    icon: "🎯",
    questions: [
      { id: 100, question: "¿Tu pregunta?", options: ["A", "B", "C", "D"], correct: 0 },
      { id: 101, question: "¿Otra pregunta?", options: ["A", "B", "C", "D"], correct: 1 },
      { id: 102, question: "¿Tercera pregunta?", options: ["A", "B", "C", "D"], correct: 2 }
    ],
    phrases: [
      "PRIMERA FRASE IMPORTANTE",
      "SEGUNDA FRASE CLAVE",
      "TERCERA FRASE RELEVANTE"
    ],
    rosco: [
      { letter: "A", question: "Pregunta con A", answer: "RESPUESTA" },
      // ... completar las 26 letras
    ],
    intrusos: [
      { options: ["Correcto1", "Correcto2", "Correcto3", "Intruso"], correct: 3, explanation: "Por qué es intruso" },
      { options: ["Correcto1", "Correcto2", "Correcto3", "Intruso"], correct: 3, explanation: "Explicación" }
    ],
    historias: [
      {
        title: "Nombre de la historia",
        items: ["Evento 1", "Evento 2", "Evento 3", "Evento 4"]
      }
    ]
  }
};
```

### Paso 4: Verificar
- Guarda el archivo
- La aplicación se recargará automáticamente
- El nuevo tema aparecerá en la sección "Juegos"

## 🎯 Consejos para el Rosco (Pasapalabra)

### Letras Fáciles (Empiezan por...)
```javascript
{ letter: "A", question: "Los doce amigos de Jesús", answer: "APÓSTOLES" }
{ letter: "B", question: "Sacramento que nos limpia", answer: "BAUTISMO" }
```

### Letras Difíciles (Contiene la letra...)
```javascript
{ letter: "X", label: "Contiene la X", question: "Nuestra ....... al conocer a Jesús", answer: "EXPERIENCIA" }
{ letter: "K", label: "Contiene la K", question: "Lugar donde se reúne la Iglesia (Contiene la K)", answer: "PARROQUIA" }
{ letter: "W", label: "Contiene la W", question: "Día de la semana que vamos a misa (Contiene la W)", answer: "MIÉRCOLES" }
```

### Uso de Puntos Suspensivos
Para que los alumnos completen la palabra:
```javascript
{ letter: "Q", label: "Contiene la Q", question: "Nombre de nuestra ... de San Bartolomé", answer: "PARROQUIA" }
{ letter: "Y", label: "Contiene la Y", question: "La ...... de Dios", answer: "LEY" }
```

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 💾 Gestión de Datos

### Exportar Datos
- Botón verde "💾" en la esquina inferior derecha
- Guarda archivo JSON con todos los puntos e historial
- **Recomendación**: Exportar al final de cada sesión

### Importar Datos
- Botón gris "📤" en la esquina inferior derecha
- Cargar archivo JSON previamente exportado
- Útil para cambiar de ordenador o recuperar datos

### LocalStorage
Los datos se guardan automáticamente en el navegador en:
- `catequesis_students`: Lista de alumnos y puntos
- `catequesis_history`: Historial de jornadas
- `catequesis_completed_themes`: Temas marcados como completados

## 🎨 Personalización

### Cambiar Avatares
1. Añadir imagen en `public/AVATARES/`
2. Modificar el array `INITIAL_STUDENTS` en `App.jsx`
3. Actualizar la propiedad `avatar` del alumno

### Ajustar Puntuación
Buscar las funciones:
- `handleQuizAnswer`: Puntos del cuestionario (línea ~566)
- `updatePoints`: Función general de puntos (línea ~340)
- `useEffect` de recompensas: Pasapalabra (~938), Intruso (~958), Historia (~976)

## 🐛 Solución de Problemas

### Pantalla en Blanco
1. Abrir consola del navegador (F12)
2. Buscar errores en rojo
3. Limpiar caché: `Ctrl + Shift + R`
4. Si persiste, eliminar Service Worker y recargar

### Los Cambios No Se Ven
1. Verificar que Vite esté corriendo (`npm run dev`)
2. Recargar con `Ctrl + Shift + R`
3. Revisar la terminal por errores de sintaxis

### Datos Perdidos
1. Verificar que se exportó el JSON antes
2. Importar el último archivo guardado
3. LocalStorage se limpia si se borran datos del navegador

## 📚 Temas Actuales Disponibles

1. **La Aventura de Seguir a Jesús** ⛵
2. **Los Mandamientos** 📜
3. **La Creación** 🌎
4. **Sacramentos** 🕊️

## 🎯 Roadmap / Próximas Mejoras

- [ ] Añadir más temas semanalmente
- [ ] Sistema de badges/insignias especiales
- [ ] Gráficos de progreso individual
- [ ] Modo oscuro
- [ ] Exportar estadísticas en PDF

## 👨‍💻 Notas para Desarrolladores

### Estado de la Aplicación
- **No usar** `showQuizModal` (obsoleto, mantener por compatibilidad)
- **Completado manual**: Los temas NO se marcan automáticamente como completados
- **Botón Info**: Siempre en esquina inferior derecha (bottom: 20px, right: 20px)

### Convenciones de Código
- Usar `const` para funciones de flecha
- Mantener inmutabilidad en estados (spread operator)
- Normalizar texto para comparaciones (quitar acentos con NFD)
- Sonidos: `playSound('success')`, `playSound('error')`, `playSound('fanfare')`

### Animaciones y Efectos
- `triggerSuccessEffect()`: Confetti suave
- `triggerMassiveStars()`: Entrada al podio
- `triggerLeaderFireworks()`: Líder o bonificación especial
- `setApotheosic(true)`: Overlay de celebración

---

**Última actualización**: Febrero 2026 (Sesión de Refinamiento UI)
**Versión**: 2.1
**Desarrollado para**: Catequesis de Confirmación - Parroquia San Bartolomé

---

## 🛠️ Log de Cambios Recientes (Última Sesión)

### 🔝 Cabecera y Podio
- **Ajuste de Altura**: Se ha bajado todo el bloque del podio y los cañones de confeti (**5rem**) para evitar que la corona del ganador solape con el lema superior.
- **Navegación Simplificada**: Eliminación definitiva de las pestañas superiores. Ahora todo se gestiona desde el panel de control del ranking.

### 📋 Gestión de Alumnos y Ranking
- **Control Unificado**: El buscador, el selector de clasificación y los botones de acción están ahora agrupados en una barra compacta y elegante con efecto cristal.
- **Buscador Expandido**: Se ha ensanchado el campo de búsqueda dándole prioridad visual y asegurando un tamaño mínimo de **300px** para que sea cómodo de usar. El contenedor general ahora es más ancho (**1200px**).
- **Lista Desplegable Inteligente**: El botón **"VER LISTA"** (con icono de trofeo 🏆) se ha integrado en la barra de control, permitiendo abrir y cerrar el ranking con un clic.
- **Mejora de Visibilidad**: Se ha ensanchado el selector de tipo de ranking a **220px** para que todos los textos (como "COMPORTAMIENTO") se lean perfectamente sin cortarse.
- **Edición Directa**: Se ha añadido un botón de **Edición (Lápiz 📝)** en la ficha individual de cada alumno para poder corregir sus nombres al momento.

### 🎮 Sala de Estudio y Juegos
- **Acceso Rápido**: Botón directo de **"Sala de Estudio"** integrado en el panel principal.
- **Botón "Volver"**: Añadida navegación de retorno fácil en la vista de juegos para volver al ranking general sin perder el contexto.
- **Consistencia de Datos**: Corrección automática y permanente del nombre "MA.CASES" (ID 104) para evitar errores manuales.

### ✨ Estabilidad y Fixes
- **Correcciones de Importación**: Solucionado error de carga de iconos que provocaba pantallas azules en ciertos navegadores.
- **Transiciones**: Animaciones de plegado y desplegado optimizadas para la lista de alumnos.

### 📺 Soporte para Proyectores y TV (16:9)
- **Control de Zoom Manual**: Se ha integrado un panel de ajuste de escala en la esquina inferior derecha. Permite encoger o agrandar la web (80%, 90%, 110%, etc.) para que encaje perfectamente en cualquier proyector o Fire TV, evitando que se corten los bordes.
- **Zona de Seguridad (Safe Area)**: El diseño ahora tiene márgenes inteligentes del **5%** para evitar el efecto "overscan" de los televisores.
- **Formato Panorámico**: El ancho máximo de la aplicación se ha ampliado a **1400px** para aprovechar mejor las pantallas 16:9.
- **Optimización Vertical**: Reajuste de alturas en el podio y cabeceras para que todo el contenido principal sea visible sin necesidad de mucho scroll en pantallas grandes.

**Última actualización de diseño**: 13 de Febrero de 2026.

### 🎮 Soporte Total para Mandos y Navegación (Nueva Era)
- **Navegación Universal**: Implementación de soporte completo para mandos Bluetooth y teclado en toda la app. Ahora es posible gestionar toda la clase sin tocar el ratón.
- **Control del Podio y Cañones**: Las flechas permiten navegar por los puestos de honor y seleccionar los **cañones de confeti**. Al seleccionarlos, se agrandan visualmente y se activan con **OK/Intro**.
- **Foco de Alta Visibilidad**: Todos los elementos seleccionables (alumnos, temas, juegos, botones +/-) ahora muestran un **marco azul marino grueso (#1e1b4b)** que garantiza visibilidad perfecta desde lejos o en proyectores.
- **Sala de Estudio Navegable**: Acceso total a la selección de temas y actividades mediante cursores. Se ha unificado el flujo para que entrar, jugar y volver sea totalmente fluido con el mando.
- **Gestión de Puntos con Mando**: Los botones de sumar y restar estrellas en el ranking ahora son accesibles con las flechas, facilitando el reparto de premios durante la clase.
- **Teclas Rápidas de Retroceso**: Uso de las teclas **Escape** o **Back** (atrás) para cerrar fichas de alumnos o retroceder entre los menús de juegos de forma natural.
- **Guard de Login**: Sistema de seguridad que evita que el "Enter" usado para entrar a la app abra accidentalmente la ficha del primer alumno.

