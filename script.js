const API_KEY = "bc77a4696cad2b917525bd1e00ada480";
const URL_API = `https://gnews.io/api/v4/search?q=mexico OR internacional OR actualidad&lang=es&max=10&apikey=${API_KEY}`;

const contenedorNoticias = document.getElementById("contenedor-noticias");
const estadoMensaje = document.getElementById("estado-mensaje");
const btnRefrescar = document.getElementById("btn-refrescar");

const IMAGEN_RESPALDO = "https://via.placeholder.com/600x340/13678a/ffffff?text=Noticia";

async function obtenerNoticias() {
    estadoMensaje.className = "estado-mensaje";
    estadoMensaje.textContent = "Cargando noticias...";

    try {
        const respuesta = await fetch(URL_API);
        const datos = await respuesta.json();

        if (!datos.articles || datos.articles.length === 0) {
            estadoMensaje.className = "estado-mensaje error";
            estadoMensaje.textContent = "No se encontraron noticias.";
            return;
        }

        mostrarNoticias(datos.articles);
        estadoMensaje.textContent = `Se cargaron ${datos.articles.length} noticias.`;

    } catch (error) {
        contenedorNoticias.innerHTML = "";
        estadoMensaje.className = "estado-mensaje error";
        estadoMensaje.textContent = "Error al cargar las noticias. Revisa tu conexión.";
    }
}

function mostrarNoticias(articulos) {
    contenedorNoticias.innerHTML = "";

    articulos.forEach((noticia) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-noticia";

        const imagen = noticia.image || IMAGEN_RESPALDO;
        const fuente = noticia.source.name || "Noticias";
        const fecha = noticia.publishedAt.slice(0, 10);
        const descripcion = noticia.description || "Sin descripción disponible.";

        tarjeta.innerHTML = `
            <img src="${imagen}" alt="Imagen de la noticia" class="tarjeta-imagen">
            <div class="tarjeta-contenido">
                <div class="tarjeta-meta">
                    <span>${fuente}</span>
                    <span>${fecha}</span>
                </div>
                <h2 class="tarjeta-titulo">
                    <a href="${noticia.url}" target="_blank">${noticia.title}</a>
                </h2>
                <p class="tarjeta-descripcion">${descripcion}</p>
                <a href="${noticia.url}" target="_blank" class="tarjeta-enlace">Leer más →</a>
            </div>
        `;

        contenedorNoticias.appendChild(tarjeta);
    });
}

document.addEventListener("DOMContentLoaded", obtenerNoticias);
btnRefrescar.addEventListener("click", obtenerNoticias);