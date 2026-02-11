import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Trophy, Star, Minus, Plus, Cloud, Church, Sun, Heart, UserPlus, HelpCircle, X, ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, Download, Upload, Medal, Calendar, History, TrendingUp, Gamepad2, Sparkles, BookOpen, Search, ArrowLeft, Edit, ZoomIn, ZoomOut, Monitor } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

// Banco de datos del Aula por Temas
const AULA_TEMAS = {
  "La Aventura de Seguir a Jesús": {
    icon: "⛵",
    questions: [
      { id: 10, question: "¿Quiénes fueron los dos primeros hermanos que Jesús llamó junto al mar de Galilea?", options: ["Juan y Santiago", "Pedro y Andrés", "Mateo y Lucas", "Tomás y Felipe"], correct: 1 },
      { id: 11, question: "¿A qué se dedicaban los primeros discípulos antes de seguir a Jesús?", options: ["Carpinteros", "Soldados", "Pescadores", "Médicos"], correct: 2 },
      { id: 12, question: "¿Cuál es la misión de los cristianos respecto a la fe según el Catecismo?", options: ["Anunciarla, vivirla y celebrarla", "Solo leerla", "Guardarla en secreto", "No hacer nada"], correct: 0 },
      { id: 13, question: "¿Quién fundó la Iglesia para continuar su misión?", options: ["Los romanos", "Jesucristo", "Moisés", "Abraham"], correct: 1 },
      { id: 14, question: "¿Qué significa ser 'Pescador de hombres'?", options: ["Usar redes más grandes", "Vender pescado en el mercado", "Llevar la Buena Noticia a los demás", "Ser marinero"], correct: 2 },
      { id: 15, question: "¿Cómo se llama el grupo de los 12 amigos íntimos de Jesús?", options: ["Los 12 profetas", "Los 12 mandamientos", "Los 12 apóstoles", "Los 12 pastores"], correct: 2 },
      { id: 16, question: "¿Cuál es la gran familia de los que seguimos a Jesús?", options: ["El equipo de fútbol", "La Iglesia", "El ayuntamiento", "La biblioteca"], correct: 1 }
    ],
    phrases: ["OS HARÉ PESCADORES DE HOMBRES", "LA IGLESIA ES LA GRAN CASA DEL CRISTIANO", "TODO LO QUE CRISTO VIVIÓ HACE QUE PODAMOS VIVIRLO EN ÉL"],
    rosco: [
      { letter: "A", question: "Los doce amigos especiales que eligió Jesús.", answer: "APÓSTOLES" },
      { letter: "B", question: "Lo que dejaron los discípulos en la orilla para seguir a Jesús.", answer: "BARCAS" },
      { letter: "C", question: "Los que seguimos a Jesús y formamos parte de su Iglesia.", answer: "CRISTIANOS" },
      { letter: "D", question: "Persona que aprende del Maestro y decide seguir sus pasos.", answer: "DISCÍPULO" },
      { letter: "E", question: "La Buena Noticia que Jesús nos trajo.", answer: "EVANGELIO" },
      { letter: "F", label: "Contiene la F", question: "La Iglesia tiene una sola ... (lo que creemos).", answer: "FE" },
      { letter: "G", question: "El mar donde Jesús llamó a Pedro y Andrés.", answer: "GALILEA" },
      { letter: "H", question: "Cómo nos sentimos unidos en la gran familia de la Iglesia.", answer: "HERMANOS" },
      { letter: "I", question: "La gran casa donde se reúne la familia de Dios.", answer: "IGLESIA" },
      { letter: "J", question: "Nuestro modelo de vida que nos invita a seguirle.", answer: "JESÚS" },
      { letter: "L", question: "Llamamiento que Cristo hace a cada joven para ser su amigo.", answer: "LLAMADO" },
      { letter: "M", question: "Uno de los cuatro evangelistas mencionados en el libro.", answer: "MATEO" },
      { letter: "N", question: "Libro de la Biblia donde se cuenta la vida de Jesús: ... Testamento.", answer: "NUEVO" },
      { letter: "O", label: "Contiene la O", question: "Lo que compartimos en la liturgia y en la ... (hablar con Dios).", answer: "ORACIÓN" },
      { letter: "P", question: "Discípulo que era hermano de Andrés.", answer: "PEDRO" },
      { letter: "Q", label: "Contiene la Q", question: "Nombre de nuestra ... de San Bartolomé a la que pertenecemos.", answer: "PARROQUIA" },
      { letter: "R", question: "Lo que echaban al mar los pescadores de Galilea.", answer: "REDES" },
      { letter: "S", question: "Palabra con la que Jesús nos invita a caminar con Él.", answer: "SÍGUEME" },
      { letter: "T", question: "Lo que los discípulos guardaron fielmente para nosotros: el ... de la fe.", answer: "TESORO" },
      { letter: "U", question: "La Iglesia es ... porque tiene un solo Dios y una sola fe.", answer: "UNA" },
      { letter: "V", question: "Transmitir la fe es: Anunciarla, ... y celebrarla.", answer: "VIVIRLA" },
      { letter: "X", label: "Contiene la X", question: "Nuestra ....... al conocer a Jesús.", answer: "EXPERIENCIA" },
      { letter: "Y", label: "Contiene la Y", question: "La ...... de Dios.", answer: "LEY" },
      { letter: "Z", label: "Contiene la Z", question: "¿Cómo se siente el cristiano que sabe que Jesús le quiere?", answer: "FELIZ" }
    ],
    intrusos: [
      { options: ["Pedro", "Andrés", "Juan", "Hércules"], correct: 3, explanation: "Hércules es un personaje mitológico, no un apóstol de Jesús." },
      { options: ["Anunciar", "Vivir", "Celebrar", "Esconder"], correct: 3, explanation: "La fe no se esconde, se comparte con todo el mundo." },
      { options: ["Barcas", "Redes", "Peces", "Aviones"], correct: 3, explanation: "En tiempos de Jesús no existían los aviones." },
      { options: ["Biblia", "Evangelio", "Parroquia", "Cine"], correct: 3, explanation: "El cine es un entretenimiento moderno, no parte de la base de la fe." },
      { options: ["Seguir", "Escuchar", "Amar", "Pelear"], correct: 3, explanation: "Jesús nos pide amarnos, no pelearnos entre nosotros." },
      { options: ["Mateo", "Lucas", "Marcos", "Batman"], correct: 3, explanation: "Batman es un superhéroe de cómic, no un evangelista." }
    ],
    historias: [
      {
        title: "La aventura de los pescadores",
        items: ["Jesús camina por la orilla", "Ve a Pedro y Andrés pescando", "Les dice: 'Seguidme'", "Dejan las redes y le siguen"]
      }
    ]
  },
  "Los Mandamientos": {
    icon: "📜",
    questions: [
      { id: 1, question: "¿Cuántos mandamientos entregó Dios a Moisés?", options: ["7", "12", "10", "5"], correct: 2 },
      { id: 2, question: "¿En qué monte recibió Moisés las tablas?", options: ["Monte Sinaí", "Monte Calvario", "Monte de los Olivos", "Monte Carmelo"], correct: 0 },
      { id: 3, question: "¿Cuál es el primer mandamiento?", options: ["Amarás a Dios sobre todas las cosas", "No matarás", "No robarás", "Honrarás a tu padre y a tu madre"], correct: 0 },
      { id: 30, question: "¿Qué mandamiento nos prohíbe decir mentiras?", options: ["El octavo", "El primero", "El quinto", "El séptimo"], correct: 0 },
      { id: 31, question: "¿Cuál es el cuarto mandamiento que nos pide querer a nuestros padres?", options: ["No matarás", "Honrarás a tu padre y a tu madre", "Santificarás las fiestas", "No robarás"], correct: 1 },
      { id: 32, question: "¿En qué libro de la Biblia se narra la entrega de los Mandamientos?", options: ["Génesis", "Apocalipsis", "Éxodo", "Mateo"], correct: 2 },
      { id: 33, question: "¿Qué mandamiento nos pide no tomar las cosas de los demás?", options: ["No robarás", "No matarás", "Amarás a Dios", "No mentirás"], correct: 0 }
    ],
    phrases: ["HONRARÁS A TU PADRE Y A TU MADRE", "AMARÁS A DIOS SOBRE TODAS LAS COSAS", "SANTIFICARÁS LAS FIESTAS"],
    rosco: [
      { letter: "A", question: "Amarás a Dios sobre todas las...", answer: "COSAS" }, // Contiene la A
      { letter: "B", question: "Sacramento que nos limpia de todo pecado.", answer: "BAUTISMO" },
      { letter: "C", question: "El conjunto de los diez mandamientos.", answer: "DECÁLOGO" }, // Contiene la C
      { letter: "D", question: "El Ser Supremo que nos entregó los mandamientos.", answer: "DIOS" },
      { letter: "E", question: "Lo que cometemos cuando desobedecemos a Dios.", answer: "PECADO" }, // Contiene la E
      { letter: "F", question: "Lo que celebramos al santificar el domingo.", answer: "FIESTA" },
      { letter: "G", question: "Lo que recibimos de Dios cuando cumplimos su voluntad.", answer: "GRACIA" },
      { letter: "H", question: "El cuarto mandamiento: ... a tu padre y a tu madre.", answer: "HONRAR" },
      { letter: "I", question: "Lo que no debemos adorar: falsos...", answer: "ÍDOLOS" },
      { letter: "J", question: "Dios es un padre muy...", answer: "JUSTO" },
      { letter: "L", question: "Las tablas de la...", answer: "LEY" },
      { letter: "M", question: "Nombre del profeta que recibió los mandamientos.", answer: "MOISÉS" },
      { letter: "N", question: "No debemos usar el nombre de Dios en...", answer: "VANO" }, // Contiene la N
      { letter: "O", question: "Cumplir lo que Dios nos pide es...", answer: "OBEDECER" },
      { letter: "P", question: "Debemos amar al ... como a nosotros mismos.", answer: "PRÓJIMO" },
      { letter: "Q", question: "Lo que hacemos cuando cumplimos los mandamientos: ... a Dios.", answer: "QUERER" },
      { letter: "R", question: "No lo harás con las cosas ajenas.", answer: "ROBAR" },
      { letter: "S", question: "Mandamiento que dice: ... las fiestas.", answer: "SANTIFICAR" },
      { letter: "T", question: "Las que recibió Moisés en el monte Sinaí.", answer: "TABLAS" },
      { letter: "U", question: "Hay ... solo Dios verdadero.", answer: "UN" },
      { letter: "V", question: "Debemos decir siempre la...", answer: "VERDAD" },
      { letter: "X", question: "Libro de la Biblia donde están los mandamientos (Contiene la X).", answer: "ÉXODO" },
      { letter: "Y", question: "Lo que Dios hace con nosotros cuando cumplimos su ley (Contiene la Y).", answer: "AYUDAR" },
      { letter: "Z", label: "Contiene la Z", question: "¿COMO ME SIENTO CUANDO AMO A DIOS?", answer: "FELIZ" }
    ],
    intrusos: [
      { options: ["Moisés", "Tablas", "Sinaí", "Goliat"], correct: 3, explanation: "Goliat es el gigante que venció David, no aparece en los Mandamientos." },
      { options: ["No Robar", "No Matar", "No Mentir", "No Merendar"], correct: 3, explanation: "¡Merendar está permitido! No es una prohibición de los mandamientos." },
      { options: ["Éxodo", "Biblia", "Sinaí", "Jungla"], correct: 3, explanation: "La Jungla no tiene nada que ver con el desierto donde Moisés recibió la Ley." },
      { options: ["Honrar", "Santificar", "Amar", "Insultar"], correct: 3, explanation: "Insultar va en contra del amor al prójimo que nos pide Dios." },
      { options: ["Primero", "Quinto", "Décimo", "Cero"], correct: 3, explanation: "Los mandamientos empiezan por el primero, no existe el mandamiento cero." },
      { options: ["Padre", "Madre", "Dios", "Vecino"], correct: 3, explanation: "Aunque debemos amar a todos, los mandamientos señalan especialmente a Dios, Padre y Madre." }
    ],
    historias: [
      {
        title: "La entrega de la Ley",
        items: ["Dios llama a Moisés", "Moisés sube al Sinaí", "Recibe las Tablas", "Las enseña al pueblo"]
      }
    ]
  },
  "La Creación": {
    icon: "🌎",
    questions: [
      { id: 4, question: "¿Qué creó Dios el primer día?", options: ["Los animales", "La luz", "Las plantas", "El hombre"], correct: 1 },
      { id: 5, question: "¿En cuántos días creó Dios el mundo?", options: ["3", "10", "6", "1"], correct: 2 },
      { id: 6, question: "¿Quiénes fueron los primeros habitantes del Paraíso?", options: ["Pedro y Juan", "Adán y Eva", "Abraham e Isaac", "Noé y su familia"], correct: 1 },
      { id: 40, question: "¿Qué hizo Dios el séptimo día?", options: ["Creó el sol", "Descansó", "Hizo llover", "Hizo los pájaros"], correct: 1 },
      { id: 41, question: "¿A imagen de quién creó Dios al hombre y a la mujer?", options: ["A imagen de los ángeles", "A imagen de los animales", "A su propia imagen y semejanza", "A imagen de las estrellas"], correct: 2 },
      { id: 42, question: "¿Cuál de estos no fue creado por Dios?", options: ["Las nubes", "Los árboles", "El teléfono móvil", "Los elefantes"], correct: 2 }
    ],
    phrases: ["DIOS CREÓ EL CIELO Y LA TIERRA", "HÁGASE LA LUZ", "AL PRINCIPIO DIOS CREÓ TODO"],
    rosco: [
      { letter: "A", question: "Nombre del primer hombre creado por Dios.", answer: "ADÁN" },
      { letter: "B", question: "Todo lo que Dios creó era muy...", answer: "BUENO" },
      { letter: "C", question: "Dios es el ... de todo el mundo.", answer: "CREADOR" },
      { letter: "D", question: "El nombre de nuestro Creador.", answer: "DIOS" },
      { letter: "E", question: "La primera mujer, compañera de Adán.", answer: "EVA" },
      { letter: "F", question: "En plural: animales que nadan en el mar (Contiene la F).", answer: "DELFINES" },
      { letter: "G", question: "Animales muy grandes creados por Dios (Contiene la G).", answer: "GIGANTES" },
      { letter: "H", question: "Dijo Dios: '... la luz'.", answer: "HÁGASE" },
      { letter: "I", question: "Dios nos creó a su ... y semejanza.", answer: "IMAGEN" },
      { letter: "J", question: "Lugar lleno de flores que Dios plantó.", answer: "JARDÍN" },
      { letter: "L", question: "Lo que Dios creó para separar el día de la noche.", answer: "LUZ" },
      { letter: "M", question: "Donde vivimos todos los seres creados.", answer: "MUNDO" },
      { letter: "N", question: "Cuando no hay sol, llega la...", answer: "NOCHE" },
      { letter: "P", question: "El lugar de felicidad donde estaban Adán y Eva.", answer: "PARAÍSO" },
      { letter: "Q", question: "Lugar lleno de árboles donde viven los animales (Contiene la Q).", answer: "BOSQUE" },
      { letter: "R", question: "Lo que Dios hizo el séptimo día.", answer: "REPOSAR" },
      { letter: "S", question: "El astro que brilla de día.", answer: "SOL" },
      { letter: "T", question: "El nombre de nuestro planeta.", answer: "TIERRA" },
      { letter: "U", question: "Todo lo que existe en el espacio.", answer: "UNIVERSO" },
      { letter: "V", question: "Dios nos dio un soplo de...", answer: "VIDA" },
      { letter: "X", question: "Día en el que Dios creó al hombre (Contiene la X).", answer: "SEXTO" },
      { letter: "Y", question: "Dios es el ... de todo lo creado (Contiene la Y).", answer: "REY" },
      { letter: "Z", question: "Lo que hay en la creación cuando vivimos unidos (Contiene la Z).", answer: "PAZ" }
    ],
    intrusos: [
      { options: ["Sol", "Luna", "Estrellas", "Televisión"], correct: 3, explanation: "La televisión es un invento del hombre, no fue creada por Dios al inicio." },
      { options: ["Peces", "Aves", "Plantas", "Móviles"], correct: 3, explanation: "Los teléfonos móviles no son parte de la creación natural de Dios." },
      { options: ["Adán", "Eva", "Paraíso", "Rascacielos"], correct: 3, explanation: "En el paraíso no había rascacielos, solo naturaleza virgen." },
      { options: ["Montañas", "Ríos", "Mares", "Carreteras"], correct: 3, explanation: "Las carreteras las construimos nosotros, no Dios en los siete días." },
      { options: ["Luz", "Cielo", "Tierra", "Internet"], correct: 3, explanation: "Internet es tecnología humana, no una creación original." },
      { options: ["Flores", "Frutos", "Árboles", "Plástico"], correct: 3, explanation: "El plástico es un material artificial creado químicamente por humanos." }
    ],
    historias: [
      {
        title: "El orden del Génesis",
        items: ["No había nada", "Dios creó la luz", "Creó animales y plantas", "Creó al hombre y descansó"]
      }
    ]
  },
  "Sacramentos": {
    icon: "🕊️",
    questions: [
      { id: 7, question: "¿Qué sacramento nos hace hijos de Dios?", options: ["Comunión", "Bautismo", "Confirmación", "Matrimonio"], correct: 1 },
      { id: 8, question: "¿Cuántos son los Sacramentos?", options: ["3", "10", "7", "5"], correct: 2 },
      { id: 50, question: "¿Cómo se llama el sacramento de recibir el Cuerpo de Jesús?", options: ["Bautismo", "Penitencia", "Comunión (Eucaristía)", "Unción de enfermos"], correct: 2 },
      { id: 51, question: "¿Qué sacramento recibimos para que Dios perdone nuestros pecados?", options: ["Bautismo", "Penitencia (Confesión)", "Matrimonio", "Orden Sacerdotal"], correct: 1 },
      { id: 52, question: "¿Quiénes pueden recibir el sacramento del Matrimonio?", options: ["Un hombre y una mujer", "Los niños pequeños", "Solo los sacerdotes", "Cualquier grupo de amigos"], correct: 0 }
    ],
    phrases: ["EL BAUTISMO NOS HACE HIJOS DE DIOS", "RECIBID EL ESPÍRITU SANTO"],
    rosco: [
      { letter: "A", question: "Sacramento que nos perdona los pecados (Contiene la A).", answer: "PENITENCIA" },
      { letter: "B", question: "El sacramento que nos limpia el pecado original.", answer: "BAUTISMO" },
      { letter: "C", question: "Recibimos el cuerpo de Jesús en la Primera...", answer: "COMUNIÓN" },
      { letter: "D", question: "Jesús está ... en el sagrario.", answer: "DENTRO" },
      { letter: "E", question: "Sacramento para los que están muy .........", answer: "ENFERMOS" },
      { letter: "F", question: "Sacramento que nos confirma en la fe (Contiene la F).", answer: "CONFIRMACIÓN" },
      { letter: "G", question: "Lo que recibimos de Dios con los sacramentos.", answer: "GRACIA" },
      { letter: "H", question: "Por el bautismo somos ... de Dios.", answer: "HIJOS" },
      { letter: "I", question: "Los sacramentos nos unen a la...", answer: "IGLESIA" },
      { letter: "J", question: "Él es quien instituyó todos los sacramentos.", answer: "JESÚS" },
      { letter: "L", question: "Lo que hacen los sacramentos con nuestra alma.", answer: "LAVAR" },
      { letter: "M", question: "Sacramento de amor entre un hombre y una mujer.", answer: "MATRIMONIO" },
      { letter: "N", question: "Sacramento que recibimos cuando estamos muy enfermos (Contiene la N).", answer: "UNCIÓN" },
      { letter: "Ñ", question: "Personas que suelen recibir la Primera Comunión (Contiene la Ñ).", answer: "NIÑOS" },
      { letter: "O", question: "Sacramento para ser sacerdote.", answer: "ORDEN" },
      { letter: "P", question: "Lo que recibimos en la confesión.", answer: "PERDÓN" },
      { letter: "Q", label: "Contiene la Q", question: "Persona que nos enseña y nos prepara para recibir los sacramentos.", answer: "CATEQUISTA" },
      { letter: "R", question: "Otro nombre para el sacramento de la confesión.", answer: "RECONCILIACIÓN" },
      { letter: "S", question: "Los sacramentos son ... sagrados.", answer: "SIGNOS" },
      { letter: "T", question: "Jesús nos entrega ... su amor (Empieza por T).", answer: "TODO" },
      { letter: "U", label: "Contiene la U", question: "Los sacramentos nos ayudan a vivir en ... con Jesús.", answer: "UNIÓN" },
      { letter: "V", question: "Lo que se convierte en la sangre de Cristo.", answer: "VINO" },
      { letter: "X", question: "Nombre completo de la unción de los enfermos (Contiene la X).", answer: "EXTREMAUNCIÓN" },
      { letter: "Y", question: "La gracia nos sirve para ... a los demás (Contiene la Y).", answer: "AYUDAR" },
      { letter: "Z", label: "Contiene la Z", question: "Copa donde el vino se convierte en la Sangre de Jesús.", answer: "CÁLIZ" }
    ],
    intrusos: [
      { options: ["Bautismo", "Comunión", "Confesión", "Feria"], correct: 3, explanation: "La feria es una fiesta popular, no un sacramento de la Iglesia." },
      { options: ["Agua", "Aceite", "Pan y Vino", "Helado"], correct: 3, explanation: "El helado es muy rico, pero no se usa en la liturgia de los sacramentos." },
      { options: ["Sacerdote", "Obispo", "Papa", "Pirata"], correct: 3, explanation: "Los piratas no tienen el Orden Sacerdotal para dar sacramentos." },
      { options: ["Matrimonio", "Unción", "Confirmación", "Excursión"], correct: 3, explanation: "Ir de excursión es genial, pero no es un sacramento." },
      { options: ["Gracia", "Perdón", "Amor", "Dinero"], correct: 3, explanation: "Los sacramentos son gratuitos, nos dan la Gracia de Dios, no dinero." },
      { options: ["Iglesia", "Sagrario", "Altar", "Piscina"], correct: 3, explanation: "Los sacramentos se celebran en la Iglesia, no en la piscina." }
    ],
    historias: [
      {
        title: "La vida cristiana",
        items: ["Bautismo (Nacemos)", "Confirmación (Crecemos)", "Eucaristía (Alimento)", "Confesión (Perdón)"]
      }
    ]
  },
  "La Biblia": {
    icon: "📖",
    questions: [
      { id: 60, question: "¿Quién es el autor principal de la Biblia por inspiración divina?", options: ["Los reyes", "Dios", "Los soldados", "Los científicos"], correct: 1 },
      { id: 61, question: "¿En cuántas partes principales se divide la Biblia?", options: ["Tres", "Cinco", "Dos (Antiguo y Nuevo Testamento)", "Diez"], correct: 2 },
      { id: 62, question: "¿Cómo se llama el primer libro de la Biblia?", options: ["Apocalipsis", "Éxodo", "Génesis", "Salmos"], correct: 2 },
      { id: 63, question: "¿Quiénes escribieron los cuatro Evangelios?", options: ["David y Goliat", "Mateo, Marcos, Lucas y Juan", "Pedro y Pablo", "Moisés y Abraham"], correct: 1 },
      { id: 64, question: "¿Qué libro contiene los cánticos y oraciones del Rey David?", options: ["Génesis", "Salmos", "Levítico", "Mateo"], correct: 1 },
      { id: 65, question: "¿Cuántos libros tiene la Biblia Católica?", options: ["10", "40", "73", "100"], correct: 2 },
      { id: 66, question: "¿Cuál es el último libro de la Biblia?", options: ["Génesis", "Hechos", "Apocalipsis", "Romanos"], correct: 2 }
    ],
    phrases: ["TU PALABRA ES LÁMPARA PARA MIS PASOS", "NO SOLO DE PAN VIVE EL HOMBRE", "PEDID Y SE OS DARÁ"],
    rosco: [
      { letter: "A", question: "Acuerdo de amor entre Dios y su pueblo.", answer: "ALIANZA" },
      { letter: "B", question: "El libro sagrado de los cristianos.", answer: "BIBLIA" },
      { letter: "C", question: "Cada una de las divisiones grandes de un libro bíblico.", answer: "CAPÍTULO" },
      { letter: "D", question: "Rey que venció a Goliat y escribió salmos.", answer: "DAVID" },
      { letter: "E", question: "Significa 'Buena Noticia'.", answer: "EVANGELIO" },
      { letter: "F", label: "Contiene la F", question: "Lo que necesitamos para creer en la Palabra de Dios.", answer: "FE" },
      { letter: "G", question: "Primer libro que narra la Creación.", answer: "GÉNESIS" },
      { letter: "H", label: "Contiene la H", question: "Libro sobre la vida de los primeros cristianos: ... de los Apóstoles.", answer: "HECHOS" },
      { letter: "I", question: "Dios ayudó a los autores a escribir: ... divina.", answer: "INSPIRACIÓN" },
      { letter: "J", question: "Discípulo amado y autor de un evangelio.", answer: "JUAN" },
      { letter: "L", question: "Evangelista que era médico.", answer: "LUCAS" },
      { letter: "M", question: "El evangelio más corto.", answer: "MARCOS" },
      { letter: "N", question: "La parte de la Biblia que cuenta la vida de Jesús: ... Testamento.", answer: "NUEVO" },
      { letter: "O", label: "Contiene la O", question: "Hablar con Dios usando sus palabras.", answer: "ORACIÓN" },
      { letter: "P", question: "Hombres que hablaban en nombre de Dios.", answer: "PROFETAS" },
      { letter: "Q", label: "Contiene la Q", question: "Lo que Dios nos pide al leer la Biblia: que le lleguemos a...", answer: "QUERER" },
      { letter: "R", question: "Dios se nos da a conocer: La ... divina.", answer: "REVELACIÓN" },
      { letter: "S", question: "Poemas religiosos para cantar a Dios.", answer: "SALMOS" },
      { letter: "T", question: "Cada una de las dos grandes partes de la Biblia.", answer: "TESTAMENTO" },
      { letter: "U", label: "Contiene la U", question: "La Biblia es un mensaje ... (para todo el mundo).", answer: "UNIVERSAL" },
      { letter: "V", question: "Cada una de las frases numeradas en la Biblia.", answer: "VERSÍCULO" },
      { letter: "X", label: "Contiene la X", question: "Segundo libro de la Biblia donde Moisés libera al pueblo.", answer: "ÉXODO" },
      { letter: "Y", label: "Contiene la Y", question: "La Palabra de Dios nos sirve de ... en la vida.", answer: "AYUDA" },
      { letter: "Z", label: "Contiene la Z", question: "Pueblo donde creció Jesús después de volver de Egipto.", answer: "NAZARET" }
    ],
    intrusos: [
      { options: ["Génesis", "Salmos", "Mateo", "Pinocho"], correct: 3, explanation: "Pinocho es un cuento infantil, no un libro de la Biblia." },
      { options: ["Moisés", "Noé", "David", "Spiderman"], correct: 3, explanation: "Spiderman es un superhéroe de Marvel, no un personaje bíblico." },
      { options: ["Lucas", "Marcos", "Juan", "Lucas Grijander"], correct: 3, explanation: "¡Ese Lucas es un humorista! El evangelista se llama solo Lucas." },
      { options: ["Parábola", "Milagro", "Profecía", "Wifi"], correct: 3, explanation: "En tiempos bíblicos no existía el Wifi, ¡aunque Dios está conectado con todos!" },
      { options: ["Oro", "Incienso", "Mirra", "Carbón"], correct: 3, explanation: "Los Reyes Magos no llevaron carbón al Niño Jesús." },
      { options: ["Paloma", "Cordero", "Pez", "Dragón"], correct: 3, explanation: "El dragón no es un símbolo de paz o de Jesús en la Biblia." }
    ],
    historias: [
      {
        title: "El Arca de Noé",
        items: ["Dios avisa a Noé del diluvio", "Noé construye el gran Arca", "Suben los animales por parejas", "Sale el Arco Iris como promesa"]
      }
    ]
  },
  "María, nuestra Madre": {
    icon: "🌹",
    questions: [
      { id: 70, question: "¿Cómo se llama el esposo de la Virgen María?", options: ["San Pedro", "San José", "San Juan", "San Mateo"], correct: 1 },
      { id: 71, question: "¿En qué ciudad vivía María cuando el Ángel la visitó?", options: ["Roma", "Jerusalén", "Nazaret", "Belén"], correct: 2 },
      { id: 72, question: "¿Qué Ángel anunció a María que sería la Madre de Jesús?", options: ["Ángel Rafael", "Ángel Gabriel", "Ángel Miguel", "Ángel de la Guarda"], correct: 1 },
      { id: 73, question: "¿Cómo se llama la prima de María a la que fue a visitar?", options: ["Marta", "Isabel", "Magdalena", "Verónica"], correct: 1 },
      { id: 74, question: "¿Cuál es la oración más famosa dedicada a María?", options: ["Padre Nuestro", "Ave María", "Gloria", "Credo"], correct: 1 },
      { id: 75, question: "¿A qué país huyeron María, José y el Niño para escapar de Herodes?", options: ["España", "Grecia", "Egipto", "Francia"], correct: 2 },
      { id: 76, question: "¿Es María también nuestra madre del cielo?", options: ["No, solo de Jesús", "Sí, es madre de todos los cristianos", "Solo de los santos", "No sabemos"], correct: 1 }
    ],
    phrases: ["HÁGASE EN MÍ SEGÚN TU PALABRA", "MARÍA ES LA MADRE DE LA IGLESIA", "BENDITA TÚ ERES ENTRE LAS MUJERES"],
    rosco: [
      { letter: "A", question: "Momento en que el Ángel visita a María.", answer: "ANUNCIACIÓN" },
      { letter: "B", question: "Ciudad donde María dio a luz a Jesús.", answer: "BELÉN" },
      { letter: "C", question: "Bodas donde María dijo: 'Haced lo que Él os diga'.", answer: "CANÁ" },
      { letter: "D", label: "Contiene la D", question: "Lo que María guardaba en su corazón (sus ...).", answer: "RECUERDOS" },
      { letter: "E", label: "Contiene la E", question: "Nombre de la prima de María.", answer: "ISABEL" },
      { letter: "F", question: "Lugar de Portugal donde se apareció la Virgen a tres pastorcitos.", answer: "FÁTIMA" },
      { letter: "G", question: "Nombre del Arcángel de la Anunciación.", answer: "GABRIEL" },
      { letter: "H", question: "Jesús es el ... de María.", answer: "HIJO" },
      { letter: "I", question: "María fue concebida sin pecado: La ... Concepción.", answer: "INMACULADA" },
      { letter: "J", question: "Nombre del esposo de María.", answer: "JOSÉ" },
      { letter: "L", question: "Lugar de Francia famoso por las apariciones de María.", answer: "LOURDES" },
      { letter: "M", question: "Nombre de nuestra Madre del cielo.", answer: "MARÍA" },
      { letter: "N", question: "Pueblo donde vivía la Sagrada Familia.", answer: "NAZARET" },
      { letter: "O", question: "Lo que María hizo al aceptar la voluntad de Dios: ...", answer: "OBEDECER" },
      { letter: "P", question: "María es la siempre ... (limpia de pecado).", answer: "PURÍSIMA" },
      { letter: "Q", label: "Contiene la Q", question: "Lo que sentimos por María.", answer: "QUERER" },
      { letter: "R", question: "Oración en la que repetimos el Ave María mientras pensamos en Jesús.", answer: "ROSARIO" },
      { letter: "S", question: "Oración que empieza diciendo: 'Dios te ..., Reina y Madre de misericordia'.", answer: "SALVE" },
      { letter: "T", label: "Contiene la T", question: "Donde encontraron a Jesús perdido, hablando con los doctores.", answer: "TEMPLO" },
      { letter: "U", label: "Contiene la U", question: "Cuando María subió al cielo en cuerpo y alma: La ...", answer: "ASUNCIÓN" },
      { letter: "V", question: "Título que damos a María: La ... María.", answer: "VIRGEN" },
      { letter: "X", label: "Contiene la X", question: "María es nuestra ... (nos ayuda en las dificultades).", answer: "AUXILIADORA" },
      { letter: "Y", label: "Contiene la Y", question: "María nos dio al mundo un ... de luz (Jesús).", answer: "RAYO" },
      { letter: "Z", label: "Contiene la Z", question: "La Virgen es nuestra madre y nuestra ...", answer: "ESPERANZA" }
    ],
    intrusos: [
      { options: ["Gabriel", "José", "Isabel", "Superman"], correct: 3, explanation: "Superman es de otro planeta, ¡no salía en Nazaret!" },
      { options: ["Rosario", "Ave María", "Salve", "Rock and Roll"], correct: 3, explanation: "El Rock and Roll es música moderna, no una oración tradicional a María." },
      { options: ["Fátima", "Lourdes", "Carmen", "Disneyland"], correct: 3, explanation: "Disneyland es un parque de atracciones, no un lugar de devoción a María." },
      { options: ["Azul", "Blanco", "Celeste", "Marrón"], correct: 3, explanation: "María suele vestir de azul y blanco, ¡no de colores sucios!" },
      { options: ["Madre", "Reina", "Virgen", "Abuela"], correct: 3, explanation: "Aunque Jesús tuvo abuelos (Ana y Joaquín), 'Abuela' no es un título mariano." },
      { options: ["Portal", "Estrella", "Ángel", "Dinosaurio"], correct: 3, explanation: "En el Belén no había dinosaurios, se extinguieron mucho antes." }
    ],
    historias: [
      {
        title: "La Anunciación",
        items: ["María está orando en Nazaret", "Aparece el Ángel Gabriel", "El Ángel le da el mensaje", "María dice: 'Hágase en mí'"]
      }
    ]
  }
};

// Nueva lista oficial de alumnos (Filtrada a los proporcionados)
const INITIAL_STUDENTS = [
  { id: 101, name: 'Adrian', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/ADRIAN.jpg' },
  { id: 102, name: 'Alejandra', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/ALEJANDRA.jpg' },
  { id: 103, name: 'Marina', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/MARINA.jpg' },
  { id: 104, name: 'MA.CASES', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/MIGUELANGELCASES.jpg' },
  { id: 105, name: 'Miguel Angel', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/MIGUELANGEL .jpg' },
  { id: 106, name: 'Enzo', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/enzo.jpg' },
  { id: 108, name: 'Jose Francisco', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JF&backgroundColor=4a90e2&fontSize=45' },
  { id: 109, name: 'Cristina', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/CRISTINA.jpg' },
  { id: 111, name: 'Celia', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/CELIA.jpg' },
  { id: 112, name: 'Valentina', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/VALENTINA.jpg' },
  { id: 113, name: 'Lucía', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/LUCIA.png' },
  { id: 114, name: 'Elena', totalScore: 0, dailyScore: 0, behaviorMedals: 0, readingMerits: 0, attendance: 0, avatar: 'AVATARES/ELENA.jpg' },
];

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('catequesis_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  useEffect(() => {
    // Asegurar el nombre correcto de MA.CASES por código
    setStudents(prev => prev.map(s => (s.id === 104 && s.name !== 'MA.CASES') ? { ...s, name: 'MA.CASES' } : s));
  }, []);

  const [view, setView] = useState('general'); // 'general' or 'daily'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null); // Para la ficha del alumno
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Fecha de la jornada
  const lastFanfareRef = useRef(0);
  const lastRaffleRef = useRef(0);
  const lastStarsRef = useRef(0);
  const raffleAudioRef = useRef(null);
  const cannonPowerRef = useRef(45);
  const lastCannonClickRef = useRef(0);
  const [showRankingList, setShowRankingList] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [appZoom, setAppZoom] = useState(() => {
    const saved = localStorage.getItem('catequesis_zoom');
    return saved ? parseFloat(saved) : 1.0;
  });

  useEffect(() => {
    localStorage.setItem('catequesis_zoom', appZoom);
  }, [appZoom]);

  const handleLogin = (e) => {
    e?.preventDefault();
    if (passwordInput.toUpperCase() === 'JUANCATE') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  // AULA (Aula Virtual) State
  const [showAulaModal, setShowAulaModal] = useState(false);
  const [aulaStep, setAulaStep] = useState('themes'); // 'themes', 'activities', 'quiz', 'phrase', 'pasapalabra'
  const [selectedAulaTema, setSelectedAulaTema] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);

  // Guess the Phrase State
  const [phraseGame, setPhraseGame] = useState({
    original: '',
    revealed: [],
    timeLeft: 60,
    status: 'playing', // 'playing', 'won', 'lost'
    usedLetters: [],
    isPaused: false,
    selectedTeamIds: [], // Para selección temporal
    teams: [], // Array de { name: string, studentIds: [] }
    currentTeamIdx: 0, // Índice del equipo que tiene el turno
  });

  // Pasapalabra State
  const [pasapalabra, setPasapalabra] = useState({
    rosco: [], // [{ letter: 'A', question: '...', answer: '...', status: 'pending' }]
    currentIdx: 0,
    timeLeft: 300,
    status: 'playing', // 'playing', 'finished'
    teams: [],
    currentTeamIdx: 0,
    isPaused: false,
    inputValue: '',
    showAnswer: null,
    pointsAwarded: false
  });

  // El Intruso State
  const [intrusoGame, setIntrusoGame] = useState({
    challenges: [],
    currentIdx: 0,
    status: 'playing', // 'playing', 'finished'
    teams: [],
    currentTeamIdx: 0,
    pointsAwarded: false,
    showExplanation: null
  });

  // Ordenar Historia State
  const [historiaGame, setHistoriaGame] = useState({
    challenges: [], // Array de { items: [], title: '' }
    currentIdx: 0,
    status: 'playing', // 'playing', 'finished'
    teams: [],
    currentTeamIdx: 0,
    pointsAwarded: false,
    timeLeft: 60,
    isPaused: false
  });

  const [aulaTeams, setAulaTeams] = useState([]); // Equipos para el juego actual
  const [currentTeamName, setCurrentTeamName] = useState('');
  const [gameRules, setGameRules] = useState(null); // { title, description, points, icon, nextStep }

  const [currentTheme, setCurrentTheme] = useState(Object.keys(AULA_TEMAS)[0]); // Tema de hoy
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('catequesis_history');
    return saved ? JSON.parse(saved) : {};
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [rankingType, setRankingType] = useState('general'); // 'general', 'behavior', 'reading', 'attendance'

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizStudentId, setQuizStudentId] = useState(null);
  const [raffleState, setRaffleState] = useState({
    active: false,
    teams: [],
    winnerIdx: null,
    highlightedIdx: null,
    onComplete: null
  });

  useEffect(() => {
    localStorage.setItem('catequesis_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('catequesis_history', JSON.stringify(history));
  }, [history]);

  // Estado para la gran celebración
  const [apotheosic, setApotheosic] = useState(false);

  // Estado para temas completados y expandidos
  const [completedThemes, setCompletedThemes] = useState(() => {
    const saved = localStorage.getItem('catequesis_completed_themes');
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedThemes, setExpandedThemes] = useState({});

  useEffect(() => {
    localStorage.setItem('catequesis_completed_themes', JSON.stringify(completedThemes));
  }, [completedThemes]);

  const markThemeCompleted = (theme, status) => {
    setCompletedThemes(prev => {
      const isCurrently = prev.includes(theme);
      const shouldBe = status !== undefined ? status : !isCurrently;

      if (shouldBe === isCurrently) return prev;

      if (shouldBe) {
        return [...prev, theme];
      } else {
        return prev.filter(t => t !== theme);
      }
    });
  };

  const toggleThemeExpanded = (theme) => {
    setExpandedThemes(prev => ({ ...prev, [theme]: !prev[theme] }));
  };

  const playSound = (type) => {
    // Si es la fanfarria, el Sorteo o el Polvo de Estrellas, evitamos que se solape
    if (type === 'fanfare' || type === 'raffle' || type === 'stars') {
      const now = Date.now();
      let limit = 5000;
      let lastRef = lastStarsRef;

      if (type === 'fanfare') { limit = 10000; lastRef = lastFanfareRef; }
      else if (type === 'raffle') { limit = 5000; lastRef = lastRaffleRef; }

      if (now - lastRef.current < limit) return;
      lastRef.current = now;
    }

    const sounds = {
      magic: 'https://www.soundjay.com/buttons/sounds/button-10.mp3', // Estrellas/Magia
      stars: '/polvodeestrellas.mp3', // Nuevo sonido para cañones
      fanfare: '/GLORIA.mp3', // Himno especial GLORIA
      success: '/ACIERTOLETRA.mp3', // Acierto de letra personalizado
      error: '/ERROR.mp3', // Pitido de error personalizado
      raffle: '/GANADORSORTEO.mp3', // Melodía del ganador
      raffleDuring: '/DURANTESORTEO.mp3' // Melodía durante el sorteo
    };

    try {
      const audio = new Audio(sounds[type]);
      audio.volume = 0.9;
      audio.play().catch(e => console.log("Audio play blocked by browser. Click anywhere on the page first.", e));
    } catch (err) {
      console.error("Error playing sound", err);
    }
  };

  const triggerFlares = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Bengala izquierda potente
    confetti({
      particleCount: 200,
      angle: 65,
      spread: 80,
      origin: { x: 0, y: 1 },
      colors: ['#fbbf24', '#f59e0b', '#ffffff', '#ffd700'],
      startVelocity: 95,
      gravity: 0.8,
      zIndex: 9999
    });
    // Bengala derecha potente
    confetti({
      particleCount: 200,
      angle: 115,
      spread: 80,
      origin: { x: 1, y: 1 },
      colors: ['#fbbf24', '#f59e0b', '#ffffff', '#ffd700'],
      startVelocity: 95,
      gravity: 0.8,
      zIndex: 9999
    });

    playSound('stars');
  };

  const updatePoints = (id, amount, isMedal = false) => {
    setStudents(prev => {
      // 1. Calcular el ranking ANTES de la actualización
      const getSorted = (list) => [...list].sort((a, b) => {
        const scoreA = view === 'general' ? a.totalScore : a.dailyScore;
        const scoreB = view === 'general' ? b.totalScore : b.dailyScore;
        if (scoreB !== scoreA) return scoreB - scoreA;
        if ((b.behaviorMedals || 0) !== (a.behaviorMedals || 0)) return (b.behaviorMedals || 0) - (a.behaviorMedals || 0);
        if ((b.readingMerits || 0) !== (a.readingMerits || 0)) return (b.readingMerits || 0) - (a.readingMerits || 0);
        return a.name.localeCompare(b.name);
      });

      const beforeSorted = getSorted(prev);
      const beforeLeader = beforeSorted[0];
      const beforeLeaderScore = view === 'general' ? (beforeLeader?.totalScore || 0) : (beforeLeader?.dailyScore || 0);
      const beforeIds = beforeSorted.slice(0, 5).map(s => s.id);

      // 2. Actualizar puntos
      const updated = prev.map(s => {
        if (s.id === id) {
          const newTotal = Math.max(0, s.totalScore + amount);
          const newDaily = s.dailyScore + amount;
          return { ...s, totalScore: newTotal, dailyScore: newDaily };
        }
        return s;
      });

      // 3. Calcular ranking DESPUÉS
      const afterSorted = getSorted(updated);
      const afterIds = afterSorted.slice(0, 5).map(s => s.id);

      // 4. Actualizar HISTORIAL
      setHistory(prev => {
        const day = prev[selectedDate] || {};
        const studentDay = day[id] || { points: 0, attendance: 0, medals: 0, reading: 0 };
        return {
          ...prev,
          [selectedDate]: {
            ...day,
            [id]: { ...studentDay, points: (studentDay.points || 0) + amount }
          }
        };
      });

      // 5. Lógica de celebraciones especiales
      const enteredPodium = !beforeIds.includes(id) && afterIds.includes(id);
      // Se convierte en líder si: ahora es el #1 Y (antes no lo era O el #1 de antes tenía 0 puntos)
      const becameLeader = afterIds[0] === id && (beforeIds[0] !== id || beforeLeaderScore === 0);

      if (amount > 0) {
        if (becameLeader) {
          playSound('fanfare');
          setApotheosic(true);
          setTimeout(() => setApotheosic(false), 6000);
          // Celebración MÁXIMA: Ha alcanzado el 1er puesto (nuevo líder)
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            triggerLeaderFireworks();
          }, 100);
        } else if (enteredPodium) {
          playSound('fanfare');
          setApotheosic(true);
          setTimeout(() => setApotheosic(false), 5000);
          // Celebración Grande: Ha entrado en el podio (1º, 2º o 3º) por primera vez en esta actualización
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            triggerMassiveStars();
          }, 100);
        } else {
          // Si no cambia el líder ni entra al podio, solo estrellas suaves
          triggerSuccessEffect();
        }
      }

      return updated;
    });
  };

  const updateMedals = (id, amount) => {
    // 1. Buscamos al alumno para pre-calcular el bonus
    const student = students.find(s => s.id === id);
    if (!student) return;

    const oldMedals = student.behaviorMedals || 0;
    const newVal = Math.max(0, oldMedals + amount);

    // Si aumenta y cruza un múltiplo de 10
    const earnedBonus = amount > 0 && Math.floor(newVal / 10) > Math.floor(oldMedals / 10);

    // 2. Actualizamos el estado de los alumnos
    setStudents(prev => prev.map(s => s.id === id ? { ...s, behaviorMedals: newVal } : s));

    // 3. Si hay bonus, sumamos puntos con una pequeña espera
    if (earnedBonus) {
      setTimeout(() => {
        updatePoints(id, 10);
        triggerLeaderFireworks();
        alert(`🎖️ ¡HITO ALCANZADO! ${student.name} ha acumulado ${newVal} medallas. ¡Recibe un premio especial de +10 Estrellas! ✨`);
      }, 500);
    }

    // 4. Actualizamos el historial
    setHistory(prev => {
      const day = prev[selectedDate] || {};
      const studentDay = day[id] || { points: 0, attendance: 0, medals: 0, reading: 0 };
      return {
        ...prev,
        [selectedDate]: {
          ...day,
          [id]: { ...studentDay, medals: newVal }
        }
      };
    });
  };

  const updateReadingMerits = (id, amount) => {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const oldVal = student.readingMerits || 0;
    const newVal = Math.max(0, oldVal + amount);
    const earnedBonus = amount > 0 && Math.floor(newVal / 10) > Math.floor(oldVal / 10);

    setStudents(prev => prev.map(s => s.id === id ? { ...s, readingMerits: newVal } : s));

    if (earnedBonus) {
      setTimeout(() => {
        updatePoints(id, 10);
        triggerLeaderFireworks();
        alert(`📖 ¡GRAN LECTOR! ${student.name} ha alcanzado las ${newVal} lecturas. ¡Recompensa de +10 Estrellas! 🌟`);
      }, 500);
    }

    setHistory(prev => {
      const day = prev[selectedDate] || {};
      const studentDay = day[id] || { points: 0, attendance: 0, medals: 0, reading: 0 };
      return {
        ...prev,
        [selectedDate]: {
          ...day,
          [id]: { ...studentDay, reading: newVal }
        }
      };
    });
  };

  const updateAttendance = (id, amount) => {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const oldVal = student.attendance || 0;
    const newVal = Math.max(0, oldVal + amount);
    const earnedBonus = amount > 0 && Math.floor(newVal / 10) > Math.floor(oldVal / 10);

    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, attendance: newVal };
      }
      return s;
    }));

    if (earnedBonus) {
      setTimeout(() => {
        updatePoints(id, 10); // +10 extra por el hito de 10 días
        triggerLeaderFireworks();
        alert(`📅 ¡CONSTANCIA PREMIADA! ${student.name} ya lleva ${newVal} días viniendo a Catequesis. ¡Premio extra de +10 Estrellas! ✨`);
      }, 500);
    }

    setHistory(prev => {
      const day = prev[selectedDate] || {};
      const studentDay = day[id] || { points: 0, attendance: 0, medals: 0, reading: 0 };
      return {
        ...prev,
        [selectedDate]: {
          ...day,
          [id]: { ...studentDay, attendance: newVal }
        }
      };
    });
  };

  const renameStudent = (id, currentName) => {
    const newNameStr = prompt("Nuevo nombre para el joven:", currentName);
    if (newNameStr !== null && newNameStr.trim() !== "") {
      const finalName = newNameStr.trim();
      setStudents(prev => prev.map(s => s.id === id ? { ...s, name: finalName } : s));
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(prev => ({ ...prev, name: finalName }));
      }
    }
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newStudent = {
      id: Date.now(),
      name: newName,
      totalScore: 0,
      dailyScore: 0,
      behaviorMedals: 0,
      readingMerits: 0,
      attendance: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newName}`
    };
    setStudents([...students, newStudent]);
    setNewName('');
    setShowAddModal(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 1) {
      const student = students.find(s =>
        s.name.toLowerCase().includes(term.toLowerCase())
      );
      if (student) {
        const element = document.getElementById(`student-${student.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Opcional: añadimos un pequeño efecto visual temporal
          element.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
          setTimeout(() => {
            element.style.backgroundColor = 'white';
          }, 2000);
        }
      }
    }
  };

  const handleQuizAnswer = (optionIdx) => {
    const isCorrect = optionIdx === activeQuestion.correct;

    if (isCorrect) {
      playSound('success');
      // Retrasamos un poco el alert para que no bloquee el inicio del sonido
      setTimeout(() => {
        updatePoints(quizStudentId, 5);
        alert('¡MAGNÍFICO! +5 estrellas por tu fe ✨');
        setAulaStep('themes');
      }, 100);
    } else {
      playSound('error');
      setTimeout(() => {
        updatePoints(quizStudentId, -2);
        alert('¡Casi! Sigue estudiando el tema. -2 puntos.');
        setAulaStep('themes');
      }, 100);
    }
  };

  const showRules = (info, returnStep = 'activities') => {
    setGameRules({ ...info, returnStep });
    setAulaStep('rules');
  };

  const startPasapalabraGame = (temaName, teams = [], initialTeamIdx = 0) => {
    const roscoData = AULA_TEMAS[temaName].rosco.map(item => ({
      ...item,
      status: 'pending' // 'pending', 'success', 'error'
    }));

    setPasapalabra({
      rosco: roscoData,
      currentIdx: 0,
      timeLeft: 300,
      status: 'playing',
      teams: teams.map(t => ({ ...t, hits: 0, errors: 0 })),
      currentTeamIdx: initialTeamIdx,
      isPaused: false,
      inputValue: '',
      showAnswer: null,
      pointsAwarded: false,
      isPerfectStreak: true // Comienza en true, se pierde al fallar o pasar palabra
    });
    setAulaStep('pasapalabra');
  };

  // Efecto para premiar al final del Pasapalabra
  useEffect(() => {
    if (showAulaModal && aulaStep === 'pasapalabra' && pasapalabra.status === 'finished' && !pasapalabra.pointsAwarded) {
      playSound('fanfare');

      const pointsPerHit = 2;
      let summary = "🎉 ¡Resultados del Rosco!\n";

      pasapalabra.teams.forEach((team, idx) => {
        if (team.hits > 0) {
          const isWinnerStreak = pasapalabra.isPerfectStreak && idx === pasapalabra.currentTeamIdx && team.hits === pasapalabra.rosco.length;
          const pointsTotal = isWinnerStreak ? 100 : (team.hits * pointsPerHit);

          team.studentIds.forEach(id => updatePoints(id, pointsTotal));

          if (isWinnerStreak) {
            summary += `🔥 ¡ROSCO PERFECTO! ${team.name}: +100 estrellas por completarlo del tirón.\n`;
          } else {
            summary += `✨ ${team.name}: ${team.hits} aciertos = ${pointsTotal} estrellas cada uno.\n`;
          }
        } else {
          summary += `ℹ️ ${team.name}: Sin aciertos.\n`;
        }
      });

      setPasapalabra(prev => ({ ...prev, pointsAwarded: true }));

      setTimeout(() => {
        alert(summary);
      }, 500);
    }
  }, [pasapalabra.status, pasapalabra.pointsAwarded, aulaStep, showAulaModal]);

  // Auto-continuar Rosco tras fallo (para que el catequista no tenga que pulsar "Continuar")
  useEffect(() => {
    let timer;
    if (pasapalabra.showAnswer && pasapalabra.isPaused && pasapalabra.status === 'playing') {
      timer = setTimeout(() => {
        nextAfterError();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [pasapalabra.showAnswer, pasapalabra.isPaused, pasapalabra.status]);

  const handlePasapalabraAnswer = (answer) => {
    if (pasapalabra.status !== 'playing' || pasapalabra.isPaused) return;

    const currentItem = pasapalabra.rosco[pasapalabra.currentIdx];
    const isCorrect = answer.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
      currentItem.answer.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Sonido fuera del setter
    if (isCorrect) playSound('success');
    else playSound('error');

    setPasapalabra(prev => {
      const newRosco = [...prev.rosco];
      newRosco[prev.currentIdx] = {
        ...newRosco[prev.currentIdx],
        status: isCorrect ? 'success' : 'error'
      };

      // Inmutabilidad para los equipos
      const newTeams = prev.teams.map((t, idx) => {
        if (idx !== prev.currentTeamIdx) return t;
        return {
          ...t,
          hits: isCorrect ? t.hits + 1 : t.hits,
          errors: !isCorrect ? t.errors + 1 : t.errors
        };
      });

      // Buscar el siguiente índice pendiente
      let nextIdx = (prev.currentIdx + 1) % prev.rosco.length;
      let count = 0;
      while (newRosco[nextIdx].status !== 'pending' && count < prev.rosco.length) {
        nextIdx = (nextIdx + 1) % prev.rosco.length;
        count++;
      }

      const allFinished = newRosco.every(item => item.status !== 'pending');
      // NO finalizamos si fallamos la última, para poder mostrar la respuesta correcta
      const nextStatus = (allFinished && isCorrect) ? 'finished' : 'playing';

      // Cambiar turno si hay fallo y hay equipos
      let nextTeamIdx = prev.currentTeamIdx;
      if (!isCorrect && prev.teams.length > 1 && nextStatus === 'playing') {
        nextTeamIdx = (prev.currentTeamIdx + 1) % prev.teams.length;
      }

      return {
        ...prev,
        rosco: newRosco,
        teams: newTeams,
        currentIdx: (isCorrect && nextStatus === 'playing') ? nextIdx : prev.currentIdx,
        status: nextStatus,
        currentTeamIdx: nextTeamIdx,
        inputValue: '',
        showAnswer: isCorrect ? null : currentItem.answer,
        isPaused: !isCorrect, // Siempre pausamos al fallar para mostrar la respuesta
        isPerfectStreak: isCorrect ? prev.isPerfectStreak : false
      };
    });
  };

  const nextAfterError = () => {
    setPasapalabra(prev => {
      const allFinished = prev.rosco.every(item => item.status !== 'pending');
      if (allFinished) {
        return { ...prev, showAnswer: null, isPaused: false, status: 'finished' };
      }

      let nextIdx = (prev.currentIdx + 1) % prev.rosco.length;
      let count = 0;
      while (prev.rosco[nextIdx].status !== 'pending' && count < prev.rosco.length) {
        nextIdx = (nextIdx + 1) % prev.rosco.length;
        count++;
      }
      return { ...prev, currentIdx: nextIdx, showAnswer: null, isPaused: false };
    });
  };

  const skipPasapalabra = () => {
    setPasapalabra(prev => {
      let nextIdx = (prev.currentIdx + 1) % prev.rosco.length;
      let count = 0;
      while (prev.rosco[nextIdx].status !== 'pending' && count < prev.rosco.length) {
        nextIdx = (nextIdx + 1) % prev.rosco.length;
        count++;
      }

      // Cambiar turno en pasapalabra
      let nextTeamIdx = prev.currentTeamIdx;
      if (prev.teams.length > 1) {
        nextTeamIdx = (prev.currentTeamIdx + 1) % prev.teams.length;
      }

      return { ...prev, currentIdx: nextIdx, currentTeamIdx: nextTeamIdx, inputValue: '', isPerfectStreak: false };
    });
  };

  const startIntrusoGame = (temaName, teams = [], initialTeamIdx = 0) => {
    // Mezclamos todos los intrusos disponibles y cogemos solo tantos como equipos haya
    const allIntrusos = [...AULA_TEMAS[temaName].intrusos].sort(() => Math.random() - 0.5);
    const selectedIntrusos = allIntrusos.slice(0, teams.length);

    setIntrusoGame({
      challenges: selectedIntrusos,
      currentIdx: 0,
      status: 'playing',
      teams: teams.map(t => ({ ...t, hits: 0, errors: 0 })),
      currentTeamIdx: initialTeamIdx,
      pointsAwarded: false,
      showExplanation: null
    });
    setAulaStep('intruso');
  };

  const handleIntrusoAnswer = (choiceIdx) => {
    const currentChallenge = intrusoGame.challenges[intrusoGame.currentIdx];
    const isCorrect = choiceIdx === currentChallenge.correct;

    if (isCorrect) {
      playSound('success');
    } else {
      playSound('error');
    }

    setIntrusoGame(prev => {
      const newTeams = prev.teams.map((t, idx) => {
        if (idx !== prev.currentTeamIdx) return t;
        return {
          ...t,
          hits: isCorrect ? t.hits + 1 : t.hits,
          errors: !isCorrect ? t.errors + 1 : t.errors
        };
      });

      return {
        ...prev,
        teams: newTeams,
        showExplanation: currentChallenge.explanation,
        status: (prev.currentIdx + 1 >= prev.challenges.length) ? 'finished' : 'playing'
      };
    });
  };

  const nextIntrusoChallenge = () => {
    setIntrusoGame(prev => {
      const nextIdx = prev.currentIdx + 1;
      const nextTeamIdx = prev.teams.length > 1 ? (prev.currentTeamIdx + 1) % prev.teams.length : 0;
      return {
        ...prev,
        currentIdx: nextIdx,
        currentTeamIdx: nextTeamIdx,
        showExplanation: null
      };
    });
  };

  const startHistoriaGame = (temaName, teams = [], initialTeamIdx = 0) => {
    const allHistorias = [...AULA_TEMAS[temaName].historias].sort(() => Math.random() - 0.5);
    // Necesitamos una historia por equipo
    const challenges = teams.map((_, i) => {
      const h = allHistorias[i % allHistorias.length];
      const items = h.items.map((text, idx) => ({ id: idx, text, originalIdx: idx }));
      return {
        title: h.title,
        items: [...items].sort(() => Math.random() - 0.5)
      };
    });

    setHistoriaGame({
      challenges: challenges,
      currentIdx: 0,
      status: 'playing',
      teams: teams,
      currentTeamIdx: initialTeamIdx,
      pointsAwarded: false,
      timeLeft: 60, // 1 minuto fijo
      isPaused: false
    });
    setAulaStep('historia');
  };

  const handleHistoriaMove = (fromIdx, toIdx) => {
    setHistoriaGame(prev => {
      const currentChallenge = prev.challenges[prev.currentIdx];
      const newItems = [...currentChallenge.items];
      const [moved] = newItems.splice(fromIdx, 1);
      newItems.splice(toIdx, 0, moved);

      const isCorrect = newItems.every((item, idx) => item.originalIdx === idx);

      const newChallenges = prev.challenges.map((c, i) =>
        i === prev.currentIdx ? { ...c, items: newItems } : c
      );

      if (isCorrect) {
        playSound('success');
        const pointsWin = 5;
        // Reparto de puntos inmediato al acertar su historia
        prev.teams[prev.currentTeamIdx].studentIds.forEach(id => updatePoints(id, pointsWin));

        // Si hay más equipos, pasamos al siguiente después de un pequeño retardo
        if (prev.currentIdx + 1 < prev.challenges.length) {
          setTimeout(() => {
            setHistoriaGame(curr => ({
              ...curr,
              currentIdx: curr.currentIdx + 1,
              currentTeamIdx: (curr.currentTeamIdx + 1) % curr.teams.length
            }));
          }, 1500);
        }
      }

      return {
        ...prev,
        challenges: newChallenges,
        status: (isCorrect && prev.currentIdx + 1 >= prev.challenges.length) ? 'finished' : 'playing'
      };
    });
  };

  const startPhraseGame = (temaName, teams = [], initialTeamIdx = 0) => {
    const phrases = AULA_TEMAS[temaName].phrases;
    const phrase = phrases[Math.floor(Math.random() * phrases.length)].toUpperCase();

    // Revelar algunas letras automáticamente (vocales o 30% al azar)
    const revealedIndices = [];
    const charArray = phrase.split('');

    // Revelar espacios siempre
    charArray.forEach((char, i) => {
      if (char === ' ') revealedIndices.push(i);
    });

    // Revelar un 25% de las letras (pero revelando todas las apariciones de la letra elegida)
    const totalLetters = charArray.filter(c => c !== ' ').length;
    let targetRevealCount = Math.ceil(totalLetters * 0.25);
    let currentRevealedCount = 0;

    while (currentRevealedCount < targetRevealCount) {
      const rIdx = Math.floor(Math.random() * charArray.length);
      const chosenChar = charArray[rIdx];

      if (chosenChar !== ' ' && !revealedIndices.includes(rIdx)) {
        // Normalizar para encontrar todas las apariciones (con/sin acento)
        const normalizedChosen = chosenChar.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        charArray.forEach((char, i) => {
          const normalizedChar = char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if (normalizedChar === normalizedChosen) {
            if (!revealedIndices.includes(i)) {
              revealedIndices.push(i);
              currentRevealedCount++;
            }
          }
        });
      }

      // Seguridad para evitar bucles infinitos si ya no hay más que revelar
      if (revealedIndices.length >= charArray.length) break;
    }

    setPhraseGame(prev => ({
      ...prev,
      original: phrase,
      revealed: revealedIndices,
      timeLeft: 60, // 1 minuto fijo
      usedLetters: [],
      isPaused: false,
      teams: teams,
      currentTeamIdx: initialTeamIdx,
      selectedTeamIds: teams.length === 1 ? teams[0].studentIds : []
    }));
    setAulaStep('phrase');
  };

  const handlePhraseWin = (teamIndex) => {
    const team = phraseGame.teams[teamIndex];
    if (team) {
      team.studentIds.forEach(id => updatePoints(id, 10));
      alert(`🎉 ¡FELICIDADES EQUIPO "${team.name.toUpperCase()}"! +10 Estrellas para cada uno.`);
      setShowAulaModal(false);
    }
  };

  const togglePause = () => {
    setPhraseGame(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const toggleTeamMember = (id) => {
    setPhraseGame(prev => {
      const isSelected = prev.selectedTeamIds.includes(id);
      return {
        ...prev,
        selectedTeamIds: isSelected
          ? prev.selectedTeamIds.filter(tid => tid !== id)
          : [...prev.selectedTeamIds, id]
      };
    });
  };

  const penalizeTeam = () => {
    // Si estamos en juego por equipos (Frase)
    if (phraseGame.teams && phraseGame.teams.length > 1) {
      const currentTeam = phraseGame.teams[phraseGame.currentTeamIdx];
      currentTeam.studentIds.forEach(id => updatePoints(id, -10));
      alert(`⚠️ Penalización aplicada: -10 estrellas al equipo "${currentTeam.name.toUpperCase()}".`);
      return;
    }

    if (phraseGame.selectedTeamIds.length > 0) {
      phraseGame.selectedTeamIds.forEach(id => updatePoints(id, -10));
      alert('⚠️ Penalización aplicada: -10 estrellas a cada integrante del equipo.');
    } else if (quizStudentId) {
      updatePoints(quizStudentId, -10);
      alert('⚠️ Penalización aplicada: -10 estrellas.');
    }
  };

  // Timer para el juego de la frase
  useEffect(() => {
    let timer;
    if (showAulaModal && aulaStep === 'phrase' && phraseGame.status === 'playing' && !phraseGame.isPaused && phraseGame.timeLeft > 0) {
      timer = setInterval(() => {
        setPhraseGame(prev => {
          if (prev.isPaused) return prev;
          if (prev.timeLeft <= 1) {
            clearInterval(timer);
            return { ...prev, timeLeft: 0, status: 'lost' };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showAulaModal, aulaStep, phraseGame.status, phraseGame.timeLeft, phraseGame.isPaused]);

  // Timer para Pasapalabra
  useEffect(() => {
    let timer;
    if (showAulaModal && aulaStep === 'pasapalabra' && pasapalabra.status === 'playing' && !pasapalabra.isPaused && pasapalabra.timeLeft > 0) {
      timer = setInterval(() => {
        setPasapalabra(prev => {
          if (prev.isPaused) return prev;
          if (prev.timeLeft <= 1) {
            clearInterval(timer);
            return { ...prev, timeLeft: 0, status: 'finished' };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showAulaModal, aulaStep, pasapalabra.status, pasapalabra.timeLeft, pasapalabra.isPaused]);

  useEffect(() => {
    if (showAulaModal && aulaStep === 'pasapalabra' && pasapalabra.status === 'finished' && !pasapalabra.pointsAwarded) {
      const pointsPerHit = 2;
      let summary = "🎉 ¡Resultados del Rosco!\n";
      pasapalabra.teams.forEach(team => {
        const pointsTotal = team.hits * pointsPerHit;
        if (pointsTotal > 0) {
          team.studentIds.forEach(id => updatePoints(id, pointsTotal));
          summary += `✨ ${team.name}: ${team.hits} aciertos = ${pointsTotal} estrellas cada uno.\n`;
        } else {
          summary += `ℹ️ ${team.name}: Sin aciertos.\n`;
        }
      });
      setPasapalabra(prev => ({ ...prev, pointsAwarded: true }));
      setTimeout(() => alert(summary), 500);
    }
  }, [pasapalabra.status, pasapalabra.pointsAwarded, aulaStep, showAulaModal]);

  // Recompensas El Intruso
  useEffect(() => {
    if (showAulaModal && aulaStep === 'intruso' && intrusoGame.status === 'finished' && !intrusoGame.pointsAwarded) {
      const pointsPerHit = 5;
      let summary = "🕵️ ¡Caso Cerrado! Resultados:\n";
      intrusoGame.teams.forEach(team => {
        const pointsTotal = team.hits * pointsPerHit;
        if (pointsTotal > 0) {
          team.studentIds.forEach(id => updatePoints(id, pointsTotal));
          summary += `✅ ${team.name}: ${team.hits} intrusos pillados = ${pointsTotal} estrellas cada uno.\n`;
        }
      });
      setIntrusoGame(prev => ({ ...prev, pointsAwarded: true }));
      setTimeout(() => alert(summary), 500);
    }
  }, [intrusoGame.status, intrusoGame.pointsAwarded, aulaStep, showAulaModal]);

  // Timer para Ordenar Historia
  useEffect(() => {
    let timer;
    if (showAulaModal && aulaStep === 'historia' && historiaGame.status === 'playing' && !historiaGame.isPaused && historiaGame.timeLeft > 0) {
      timer = setInterval(() => {
        setHistoriaGame(prev => {
          if (prev.isPaused) return prev;
          if (prev.timeLeft <= 1) {
            clearInterval(timer);
            return { ...prev, timeLeft: 0, status: 'lost' };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showAulaModal, aulaStep, historiaGame.status, historiaGame.timeLeft, historiaGame.isPaused]);

  // Recompensas Historia
  useEffect(() => {
    if (showAulaModal && aulaStep === 'historia' && historiaGame.status === 'finished' && !historiaGame.pointsAwarded) {
      const pointsWin = 5;
      let summary = "📜 ¡Historias Completadas!\n";

      // Esperar 1 segundo para que se vea el orden final antes del cartel
      setTimeout(() => {
        historiaGame.teams.forEach((team, teamIdx) => {
          // Asumiendo que cada equipo tiene un desafío y se recompensa por completarlo
          // O si se quiere recompensar a todos los equipos que participaron
          team.studentIds.forEach(id => updatePoints(id, pointsWin));
          summary += `✨ ${team.name}: ${pointsWin} estrellas cada uno por completar su historia.\n`;
        });
        alert(summary);
        setHistoriaGame(prev => ({ ...prev, pointsAwarded: true }));
      }, 1000);
    }
  }, [historiaGame.status, historiaGame.pointsAwarded, aulaStep, showAulaModal]);

  const handleKeyPress = (letter) => {
    if (phraseGame.status !== 'playing') return;
    const L = letter.toUpperCase();
    if (phraseGame.usedLetters.includes(L)) return;

    setPhraseGame(prev => {
      const nextUsed = [...prev.usedLetters, L];
      const nextRevealed = [...prev.revealed];
      let found = false;

      prev.original.split('').forEach((char, i) => {
        const normalizedChar = char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedL = L.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normalizedChar === normalizedL) {
          if (!nextRevealed.includes(i)) {
            nextRevealed.push(i);
            found = true;
          }
        }
      });

      if (found) {
        playSound('success');
      } else {
        playSound('error');
      }

      // Verificar si ha ganado
      const allRevealed = prev.original.split('').every((char, i) => char === ' ' || nextRevealed.includes(i));
      const nextStatus = allRevealed ? 'won' : prev.status;

      if (allRevealed) {
        if (prev.teams.length <= 1) {
          if (prev.teams.length === 1) {
            prev.teams[0].studentIds.forEach(id => updatePoints(id, 10));
          } else if (quizStudentId) {
            updatePoints(quizStudentId, 10);
          }
        }
      }

      // Cambiar turno si hay fallo y hay equipos
      let nextTeamIdx = prev.currentTeamIdx;
      if (!found && prev.teams.length > 1 && nextStatus === 'playing') {
        nextTeamIdx = (prev.currentTeamIdx + 1) % prev.teams.length;
      }

      return { ...prev, usedLetters: nextUsed, revealed: nextRevealed, status: nextStatus, currentTeamIdx: nextTeamIdx };
    });
  };

  const startQuizForStudent = (temaName) => {
    const themeQuestions = AULA_TEMAS[temaName].questions;

    // Usamos una clave compuesta "Tema-ID" para evitar conflictos entre temas
    const getStorageKey = (qId) => `${temaName}-${qId}`;

    // Filtrar preguntas que no se hayan usado todavía para que haya variedad entre chicos
    let availableQs = themeQuestions.filter(q => !usedQuestionIds.includes(getStorageKey(q.id)));

    // Si se han usado todas las de este tema, reseteamos la memoria solo para este tema
    if (availableQs.length === 0) {
      availableQs = themeQuestions;
      const themeKeys = themeQuestions.map(q => getStorageKey(q.id));
      setUsedQuestionIds(prev => prev.filter(key => !themeKeys.includes(key)));
    }

    const randomQ = availableQs[Math.floor(Math.random() * availableQs.length)];

    // Guardamos que esta pregunta ya se ha usado en este tema
    setUsedQuestionIds(prev => [...prev, getStorageKey(randomQ.id)]);

    setActiveQuestion(randomQ);
    setAulaStep('quiz');
  };



  const runCoolRaffle = (teams, onComplete) => {
    if (teams.length < 2) return;
    setRaffleState({ active: true, teams, winnerIdx: null, highlightedIdx: 0, onComplete });

    // Iniciar música de sorteo
    const duringAudio = new Audio('/DURANTESORTEO.mp3');
    duringAudio.loop = true;
    duringAudio.volume = 0.5;
    duringAudio.play().catch(e => console.log("Audio during blocked", e));
    raffleAudioRef.current = duringAudio;

    let i = 0;
    const interval = setInterval(() => {
      setRaffleState(prev => ({ ...prev, highlightedIdx: i % teams.length }));
      i++;
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      const winner = Math.floor(Math.random() * teams.length);

      // Detener música de sorteo y poner la de ganador
      if (raffleAudioRef.current) {
        raffleAudioRef.current.pause();
        raffleAudioRef.current = null;
      }

      setRaffleState(prev => ({ ...prev, winnerIdx: winner, highlightedIdx: winner }));
      playSound('raffle'); // ¡Suena la melodía del ganador!
      triggerSuccessEffect();

      setTimeout(() => {
        setRaffleState(prev => ({
          active: false,
          teams: [],
          winnerIdx: null,
          highlightedIdx: null,
          onComplete: null
        }));
        if (onComplete) onComplete(winner);
      }, 2000);
    }, 3000);
  };

  const openAula = (studentId) => {
    setQuizStudentId(studentId);
    setAulaStep('themes');
    setShowAulaModal(true);
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ students, history }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `puntos_catequesis_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('📦 Puntos exportados correctamente. ¡Guarda este archivo en tu Pendrive!');
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.students && json.history) {
          setStudents(json.students);
          setHistory(json.history);
          alert('✅ ¡Puntos e Historial cargados con éxito!');
        } else if (Array.isArray(json)) {
          setStudents(json);
          alert('✅ ¡Alumnos cargados (Formato antiguo)!');
        } else {
          throw new Error('Formato no válido');
        }
      } catch (err) {
        alert('❌ Error: El archivo no es válido o está dañado.');
      }
    };
    reader.readAsText(file);
    // Reset el input para permitir cargar el mismo archivo dos veces si se desea
    event.target.value = '';
  };

  const triggerSuccessEffect = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ffffff', '#87CEEB'],
      shapes: ['star']
    });
  };

  const triggerMassiveStars = () => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      // Estrellas que flotan más
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.3 },
        colors: ['#ffd700', '#ffffff', '#fff9c4'],
        shapes: ['star'],
        gravity: 0.2,
        scalar: 2,
        ticks: 200,
        drift: 0.5
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.3 },
        colors: ['#ffd700', '#ffffff', '#fff9c4'],
        shapes: ['star'],
        gravity: 0.2,
        scalar: 2,
        ticks: 200,
        drift: -0.5
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const triggerLeaderFireworks = () => {
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 10,
      spread: 360,
      ticks: 300, // Duran mucho más
      zIndex: 0,
      gravity: 0.15, // Caen MUY lento, como flotando
      scalar: 2.5, // Son más GRANDES y vistosas
      drift: 0
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);

      // Ráfagas que caen desde lo alto con movimiento errático (swirl)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(-0.2, 0.1) },
        shapes: ['star'],
        colors: ['#ffffff', '#fff9c4', '#ffd700'],
        drift: randomInRange(-1, 1) // Se mueven de lado a lado
      });

      confetti({
        ...defaults,
        particleCount: particleCount / 2,
        origin: { x: randomInRange(0.3, 0.7), y: randomInRange(0.2, 0.5) },
        shapes: ['circle'],
        colors: ['#87CEEB', '#ffffff'],
        gravity: 0.1,
        drift: randomInRange(-2, 2)
      });
    }, 500);
  };

  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      // Primero evaluamos según el tipo de clasificación seleccionada
      if (rankingType === 'behavior') {
        if ((b.behaviorMedals || 0) !== (a.behaviorMedals || 0)) return (b.behaviorMedals || 0) - (a.behaviorMedals || 0);
      } else if (rankingType === 'reading') {
        if ((b.readingMerits || 0) !== (a.readingMerits || 0)) return (b.readingMerits || 0) - (a.readingMerits || 0);
      } else if (rankingType === 'attendance') {
        if ((b.attendance || 0) !== (a.attendance || 0)) return (b.attendance || 0) - (a.attendance || 0);
      }

      // Clasificación General (o Desempate para las específicas)
      const scoreA = view === 'general' ? a.totalScore : a.dailyScore;
      const scoreB = view === 'general' ? b.totalScore : b.dailyScore;

      if (scoreB !== scoreA) return scoreB - scoreA;

      // Siguientes criterios de desempate en orden de importancia
      if ((b.attendance || 0) !== (a.attendance || 0)) return (b.attendance || 0) - (a.attendance || 0);
      if ((b.behaviorMedals || 0) !== (a.behaviorMedals || 0)) return (b.behaviorMedals || 0) - (a.behaviorMedals || 0);
      if ((b.readingMerits || 0) !== (a.readingMerits || 0)) return (b.readingMerits || 0) - (a.readingMerits || 0);

      return a.name.localeCompare(b.name);
    });
  }, [students, view, rankingType]);

  // El podio siempre muestra los 5 mejores para que las estructuras estén visibles
  const podium = sortedStudents.slice(0, 5);
  const remaining = sortedStudents.slice(5);

  const getDailyStudentScore = (studentId) => {
    const dayData = history[selectedDate] || {};
    return dayData[studentId]?.points || 0;
  };

  const navigateStudent = (direction) => {
    if (!selectedStudent || sortedStudents.length === 0) return;
    const currentIndex = sortedStudents.findIndex(s => s.id === selectedStudent.id);
    if (currentIndex === -1) return;
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = sortedStudents.length - 1;
    if (nextIndex >= sortedStudents.length) nextIndex = 0;
    setSelectedStudent(sortedStudents[nextIndex]);
  };

  if (!isAuthenticated) {
    return (
      <div className="login-screen" style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="login-card"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '3rem',
            borderRadius: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%'
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⛪</div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Catequesis App</h1>
          <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Acceso restringido para catequistas</p>

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <input
              type="password"
              placeholder="Contraseña"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '1rem',
                border: loginError ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1.2rem',
                textAlign: 'center',
                marginBottom: '1rem',
                outline: 'none',
                transition: 'all 0.2s'
              }}
            />
            {loginError && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 'bold' }}>Contraseña incorrecta</p>}
            <button
              type="submit"
              className="login-button"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '1rem',
                border: 'none',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1e1b4b',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              Entrar al Aula
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{
      transform: `scale(${appZoom})`,
      transformOrigin: 'top center',
      width: `${100 / appZoom}%`,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      minHeight: `${100 / appZoom}vh`
    }}>
      {/* Background Clouds */}
      <div className="background-clouds">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="cloud" style={{
            width: `${100 + i * 40}px`,
            height: `${100 + i * 30}px`,
            top: `${5 + i * 12}%`,
            left: `${-20 + i * 15}%`,
            animationDuration: `${30 + i * 10}s`,
            animationDelay: `${i * -5}s`
          }}></div>
        ))}
      </div>

      <header style={{ padding: '1rem 0' }}>
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          className="church-icon-container"
          style={{ display: 'inline-block', background: 'white', padding: '12px', borderRadius: '50%', marginBottom: '0.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <Church size={40} color="#4a90e2" />
        </motion.div>
        <motion.h1 style={{ fontSize: '2rem', marginBottom: '0.1rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Catequesis de Confirmación</motion.h1>
        <motion.p style={{ fontSize: '1rem', opacity: 0.8, fontWeight: 600, letterSpacing: '2px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>CAMINO AL CIELO</motion.p>
      </header>

      {/* Podium */}
      <div className="podium-container" style={{ position: 'relative' }}>
        {/* Cañones de Confeti (Click en uno activa ambos) */}
        {['left', 'right'].map(side => (
          <div
            key={side}
            className={`confetti-cannon cannon-${side}`}
            onClick={() => {
              playSound('stars');
              const now = Date.now();
              // Si hace clic rápido (menos de 600ms), sube la potencia
              if (now - lastCannonClickRef.current < 600) {
                cannonPowerRef.current = Math.min(cannonPowerRef.current + 15, 120);
              } else {
                cannonPowerRef.current = 45; // Reset a potencia normal
              }
              lastCannonClickRef.current = now;

              const power = cannonPowerRef.current;

              // Disparar desde la izquierda
              confetti({
                particleCount: 80 + (power / 2),
                angle: 60,
                spread: 55 + (power / 4),
                startVelocity: power,
                origin: { x: 0.1, y: 0.8 },
                colors: ['#ffd700', '#ffffff', '#ff0000', '#00ff00', '#0000ff'],
                shapes: ['star', 'circle']
              });
              // Disparar desde la derecha
              confetti({
                particleCount: 80 + (power / 2),
                angle: 120,
                spread: 55 + (power / 4),
                startVelocity: power,
                origin: { x: 0.9, y: 0.8 },
                colors: ['#ffd700', '#ffffff', '#ff0000', '#00ff00', '#0000ff'],
                shapes: ['star', 'circle']
              });
            }}
            title="¡Pulsa rápido para más potencia!"
          ></div>
        ))}
        {podium.length > 3 && (
          <motion.div className="podium-spot podium-4" layout>
            {((view === 'general' ? podium[3]?.totalScore : podium[3]?.dailyScore) || 0) > 0 ? (
              <div className="avatar-container" onClick={() => setSelectedStudent(podium[3])} style={{ cursor: 'pointer' }}>
                <div className="halo"></div>
                <div className="arms-container">
                  <div className="arm arm-left"></div>
                  <div className="arm arm-right"></div>
                </div>
                <div className="legs-container">
                  <div className="leg leg-left"></div>
                  <div className="leg leg-right"></div>
                </div>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                  <img src={podium[3]?.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ) : (
              <div className="avatar-container" style={{ animation: 'none', opacity: 0.3, borderStyle: 'dashed', background: 'rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '2rem' }}>👤</span>
              </div>
            )}
            <div className="podium-pedestal">
              <span style={{ fontSize: '1rem' }}>🏅</span>
              <span className="podium-points">{view === 'general' ? podium[3]?.totalScore : (getDailyStudentScore(podium[3]?.id) || 0)}</span>
            </div>
            <div className="podium-name" style={{ opacity: ((view === 'general' ? podium[3]?.totalScore : podium[3]?.dailyScore) || 0) > 0 ? 1 : 0.5, fontSize: '1.2rem' }}>
              {((view === 'general' ? podium[3]?.totalScore : podium[3]?.dailyScore) || 0) > 0 ? podium[3]?.name : '---'}
            </div>
          </motion.div>
        )}

        {podium.length > 1 && (
          <motion.div className="podium-spot podium-2" layout>
            {((view === 'general' ? podium[1]?.totalScore : podium[1]?.dailyScore) || 0) > 0 ? (
              <div className="avatar-container" onClick={() => setSelectedStudent(podium[1])} style={{ cursor: 'pointer' }}>
                <div className="halo"></div>
                <div className="arms-container">
                  <div className="arm arm-left"></div>
                  <div className="arm arm-right"></div>
                </div>
                <div className="legs-container">
                  <div className="leg leg-left"></div>
                  <div className="leg leg-right"></div>
                </div>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                  <img src={podium[1]?.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ) : (
              <div className="avatar-container" style={{ animation: 'none', opacity: 0.3, borderStyle: 'dashed', background: 'rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '3rem' }}>👤</span>
              </div>
            )}
            <div className="podium-pedestal">
              <span style={{ fontSize: '1.5rem' }}>🥈</span>
              <span className="podium-points">{view === 'general' ? podium[1]?.totalScore : (getDailyStudentScore(podium[1]?.id) || 0)}</span>
            </div>
            <div className="podium-name" style={{ opacity: ((view === 'general' ? podium[1]?.totalScore : podium[1]?.dailyScore) || 0) > 0 ? 1 : 0.5 }}>
              {((view === 'general' ? podium[1]?.totalScore : podium[1]?.dailyScore) || 0) > 0 ? podium[1]?.name : '---'}
            </div>
          </motion.div>
        )}

        {podium.length > 0 && (
          <motion.div className="podium-spot podium-1" layout>
            {((view === 'general' ? podium[0]?.totalScore : podium[0]?.dailyScore) || 0) > 0 ? (
              <div className="avatar-container" onClick={() => setSelectedStudent(podium[0])} style={{ cursor: 'pointer' }}>
                <div className="halo" style={{ borderColor: 'gold', boxShadow: '0 0 20px gold' }}></div>
                <div className="arms-container">
                  <div className="arm arm-left"></div>
                  <div className="arm arm-right"></div>
                </div>
                <div className="legs-container">
                  <div className="leg leg-left"></div>
                  <div className="leg leg-right"></div>
                </div>
                <motion.div animate={{ y: [-5, 5] }} transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }} style={{ position: 'absolute', top: -55, fontSize: '3.5rem', zIndex: 10 }}>👑</motion.div>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                  <img src={podium[0]?.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ) : (
              <div className="avatar-container" style={{ animation: 'none', opacity: 0.3, borderStyle: 'dashed', background: 'rgba(255,255,255,0.1)', width: '180px', height: '180px' }}>
                <span style={{ fontSize: '4rem' }}>👤</span>
              </div>
            )}
            <div className="podium-pedestal">
              <span style={{ fontSize: '2.5rem' }}>🥇</span>
              <span className="podium-points">{view === 'general' ? podium[0]?.totalScore : (getDailyStudentScore(podium[0]?.id) || 0)}</span>
            </div>
            <div className="podium-name" style={{ fontWeight: 800, fontSize: '2.5rem', opacity: ((view === 'general' ? podium[0]?.totalScore : podium[0]?.dailyScore) || 0) > 0 ? 1 : 0.5 }}>
              {((view === 'general' ? podium[0]?.totalScore : podium[0]?.dailyScore) || 0) > 0 ? podium[0]?.name : '---'}
            </div>
          </motion.div>
        )}

        {podium.length > 2 && (
          <motion.div className="podium-spot podium-3" layout>
            {((view === 'general' ? podium[2]?.totalScore : podium[2]?.dailyScore) || 0) > 0 ? (
              <div className="avatar-container" onClick={() => setSelectedStudent(podium[2])} style={{ cursor: 'pointer' }}>
                <div className="halo"></div>
                <div className="arms-container">
                  <div className="arm arm-left"></div>
                  <div className="arm arm-right"></div>
                </div>
                <div className="legs-container">
                  <div className="leg leg-left"></div>
                  <div className="leg leg-right"></div>
                </div>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                  <img src={podium[2]?.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ) : (
              <div className="avatar-container" style={{ animation: 'none', opacity: 0.3, borderStyle: 'dashed', background: 'rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '2.5rem' }}>👤</span>
              </div>
            )}
            <div className="podium-pedestal">
              <span style={{ fontSize: '1.2rem' }}>🥉</span>
              <span className="podium-points">{view === 'general' ? podium[2]?.totalScore : (getDailyStudentScore(podium[2]?.id) || 0)}</span>
            </div>
            <div className="podium-name" style={{ opacity: ((view === 'general' ? podium[2]?.totalScore : podium[2]?.dailyScore) || 0) > 0 ? 1 : 0.5 }}>
              {((view === 'general' ? podium[2]?.totalScore : podium[2]?.dailyScore) || 0) > 0 ? podium[2]?.name : '---'}
            </div>
          </motion.div>
        )}

        {podium.length > 4 && (
          <motion.div className="podium-spot podium-5" layout>
            {((view === 'general' ? podium[4]?.totalScore : podium[4]?.dailyScore) || 0) > 0 ? (
              <div className="avatar-container" onClick={() => setSelectedStudent(podium[4])} style={{ cursor: 'pointer' }}>
                <div className="halo"></div>
                <div className="arms-container">
                  <div className="arm arm-left"></div>
                  <div className="arm arm-right"></div>
                </div>
                <div className="legs-container">
                  <div className="leg leg-left"></div>
                  <div className="leg leg-right"></div>
                </div>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                  <img src={podium[4]?.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ) : (
              <div className="avatar-container" style={{ animation: 'none', opacity: 0.3, borderStyle: 'dashed', background: 'rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '2rem' }}>👤</span>
              </div>
            )}
            <div className="podium-pedestal">
              <span style={{ fontSize: '1rem' }}>🎖️</span>
              <span className="podium-points">{view === 'general' ? podium[4]?.totalScore : (getDailyStudentScore(podium[4]?.id) || 0)}</span>
            </div>
            <div className="podium-name" style={{ opacity: ((view === 'general' ? podium[4]?.totalScore : podium[4]?.dailyScore) || 0) > 0 ? 1 : 0.5, fontSize: '1.2rem' }}>
              {((view === 'general' ? podium[4]?.totalScore : podium[4]?.dailyScore) || 0) > 0 ? podium[4]?.name : '---'}
            </div>
          </motion.div>
        )}
      </div>



      {/* View: History */}
      {
        view === 'history' && (
          <div className="history-view animate-fade-in" style={{ padding: '2rem 0' }}>
            <div className="history-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {Object.keys(history).sort((a, b) => b.localeCompare(a)).map(date => {
                const dayData = history[date];
                const totalDayPoints = Object.values(dayData).reduce((sum, d) => sum + (d.points || 0), 0);
                const totalAttendance = Object.values(dayData).filter(d => d.attendance > 0).length;

                const topStudentId = Object.keys(dayData).reduce((a, b) => (dayData[a]?.points || 0) > (dayData[b]?.points || 0) ? a : b, null);
                const topStudent = students.find(s => s.id === Number(topStudentId));

                return (
                  <div key={date} className="history-card" style={{ background: 'white', borderRadius: '25px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 800, color: '#2c3e50', fontSize: '1.2rem' }}>
                        {new Date(date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </div>
                      <div style={{ background: '#f1f4f9', padding: '5px 12px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 700, color: '#4a90e2' }}>
                        Balance Jornada
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem' }}>
                      <div style={{ flex: 1, background: '#f8fbff', padding: '15px', borderRadius: '18px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#7f8c8d', marginBottom: '5px' }}>Puntos Total</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#2ecc71' }}>+{totalDayPoints}</div>
                      </div>
                      <div style={{ flex: 1, background: '#f8fbff', padding: '15px', borderRadius: '18px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#7f8c8d', marginBottom: '5px' }}>Asistencia</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4a90e2' }}>{totalAttendance}</div>
                      </div>
                    </div>

                    {topStudent && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(135deg, #fff9e6, #fff)', padding: '12px', borderRadius: '18px', border: '1px solid #ffecb3' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid gold' }}>
                          <img src={topStudent.avatar} alt="" style={{ width: '100%' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#f39c12', textTransform: 'uppercase' }}>⭐ Líder del Día</div>
                          <div style={{ fontWeight: 800, color: '#2c3e50' }}>{topStudent.name}</div>
                        </div>
                        <div style={{ fontWeight: 900, color: '#f39c12' }}>+{dayData[topStudentId]?.points}</div>
                      </div>
                    )}
                  </div>
                );
              })}
              {Object.keys(history).length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#bdc3c7' }}>
                  <History size={60} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                  <p style={{ fontWeight: 700 }}>Aún no hay jornadas registradas en el historial.</p>
                </div>
              )}
            </div>
          </div>
        )
      }

      {/* View: Learning/Games */}
      {
        view === 'learning' && (
          <div className="learning-view animate-fade-in" style={{ padding: '2rem 0' }}>
            <div className="learning-header" style={{ position: 'relative', textAlign: 'center', marginBottom: '3rem' }}>
              <button
                onClick={() => setView('general')}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <ArrowLeft size={20} /> Volver
              </button>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>Sala de Estudio 🎮</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', fontWeight: 600 }}>Elige un tema y prepárate para el reto especial del día.</p>
            </div>

            <div className="themes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
              {Object.keys(AULA_TEMAS).map((theme, i) => {
                const isExpanded = expandedThemes[theme] ?? false;
                const isCompleted = completedThemes.includes(theme);

                return (
                  <motion.div
                    key={theme}
                    layout
                    className="theme-game-card"
                    style={{
                      background: 'white',
                      borderRadius: '30px',
                      padding: '25px',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                      border: isCompleted ? '3px solid #2ecc71' : '1px solid rgba(0,0,0,0.03)',
                      position: 'relative',
                      overflow: 'hidden',
                      height: 'fit-content'
                    }}
                  >
                    <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.05 }}>
                      <Sparkles size={100} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isExpanded ? '1.5rem' : '0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button
                          onClick={() => markThemeCompleted(theme)}
                          style={{
                            width: '55px',
                            height: '55px',
                            borderRadius: '16px',
                            background: isCompleted ? '#2ecc71' : '#f0f4f8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isCompleted ? 'white' : '#bdc3c7',
                            transition: 'all 0.3s',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: isCompleted ? '0 5px 15px rgba(46, 204, 113, 0.3)' : 'none'
                          }}
                          title={isCompleted ? "Marcar como no completado" : "Marcar como completado"}
                        >
                          {isCompleted ? <CheckCircle2 size={30} /> : (i % 2 === 0 ? <BookOpen size={30} /> : <Star size={30} />)}
                        </button>
                        <h3
                          onClick={() => markThemeCompleted(theme)}
                          style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2c3e50', cursor: 'pointer' }}
                        >
                          {theme}
                        </h3>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => markThemeCompleted(theme)}
                          style={{
                            background: isCompleted ? '#2ecc71' : '#f0f4f8',
                            border: 'none',
                            width: '45px',
                            height: '45px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: isCompleted ? 'white' : '#bdc3c7',
                            transition: 'all 0.3s'
                          }}
                          title={isCompleted ? "Marcar como no completado" : "Marcar como completado"}
                        >
                          <CheckCircle2 size={24} />
                        </button>
                        <button
                          onClick={() => toggleThemeExpanded(theme)}
                          style={{ background: '#f0f4f8', border: 'none', width: '35px', height: '35px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#7f8c8d' }}
                        >
                          <motion.div animate={{ rotate: isExpanded ? 0 : 180 }}>
                            <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
                          </motion.div>
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                            <button
                              onClick={() => {
                                setSelectedAulaTema(theme);
                                setQuizStudentId(null);
                                setPhraseGame(prev => ({ ...prev, selectedTeamIds: [] }));
                                setAulaStep('select-team');
                                setShowAulaModal(true);
                              }}
                              className="game-btn"
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '15px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #4a90e2, #357abd)',
                                color: 'white',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                            >
                              <Sparkles size={18} />
                              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.90rem' }}>Adivinar la Frase</span>
                                <span style={{ fontSize: '0.70rem', opacity: 0.9 }}> (POR EQUIPOS)</span>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAulaTema(theme);
                                setQuizStudentId(null);
                                setPhraseGame(prev => ({ ...prev, selectedTeamIds: [] }));
                                setAulaStep('select-team-pasapalabra');
                                setShowAulaModal(true);
                              }}
                              className="game-btn"
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '15px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #e67e22, #d35400)',
                                color: 'white',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                            >
                              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'white', color: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900 }}>A</div>
                              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.90rem' }}>Rosco Pasapalabra</span>
                                <span style={{ fontSize: '0.70rem', opacity: 0.9 }}> (POR EQUIPOS)</span>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAulaTema(theme);
                                setQuizStudentId(null);
                                setAulaStep('select-team-intruso');
                                setShowAulaModal(true);
                              }}
                              className="game-btn"
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '15px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                                color: 'white',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                            >
                              <Search size={18} />
                              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.90rem' }}>El Intruso</span>
                                <span style={{ fontSize: '0.70rem', opacity: 0.9 }}> (POR EQUIPOS)</span>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAulaTema(theme);
                                setQuizStudentId(null);
                                setAulaStep('select-team-historia');
                                setShowAulaModal(true);
                              }}
                              className="game-btn"
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '15px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
                                color: 'white',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                            >
                              <History size={18} />
                              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.90rem' }}>Ordena la Historia</span>
                                <span style={{ fontSize: '0.65rem', opacity: 0.9 }}> (SOLO PARTICIPA EL EQUIPO QUE GANE EL SORTEO)</span>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )
      }

      {/* View: Ranking List with Search and Filter */}
      {view !== 'history' && view !== 'learning' && (
        <div className="ranking-container" style={{ maxWidth: '1200px', margin: '3rem auto 0', width: '95%' }}>
          <div className="ranking-header-controls" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '2rem',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '25px',
            border: '2px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            width: '100%'
          }}>
            <div className="search-bar-container" style={{ flex: '1 1 300px', minWidth: '250px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#95a5a6' }}>
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Buscar joven..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 45px',
                  borderRadius: '15px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.95)',
                  fontSize: '1rem',
                  outline: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}
              />
            </div>

            <select
              value={rankingType}
              onChange={(e) => setRankingType(e.target.value)}
              style={{
                width: '220px',
                padding: '12px',
                borderRadius: '15px',
                border: 'none',
                background: 'rgba(255,255,255,0.95)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}
            >
              <option value="general">🏆 CLASIFICACIÓN</option>
              <option value="behavior">🎖️ COMPORTAMIENTO</option>
              <option value="reading">📖 LECTURA</option>
              <option value="attendance">📅 ASISTENCIA</option>
            </select>

            <button
              onClick={() => setShowRankingList(!showRankingList)}
              style={{
                padding: '12px 20px',
                borderRadius: '15px',
                border: 'none',
                background: showRankingList ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)',
                color: showRankingList ? '#2c3e50' : 'white',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s',
                boxShadow: showRankingList ? '0 4px 15px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Trophy size={18} />
              {showRankingList ? 'OCULTAR LISTA' : 'VER LISTA'}
              <motion.div animate={{ rotate: showRankingList ? 180 : 0 }}>
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <button
              onClick={() => setView('learning')}
              style={{
                padding: '12px 25px',
                borderRadius: '15px',
                border: 'none',
                background: 'linear-gradient(135deg, #4a90e2, #357abd)',
                color: 'white',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Gamepad2 size={20} /> Sala de Estudio
            </button>
          </div>

          <AnimatePresence>
            {showRankingList && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="ranking-list">
                  <AnimatePresence>
                    {sortedStudents.map((student, index) => (
                      <motion.div key={student.id} id={`student-${student.id}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="student-card">
                        <div className="rank-number">#{index + 1}</div>

                        <div className="small-avatar" onClick={() => setSelectedStudent(student)} style={{ cursor: 'pointer' }}>
                          <img src={student.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div className="student-details-right" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                          <div className="student-info" style={{ textAlign: 'left', marginBottom: '2px' }}>
                            <div className="student-name" style={{ fontSize: '1.2rem', fontWeight: 950, color: '#1e3a8a', lineHeight: 1.1 }}>
                              {student.name}
                            </div>
                            <div className="student-scores" style={{ justifyContent: 'flex-start', fontSize: '0.9rem' }}>
                              <span>✨ {student.totalScore}</span>
                            </div>
                          </div>

                          <div className="controls">
                            <div className="medal-controls-row">
                              <div className="medal-controls" title="Asistencia">
                                <button className="medal-step" onClick={() => updateAttendance(student.id, -1)}>-</button>
                                <span className="medal-badge attendance" style={{ background: 'linear-gradient(135deg, #1abc9c, #16a085)', minWidth: '60px', padding: '4px 8px', fontSize: '0.8rem' }}>
                                  📅 {student.attendance || 0}
                                </span>
                                <button className="medal-step" onClick={() => updateAttendance(student.id, 1)}>+</button>
                              </div>
                              <div className="medal-controls" title="Lectura">
                                <button className="medal-step" onClick={() => updateReadingMerits(student.id, -1)}>-</button>
                                <span className="medal-badge reading" style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)', minWidth: '60px', padding: '4px 8px', fontSize: '0.8rem' }}>
                                  📖 {student.readingMerits || 0}
                                </span>
                                <button className="medal-step" onClick={() => updateReadingMerits(student.id, 1)}>+</button>
                              </div>
                              <div className="medal-controls" title="Buen Comportamiento">
                                <button className="medal-step" onClick={() => updateMedals(student.id, -1)}>-</button>
                                <span className="medal-badge behavior" style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)', minWidth: '60px', padding: '4px 8px', fontSize: '0.8rem' }}>
                                  🎖️ {student.behaviorMedals || 0}
                                </span>
                                <button className="medal-step" onClick={() => updateMedals(student.id, 1)}>+</button>
                              </div>
                            </div>

                            <div className="action-buttons-row" style={{ justifyContent: 'flex-start', marginTop: '5px', gap: '5px' }}>
                              <button
                                className="btn-point"
                                style={{ background: '#4a90e2', width: '35px', height: '35px' }}
                                onClick={() => openAula(student.id)}
                                title="Pregunta Bíblica"
                              >
                                <HelpCircle size={16} />
                              </button>
                              <button
                                className="btn-point"
                                style={{ background: '#f39c12', width: '35px', height: '35px' }}
                                onClick={() => updatePoints(student.id, -10)}
                                title="Quitar Puntos (-10)"
                              >
                                <Minus size={16} />
                              </button>
                              <button
                                className="btn-point"
                                style={{ background: '#2ecc71', width: '35px', height: '35px' }}
                                onClick={() => updatePoints(student.id, 10)}
                                title="Añadir Puntos (+10)"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}


      {/* Floating Actions */}
      <div className="floating-action">
        <label className="action-btn" style={{ background: '#34495e', cursor: 'pointer' }} title="Cargar desde Pendrive">
          <Upload size={24} />
          <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
        </label>
        <button className="action-btn" style={{ background: '#27ae60' }} onClick={exportData} title="Guardar en Pendrive">
          <Download size={24} />
        </button>
        <button className="action-btn" onClick={() => setShowAddModal(true)} title="Añadir Alumno">
          <UserPlus size={24} />
        </button>

        {/* Control de Zoom para Proyectores */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.3)',
          padding: '10px',
          borderRadius: '30px',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.1)'
        }}>
          <button
            className="action-btn"
            style={{ background: 'rgba(255,255,255,0.2)', width: '45px', height: '45px' }}
            onClick={() => setAppZoom(prev => Math.min(prev + 0.05, 1.5))}
            title="Aumentar Zoom"
          >
            <ZoomIn size={20} />
          </button>
          <div style={{ color: 'white', fontSize: '0.7rem', fontWeight: 900 }}>{Math.round(appZoom * 100)}%</div>
          <button
            className="action-btn"
            style={{ background: 'rgba(255,255,255,0.2)', width: '45px', height: '45px' }}
            onClick={() => setAppZoom(prev => Math.max(prev - 0.05, 0.5))}
            title="Reducir Zoom"
          >
            <ZoomOut size={20} />
          </button>
          <button
            className="action-btn"
            style={{ background: appZoom === 1.0 ? 'rgba(255,255,255,0.1)' : '#e74c3c', width: '45px', height: '45px' }}
            onClick={() => setAppZoom(1.0)}
            title="Resetear Pantalla (100%)"
          >
            <Monitor size={20} />
          </button>
        </div>
      </div>

      {/* Modals */}
      {
        selectedStudent && (
          <div className="overlay" onClick={() => setSelectedStudent(null)}>
            <div className="modal-slider-container" onClick={e => e.stopPropagation()} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px' }}>
              {sortedStudents.length > 1 && (
                <button
                  className="nav-arrow-btn"
                  onClick={() => navigateStudent(-1)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                >
                  <ChevronLeft size={48} />
                </button>
              )}

              <motion.div
                key={selectedStudent.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="student-detail-card"
                style={{ margin: 0 }}
              >
                <button className="close-modal" onClick={() => setSelectedStudent(null)}><X /></button>
                <div className="detail-avatar-container">
                  <div className="halo-large"></div>
                  <img src={selectedStudent.avatar} alt={selectedStudent.name} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <h2 className="detail-name">{selectedStudent.name}</h2>
                  <button
                    onClick={() => renameStudent(selectedStudent.id, selectedStudent.name)}
                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '5px', borderRadius: '8px' }}
                    title="Editar Nombre"
                  >
                    <Edit size={18} />
                  </button>
                </div>
                <div className="detail-stats" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '15px' }}>
                  <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.1)', gridColumn: 'span 2' }}>
                    <span className="stat-label">Total Estrellas</span>
                    <span className="stat-value" style={{ color: '#f39c12', fontSize: '2rem' }}>✨ {selectedStudent.totalScore}</span>
                  </div>
                  <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span className="stat-label">Asistencia</span>
                    <span className="stat-value" style={{ color: '#1abc9c', fontSize: '1.4rem' }}>📅 {selectedStudent.attendance || 0}</span>
                  </div>
                  <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span className="stat-label">Lectura</span>
                    <span className="stat-value" style={{ color: '#3498db', fontSize: '1.4rem' }}>📖 {selectedStudent.readingMerits || 0}</span>
                  </div>
                  <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.1)', gridColumn: 'span 2' }}>
                    <span className="stat-label">Buen Comportamiento</span>
                    <span className="stat-value" style={{ color: '#e74c3c', fontSize: '1.4rem' }}>🎖️ {selectedStudent.behaviorMedals || 0} Medallas</span>
                  </div>
                </div>
                <button
                  className="detail-badge"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFlares();
                  }}
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    width: '100%',
                    marginTop: '20px',
                    padding: '15px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    color: '#1e1b4b',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)',
                    transition: 'transform 0.2s',
                    position: 'relative',
                    zIndex: 10001
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {selectedStudent.totalScore >= 100 ? '🎖️ Guía Celestial' : selectedStudent.totalScore >= 50 ? '🌟 Brillante' : '🌱 Iniciando el Camino'}
                </button>
              </motion.div>

              {sortedStudents.length > 1 && (
                <button
                  className="nav-arrow-btn"
                  onClick={() => navigateStudent(1)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                >
                  <ChevronRight size={48} />
                </button>
              )}
            </div>
          </div>
        )
      }

      {
        showAddModal && (
          <div className="overlay">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal">
              <button className="close-modal" onClick={() => setShowAddModal(false)}><X /></button>
              <h2 style={{ marginBottom: '1.5rem' }}>Añadir Nuevo Joven</h2>
              <form onSubmit={addStudent}>
                <div className="input-group">
                  <input
                    autoFocus
                    className="input-main"
                    placeholder="Nombre del chico/a..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Inscribir en el Camino</button>
              </form>
            </motion.div>
          </div>
        )
      }

      {
        showAulaModal && (
          <div className="overlay">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="modal" style={{ maxWidth: '950px', width: '95%' }}>
              <button className="close-modal" onClick={() => setShowAulaModal(false)}><X /></button>

              <div className="aula-container">
                {/* STEP 1: Selección de Temas */}
                {aulaStep === 'themes' && (
                  <div className="aula-step-themes">
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '20px' }}>
                      <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: 950, marginBottom: '10px', textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)', letterSpacing: '-1px' }}
                      >
                        {quizStudentId ? "PREGUNTA TIPO TEST 📝" : "Sala de Juegos 🎮"}
                      </motion.h1>
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                      >
                        {quizStudentId ? "Elige el tema de tu pregunta" : "Elige un tema y prepárate para el reto especial del día."}
                      </motion.p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {Object.keys(AULA_TEMAS).map(tema => {
                        const isCompleted = completedThemes.includes(tema);
                        return (
                          <button
                            key={tema}
                            className="option-btn"
                            style={{
                              height: 'auto',
                              padding: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                              position: 'relative',
                              border: isCompleted ? '2px solid #2ecc71' : '1px solid transparent'
                            }}
                            onClick={() => {
                              setSelectedAulaTema(tema);
                              if (quizStudentId) {
                                showRules({
                                  title: "Cuestionario Rápido",
                                  description: "Responde preguntas de opción múltiple sobre el tema. ¡Rapidez y fe van de la mano!",
                                  points: "✨ +5 Estrellas por cada acierto",
                                  icon: <HelpCircle size={60} color="white" />,
                                  color: "#4a90e2",
                                  nextStep: "start-quiz"
                                });
                              } else {
                                setAulaStep('activities');
                              }
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markThemeCompleted(tema);
                              }}
                              style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                background: isCompleted ? '#2ecc71' : 'rgba(0,0,0,0.05)',
                                color: isCompleted ? 'white' : '#bdc3c7',
                                border: 'none',
                                borderRadius: '50%',
                                width: '35px',
                                height: '35px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                transition: 'all 0.3s'
                              }}
                              title={isCompleted ? "Marcar como no terminado" : "Marcar como terminado"}
                            >
                              <CheckCircle2 size={20} />
                            </button>

                            {isCompleted && (
                              <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#2ecc71' }}>
                                <CheckCircle2 size={24} />
                              </div>
                            )}
                            <span style={{ fontSize: '2.5rem' }}>{AULA_TEMAS[tema].icon}</span>
                            <span style={{ fontWeight: 800 }}>{tema}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP: Configuración de Equipos */}
                {(aulaStep === 'select-team' || aulaStep === 'select-team-pasapalabra' || aulaStep === 'select-team-intruso' || aulaStep === 'select-team-historia') && (
                  <div className="select-team-step">
                    <button className="btn-back" onClick={() => setAulaStep('activities')} style={{ background: 'none', border: 'none', color: '#7f8c8d', marginBottom: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      ⬅️ Volver
                    </button>
                    <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '0.2rem', fontWeight: 900 }}>🏆 Torneo de Equipos</h2>
                    <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Crea los grupos que van a competir entre sí por el premio final.</p>

                    {/* Lista de Equipos Añadidos y Botón de Sorteo */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0 10px' }}>
                      <h3 style={{ fontSize: '0.9rem', color: '#2c3e50', fontWeight: 800 }}>Equipos Listos:</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px', marginBottom: '1.5rem', minHeight: '80px' }}>
                      {aulaTeams.map((team, idx) => (
                        <div key={idx} style={{ background: 'white', padding: '10px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #eee', minWidth: '150px', position: 'relative' }}>
                          <button onClick={() => setAulaTeams(prev => prev.filter((_, i) => i !== idx))} style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '0.7rem' }}>×</button>
                          <div style={{ fontWeight: 800, color: '#4a90e2', fontSize: '0.8rem', marginBottom: '5px' }}>{team.name}</div>
                          <div style={{ display: 'flex', gap: '3px' }}>
                            {team.studentIds.map(id => (
                              <img key={id} src={students.find(s => s.id === id)?.avatar} style={{ width: '20px', height: '20px', borderRadius: '50%' }} alt="" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Creador de Equipo */}
                    <div style={{ background: 'rgba(74, 144, 226, 0.05)', padding: '20px', borderRadius: '25px', marginBottom: '1.5rem', border: '2px dashed rgba(74, 144, 226, 0.2)' }}>
                      <input
                        type="text"
                        placeholder="Nombre del Equipo (ej: Los Leones)"
                        value={currentTeamName}
                        onChange={(e) => setCurrentTeamName(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '15px', border: '2px solid white', marginBottom: '1rem', fontWeight: 800, outline: 'none' }}
                      />
                      <div className="student-picker" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))', gap: '12px', maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
                        {students
                          .filter(s => !aulaTeams.some(team => team.studentIds.includes(s.id)))
                          .map(s => {
                            const isSelected = phraseGame.selectedTeamIds.includes(s.id);
                            return (
                              <button key={s.id} onClick={() => toggleTeamMember(s.id)} style={{ background: isSelected ? '#4a90e2' : 'white', borderRadius: '15px', padding: '8px', cursor: 'pointer', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.2s' }}>
                                <img src={s.avatar} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', marginBottom: '4px' }} />
                                <span style={{ fontSize: '0.6rem', fontWeight: 800, color: isSelected ? 'white' : '#2c3e50', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                              </button>
                            );
                          })}
                      </div>
                      <button
                        className="btn-primary"
                        style={{ width: '100%', marginTop: '1rem', background: '#2ecc71', padding: '10px' }}
                        disabled={!currentTeamName || phraseGame.selectedTeamIds.length === 0}
                        onClick={() => {
                          setAulaTeams([...aulaTeams, { name: currentTeamName, studentIds: [...phraseGame.selectedTeamIds] }]);
                          setCurrentTeamName('');
                          setPhraseGame(prev => ({ ...prev, selectedTeamIds: [] }));
                        }}
                      >
                        ➕ Añadir Equipo
                      </button>
                    </div>

                    <button
                      disabled={aulaTeams.length < 2}
                      className="btn-primary"
                      style={{ width: '100%', opacity: aulaTeams.length < 2 ? 0.5 : 1, fontSize: '1.2rem', padding: '15px' }}
                      onClick={() => {
                        runCoolRaffle(aulaTeams, (winnerIdx) => {
                          if (aulaStep === 'select-team-pasapalabra') {
                            startPasapalabraGame(selectedAulaTema, aulaTeams, winnerIdx);
                          } else if (aulaStep === 'select-team-intruso') {
                            startIntrusoGame(selectedAulaTema, aulaTeams, winnerIdx);
                          } else if (aulaStep === 'select-team-historia') {
                            startHistoriaGame(selectedAulaTema, aulaTeams, winnerIdx);
                          } else {
                            startPhraseGame(selectedAulaTema, aulaTeams, winnerIdx);
                          }
                        });
                      }}
                    >
                      🚀 ¡Empezar Desafío!
                    </button>
                  </div>
                )}

                {/* STEP: Reglas del Juego */}
                {aulaStep === 'rules' && gameRules && (
                  <div className="aula-step-rules" style={{ textAlign: 'center', padding: '20px' }}>
                    <button className="btn-back" onClick={() => setAulaStep(gameRules.returnStep || 'activities')} style={{ background: 'none', border: 'none', color: '#7f8c8d', marginBottom: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
                      ⬅️ {gameRules.returnStep === 'activities' ? 'Volver a Actividades' : 'Volver al Juego'}
                    </button>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '40px', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
                      <div style={{ fontSize: '4.5rem', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                        {gameRules.icon}
                      </div>
                      <h2 style={{ color: gameRules.color || 'var(--primary)', marginBottom: '15px', fontSize: '2.2rem', fontWeight: 900 }}>{gameRules.title}</h2>
                      <p style={{ fontSize: '1.2rem', color: '#2c3e50', marginBottom: '25px', lineHeight: 1.5, fontWeight: 600 }}>{gameRules.description}</p>

                      <div style={{ background: 'rgba(241, 196, 15, 0.1)', padding: '20px', borderRadius: '25px', marginBottom: '30px', border: '2px dashed #f1c40f' }}>
                        <div style={{ color: '#f39c12', fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>Recompensa de Estrellas</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#2c3e50' }}>{gameRules.points}</div>
                      </div>

                      <button
                        className="btn-primary"
                        style={{
                          width: '100%',
                          padding: '22px',
                          fontSize: '1.5rem',
                          background: gameRules.color || 'var(--primary)',
                          borderRadius: '20px',
                          boxShadow: `0 10px 25px ${gameRules.color}66`
                        }}
                        onClick={() => {
                          if (gameRules.returnStep && gameRules.returnStep !== 'activities') {
                            setAulaStep(gameRules.returnStep);
                            return;
                          }
                          if (typeof gameRules.nextStep === 'string') {
                            if (gameRules.nextStep === 'start-quiz') startQuizForStudent(selectedAulaTema);
                            else if (gameRules.nextStep === 'start-pasapalabra-ind') startPasapalabraGame(selectedAulaTema, [{ name: 'Individual', studentIds: [quizStudentId] }]);
                            else if (gameRules.nextStep === 'start-phrase-ind') {
                              setPhraseGame(prev => ({ ...prev, selectedTeamIds: [quizStudentId] }));
                              setAulaTeams([]);
                              startPhraseGame(selectedAulaTema, [{ name: 'Individual', studentIds: [quizStudentId] }]);
                            }
                            else setAulaStep(gameRules.nextStep);
                          }
                        }}
                      >
                        🚀 {gameRules.returnStep === 'activities' ? '¡COMENZAR DESAFÍO!' : 'SEGUIR JUGANDO'}
                      </button>
                    </motion.div>
                  </div>
                )}

                {/* STEP 2: Selección de Actividad */}
                {aulaStep === 'activities' && (
                  <div className="aula-step-activities">
                    <button className="btn-back" onClick={() => setAulaStep('themes')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
                      ⬅️ Volver a Temas
                    </button>

                    {/* Cabecera del Tema (Estilo Premium) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '30px', marginBottom: '2.5rem', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.1, color: 'white' }}>
                        <Trophy size={150} />
                      </div>
                      <div style={{ background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)', width: '80px', height: '80px', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: '0 8px 20px rgba(46, 204, 113, 0.4)' }}>
                        <span style={{ fontSize: '3rem' }}>{AULA_TEMAS[selectedAulaTema]?.icon}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 950, color: 'white', marginBottom: '8px', textShadow: '0 2px 10px rgba(0,0,0,0.3)', letterSpacing: '-0.5px' }}>{selectedAulaTema}</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => markThemeCompleted(selectedAulaTema)}
                            style={{
                              background: completedThemes.includes(selectedAulaTema) ? '#2ecc71' : 'rgba(255,255,255,0.2)',
                              color: 'white',
                              border: 'none',
                              padding: '8px 15px',
                              borderRadius: '12px',
                              fontSize: '0.9rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <CheckCircle2 size={18} />
                            {completedThemes.includes(selectedAulaTema) ? 'Completado' : 'Marcar Completado'}
                          </button>
                        </div>
                      </div>
                    </div>


                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <button className="option-btn" style={{ background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)', color: 'white', padding: '30px', borderRadius: '25px', border: 'none', boxShadow: '0 10px 25px rgba(74, 144, 226, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }} onClick={() => showRules({
                        title: "Cuestionario Rápido",
                        description: "Responde preguntas de opción múltiple sobre el tema. ¡Rapidez y fe van de la mano!",
                        points: "✨ +15 Estrellas por cada acierto",
                        icon: <HelpCircle size={60} color="white" />,
                        color: "#4a90e2",
                        nextStep: "start-quiz"
                      })}>
                        <HelpCircle size={40} color="white" />
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 950, fontSize: '1.2rem', textTransform: 'uppercase' }}>Cuestionario Rápido</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 700 }}>MODO INDIVIDUAL</div>
                        </div>
                      </button>

                      <button className="option-btn" style={{ background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)', color: 'white', padding: '30px', borderRadius: '25px', border: 'none', boxShadow: '0 10px 25px rgba(52, 152, 219, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }} onClick={() => showRules({
                        title: "Rosco Individual",
                        description: "Enfréntate tú solo al desafío del abecedario. ¿Podrás completar todas las letras?",
                        points: "✨ +2 Estrellas por cada palabra acertada",
                        icon: <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3498db', fontWeight: 900, fontSize: '2.5rem' }}>A</div>,
                        color: "#3498db",
                        nextStep: "start-pasapalabra-ind"
                      })}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3498db', fontWeight: 900, fontSize: '1.5rem' }}>A</div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 950, fontSize: '1.2rem', textTransform: 'uppercase' }}>Rosco Individual</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 700 }}>MODO INDIVIDUAL</div>
                        </div>
                      </button>

                      <button className="option-btn" style={{ background: 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)', color: 'white', padding: '30px', borderRadius: '25px', border: 'none', boxShadow: '0 10px 25px rgba(241, 196, 15, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }} onClick={() => showRules({
                        title: "Reto Individual (+10)",
                        description: "Intenta descubrir la frase oculta letra a letra antes de que se agote el tiempo.",
                        points: "✨ +10 Estrellas al completar la frase",
                        icon: <Star size={60} color="white" />,
                        color: "#f1c40f",
                        nextStep: "start-phrase-ind"
                      })}>
                        <Star size={40} color="white" />
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 950, fontSize: '1.2rem', textTransform: 'uppercase' }}>Frase Oculta (+10)</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 700 }}>MODO INDIVIDUAL</div>
                        </div>
                      </button>

                      <button className="option-btn" style={{ background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)', color: 'white', padding: '30px', borderRadius: '25px', border: 'none', boxShadow: '0 10px 25px rgba(230, 126, 34, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }} onClick={() => showRules({
                        title: "El Rosco (Pasapalabra)",
                        description: "Compite por equipos para completar el rosco circular. Se juega por turnos: si fallas o pasas la palabra, le toca al equipo contrario.",
                        points: "✨ +2 Estrellas por acierto para cada integrante",
                        icon: <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e67e22', fontWeight: 900, fontSize: '2.5rem' }}>A</div>,
                        color: "#e67e22",
                        nextStep: "select-team-pasapalabra"
                      })}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e67e22', fontWeight: 900, fontSize: '1.5rem' }}>A</div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 950, fontSize: '1.2rem', textTransform: 'uppercase' }}>Rosco Pasapalabra</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 700 }}>MODO EQUIPOS</div>
                        </div>
                      </button>

                      <button className="option-btn" style={{ background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)', color: 'white', padding: '30px', borderRadius: '25px', border: 'none', boxShadow: '0 10px 25px rgba(46, 204, 113, 0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }} onClick={() => showRules({
                        title: "El Intruso",
                        description: "En cada ronda verás 4 opciones. Una de ellas no tiene nada que ver con el tema. ¡Debéis encontrar al impostor!",
                        points: "✨ +5 Estrellas por cada intruso identificado",
                        icon: <Search size={60} color="white" />,
                        color: "#2ecc71",
                        nextStep: "select-team-intruso"
                      })}>
                        <Search size={40} color="white" />
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 950, fontSize: '1.2rem', textTransform: 'uppercase' }}>El Intruso</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 700 }}>MODO EQUIPOS</div>
                        </div>
                      </button>

                      <button className="option-btn" style={{ background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)', color: 'white', padding: '30px', borderRadius: '25px', border: 'none', boxShadow: '0 10px 25px rgba(155, 89, 182, 0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }} onClick={() => showRules({
                        title: "Ordena la Historia",
                        description: "Pon a prueba tu memoria ordenando cronológicamente los sucesos más importantes de esta historia bíblica.",
                        points: "✨ +5 Estrellas para el equipo al completar el orden",
                        icon: <History size={60} color="white" />,
                        color: "#9b59b6",
                        nextStep: "select-team-historia"
                      })}>
                        <History size={40} color="white" />
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 950, fontSize: '1.2rem', textTransform: 'uppercase' }}>Ordena la Historia</div>
                          <div style={{ fontSize: '0.65rem', opacity: 0.9, fontWeight: 700 }}>(SOLO PARTICIPA EL EQUIPO QUE GANE EL SORTEO)</div>
                        </div>
                      </button>

                      <button className="option-btn" style={{ background: 'linear-gradient(135deg, #4a90e2 0%, #2980b9 100%)', color: 'white', padding: '30px', borderRadius: '25px', border: 'none', boxShadow: '0 10px 25px rgba(74, 144, 226, 0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', gridColumn: 'span 2' }} onClick={() => showRules({
                        title: "Frase Oculta por Equipos",
                        description: "Un duelo de equipos para adivinar la frase secreta por turnos. Si fallas una letra, pierdes el turno.",
                        points: "✨ +10 Estrellas para el equipo ganador",
                        icon: <Gamepad2 size={60} color="white" />,
                        color: "#4a90e2",
                        nextStep: "select-team"
                      })}>
                        <Gamepad2 size={40} color="white" />
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 950, fontSize: '1.2rem', textTransform: 'uppercase' }}>Adivinar la Frase</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 700 }}>MODO EQUIPOS</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Quiz Activity */}
                {aulaStep === 'quiz' && activeQuestion && (
                  <div className="quiz-card" style={{ position: 'relative' }}>
                    <button
                      onClick={() => showRules({
                        title: "Cuestionario Rápido",
                        description: "Responde preguntas de opción múltiple sobre este tema.",
                        points: "✨ +5 Estrellas por cada respuesta correcta",
                        icon: <HelpCircle size={60} color="#4a90e2" />,
                        color: "#4a90e2"
                      }, 'quiz')}
                      style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'white', border: '2px solid #eee', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    >
                      ℹ️
                    </button>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Tema: {selectedAulaTema}</div>
                    <div className="question-text" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2c3e50', marginBottom: '2rem', lineHeight: 1.2 }}>{activeQuestion.question}</div>
                    <div className="options-grid">
                      {activeQuestion.options.map((opt, i) => (
                        <button key={i} className="option-btn" onClick={() => handleQuizAnswer(i)}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: Pasapalabra (Rosco) Game */}
                {aulaStep === 'pasapalabra' && (
                  <div className="pasapalabra-game" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '10px', position: 'relative' }}>
                    <button
                      onClick={() => showRules({
                        title: "El Rosco (Pasapalabra)",
                        description: "Duelo por equipos. Si aciertas, sigues jugando. Si fallas o dices 'Pasapalabra', el turno pasa al otro equipo.",
                        points: "✨ +2 Estrellas por palabra | 🔥 +100 EXTRA si hacéis el Rosco Perfecto (del tirón)",
                        icon: <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '2.2rem' }}>A</div>,
                        color: "#e67e22"
                      }, 'pasapalabra')}
                      style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'white', border: '2px solid #eee', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    >
                      ℹ️
                    </button>
                    {/* Header: Timer y Turnos */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ background: pasapalabra.timeLeft <= 30 ? '#e74c3c' : '#2c3e50', color: 'white', padding: '12px 25px', borderRadius: '30px', fontSize: '1.8rem', fontWeight: 900, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                          ⏱️ {Math.floor(pasapalabra.timeLeft / 60)}:{(pasapalabra.timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <button
                          onClick={() => setPasapalabra(prev => ({ ...prev, isPaused: !prev.isPaused }))}
                          style={{ background: pasapalabra.isPaused ? '#2ecc71' : '#f39c12', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        >
                          {pasapalabra.isPaused ? '▶️ REANUDAR' : '⏸️ PAUSAR'}
                        </button>
                      </div>
                      {pasapalabra.teams.length > 0 && (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '60%' }}>
                          {pasapalabra.teams.map((team, idx) => {
                            const isTurn = pasapalabra.currentTeamIdx === idx && pasapalabra.status === 'playing';
                            const isManyTeams = pasapalabra.teams.length > 3;
                            return (
                              <div key={idx} style={{
                                background: isTurn ? 'rgba(74, 144, 226, 0.1)' : 'white',
                                padding: isManyTeams ? '8px 15px' : '12px 25px',
                                borderRadius: '20px',
                                border: isTurn ? '4px solid #4a90e2' : '2px solid #eee',
                                transform: isTurn ? 'scale(1.05)' : 'scale(1)',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: isManyTeams ? '5px' : '8px',
                                minWidth: isManyTeams ? '140px' : '180px',
                                boxShadow: isTurn ? '0 10px 25px rgba(74, 144, 226, 0.2)' : '0 4px 10px rgba(0,0,0,0.05)'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontWeight: 900, color: isTurn ? '#4a90e2' : '#2c3e50', fontSize: '1.1rem' }}>{team.name}</span>
                                  <div style={{ display: 'flex' }}>
                                    {team.studentIds.slice(0, 4).map(sid => (
                                      <img key={sid} src={students.find(s => s.id === sid)?.avatar} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid white', marginLeft: '-12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} alt="" />
                                    ))}
                                  </div>
                                </div>
                                <div style={{ display: 'flex', gap: isManyTeams ? '10px' : '20px', fontSize: isManyTeams ? '1rem' : '1.2rem', fontWeight: 900, background: 'rgba(0,0,0,0.03)', padding: '5px 15px', borderRadius: '15px', width: '100%', justifyContent: 'center' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#27ae60' }}>
                                    <span style={{ fontSize: isManyTeams ? '0.8rem' : '1rem' }}>✅</span> {team.hits || 0}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e74c3c' }}>
                                    <span style={{ fontSize: isManyTeams ? '0.8rem' : '1rem' }}>❌</span> {team.errors || 0}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* El Rosco */}
                    <div style={{ position: 'relative', width: '550px', height: '550px', margin: '5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', scale: '0.95' }}>
                      {pasapalabra.rosco.map((item, idx) => {
                        const total = pasapalabra.rosco.length;
                        const angle = (idx * (360 / total)) - 90;
                        const radius = 240;
                        const x = 275 + radius * Math.cos(angle * Math.PI / 180) - 23;
                        const y = 275 + radius * Math.sin(angle * Math.PI / 180) - 23;

                        const isCurrent = pasapalabra.currentIdx === idx && pasapalabra.status === 'playing';

                        let bgColor = '#4a90e2'; // azul por defecto
                        if (item.status === 'success') bgColor = '#2ecc71';
                        if (item.status === 'error') bgColor = '#e74c3c';

                        return (
                          <div
                            key={idx}
                            style={{
                              position: 'absolute',
                              left: x,
                              top: y,
                              width: '46px',
                              height: '46px',
                              borderRadius: '50%',
                              background: bgColor,
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 900,
                              fontSize: '1.1rem',
                              border: isCurrent ? '4px solid white' : '2px solid rgba(255,255,255,0.4)',
                              boxShadow: isCurrent ? '0 0 25px rgba(74, 144, 226, 0.8)' : '0 4px 10px rgba(0,0,0,0.1)',
                              transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
                              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              zIndex: 10
                            }}
                          >
                            {item.letter}
                          </div>
                        );
                      })}

                      {/* Centro del Rosco: Pregunta */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '280px',
                        textAlign: 'center',
                        background: 'rgba(255,255,255,0.98)',
                        padding: '20px',
                        borderRadius: '40px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                        border: '1px solid #eee',
                        zIndex: 1
                      }}>
                        {pasapalabra.status === 'playing' ? (
                          <>
                            {pasapalabra.showAnswer ? (
                              <div style={{ padding: '10px' }}>
                                <div style={{ color: '#e74c3c', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px' }}>❌ ¡FALLO! LA RESPUESTA ERA:</div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#e74c3c', marginBottom: '20px', letterSpacing: '2px' }}>{pasapalabra.showAnswer}</div>
                                <div style={{ color: '#2c3e50', fontSize: '0.7rem', fontWeight: 800, opacity: 0.6 }}>Siguiente pregunta en 3s...</div>
                              </div>
                            ) : (
                              <>
                                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#4a90e2', marginBottom: '10px' }}>
                                  {pasapalabra.rosco[pasapalabra.currentIdx]?.answer.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().startsWith(pasapalabra.rosco[pasapalabra.currentIdx]?.letter)
                                    ? `EMPIEZA POR LA ${pasapalabra.rosco[pasapalabra.currentIdx]?.letter}`
                                    : `CONTIENE LA ${pasapalabra.rosco[pasapalabra.currentIdx]?.letter}`}
                                </div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2c3e50', marginBottom: '15px', lineHeight: 1.3 }}>
                                  {pasapalabra.rosco[pasapalabra.currentIdx]?.question}
                                </div>
                                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                                  <input
                                    type="text"
                                    autoFocus
                                    placeholder="Respuesta..."
                                    value={pasapalabra.inputValue}
                                    onChange={(e) => setPasapalabra(prev => ({ ...prev, inputValue: e.target.value }))}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePasapalabraAnswer(pasapalabra.inputValue)}
                                    style={{
                                      width: '100%',
                                      padding: '12px',
                                      borderRadius: '15px',
                                      border: '2px solid #4a90e2',
                                      outline: 'none',
                                      fontSize: '1.2rem',
                                      fontWeight: 800,
                                      textAlign: 'center'
                                    }}
                                  />
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                      onClick={() => handlePasapalabraAnswer(pasapalabra.inputValue)}
                                      style={{ flex: 2, background: '#2ecc71', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}
                                    >
                                      COMPROBAR
                                    </button>
                                    <button
                                      onClick={skipPasapalabra}
                                      style={{ flex: 1, background: '#f39c12', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', fontSize: '0.7rem' }}
                                    >
                                      PASAPALABRA
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div style={{ padding: '20px' }}>
                            <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🏆 ¡Fin del Juego!</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {pasapalabra.teams.map((t, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f8f9fa', borderRadius: '12px' }}>
                                  <span style={{ fontWeight: 800 }}>{t.name}</span>
                                  <span style={{ color: '#2ecc71', fontWeight: 900 }}>{t.hits} ACIERTOS</span>
                                </div>
                              ))}
                            </div>
                            <button className="btn-primary" style={{ marginTop: '20px', width: '100%' }} onClick={() => setShowAulaModal(false)}>
                              Salir al Aula
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP: El Intruso Game */}
                {aulaStep === 'intruso' && (
                  <div className="intruso-game" style={{ padding: '20px', position: 'relative' }}>
                    <button
                      onClick={() => showRules({
                        title: "El Intruso",
                        description: "Identifica cuál de las 4 opciones no encaja con el tema. ¡Cuidado con las trampas!",
                        points: "✨ +5 Estrellas por cada intruso pillado",
                        icon: <Search size={60} color="#2ecc71" />,
                        color: "#2ecc71"
                      }, 'intruso')}
                      style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'white', border: '2px solid #eee', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    >
                      ℹ️
                    </button>
                    <h2 style={{ color: '#27ae60', textAlign: 'center', marginBottom: '1rem', fontSize: '2rem', fontWeight: 900 }}>🕵️ ¿Quién es el intruso?</h2>



                    {intrusoGame.status === 'playing' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                        {/* Turno */}
                        <div style={{ background: '#f8f9fa', padding: '10px 30px', borderRadius: '20px', border: '3px solid #2ecc71', fontWeight: 900 }}>
                          Turno de: <span style={{ color: '#2ecc71' }}>{intrusoGame.teams[intrusoGame.currentTeamIdx]?.name}</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%', maxWidth: '600px' }}>
                          {intrusoGame.challenges[intrusoGame.currentIdx].options.map((option, idx) => (
                            <button
                              key={idx}
                              disabled={intrusoGame.showExplanation !== null}
                              onClick={() => handleIntrusoAnswer(idx)}
                              style={{
                                padding: '30px',
                                borderRadius: '25px',
                                border: '4px solid #eee',
                                background: intrusoGame.showExplanation !== null
                                  ? (idx === intrusoGame.challenges[intrusoGame.currentIdx].correct ? '#2ecc71' : '#f8d7da')
                                  : 'white',
                                color: intrusoGame.showExplanation !== null && idx === intrusoGame.challenges[intrusoGame.currentIdx].correct ? 'white' : '#2c3e50',
                                fontSize: '1.5rem',
                                fontWeight: 900,
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s'
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>

                        {intrusoGame.showExplanation && (
                          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#e8f6ef', padding: '20px', borderRadius: '20px', border: '2px solid #2ecc71', textAlign: 'center', width: '100%', maxWidth: '600px' }}>
                            <div style={{ fontWeight: 900, color: '#27ae60', fontSize: '1.2rem', marginBottom: '10px' }}>
                              {intrusoGame.challenges[intrusoGame.currentIdx].correct === intrusoGame.challenges[intrusoGame.currentIdx].correct ? 'ℹ️ EXPLICACIÓN:' : ''}
                            </div>
                            <p style={{ fontWeight: 700, color: '#2c3e50' }}>{intrusoGame.showExplanation}</p>
                            <button
                              className="btn-primary"
                              style={{ marginTop: '20px', background: '#27ae60' }}
                              onClick={nextIntrusoChallenge}
                            >
                              SIGUIENTE RETO ➔
                            </button>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>🎊 ¡Desafío de Intrusos Terminado!</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto 2rem' }}>
                          {intrusoGame.teams.map((t, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#f8f9fa', borderRadius: '15px', border: '2px solid #eee' }}>
                              <span style={{ fontWeight: 800 }}>{t.name}</span>
                              <span style={{ color: '#27ae60', fontWeight: 900 }}>{t.hits} ACIERTOS</span>
                            </div>
                          ))}
                        </div>
                        <button className="btn-primary" style={{ background: '#27ae60' }} onClick={() => setShowAulaModal(false)}>Volver al Aula</button>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP: Ordena la Historia Game */}
                {aulaStep === 'historia' && (
                  <div className="historia-game" style={{ padding: '20px', position: 'relative' }}>
                    <button
                      onClick={() => showRules({
                        title: "Ordena la Historia",
                        description: "Pon a prueba tu memoria ordenando cronológicamente los sucesos más importantes de esta historia bíblica.",
                        points: "✨ +5 Estrellas para el equipo al completar el orden",
                        icon: <History size={60} color="#9b59b6" />,
                        color: "#9b59b6"
                      }, 'historia')}
                      style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'white', border: '2px solid #eee', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    >
                      ℹ️
                    </button>
                    <h2 style={{ color: '#9b59b6', textAlign: 'center', marginBottom: '1rem', fontSize: '2rem', fontWeight: 900 }}>⏳ Ordena la Historia</h2>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                      <div style={{ background: historiaGame.timeLeft <= 10 ? '#e74c3c' : '#9b59b6', color: 'white', padding: '10px 20px', borderRadius: '20px', fontWeight: 900, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                        ⏱️ {historiaGame.timeLeft}s
                      </div>
                      <button
                        onClick={() => setHistoriaGame(prev => ({ ...prev, isPaused: !prev.isPaused }))}
                        style={{ background: '#34495e', color: 'white', padding: '10px 20px', borderRadius: '20px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                      >
                        {historiaGame.isPaused ? '▶️ Reanudar' : '⏸️ Pausar'}
                      </button>
                    </div>



                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
                      <div style={{ background: '#f8f9fa', padding: '10px 25px', borderRadius: '20px', border: '3px solid #9b59b6', fontWeight: 900, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        Turno de: <span style={{ color: '#9b59b6' }}>{historiaGame.teams[historiaGame.currentTeamIdx]?.name}</span>
                      </div>

                    </div>

                    <p style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.2rem' }}>
                      {historiaGame.challenges[historiaGame.currentIdx]?.title}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
                      {historiaGame.challenges[historiaGame.currentIdx]?.items.map((item, idx) => {
                        const isCorrectPosition = item.originalIdx === idx;
                        const isWinState = historiaGame.challenges[historiaGame.currentIdx].items.every((it, i) => it.originalIdx === i);

                        return (
                          <motion.div
                            key={item.id}
                            layout
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '15px',
                              background: isWinState ? 'rgba(46, 204, 113, 0.1)' : 'white',
                              padding: '20px',
                              borderRadius: '20px',
                              border: `3px solid ${isWinState ? '#2ecc71' : '#eee'}`,
                              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                              transition: 'all 0.3s'
                            }}
                          >
                            <div style={{ background: isWinState ? '#2ecc71' : '#9b59b6', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, flexShrink: 0 }}>
                              {idx + 1}
                            </div>
                            <div style={{ flex: 1, fontWeight: 800, color: '#2c3e50', fontSize: '1.1rem' }}>
                              {item.text}
                            </div>
                            {historiaGame.status === 'playing' && !isWinState && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <button
                                  disabled={idx === 0}
                                  onClick={() => handleHistoriaMove(idx, idx - 1)}
                                  style={{ background: '#eee', border: 'none', borderRadius: '8px', padding: '5px', cursor: 'pointer', opacity: idx === 0 ? 0.3 : 1 }}
                                >
                                  ▲
                                </button>
                                <button
                                  disabled={idx === historiaGame.challenges[historiaGame.currentIdx].items.length - 1}
                                  onClick={() => handleHistoriaMove(idx, idx + 1)}
                                  style={{ background: '#eee', border: 'none', borderRadius: '8px', padding: '5px', cursor: 'pointer', opacity: idx === historiaGame.challenges[historiaGame.currentIdx].items.length - 1 ? 0.3 : 1 }}
                                >
                                  ▼
                                </button>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>

                    {historiaGame.status === 'finished' && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', marginTop: '30px', background: 'rgba(46, 204, 113, 0.1)', padding: '30px', borderRadius: '30px', border: '3px dashed #2ecc71' }}>
                        <div style={{ color: '#27ae60', fontSize: '1.8rem', fontWeight: 950, marginBottom: '20px' }}>✨ ¡TORNEO COMPLETADO! ✨</div>
                        <button className="btn-primary" style={{ background: '#2ecc71', padding: '15px 40px', fontSize: '1.2rem' }} onClick={() => setShowAulaModal(false)}>Continuar al Aula</button>
                      </motion.div>
                    )}

                    {historiaGame.status === 'lost' && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', marginTop: '30px', background: 'rgba(231, 76, 60, 0.1)', padding: '30px', borderRadius: '30px', border: '3px dashed #e74c3c' }}>
                        <div style={{ color: '#e74c3c', fontSize: '1.8rem', fontWeight: 950, marginBottom: '20px' }}>⏰ ¡SE ACABÓ EL TIEMPO! ⏰</div>
                        <button className="btn-primary" style={{ background: '#e74c3c', padding: '15px 40px', fontSize: '1.2rem' }} onClick={() => setShowAulaModal(false)}>Volver al Aula</button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* STEP 4: Phrase Game Activity */}
                {aulaStep === 'phrase' && (
                  <div className="phrase-game" style={{ position: 'relative' }}>
                    <button
                      onClick={() => showRules({
                        title: "Adivinar la Frase",
                        description: "Averiguad la frase completa letra a letra. Los fallos pasan el turno al otro equipo.",
                        points: "✨ +10 Estrellas para el equipo que gane",
                        icon: <Gamepad2 size={60} color="#4a90e2" />,
                        color: "#4a90e2"
                      }, 'phrase')}
                      style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'white', border: '2px solid #eee', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    >
                      ℹ️
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '20px' }}>
                      <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
                        <div style={{ background: phraseGame.timeLeft <= 10 ? '#e74c3c' : '#2c3e50', color: 'white', padding: '10px 20px', borderRadius: '25px', fontWeight: 900, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                          ⏱️ {phraseGame.timeLeft}s
                        </div>
                        <button
                          onClick={togglePause}
                          style={{ background: '#34495e', color: 'white', padding: '10px 20px', borderRadius: '25px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                        >
                          {phraseGame.isPaused ? '▶️ Reanudar' : '⏸️ Pausar'}
                        </button>
                      </div>

                      {phraseGame.teams.length > 0 && (
                        <div className="teams-info" style={{ display: 'flex', gap: '15px', flex: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                          {phraseGame.teams.map((t, i) => {
                            const isMyTurn = phraseGame.currentTeamIdx === i && phraseGame.status === 'playing';
                            return (
                              <div
                                key={i}
                                style={{
                                  background: isMyTurn ? 'rgba(74, 144, 226, 0.1)' : 'white',
                                  padding: '6px 12px',
                                  borderRadius: '15px',
                                  boxShadow: isMyTurn ? '0 0 15px rgba(74, 144, 226, 0.3)' : '0 2px 5px rgba(0,0,0,0.05)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  border: isMyTurn ? '3px solid #4a90e2' : '1px solid #eee',
                                  transform: isMyTurn ? 'scale(1.05)' : 'scale(1)',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  position: 'relative'
                                }}
                              >
                                {isMyTurn && <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#4a90e2', color: 'white', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 900 }}>TURNO</span>}
                                <span style={{ fontWeight: 900, fontSize: '0.75rem', color: isMyTurn ? '#4a90e2' : '#2c3e50' }}>{t.name}</span>
                                <div style={{ display: 'flex', marginLeft: '5px' }}>
                                  {t.studentIds.slice(0, 6).map((tid, idx) => (
                                    <img key={tid} src={students.find(st => st.id === tid)?.avatar} style={{ width: '28px', height: '28px', borderRadius: '50%', marginLeft: idx === 0 ? 0 : '-12px', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} alt="" />
                                  ))}
                                  {t.studentIds.length > 6 && (
                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 900, marginLeft: '-12px', border: '2px solid white' }}>
                                      +{t.studentIds.length - 6}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div style={{ color: '#2ecc71', fontWeight: 800 }}>RETO: +10 Estrellas</div>
                    </div>

                    {phraseGame.isPaused && phraseGame.status === 'playing' && (
                      <div style={{ background: '#e74c3c', color: 'white', padding: '12px', borderRadius: '20px', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 900, fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span>⏸️ TIEMPO DETENIDO</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 500, opacity: 0.9 }}>MUESTRA LAS LETRAS QUE DIGAN LOS CHICOS</span>
                        </div>
                        <button
                          onClick={penalizeTeam}
                          style={{
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            padding: '8px 15px',
                            borderRadius: '12px',
                            fontWeight: 800,
                            border: '1px solid rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          ❌ Fallo Equipo (-10)
                        </button>
                      </div>
                    )}

                    <div className="phrase-display" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px 20px',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      minHeight: '100px',
                      padding: '30px',
                      background: phraseGame.isPaused ? '#fff5f5' : '#f8f9fa',
                      borderRadius: '25px',
                      border: phraseGame.isPaused ? '3px dashed #e74c3c' : '2px solid rgba(0,0,0,0.02)',
                      transition: 'all 0.3s ease',
                      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
                    }}>
                      {phraseGame.original.split(' ').map((word, wordIdx, wordsArr) => {
                        // Calcular el índice global para el revelado
                        const charsBefore = wordsArr.slice(0, wordIdx).reduce((acc, w) => acc + w.length + 1, 0);

                        return (
                          <div key={wordIdx} className="word-group" style={{ display: 'flex', gap: '8px', whiteSpace: 'nowrap' }}>
                            {word.split('').map((char, charIdx) => {
                              const globalIdx = charsBefore + charIdx;
                              return (
                                <div key={charIdx} style={{
                                  width: '38px',
                                  height: '50px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderBottom: '4px solid #ced4da',
                                  fontSize: '2rem',
                                  fontWeight: 900,
                                  color: '#2c3e50',
                                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                }}>
                                  {phraseGame.revealed.includes(globalIdx) ? char : ''}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    {phraseGame.status === 'playing' ? (
                      <div className="alphabet-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '8px' }}>
                        {"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split('').map(letter => {
                          const isUsed = phraseGame.usedLetters.includes(letter);
                          const isCorrect = isUsed && phraseGame.original.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(letter);

                          return (
                            <button
                              key={letter}
                              disabled={isUsed}
                              onClick={() => handleKeyPress(letter)}
                              style={{
                                padding: '10px 5px',
                                borderRadius: '10px',
                                border: 'none',
                                background: isUsed ? (isCorrect ? '#d4edda' : '#f8d7da') : 'white',
                                color: isUsed ? (isCorrect ? '#155724' : '#721c24') : '#2c3e50',
                                fontWeight: 800,
                                cursor: isUsed ? 'default' : 'pointer',
                                boxShadow: isUsed ? 'none' : '0 2px 5px rgba(0,0,0,0.1)',
                                fontSize: '1.1rem',
                                transition: 'all 0.2s'
                              }}
                            >
                              {letter}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        {phraseGame.status === 'won' ? (
                          <div>
                            <div style={{ color: '#27ae60', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>🎉 ¡EXCELENTE! Frase Completada</div>

                            {phraseGame.teams.length > 1 ? (
                              <div>
                                <p style={{ marginBottom: '1rem', fontWeight: 800, color: '#2c3e50' }}>¿Qué equipo ha ganado el desafío?</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                                  {phraseGame.teams.map((t, idx) => (
                                    <button
                                      key={idx}
                                      className="btn-primary"
                                      style={{ background: '#4a90e2', padding: '10px 20px' }}
                                      onClick={() => handlePhraseWin(idx)}
                                    >
                                      🏆 {t.name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div style={{ color: '#27ae60', fontWeight: 900 }}>+20 Estrellas para el equipo ✨</div>
                            )}
                          </div>
                        ) : (
                          <div style={{ color: '#e74c3c', fontSize: '1.5rem', fontWeight: 900 }}>⏰ ¡TIEMPO AGOTADO!<br />La frase era: {phraseGame.original}</div>
                        )}

                        {/* Mostrar botón continuar solo si no hay selección de ganador pendiente */}
                        {(phraseGame.status !== 'won' || phraseGame.teams.length <= 1) && (
                          <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => setShowAulaModal(false)}>Continuar</button>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {/* --- COOL RAFFLE OVERLAY --- */}
                {raffleState.active && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 2000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '30px'
                  }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ textAlign: 'center' }}
                    >
                      <div style={{ fontSize: '1.5rem', color: '#f1c40f', fontWeight: 900, marginBottom: '20px', letterSpacing: '2px' }}>
                        🎲 SORTEO DE EQUIPOS 🎲
                      </div>

                      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
                        {raffleState.teams.map((team, idx) => {
                          const isHighlighted = raffleState.highlightedIdx === idx;
                          const isWinner = raffleState.winnerIdx === idx;
                          return (
                            <motion.div
                              key={idx}
                              animate={{
                                scale: isHighlighted ? 1.2 : 1,
                                border: isHighlighted ? '4px solid #f1c40f' : '2px solid rgba(255,255,255,0.2)',
                                boxShadow: isHighlighted ? '0 0 30px rgba(241, 196, 15, 0.6)' : 'none'
                              }}
                              style={{
                                background: isWinner ? '#2ecc71' : 'rgba(255,255,255,0.1)',
                                padding: '20px 30px',
                                borderRadius: '25px',
                                color: 'white',
                                minWidth: '180px'
                              }}
                            >
                              <div style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '10px' }}>{team.name}</div>
                              {isWinner && (
                                <motion.div
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  style={{ color: '#fff', fontWeight: 900, fontSize: '0.9rem' }}
                                >
                                  🏆 ¡EMPIEZA!
                                </motion.div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>

                      {raffleState.winnerIdx === null ? (
                        <div style={{ color: 'white', fontWeight: 700, opacity: 0.7 }}>Sorteando...</div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ fontSize: '2.5rem', fontWeight: 950, color: '#f1c40f', textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                        >
                          ¡{raffleState.teams[raffleState.winnerIdx].name}! 🚀
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )
      }

      <footer style={{ textAlign: 'center', padding: '4rem 0', color: '#7f8c8d' }}>
        <p>✨ "Dejad a los niños venir a mí" ✨</p>
      </footer>

      {/* --- APOTHEOSIC CELEBRATION ELEMENTS --- */}
      <AnimatePresence>
        {apotheosic && (
          <div className="apotheosic-overlay" style={{ pointerEvents: 'none' }}>


            {/* Globos volando al azar */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`balloon-${i}`}
                className="balloon"
                initial={{ left: `${Math.random() * 100}%`, bottom: '-100px' }}
                animate={{ bottom: '120vh', rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4 + Math.random() * 3, ease: 'easeOut', delay: Math.random() * 2 }}
              >
                {['🎈', '🎉', '🎊', '✨'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}

            {/* Ángeles descendiendo */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`angel-${i}`}
                className="angel"
                initial={{ left: `${10 + i * 15}%`, top: '-150px', opacity: 0 }}
                animate={{ top: '120vh', opacity: [0, 1, 1, 0], scale: [0.5, 1, 1.2, 1.5] }}
                transition={{ duration: 5 + Math.random() * 2, ease: 'easeInOut', delay: i * 0.5 }}
              >
                👼
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div >
  );
}

export default App;
