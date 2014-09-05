GoogleMapsExtensions
====================

HtmlMarkers con Rotación: Permite crear Marker con código HTML sobre GoogleMaps.
Ejemplo de uso:

Inicialización:
            var mapsGateway;
            function Initialize()
            {
                //Cogemos el Div que va a contener el Mapa de GoogleMaps.
                var mapDivElement = document.getElementById('GoogleMapsDiv');

                //Creamos el punto donde centrar el mapa.
                var center = new google.maps.LatLng(71.11677038645317 , -8.19580078125);

                //Creamos las opciones iniciales del mapa.
                var mapOptions = {
                    zoom: 8,
                    maxZoom: 17,
                    minZoom: 2,
                    center: center,
                    panControl: true,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    draggable: true,
                    draggableCursor: 'default'
                };

                //Creamos un nuevo Mapa.
                mapsGateway = new GoogleMapsExtensions.GoogleMapsGateway(mapDivElement, mapOptions);
            }
