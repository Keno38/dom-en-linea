// =====================================================
// DOM en Línea - Código base
// Personalización mediante config.json
// No modificar este archivo para adaptar una municipalidad.
// =====================================================

async function cargarConfig() {
  const respuesta = await fetch("./config.json", { cache: "no-store" });

  if (!respuesta.ok) {
    throw new Error("No se pudo cargar el archivo config.json");
  }

  return await respuesta.json();
}

function texto(id, valor) {
  const elemento = document.getElementById(id);
  if (elemento && valor !== undefined && valor !== null) {
    elemento.textContent = valor;
  }
}

function enlace(selector, url) {
  if (!url) return;
  document.querySelectorAll(selector).forEach((elemento) => {
    elemento.href = url;
  });
}

function imagen(id, src, alt) {
  const elemento = document.getElementById(id);
  if (!elemento) return;

  if (src) elemento.src = src;
  if (alt) elemento.alt = alt;
}

function limpiarHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function aplicarConfig(config) {
  const municipalidad = config.municipalidad || {};
  const dom = config.dom || {};
  const hero = config.hero || {};
  const urls = config.urls || {};
  const recursos = config.recursos || {};
  const textos = config.textos || {};

  // Título de la pestaña del navegador
  document.title = `${hero.titulo || "DOM en Línea"} | ${municipalidad.nombre || "Municipalidad"}`;

  // Header municipal
  enlace("#linkMunicipio", municipalidad.url);
  imagen("logoMunicipio", municipalidad.logo, municipalidad.nombre || "Logo municipal");

  // Hero principal
  texto("domNombre", dom.nombre);
  texto("heroTitulo", hero.titulo);
  texto("heroSubtitulo", hero.subtitulo);
  texto("heroDescripcion", hero.descripcion);

  if (hero.imagen) {
    const heroSection = document.querySelector(".hero");
    heroSection.style.backgroundImage = `
      linear-gradient(
        90deg,
        rgba(15, 60, 104, 0.85) 0%,
        rgba(15, 60, 104, 0.7) 40%,
        rgba(15, 60, 104, 0.4) 70%,
        rgba(15, 60, 104, 0.2) 100%
      ),
      url("${hero.imagen}")
    `;
  }

  // Enlaces principales
  enlace(".link-dom", urls.domEnLinea);
  enlace("#linkFormularios", urls.formulariosMinvu);
  enlace("#linkClaveUnica", urls.claveUnica);
  enlace("#linkTriptico", recursos.triptico);
  enlace("#linkPasoAPaso", recursos.pasoAPaso);

  // Video
  texto("videoKicker", textos.videoKicker);
  texto("videoTitulo", textos.videoTitulo);
  texto("videoDescripcion", textos.videoDescripcion);

  const videoSource = document.getElementById("videoSource");
  const videoDom = document.getElementById("videoDom");
  if (videoSource && recursos.video) {
    videoSource.src = recursos.video;
    if (videoDom) videoDom.load();
  }

  // FAQ
  texto("faqRespuestaCertificado", textos.faqRespuestaCertificado);

  // Footer
  texto("footerTituloDom", dom.tituloFooter || "Dirección de Obras");
  texto("footerMunicipalidad", municipalidad.nombre);
  texto("footerDireccion", dom.direccion ? `Dirección: ${dom.direccion}` : "");
  texto("footerTelefono", dom.telefono ? `Teléfono: ${dom.telefono}` : "");
  texto("footerCorreo", dom.correo ? `Correo: ${dom.correo}` : "");
}

function crearAcordeon(certificados, urlDomEnLinea) {
  const accordion = document.getElementById("certificadosAccordion");
  if (!accordion) return;

  accordion.innerHTML = "";

  certificados.forEach((certificado) => {
    const item = document.createElement("div");
    item.className = "accordion-item";

    const documentos = Array.isArray(certificado.documentos)
      ? certificado.documentos
      : [];

    item.innerHTML = `
      <button class="accordion-header" type="button">
        <div class="accordion-title-wrap">
          <div class="accordion-badge">📄</div>
          <div>
            <h3 class="accordion-title">${limpiarHTML(certificado.nombre)}</h3>
            <p class="accordion-subtitle">Plazo referencial: ${limpiarHTML(certificado.plazo)}</p>
          </div>
        </div>
        <div class="accordion-arrow">⌄</div>
      </button>

      <div class="accordion-content">
        <div class="accordion-grid">
          <div class="info-box">
            <h4>Descripción</h4>
            <p>${limpiarHTML(certificado.descripcion)}</p>
          </div>

          <div class="info-box">
            <h4>Documentos requeridos</h4>
            <ul>
              ${documentos.map((doc) => `<li>${limpiarHTML(doc)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="accordion-actions">
          ${certificado.formulario ? `
            <a class="btn btn-outline" href="${limpiarHTML(certificado.formulario)}" target="_blank">
              Ver formulario
            </a>
          ` : ""}

          <a class="btn btn-accent" href="${limpiarHTML(urlDomEnLinea)}" target="_blank">
            Ir a DOM en Línea
          </a>
        </div>
      </div>
    `;

    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      item.classList.toggle("active");
    });

    accordion.appendChild(item);
  });
}

function activarPreguntasFrecuentes() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.classList.toggle("active");
    });
  });
}

async function iniciarSitio() {
  try {
    const config = await cargarConfig();
    aplicarConfig(config);
    crearAcordeon(config.certificados || [], config.urls?.domEnLinea || "#");
    activarPreguntasFrecuentes();
  } catch (error) {
    console.error(error);

    const accordion = document.getElementById("certificadosAccordion");
    if (accordion) {
      accordion.innerHTML = `
        <div class="info-card">
          <h3>No se pudo cargar la configuración</h3>
          <p>Verifica que el archivo config.json exista y que estés probando el sitio con Live Server o desde un hosting.</p>
        </div>
      `;
    }
  }
}

document.addEventListener("DOMContentLoaded", iniciarSitio);
