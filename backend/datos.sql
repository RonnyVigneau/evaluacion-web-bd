-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS catalogo_gamer_db;
USE catalogo_gamer_db;

-- Tabla padre: Categorías (PK: categoria_id)
CREATE TABLE categorias (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL
);

-- Tabla hija: Productos (PK: producto_id, FK: categoria_id)
CREATE TABLE productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 10,
    categoria_id INT NOT NULL,
    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(categoria_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Inserción de categorías
INSERT INTO categorias (nombre) VALUES
('RPG & Estrategia'),
('Hardware & Periféricos'),
('Simulación & VR');

-- Inserción de productos de prueba
INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES
('Baldur''s Gate 3 (Edición Digital)', 'RPG táctico basado en Dungeons & Dragons con narrativa ramificada.', 44990, 50, 1),
('Age of Mythology: Retold', 'Estrategia en tiempo real con civilizaciones mitológicas remasterizadas.', 22990, 35, 1),
('Teclado Mecánico 65% RGB', 'Switches táctiles silenciosos ideal para programación y gaming.', 54990, 12, 2),
('Mouse Ergonómico Inalámbrico', 'Sensor óptico de 16.000 DPI y baja latencia.', 34990, 18, 2),
('Visor VR Standalone 128GB', 'Casco de realidad virtual con seguimiento espacial integrado.', 329990, 5, 3),
('Control HOTAS Simulación Aérea', 'Palanca de mando y acelerador para simuladores de vuelo.', 89990, 8, 3);