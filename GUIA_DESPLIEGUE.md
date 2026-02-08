# 📖 Guía de Despliegue - Catequesis App

Este archivo contiene las instrucciones necesarias para subir la aplicación a GitHub y desplegarla en Vercel para que no caduque.

## 🚀 Pasos para GitHub

1. **Crear Repositorio**: Entra en [GitHub](https://github.com/new) y crea un nuevo repositorio llamado `catequesis-app`.
2. **Inicializar Git**: En la carpeta raíz del proyecto, ejecuta:
   ```powershell
   git init
   git add .
   git commit -m "Versión estable con celebraciones celestiales"
   ```
3. **Conectar y Subir**:
   ```powershell
   git remote add origin https://github.com/TU_USUARIO/catequesis-app.git
   git branch -M main
   git push -u origin main
   ```

## 🌍 Despliegue en Vercel (Enlace Permanente)

1. Entra en [Vercel](https://vercel.com/import/git).
2. Conecta tu cuenta de GitHub.
3. Selecciona el repositorio `catequesis-app`.
4. En **Framework Preset**, asegúrate que detecta **Vite**.
5. Pulsa **Deploy**.
6. ¡Listo! Recibirás un enlace tipo `catequesis-app.vercel.app` que podrás usar en tu móvil Samsung A21 y proyectar siempre.

## 📁 Estructura del Proyecto
- `src/App.jsx`: Lógica principal, alumnos y celebraciones.
- `src/index.css`: Estilos, animaciones de ángeles y nubes.
- `public/AVATARES/`: Fotos reales de los alumnos.
- `dist/`: Carpeta para copiar al Pendrive (uso offline).

---
*Documento generado para Juan - Proyecto Catequesis 2026* ✨🏆⛪
