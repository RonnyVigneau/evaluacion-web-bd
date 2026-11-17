# Proyecto Web con Acceso a Base de Datos (MySQL + Node.js)

Aplicación web full-stack de consulta y filtrado dinámico de productos conectada a una base de datos relacional en MySQL.

## Estructura del Proyecto
- `backend/`: Servidor API REST en Node.js, Express y `mysql2`, más el script `datos.sql`.
- `frontend/`: Interfaz responsiva construida con HTML5 semántico, CSS3, Bootstrap 5 y JavaScript (Fetch API + DOM).
- `modelo_relacional.png`: Diagrama entidad-relación de las tablas `categorias` y `productos`.

## Instrucciones de Ejecución

1. **Base de Datos (MySQL):**
   - Abrir MySQL Workbench y ejecutar el script ubicado en `backend/datos.sql`.
2. **Backend (Node.js):**
   - Abrir una terminal en la carpeta `backend/`.
   - Ejecutar `npm install` para instalar dependencias.
   - Crear un archivo `.env` con las credenciales locales (`PORT=3000`, `DB_HOST=localhost`, `DB_PORT=3306`, `DB_DATABASE=catalogo_gamer_db`, `DB_USER=root`, `DB_PASSWORD=tu_clave`).
   - Iniciar el servidor con `npm start` (o `npm run dev`).
3. **Frontend:**
   - Abrir `frontend/index.html` con la extensión **Live Server** en Visual Studio Code (`http://127.0.0.1:5500`).