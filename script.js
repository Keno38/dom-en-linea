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
    if (heroSection) {
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

<<<<<<< HEAD
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
=======
crearAcordeon();
/* CONFIGURACIÓN GENERAL */

function obtenerConfigDom(clave, valorPorDefecto) {
  if (window.DOM_CONFIG && Object.prototype.hasOwnProperty.call(window.DOM_CONFIG, clave)) {
    return window.DOM_CONFIG[clave];
  }
  return valorPorDefecto;
}

function obtenerPosicionPdf(clave, valorPorDefecto) {
  const posiciones = obtenerConfigDom("posicionesPdf", {});
  return posiciones && posiciones[clave] ? posiciones[clave] : valorPorDefecto;
}

function asignarValor(id, valor, sobrescribir = true) {
  const elemento = document.getElementById(id);
  if (!elemento || valor === undefined || valor === null || String(valor).trim() === "") return;

  if (sobrescribir || !elemento.value.trim()) {
    elemento.value = String(valor).trim();
  }
}

function extraerNumeroDireccion(texto) {
  if (!texto) return "";
  const coincidencia = String(texto).match(/\b\d{1,6}[A-Za-z]?\b/);
  return coincidencia ? coincidencia[0] : "";
}

function limpiarCalle(calle) {
  if (!calle) return "";
  return String(calle)
    .replace(/\s+/g, " ")
    .trim();
}

function obtenerLocalidadDesdeAddress(address = {}) {
  return (
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    address.municipality ||
    address.county ||
    address.suburb ||
    obtenerConfigDom("localidadPredeterminada", "") ||
    obtenerConfigDom("comunaBusqueda", "")
  );
}
function determinarZona(address = {}) {

  if (
    address.hamlet ||
    address.farm ||
    address.allotments
  ) {
    return "rural";
  }

  if (
    address.city ||
    address.town ||
    address.village ||
    address.suburb ||
    address.neighbourhood
  ) {
    return "urbano";
  }

  return "";
}

function autocompletarDireccionFormulario(address = {}, textoBusqueda = "") {

  const calle = limpiarCalle(

    address.road ||
    address.pedestrian ||
    address.residential ||
    address.footway ||
    address.path ||
    address.neighbourhood ||
    ""
  );

  const numero = address.house_number || extraerNumeroDireccion(textoBusqueda);
  
//  limpiar siempre el número primero
const inputNumero = document.getElementById("numero");
if (inputNumero) {
  inputNumero.value = "";
}

//  luego asignar solo si existe número real
if (numero) {
  asignarValor("numero", numero, true);
}



  const localidad = obtenerLocalidadDesdeAddress(address);
  const zonaPredeterminada = obtenerConfigDom("zonaPredeterminada", "");

  asignarValor("calle", calle, true);
  asignarValor("numero", numero, true);
  const checkSinNumero = document.getElementById("sinNumero");

if (checkSinNumero && checkSinNumero.checked) {
  asignarValor("numero", "S/N", true);
} else if (numero){
  asignarValor("numero", numero, true);
}

  asignarValor("localidad", localidad, true);
  const zonaDetectada = determinarZona(address);

  const zona = document.getElementById("zona");
  
  
// ✅ PRIORIDAD: detección del mapa
if (zona && zonaDetectada) {
  zona.value = zonaDetectada;
}
// ✅ fallback si no se puede detectar
else if (zona && zonaPredeterminada && !zona.value) {
  zona.value = zonaPredeterminada;
}


  actualizarEstadoFlujo();
}

function hayUbicacionSeleccionada() {
  return Boolean(obtenerValor("latitud") && obtenerValor("longitud"));
}

function actualizarPaso(id, estado) {
  const paso = document.getElementById(id);
  if (!paso) return;

  paso.classList.remove("activo", "completado");
  if (estado) paso.classList.add(estado);
}


function actualizarEstadoFlujo() {
  const hayUbicacion = hayUbicacionSeleccionada();
  const estadoUbicacion = document.getElementById("estadoUbicacion");
  const botones = ["btnGuardarDatos", "btnGenerarPdf", "btnImprimirPdf"];

  botones.forEach((id) => {
    const boton = document.getElementById(id);
    if (boton) boton.disabled = !hayUbicacion;
  });

  if (estadoUbicacion) {
    if (hayUbicacion) {
      estadoUbicacion.textContent = "Ubicación lista. Revise los datos autocompletados y complete los datos personales.";
      estadoUbicacion.classList.remove("pendiente");
      estadoUbicacion.classList.add("listo");
    } else {
      estadoUbicacion.textContent = "Seleccione una ubicación para continuar con el formulario.";
      estadoUbicacion.classList.remove("listo");
      estadoUbicacion.classList.add("pendiente");
    }
  }

  if (hayUbicacion) {
    actualizarPaso("pasoUbicacion", "completado");
    actualizarPaso("pasoFormulario", "activo");
    actualizarPaso("pasoPdf", "");
  } else {
    actualizarPaso("pasoUbicacion", "activo");
    actualizarPaso("pasoFormulario", "");
    actualizarPaso("pasoPdf", "");
  }
}

function irAlFormularioDespuesDeUbicacion() {
  if (!hayUbicacionSeleccionada()) {
    alert("Primero debe buscar una dirección o marcar el punto en el mapa.");
    return;
  }

  const formulario = document.getElementById("solicitudForm");
  if (formulario) {
    formulario.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* MAPA PARA CROQUIS DE UBICACIÓN */

let mapaPredio;
let marcadorPredio;


function iniciarMapaPredio() {
  const contenedorMapa = document.getElementById("mapaPredio");

  if (!contenedorMapa) {
    return;
  }

  const centroMapa = obtenerConfigDom("centroMapa", [-34.233333, -70.966667]);
  const zoomInicial = obtenerConfigDom("zoomInicial", 14);

  mapaPredio = L.map("mapaPredio").setView(centroMapa, zoomInicial);

  // 🗺️ Mapa normal (solo calles)
 const mapaNormal = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19
  }
);

// 🌍 Satélite
const satelite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 19
  }
);

// 🛣️ CALLES visibles arriba
const etiquetas = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    opacity: 0.7
  }
);

// 🔥 combinación
const grupoSatelite = L.layerGroup([satelite, etiquetas]);

// iniciar en satélite
grupoSatelite.addTo(mapaPredio);

// selector
L.control.layers({
  "Calles": mapaNormal,
  "Satélite": grupoSatelite
}).addTo(mapaPredio);

  // 📍 Evento click
  mapaPredio.on("click", async function (event) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    actualizarUbicacionPredio(lat, lng, "Punto marcado en el mapa");
    await completarDireccionPorCoordenadas(lat, lng);
  });

  setTimeout(() => {
    mapaPredio.invalidateSize();
  }, 300);
}

function actualizarUbicacionPredio(lat, lng, texto) {
  const latitudInput = document.getElementById("latitud");
  const longitudInput = document.getElementById("longitud");
  const coordenadasTexto = document.getElementById("coordenadasTexto");

  const latFixed = Number(lat).toFixed(6);
  const lngFixed = Number(lng).toFixed(6);

  latitudInput.value = latFixed;
  longitudInput.value = lngFixed;

  coordenadasTexto.textContent = `${texto} | Latitud: ${latFixed} - Longitud: ${lngFixed}`;

  if (marcadorPredio) {
    marcadorPredio.setLatLng([lat, lng]);
  } else {
    marcadorPredio = L.marker([lat, lng], {
      draggable: true
    }).addTo(mapaPredio);

    marcadorPredio.on("dragend", async function () {
      const posicion = marcadorPredio.getLatLng();
      actualizarUbicacionPredio(
        posicion.lat,
        posicion.lng,
        "Punto ajustado manualmente"
      );
      await completarDireccionPorCoordenadas(posicion.lat, posicion.lng);
    });
  }

  marcadorPredio
    .bindPopup("Ubicación seleccionada para el croquis")
    .openPopup();

  actualizarEstadoFlujo();
}

function construirConsultaDireccion(direccion) {
  const comuna = obtenerConfigDom("comunaBusqueda", "");
  const region = obtenerConfigDom("regionBusqueda", "");
  const pais = obtenerConfigDom("paisBusqueda", "Chile");

  return [direccion, comuna, region, pais]
    .filter(Boolean)
    .join(", ");
}

function construirUrlBusquedaMapa(consulta) {
  const codigoPais = obtenerConfigDom("codigoPais", "cl");
  const viewbox = obtenerConfigDom("viewboxBusqueda", "");
  const bounded = obtenerConfigDom("boundedBusqueda", false);

  const params = new URLSearchParams({
    format: "jsonv2",
    limit: "1",
    addressdetails: "1",
    "accept-language": "es",
    q: consulta
  });

  if (codigoPais) params.set("countrycodes", codigoPais);
  if (viewbox) params.set("viewbox", viewbox);
  if (viewbox && bounded) params.set("bounded", "1");

  return `https://nominatim.openstreetmap.org/search?${params.toString()}`;
}

async function completarDireccionPorCoordenadas(lat, lng) {
  const codigoPais = obtenerConfigDom("codigoPais", "cl");

  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(lat),
    lon: String(lng),
    addressdetails: "1",
    "accept-language": "es"
  });

  if (codigoPais) params.set("countrycodes", codigoPais);

  const url = `https://nominatim.openstreetmap.org/reverse?${params.toString()}`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos && datos.address) {
      autocompletarDireccionFormulario(datos.address, datos.display_name || "");
    }
  } catch (error) {
    console.warn("No se pudo autocompletar la dirección desde el mapa.", error);
  }
}

async function buscarDireccionEnMapa() {
  const inputBuscar = document.getElementById("buscarDireccion");
  const direccion = inputBuscar.value.trim();

  if (!direccion) {
    alert("Ingrese una dirección o sector para buscar.");
    return;
  }

  const consulta = construirConsultaDireccion(direccion);
  const url = construirUrlBusquedaMapa(consulta);

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (!datos || datos.length === 0) {
      alert("No se encontró la dirección. Intente escribirla de otra forma o marque el punto manualmente en el mapa.");
      return;
    }

    const resultado = datos[0];
    const lat = parseFloat(resultado.lat);
    const lng = parseFloat(resultado.lon);
    const zoomBusqueda = obtenerConfigDom("zoomBusqueda", 17);

    mapaPredio.setView([lat, lng], zoomBusqueda);
    actualizarUbicacionPredio(lat, lng, "Dirección encontrada");
    autocompletarDireccionFormulario(resultado.address || {}, direccion);
  } catch (error) {
    console.error(error);
    alert("No se pudo buscar la dirección. Revise la conexión a internet o marque el punto manualmente.");
  }
}

const btnBuscarMapa = document.getElementById("btnBuscarMapa");

if (btnBuscarMapa) {
  btnBuscarMapa.addEventListener("click", buscarDireccionEnMapa);
}

const inputBuscarDireccion = document.getElementById("buscarDireccion");

if (inputBuscarDireccion) {
  inputBuscarDireccion.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      buscarDireccionEnMapa();
    }
  });
}

const btnGuardarDatos = document.getElementById("btnGuardarDatos");

if (btnGuardarDatos) {
  btnGuardarDatos.addEventListener("click", function () {
    if (!validarFormularioCip()) {
      return;
    }

    actualizarPaso("pasoFormulario", "completado");
    actualizarPaso("pasoPdf", "activo");

    alert("Datos preparados correctamente. Ahora puede descargar o imprimir el formulario PDF.");
  });
}

const btnConfirmarUbicacion = document.getElementById("btnConfirmarUbicacion");

if (btnConfirmarUbicacion) {
  btnConfirmarUbicacion.addEventListener("click", irAlFormularioDespuesDeUbicacion);
}

iniciarMapaPredio();
actualizarEstadoFlujo();

/* GENERAR PDF CIP COMPLETADO */

function obtenerValor(id) {
  const elemento = document.getElementById(id);
  return elemento ? elemento.value.trim() : "";
}
/* VALIDACIÓN Y FORMATO AUTOMÁTICO DE RUT CHILENO */

function limpiarRut(rut) {
  return String(rut || "")
    .replace(/[^0-9kK]/g, "")
    .toUpperCase();
}

function formatearRut(rut) {
  const rutLimpio = limpiarRut(rut);

  if (rutLimpio.length < 2) {
    return rutLimpio;
  }

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${cuerpoFormateado}-${dv}`;
}

function calcularDigitoVerificadorRut(cuerpo) {
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const resultado = 11 - resto;

  if (resultado === 11) return "0";
  if (resultado === 10) return "K";
  return String(resultado);
}

function validarRutChileno(rut) {
  const rutLimpio = limpiarRut(rut);

  if (rutLimpio.length < 2) {
    return false;
  }

  const cuerpo = rutLimpio.slice(0, -1);
  const dvIngresado = rutLimpio.slice(-1);

  if (!/^\d+$/.test(cuerpo)) {
    return false;
  }

  const dvCalculado = calcularDigitoVerificadorRut(cuerpo);
  return dvCalculado === dvIngresado;
}

function obtenerMensajeRut() {
  let mensaje = document.getElementById("rutMensaje");
  const inputRut = document.getElementById("rut");

  if (!inputRut) return null;

  if (!mensaje) {
    mensaje = document.createElement("small");
    mensaje.id = "rutMensaje";
    mensaje.style.display = "block";
    mensaje.style.marginTop = "6px";
    mensaje.style.fontWeight = "700";
    inputRut.insertAdjacentElement("afterend", mensaje);
  }

  return mensaje;
}

function mostrarEstadoRut() {
  const inputRut = document.getElementById("rut");
  const mensaje = obtenerMensajeRut();

  if (!inputRut || !mensaje) return true;

  const valor = inputRut.value.trim();

  if (!valor) {
    inputRut.style.borderColor = "";
    inputRut.setCustomValidity("");
    mensaje.textContent = "";
    return false;
  }

  inputRut.value = formatearRut(valor);

  if (validarRutChileno(inputRut.value)) {
    inputRut.style.borderColor = "#16a34a";
    inputRut.setCustomValidity("");
    mensaje.textContent = "RUT válido.";
    mensaje.style.color = "#0f6b45";
    return true;
  }

  inputRut.style.borderColor = "#dc2626";
  inputRut.setCustomValidity("RUT inválido.");
  mensaje.textContent = "RUT inválido. Revise el número o dígito verificador.";
  mensaje.style.color = "#b91c1c";
  return false;
}

function activarValidacionRut() {
  const inputRut = document.getElementById("rut");

  if (!inputRut) return;

  inputRut.setAttribute("maxlength", "12");
  inputRut.setAttribute("autocomplete", "off");

  inputRut.addEventListener("input", function () {
    this.value = this.value
      .replace(/[^0-9kK.\-]/g, "")
      .toUpperCase();

    const mensaje = obtenerMensajeRut();
    if (mensaje) {
      mensaje.textContent = "";
    }

    this.style.borderColor = "";
    this.setCustomValidity("");
  });

  inputRut.addEventListener("blur", mostrarEstadoRut);
}

function validarFormularioCip() {
  const rutInput = document.getElementById("rut");
  const numeroInput = document.getElementById("numero");
  const checkSinNumero = document.getElementById("sinNumero");
  const rolSiiInput = document.getElementById("rolSii");

  if (rutInput) {
    rutInput.value = formatearRut(rutInput.value);
  }

  if (checkSinNumero && checkSinNumero.checked && numeroInput) {
    numeroInput.value = "S/N";
  }

  const nombre = obtenerValor("nombre");
  const rut = obtenerValor("rut");
  const calle = obtenerValor("calle");
  const numero = obtenerValor("numero");
  const rolSii = obtenerValor("rolSii");
  const latitud = obtenerValor("latitud");
  const longitud = obtenerValor("longitud");
  const sinNumero = checkSinNumero ? checkSinNumero.checked : false;

  if (!nombre || !rut || !calle || (!numero && !sinNumero) || !rolSii) {
    alert("Debe completar nombre, RUT, calle, número y Rol SII. Si el predio no tiene número, marque la opción S.N.");
    return false;
  }

  if (!validarRutChileno(rut)) {
    alert("El RUT ingresado no es válido. Revise el número o el dígito verificador.");
    if (rutInput) {
      mostrarEstadoRut();
      rutInput.focus();
    }
    return false;
  }

  if (!latitud || !longitud) {
    alert("Debe seleccionar una ubicación en el mapa.");
    return false;
  }

  return true;
}
async function cargarPdfBaseCip() {
  const rutas = obtenerConfigDom("rutasPdfCip", ["./img/Doc/cip_base.pdf"]);

  for (const ruta of rutas) {
    try {
      const respuesta = await fetch(ruta);

      if (respuesta.ok) {
        return await respuesta.arrayBuffer();
      }
    } catch (error) {
      console.warn(`No se pudo cargar el PDF base en la ruta: ${ruta}`, error);
    }
  }

  throw new Error("No se encontró el PDF base CIP en las rutas configuradas.");
}

async function capturarMapaParaPdf() {
  if (mapaPredio) {
    mapaPredio.invalidateSize();
  }

  const mapa = document.getElementById("mapaPredio");

  const canvas = await html2canvas(mapa, {
    useCORS: true,
    backgroundColor: "#ffffff",
    scale: 2
  });

  return canvas.toDataURL("image/png");
}

function cortarTexto(texto, maximo) {
  if (!texto) return "";
  return texto.length > maximo ? texto.substring(0, maximo) : texto;
}

async function generarPdfCip(imprimir = false) {
  if (!validarFormularioCip()) {
    return;
  }

  actualizarPaso("pasoFormulario", "completado");
  actualizarPaso("pasoPdf", "activo");

  try {
    const { PDFDocument, rgb, StandardFonts } = PDFLib;

    const pdfBytes = await cargarPdfBaseCip();

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pagina = pdfDoc.getPages()[0];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const negro = rgb(0, 0, 0);

    function escribir(texto, x, y, size = 8, bold = false) {
      if (!texto) return;

      pagina.drawText(String(texto), {
        x,
        y,
        size,
        font: bold ? fontBold : font,
        color: negro
      });
    }

    function escribirConPosicion(texto, posicion) {
      if (!posicion) return;
      escribir(
        cortarTexto(String(texto || "").toUpperCase(), posicion.max || 60),
        posicion.x,
        posicion.y,
        posicion.size || 8,
        posicion.bold || false
      );
    }

    function escribirCampo(clave, texto, posicionDefecto, convertirMayuscula = true) {
      const posicion = obtenerPosicionPdf(clave, posicionDefecto);
      const valor = convertirMayuscula ? String(texto || "").toUpperCase() : String(texto || "");
      escribirConPosicion(valor, posicion);
    }

    const nombre = obtenerValor("nombre");
    const rut = obtenerValor("rut");
    const email = obtenerValor("email");
    const telefono = obtenerValor("telefono");
    const zona = obtenerValor("zona");

    const calle = obtenerValor("calle");
    const numero = obtenerValor("numero");
    const depto = obtenerValor("depto");
    const block = obtenerValor("block");
    const manzana = obtenerValor("manzana");
    const lote = obtenerValor("lote");
    const localidad = obtenerValor("localidad");
    const planoLoteo = obtenerValor("planoLoteo");
    const rolSii = obtenerValor("rolSii");

    const latitud = obtenerValor("latitud");
    const longitud = obtenerValor("longitud");

    const municipalidad = obtenerConfigDom("municipalidad", "");
    const region = obtenerConfigDom("region", "");

    const posMunicipalidadSuperior = obtenerPosicionPdf("municipalidadSuperior", { x: 270, y: 820, size: 9, bold: true, max: 42 });
    const posRegionSuperior = obtenerPosicionPdf("regionSuperior", { x: 212, y: 789, size: 7, bold: false, max: 60 });
    const posMunicipalidadComprobante = obtenerPosicionPdf("municipalidadComprobante", { x: 255, y: 190, size: 9, bold: true, max: 35 });

    /* Datos superiores configurables */
    escribirConPosicion(municipalidad, posMunicipalidadSuperior);
    escribirConPosicion(region, posRegionSuperior);

    /* Marcar urbano / rural */
    if (zona === "urbano") {
      const posMarcaUrbano = obtenerPosicionPdf("marcaUrbano", { x: 209, y: 754, size: 13, bold: true, max: 1 });
      escribir("X", posMarcaUrbano.x, posMarcaUrbano.y, posMarcaUrbano.size || 13, posMarcaUrbano.bold !== false);
    }

    if (zona === "rural") {
      const posMarcaRural = obtenerPosicionPdf("marcaRural", { x: 307, y: 754, size: 13, bold: true, max: 1 });
      escribir("X", posMarcaRural.x, posMarcaRural.y, posMarcaRural.size || 13, posMarcaRural.bold !== false);
    }

    /* 1. Identificación del solicitante */
    escribirCampo("nombre", nombre, { x: 60, y: 667, size: 8, bold: false, max: 55 });
    escribirCampo("rut", rut, { x: 338, y: 667, size: 8, bold: false, max: 20 });
    escribirCampo("email", email, { x: 60, y: 647, size: 8, bold: false, max: 35 }, false);
    escribirCampo("telefono", telefono, { x: 238, y: 647, size: 8, bold: false, max: 18 }, false);

    /* 2. Dirección de la propiedad */
    escribirCampo("calle", calle, { x: 60, y: 611, size: 8, bold: false, max: 55 });
    escribirCampo("numero", numero, { x: 356, y: 611, size: 8, bold: false, max: 12 });
    escribirCampo("depto", depto, { x: 432, y: 611, size: 8, bold: false, max: 12 });
    escribirCampo("block", block, { x: 512, y: 611, size: 8, bold: false, max: 12 });

    escribirCampo("manzana", manzana, { x: 60, y: 585, size: 8, bold: false, max: 12 });
    escribirCampo("lote", lote, { x: 120, y: 585, size: 8, bold: false, max: 12 });
    escribirCampo("localidad", localidad, { x: 180, y: 585, size: 8, bold: false, max: 35 });
    escribirCampo("planoLoteo", planoLoteo, { x: 412, y: 585, size: 8, bold: false, max: 18 });
    escribirCampo("rolSii", rolSii, { x: 512, y: 585, size: 8, bold: false, max: 18 });

    /* 3. Croquis de ubicación */
    const imagenMapaBase64 = await capturarMapaParaPdf();
    const imagenMapa = await pdfDoc.embedPng(imagenMapaBase64);

    const posMapa = obtenerPosicionPdf("mapa", { x: 55, y: 305, width: 529, height: 259 });
    pagina.drawImage(imagenMapa, {
      x: posMapa.x,
      y: posMapa.y,
      width: posMapa.width,
      height: posMapa.height
    });

    /* Coordenadas sobre el croquis */
    const posCoordenadas = obtenerPosicionPdf("coordenadas", { x: 65, y: 312, size: 8, bold: true, max: 80 });
    escribir(`Latitud: ${latitud}    Longitud: ${longitud}`, posCoordenadas.x, posCoordenadas.y, posCoordenadas.size || 8, posCoordenadas.bold !== false);

    /* Comprobante inferior configurable */
    escribirConPosicion(municipalidad, posMunicipalidadComprobante);
    escribirCampo("calleComprobante", calle, { x: 60, y: 116, size: 8, bold: false, max: 65 });
    escribirCampo("numeroComprobante", numero, { x: 500, y: 116, size: 8, bold: false, max: 15 });

    const pdfFinal = await pdfDoc.save();

    const blob = new Blob([pdfFinal], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    if (imprimir) {
      const ventana = window.open(url, "_blank");
      if (ventana) {
        ventana.onload = function () {
          ventana.print();
        };
      }
    } else {
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = `formulario_cip_${Date.now()}.pdf`;
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
    }

  } catch (error) {
    console.error(error);
    alert("No se pudo generar el PDF. Revise las rutas del PDF base en config.js y confirme que el archivo exista en img/Doc.");
  }
}

const btnGenerarPdf = document.getElementById("btnGenerarPdf");

if (btnGenerarPdf) {
  btnGenerarPdf.addEventListener("click", function () {
    generarPdfCip(false);
  });
}

const btnImprimirPdf = document.getElementById("btnImprimirPdf");

if (btnImprimirPdf) {
  btnImprimirPdf.addEventListener("click", function () {
    generarPdfCip(true);
  });
}


/* OPCIÓN PREDIO SIN NÚMERO / S.N. */

function activarOpcionSinNumero() {
  const inputNumero = document.getElementById("numero");
  const checkSinNumero = document.getElementById("sinNumero");

  if (!inputNumero || !checkSinNumero) return;

  checkSinNumero.addEventListener("change", function () {
    if (this.checked) {
      inputNumero.value = "S/N";
      inputNumero.readOnly = true;
    } else {
      if (inputNumero.value.trim().toUpperCase() === "S/N") {
        inputNumero.value = "";
      }

      inputNumero.readOnly = false;
      inputNumero.focus();
    }
  });
}
activarValidacionRut();
activarOpcionSinNumero();
>>>>>>> 235b655 (Primer commit)
