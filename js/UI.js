class UI {
  constructor() {
    // Instanciar la API
    this.api = new API()

    // Crear los markers con LayerGroup
    this.markers = L.layerGroup()

    // Iniciar el mapa
    this.mapa = this.inicializarMapa()
  }

  inicializarMapa() {
       // Inicializar y obtener la propiedad del mapa
       const map = L.map('mapa').setView([19.390519, -99.3739778], 6)
       const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>'
       L.tileLayer(
           'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy ' + enlaceMapa + ' Contributors',
           maxZoom: 18,
           }).addTo(map)
       return map

  }
  async mostrarEstablecimientos() {
    this.api.obtenerDatos()
      .then(data => {
        const resultados = data.respuestaJSON.results
        // Ejecutar función para mostrar PINES
        this.mostrarPines(resultados)
      })
  }
  mostrarPines(datos) {
    // Limpiar los markers siempre que se manden llamar
    this.markers.clearLayers()

    datos.forEach(dato => {
      const { latitude, longitude, calle, regular, premium } = dato

      // Crear popUP
      const opcionesPopup = L.popup().setContent(`
        <p>Calle: ${calle}<p>
        <p><b>Regular</b>: $ ${regular}<p>
        <p><b>Premium</b>: $ ${premium}<p>
      `);

      // Agregar PIN
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopup)
      // Agregar el pin al grupo de markers
      this.markers.addLayer(marker)
    })
    this.markers.addTo(this.mapa)
    console.log(datos)
  }
}