/**
 * Lógica del Frontend - Consumo de API REST y Filtrado Dinámico en el DOM
 */

const URL_API = "http://localhost:3000/api/productos";

// Almacena en memoria los productos recibidos desde MySQL para filtrarlos sin recargar
let listaProductos = [];

// Referencias a elementos del DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const inputBuscador = document.getElementById("buscador");
const selectCategoria = document.getElementById("filtro-categoria");
const btnLimpiar = document.getElementById("btn-limpiar");
const contadorResultados = document.getElementById("contador-resultados");
const alertaError = document.getElementById("alerta-error");

/**
 * Solicita los productos al servidor Node.js mediante Fetch API
 */
async function obtenerProductos() {
    try {
        const respuesta = await fetch(URL_API);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        listaProductos = await respuesta.json();
        renderizarProductos(listaProductos);
    } catch (error) {
        console.error("Error al conectar con el backend:", error);
        alertaError.textContent = "No se pudo conectar con la base de datos. Verifica que el servidor Node.js esté activo en el puerto 3000.";
        alertaError.classList.remove("d-none");
        contadorResultados.textContent = "0 productos";
    }
}

/**
 * Construye e inyecta las tarjetas HTML en el DOM según el arreglo recibido
 * @param {Array} productos - Lista de productos a dibujar en pantalla
 */
function renderizarProductos(productos) {
    contenedorProductos.innerHTML = "";
    contadorResultados.textContent = `${productos.length} producto(s)`;

    if (productos.length === 0) {
        contenedorProductos.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted fs-5">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
        `;
        return;
    }

    productos.forEach((producto) => {
        // Formateo de moneda en pesos chilenos (CLP)
        const precioFormateado = Number(producto.precio).toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP"
        });

        const columna = document.createElement("div");
        columna.className = "col";

        columna.innerHTML = `
            <article class="card h-100 shadow-sm card-producto">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-info text-dark">${producto.categoria}</span>
                        <small class="text-muted">Stock: ${producto.stock}</small>
                    </div>
                    <h2 class="h5 card-title fw-bold">${producto.nombre}</h2>
                    <p class="card-text text-secondary small flex-grow-1">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-2">
                        <span class="precio-tag">${precioFormateado}</span>
                        <span class="text-muted small">ID #${producto.producto_id}</span>
                    </div>
                </div>
            </article>
        `;
        contenedorProductos.appendChild(columna);
    });
}

/**
 * Filtra dinámicamente la lista en memoria combinando texto y categoría
 */
function aplicarFiltros() {
    const texto = inputBuscador.value.toLowerCase().trim();
    const categoriaSeleccionada = selectCategoria.value;

    const filtrados = listaProductos.filter((prod) => {
        const coincideTexto =
            prod.nombre.toLowerCase().includes(texto) ||
            prod.descripcion.toLowerCase().includes(texto);

        const coincideCategoria =
            categoriaSeleccionada === "todas" ||
            prod.categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;
    });

    renderizarProductos(filtrados);
}

// Eventos de escucha en tiempo real
inputBuscador.addEventListener("input", aplicarFiltros);
selectCategoria.addEventListener("change", aplicarFiltros);

btnLimpiar.addEventListener("click", () => {
    inputBuscador.value = "";
    selectCategoria.value = "todas";
    renderizarProductos(listaProductos);
});

// Carga inicial al abrir la página
document.addEventListener("DOMContentLoaded", obtenerProductos);