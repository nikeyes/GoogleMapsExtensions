GoogleMapsExtensions
====================

HtmlMarkers con Rotación: 
            Permite crear Marker con código HTML sobre GoogleMaps.
            
Hay un ejemplo para descargar en: https://github.com/nikeyes/GoogleMapsExtensions/blob/master/GoogleMapsExtension/DemoHtmlMarkers.html

Se puede consultar online en:
http://nikeyes.github.io/GoogleMapsExtensions/Demo.html

Ejemplo de uso:

Inicialización:
            
            
            var map;
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
                map = new google.maps.Map(mapDivElement, mapOptions);
            }

Creación de un HTML Marker:


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
                });
                
                /Creamos el Gestor de HTML Markers
                var htmlMarkerManager = new GoogleMapsExtensions.GoogleMapsHtmlMarkerManager(map, listOfMarkers);
            }
            
Borrar los HTML Markers del mapa:


            function CleanHtmlMarkers()
            {
               htmlMarkerManager.RemoveMarkers();
            }
