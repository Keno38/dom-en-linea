/* =====================================================
   CHATBOT DOM - Municipalidad de Doñihue
   Incluir después de script.js en index.html
   ===================================================== */

(function () {

  /* ── CONFIGURACIÓN ── */
  const CONFIG = {
    municipalidad: "Doñihue",
    emailContacto: "dom@mdonihue.cl",
    telefonoContacto: "72-2959202",
    direccionDom: "Av. Estación #344",
    urlDomEnLinea: "https://domenlinea.minvu.cl/"
  };

  /* ── ÁRBOL DE CONVERSACIÓN ── */
  const FLUJO = {
    inicio: {
      mensaje: "¡Hola! 👋 Soy DOM tu asistente virtual de " + CONFIG.municipalidad + ".\n\n¿En qué puedo ayudarte hoy?",
      opciones: [
        { texto: "📄 Certificados disponibles", siguiente: "certificados" },
        { texto: "🗺️ Preparar solicitud (CIP)", siguiente: "preparar_solicitud" },
        { texto: "⏱ Plazos de tramitación", siguiente: "plazos" },
        { texto: "📋 Documentos requeridos", siguiente: "documentos_general" },
        { texto: "📞 Contacto y horarios", siguiente: "contacto" }
      ]
    },

    certificados: {
      mensaje: "Estos son los certificados que puedes solicitar en DOM en Línea. ¿Sobre cuál quieres saber más?",
      opciones: [
        { texto: "📍 Certificado de Número", siguiente: "cert_numero" },
        { texto: "🏘️ Informaciones Previas (CIP)", siguiente: "cert_cip" },
        { texto: "🔒 Afectación a Utilidad Pública", siguiente: "cert_aup" },
        { texto: "🏠 Vivienda Social", siguiente: "cert_vs" },
        { texto: "📐 Zonificación", siguiente: "cert_zona" },
        { texto: "← Volver al inicio", siguiente: "inicio" }
      ]
    },

    cert_numero: {
      mensaje: "📍 **Certificado de Número**\n\nAcredita el número municipal asignado a una propiedad.\n\n**Plazo:** 7 días hábiles\n\n**Documentos requeridos:**\n• Rol de avalúo\n• Croquis de ubicación\n• Dominio Vigente\n• Copia Escritura",
      opciones: [
        { texto: "🌐 Ir a DOM en Línea", accion: "abrir_url", url: CONFIG.urlDomEnLinea },
        { texto: "← Ver otros certificados", siguiente: "certificados" },
        { texto: "🏠 Volver al inicio", siguiente: "inicio" }
      ]
    },

    cert_cip: {
      mensaje: "🏘️ **Certificado de Informaciones Previas (CIP)**\n\nEntrega información urbanística aplicable a un predio: uso de suelo, constructibilidad, altura máxima, etc.\n\n**Plazo:** 7 días hábiles\n\n**Documentos requeridos:**\n• Rol de avalúo\n• Croquis\n• Poder simple (si corresponde)\n• Dominio Vigente\n• Copia Escritura",
      opciones: [
        { texto: "📝 Preparar mi solicitud CIP", siguiente: "preparar_solicitud" },
        { texto: "🌐 Ir a DOM en Línea", accion: "abrir_url", url: CONFIG.urlDomEnLinea },
        { texto: "← Ver otros certificados", siguiente: "certificados" }
      ]
    },

    cert_aup: {
      mensaje: "🔒 **Certificado de Afectación a Utilidad Pública**\n\nCertifica si una propiedad está afecta a utilidad pública según la planificación vigente.\n\n**Plazo:** 7 días hábiles\n\n**Documentos requeridos:**\n• Rol de avalúo\n• Croquis de ubicación\n• Dominio Vigente\n• Copia Escritura",
      opciones: [
        { texto: "🌐 Ir a DOM en Línea", accion: "abrir_url", url: CONFIG.urlDomEnLinea },
        { texto: "← Ver otros certificados", siguiente: "certificados" },
        { texto: "🏠 Volver al inicio", siguiente: "inicio" }
      ]
    },

    cert_vs: {
      mensaje: "🏠 **Certificado de Vivienda Social**\n\nPermite acreditar antecedentes para fines asociados a vivienda social.\n\n**Plazo:** 7 días hábiles\n\n**Documentos requeridos:**\n• Rol\n• Antecedentes de la propiedad\n• Dominio Vigente\n• Copia Escritura",
      opciones: [
        { texto: "🌐 Ir a DOM en Línea", accion: "abrir_url", url: CONFIG.urlDomEnLinea },
        { texto: "← Ver otros certificados", siguiente: "certificados" },
        { texto: "🏠 Volver al inicio", siguiente: "inicio" }
      ]
    },

    cert_zona: {
      mensaje: "📐 **Certificado de Zonificación**\n\nInforma la zonificación aplicable a un predio según el plan regulador vigente.\n\n**Plazo:** 7 días hábiles\n\n**Documentos requeridos:**\n• Rol\n• Dirección\n• Croquis\n• Dominio Vigente\n• Copia Escritura",
      opciones: [
        { texto: "🌐 Ir a DOM en Línea", accion: "abrir_url", url: CONFIG.urlDomEnLinea },
        { texto: "← Ver otros certificados", siguiente: "certificados" },
        { texto: "🏠 Volver al inicio", siguiente: "inicio" }
      ]
    },

    preparar_solicitud: {
      mensaje: "📝 **Preparar solicitud paso a paso**\n\nEn esta misma página puedes preparar tu solicitud del Certificado de Informaciones Previas (CIP) antes de ingresar a DOM en Línea.\n\n**¿Cómo funciona?**\n1️⃣ Ubica tu predio en el mapa\n2️⃣ Completa tus datos personales\n3️⃣ Descarga el formulario PDF",
      opciones: [
        { texto: "🗺️ Ir al asistente de solicitud", accion: "scroll_a", id: "preparar-solicitud" },
        { texto: "❓ ¿Qué necesito tener listo?", siguiente: "que_necesito" },
        { texto: "🌐 Ir directamente a DOM en Línea", accion: "abrir_url", url: CONFIG.urlDomEnLinea },
        { texto: "← Volver al inicio", siguiente: "inicio" }
      ]
    },

    que_necesito: {
      mensaje: "✅ **¿Qué necesito tener listo antes de tramitar?**\n\n**Siempre necesitarás:**\n• Rol de avalúo (número SII de tu propiedad)\n• Dirección exacta del predio\n• Croquis o ubicación en mapa\n• Dominio Vigente (Conservador de Bienes Raíces)\n• Copia de escritura\n\n**Además necesitas:**\n• ClaveÚnica para ingresar a la plataforma\n• Documentos digitalizados (PDF o imagen)\n\n💡 **Tip:** Si no recuerdas tu Rol SII, búscalo en el sitio del SII con el RUT del propietario.",
      opciones: [
        { texto: "🔑 Recuperar ClaveÚnica", accion: "abrir_url", url: "https://claveunica.gob.cl/recuperar" },
        { texto: "🗺️ Preparar solicitud ahora", accion: "scroll_a", id: "preparar-solicitud" },
        { texto: "← Volver al inicio", siguiente: "inicio" }
      ]
    },

    plazos: {
      mensaje: "⏱️ **Plazos de tramitación**\n\nLos plazos son **referenciales** y pueden variar según:\n• Complejidad del caso\n• Cantidad de solicitudes en curso\n• Antecedentes incompletos\n\n| Certificado | Plazo referencial |\n|---|---|\n| Certificado de Número | 7 días hábiles |\n| Informaciones Previas | 7 días hábiles |\n| Afectación a Utilidad Pública | 7 días hábiles |\n| Vivienda Social | 7 días hábiles |\n| Zonificación | 7 días hábiles |\n| Solicitud especial | Según revisión |",
      opciones: [
        { texto: "📞 Consultar estado de mi trámite", siguiente: "contacto" },
        { texto: "🌐 Ver en DOM en Línea", accion: "abrir_url", url: CONFIG.urlDomEnLinea },
        { texto: "← Volver al inicio", siguiente: "inicio" }
      ]
    },

    documentos_general: {
      mensaje: "📋 **Documentos generalmente requeridos**\n\nPara la mayoría de los certificados necesitarás:\n\n• **Rol de avalúo** — Número SII del predio\n• **Croquis de ubicación** — Boceto del predio y su entorno\n• **Dominio Vigente** — Del Conservador de Bienes Raíces\n• **Copia Escritura** — Del inmueble\n\nAlgunos certificados pueden pedir documentos adicionales.",
      opciones: [
        { texto: "📄 Ver documentos por certificado", siguiente: "certificados" },
        { texto: "📝 Preparar solicitud CIP", siguiente: "preparar_solicitud" },
        { texto: "← Volver al inicio", siguiente: "inicio" }
      ]
    },

    contacto: {
      mensaje: "📞 **Contacto DOM de " + CONFIG.municipalidad + "**\n\n📍 **Dirección:** " + CONFIG.direccionDom + ", " + CONFIG.municipalidad + "\n☎️ **Teléfono:** " + CONFIG.telefonoContacto + "\n\n⏰ **Horarios de atención:**\nLunes a Viernes\n8:30 a 14:00 hrs\n\n💡 Los trámites en línea puedes iniciarlos las 24 horas en DOM en Línea.",
      opciones: [
        { texto: "🌐 Ir a DOM en Línea", accion: "abrir_url", url: CONFIG.urlDomEnLinea },
        { texto: "🏠 Volver al inicio", siguiente: "inicio" }
      ]
    }
  };

  /* ── ESTILOS ── */
  const estilos = `
    #chatbot-burbuja {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2f76ea, #5a9cff);
      color: #fff;
      border: none;
      cursor: pointer;
      box-shadow: 0 6px 24px rgba(47,118,234,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      z-index: 9999;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    #chatbot-burbuja:hover {
      transform: scale(1.08);
      box-shadow: 0 8px 28px rgba(47,118,234,0.55);
    }
    #chatbot-burbuja .badge-nuevo {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 18px;
      height: 18px;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid #fff;
      font-size: 0;
    }
    #chatbot-ventana {
      position: fixed;
      bottom: 104px;
      right: 28px;
      width: 370px;
      max-width: calc(100vw - 32px);
      max-height: 580px;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(15,60,104,0.18);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9998;
      border: 1px solid #e3e8f0;
      transform: scale(0.92) translateY(12px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), opacity 0.18s ease;
    }
    #chatbot-ventana.abierto {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    .cb-header {
      background: linear-gradient(135deg, #0f3c68, #1a5ba8);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .cb-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }
    .cb-header-info {
      flex: 1;
    }
    .cb-header-info strong {
      display: block;
      color: #fff;
      font-size: 0.97rem;
    }
    .cb-header-info span {
      color: rgba(255,255,255,0.75);
      font-size: 0.8rem;
    }
    .cb-cerrar {
      background: none;
      border: none;
      color: rgba(255,255,255,0.8);
      font-size: 1.4rem;
      cursor: pointer;
      padding: 4px;
      border-radius: 8px;
      line-height: 1;
    }
    .cb-cerrar:hover { color: #fff; background: rgba(255,255,255,0.1); }
    .cb-mensajes {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #f8fafd;
    }
    .cb-mensajes::-webkit-scrollbar { width: 4px; }
    .cb-mensajes::-webkit-scrollbar-thumb { background: #c8d6e8; border-radius: 4px; }
    .cb-burbuja {
      max-width: 88%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 0.88rem;
      line-height: 1.55;
      white-space: pre-wrap;
      animation: cbFadeIn 0.2s ease;
    }
    @keyframes cbFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .cb-burbuja.bot {
      background: #ffffff;
      color: #1f2d3d;
      border: 1px solid #e3e8f0;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
    }
    .cb-burbuja.usuario {
      background: linear-gradient(135deg, #2f76ea, #4a8ff0);
      color: #fff;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }
    .cb-opciones {
      padding: 10px 14px 14px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      background: #f8fafd;
      border-top: 1px solid #edf1f7;
      flex-shrink: 0;
    }
    .cb-btn-opcion {
      width: 100%;
      text-align: left;
      background: #fff;
      border: 1.5px solid #dbe7f8;
      border-radius: 10px;
      padding: 9px 13px;
      font-size: 0.85rem;
      color: #0f3c68;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
    }
    .cb-btn-opcion:hover {
      background: #eaf2ff;
      border-color: #2f76ea;
      transform: translateX(2px);
    }
    .cb-btn-opcion:active {
      transform: scale(0.98);
    }
    .cb-escribiendo {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 10px 14px;
      background: #fff;
      border: 1px solid #e3e8f0;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      width: fit-content;
      animation: cbFadeIn 0.2s ease;
    }
    .cb-escribiendo span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #94a3b8;
      animation: cbDot 1.2s infinite;
    }
    .cb-escribiendo span:nth-child(2) { animation-delay: 0.2s; }
    .cb-escribiendo span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes cbDot {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
      30% { transform: translateY(-5px); opacity: 1; }
    }
    @media (max-width: 420px) {
      #chatbot-ventana { right: 12px; bottom: 96px; width: calc(100vw - 24px); }
      #chatbot-burbuja { right: 16px; bottom: 20px; }
    }
  `;

  /* ── INYECTAR ESTILOS ── */
  const styleEl = document.createElement("style");
  styleEl.textContent = estilos;
  document.head.appendChild(styleEl);

  /* ── CREAR DOM ── */
  const burbuja = document.createElement("button");
  burbuja.id = "chatbot-burbuja";
  burbuja.setAttribute("aria-label", "Abrir asistente virtual");
  burbuja.innerHTML = `<span>💬</span><span class="badge-nuevo" aria-hidden="true"></span>`;
  document.body.appendChild(burbuja);

  const ventana = document.createElement("div");
  ventana.id = "chatbot-ventana";
  ventana.setAttribute("role", "dialog");
  ventana.setAttribute("aria-label", "Asistente DOM");
  ventana.innerHTML = `
    <div class="cb-header">
      <div class="cb-avatar">🏛️</div>
      <div class="cb-header-info">
        <strong>Asistente DOM</strong>
        <span>Municipalidad de ${CONFIG.municipalidad}</span>
      </div>
      <button class="cb-cerrar" id="cb-cerrar" aria-label="Cerrar asistente">✕</button>
    </div>
    <div class="cb-mensajes" id="cb-mensajes"></div>
    <div class="cb-opciones" id="cb-opciones"></div>
  `;
  document.body.appendChild(ventana);

  /* ── ESTADO ── */
  let estaAbierto = false;
  let nodoActual = "inicio";

  /* ── FUNCIONES ── */
  function toggleChatbot() {
    estaAbierto = !estaAbierto;
    ventana.classList.toggle("abierto", estaAbierto);
    burbuja.querySelector(".badge-nuevo").style.display = "none";
    burbuja.innerHTML = estaAbierto
      ? `<span>✕</span>`
      : `<span>💬</span>`;

    if (estaAbierto && document.getElementById("cb-mensajes").children.length === 0) {
      mostrarNodo("inicio");
    }
  }

  function agregarMensaje(texto, esBot) {
    const mensajes = document.getElementById("cb-mensajes");
    const burbujaMensaje = document.createElement("div");
    burbujaMensaje.className = `cb-burbuja ${esBot ? "bot" : "usuario"}`;

    // Renderizar **negritas** simples
    burbujaMensaje.innerHTML = texto
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");

    mensajes.appendChild(burbujaMensaje);
    mensajes.scrollTop = mensajes.scrollHeight;
    return burbujaMensaje;
  }

  function mostrarEscribiendo() {
    const mensajes = document.getElementById("cb-mensajes");
    const typing = document.createElement("div");
    typing.className = "cb-escribiendo";
    typing.innerHTML = `<span></span><span></span><span></span>`;
    mensajes.appendChild(typing);
    mensajes.scrollTop = mensajes.scrollHeight;
    return typing;
  }

  function limpiarOpciones() {
    const opciones = document.getElementById("cb-opciones");
    opciones.innerHTML = "";
  }

  function mostrarOpciones(opciones) {
    const contenedor = document.getElementById("cb-opciones");
    contenedor.innerHTML = "";

    opciones.forEach(opcion => {
      const btn = document.createElement("button");
      btn.className = "cb-btn-opcion";
      btn.textContent = opcion.texto;
      btn.addEventListener("click", () => manejarOpcion(opcion));
      contenedor.appendChild(btn);
    });
  }

  function mostrarNodo(nodoId, textoUsuario = null) {
    nodoActual = nodoId;
    const nodo = FLUJO[nodoId];
    if (!nodo) return;

    limpiarOpciones();

    if (textoUsuario) {
      agregarMensaje(textoUsuario, false);
    }

    const typing = mostrarEscribiendo();

    const delay = textoUsuario ? 700 : 400;

    setTimeout(() => {
      typing.remove();
      agregarMensaje(nodo.mensaje, true);
      mostrarOpciones(nodo.opciones);
    }, delay);
  }

  function manejarOpcion(opcion) {
    if (opcion.accion === "abrir_url") {
      agregarMensaje(opcion.texto, false);
      limpiarOpciones();
      setTimeout(() => {
        window.open(opcion.url, "_blank");
        const nodo = FLUJO[nodoActual];
        if (nodo) mostrarOpciones(nodo.opciones);
      }, 300);
      return;
    }

    if (opcion.accion === "scroll_a") {
      agregarMensaje(opcion.texto, false);
      limpiarOpciones();
      const elemento = document.getElementById(opcion.id);
      if (elemento) {
        setTimeout(() => {
          toggleChatbot();
          setTimeout(() => {
            elemento.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 200);
        }, 300);
      }
      return;
    }

    if (opcion.siguiente) {
      mostrarNodo(opcion.siguiente, opcion.texto);
    }
  }

  /* ── EVENTOS ── */
  burbuja.addEventListener("click", toggleChatbot);
  document.getElementById("cb-cerrar").addEventListener("click", () => {
    estaAbierto = true;
    toggleChatbot();
  });

  /* ── MOSTRAR BADGE DESPUÉS DE 3s SI NO SE HA ABIERTO ── */
  setTimeout(() => {
    if (!estaAbierto) {
      burbuja.querySelector(".badge-nuevo").style.display = "block";
    }
  }, 3000);

})();