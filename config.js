/*
  CONFIGURACIÓN MUNICIPAL
  Cambie solo este archivo cuando quiera adaptar la página a otro municipio.
*/

window.DOM_CONFIG = {
  /* Datos que se imprimirán en el PDF */
  municipalidad: "DOÑIHUE",
  region: "DEL LIBERTADOR GENERAL BERNARDO O'HIGGINS",

  /* Datos usados para buscar direcciones en el mapa */
  comunaBusqueda: "Doñihue",
  regionBusqueda: "Región del Libertador General Bernardo O'Higgins",
  paisBusqueda: "Chile",
  codigoPais: "cl",

  /* Centro inicial del mapa del municipio */
  centroMapa: [-34.233333, -70.966667],
  zoomInicial: 14,
  zoomBusqueda: 17,

  /*
    Opcional: límite aproximado de búsqueda para el municipio.
    Formato Nominatim: izquierda, arriba, derecha, abajo = lonMin, latMax, lonMax, latMin.
    Si no quiere limitar por caja, deje viewboxBusqueda: "" y boundedBusqueda: false.
  */
  viewboxBusqueda: "-71.0500,-34.1600,-70.8800,-34.3100",
  boundedBusqueda: false,

  /* Si el usuario no escribe localidad, se usará esta comuna en el formulario */
  localidadPredeterminada: "Doñihue",

  /* Zona por defecto. Puede dejarlo vacío si no desea autoseleccionar urbano/rural */
  zonaPredeterminada:"",

  /* El sistema probará estas rutas hasta encontrar el PDF base */
  rutasPdfCip: [
    "./img/Doc/cip_base.pdf",
   
  ],

  /*
    Coordenadas para escribir datos en el PDF.
    Si cambia el formulario base de otra municipalidad, ajuste estos números.

    REGLA RÁPIDA:
    - Subir texto: aumentar Y.
    - Bajar texto: disminuir Y.
    - Mover a la derecha: aumentar X.
    - Mover a la izquierda: disminuir X.
  */
  posicionesPdf: {
    /* Encabezado superior */
    municipalidadSuperior: { x: 270, y: 820, size: 9, bold: true, max: 42 },
    regionSuperior: { x: 212, y: 789, size: 7, bold: false, max: 60 },
    marcaUrbano: { x: 209, y: 754, size: 13, bold: true, max: 1 },
    marcaRural: { x: 307, y: 754, size: 13, bold: true, max: 1 },

    /* Datos solicitante */
    nombre: { x: 60, y: 675, size: 8, bold: false, max: 55 },
    rut: { x: 338, y: 675, size: 8, bold: false, max: 20 },
    email: { x: 60, y: 655, size: 8, bold: false, max: 35 },
    telefono: { x: 238, y: 655, size: 8, bold: false, max: 18 },

    /* Dirección propiedad */
    calle: { x: 60, y: 620, size: 8, bold: false, max: 55 },
    numero: { x: 356, y: 620, size: 8, bold: false, max: 12 },
    depto: { x: 432, y: 620, size: 8, bold: false, max: 12 },
    block: { x: 512, y: 620, size: 8, bold: false, max: 12 },
    manzana: { x: 60, y: 595, size: 8, bold: false, max: 12 },
    lote: { x: 120, y: 595, size: 8, bold: false, max: 12 },
    localidad: { x: 180, y: 595, size: 8, bold: false, max: 35 },
    planoLoteo: { x: 412, y: 595, size: 8, bold: false, max: 18 },
    rolSii: { x: 512, y: 595, size: 8, bold: false, max: 18 },

    /* Croquis */
    mapa: { x: 55, y: 305, width: 529, height: 259 },
    coordenadas: { x: 65, y: 312, size: 8, bold: true, max: 80 },

    /* Comprobante inferior */
    municipalidadComprobante: { x: 255, y: 190, size: 9, bold: true, max: 35 },
    calleComprobante: { x: 60, y: 116, size: 8, bold: false, max: 65 },
    numeroComprobante: { x: 500, y: 116, size: 8, bold: false, max: 15 }
  }
};
