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

/*Creación de un HTML Marker */
            function CreateHtmlMarkers()
            {
                //Creamos la lista de HTMLMarkers que queremos visualizar sobre el mapa.
                var listOfMarkers = [];
                //Añadimos a la lista tantos HTML Markers como queramos.
                listOfMarkers.push({
                    Id: "htmlMarker1", //Identificador para acceso através del DOM
                    Html: "<div style='border: 1px solid purple'>This is an HTML Marker: <br /> <img src='images/markers/purple_MarkerH.png' /></div>",
                    Lat: 71.11677038645317 , 
                    Lon: -8.19580078125,
                    Rot: 0,
                    AdjustPixelsX: 0, //Ajuste en pixels para centrar el HTML
                    AdjustPixelsY: 0 //Ajuste en pixels para centrar el HTML
                })
                var htmlMarkerManager = new GoogleMapsExtensions.GoogleMapsHtmlMarkerManager(mapsGateway, listOfMarkers);
                htmlMarkerManager.ShowHtmlMarkers();
            }
