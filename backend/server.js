/**
 * Servidor Backend - API REST para consulta de catálogo en MySQL
 * Utiliza Express para las rutas HTTP y mysql2/promise para consultas asíncronas.
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS para permitir peticiones desde Live Server (puerto 5500)
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500", "http://127.0.0.1:5501"]
}));
app.use(express.json());

// Pool de conexiones a MySQL usando variables de entorno (.env)
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "catalogo_gamer_db",
    waitForConnections: true,
    connectionLimit: 10
});

// Ruta raíz de comprobación de estado del servidor
app.get("/", (req, res) => {
    res.send("API de Catálogo funcionando correctamente.");
});

// Endpoint principal: obtiene productos unidos con su categoría mediante INNER JOIN
app.get("/api/productos", async (req, res) => {
    try {
        const consulta = `
            SELECT 
                p.producto_id,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock,
                c.nombre AS categoria
            FROM productos AS p
            INNER JOIN categorias AS c ON p.categoria_id = c.categoria_id
            ORDER BY p.producto_id ASC;
        `;
        const [filas] = await pool.query(consulta);
        res.json(filas);
    } catch (error) {
        console.error("Error al consultar la base de datos:", error.message);
        res.status(500).json({ mensaje: "Error interno al obtener los productos." });
    }
});

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});