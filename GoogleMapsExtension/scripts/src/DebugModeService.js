var DiagnosticsNamespace = {};
var __DEBUG__ = false;

(function (ns) {
    "use strict";
    var DebugModeService = function () {
    };

    DebugModeService.prototype = {
        constructor: DebugModeService,

        Start: function () {
            __DEBUG__ = true;

            this._map = mapsGateway.GetMap();
            var me = this;

            google.maps.event.addListener(this._map, 'click', function (event) {
                var txt = document.getElementById("txtCoordinatesClick");
                txt.value = event.latLng.lat() + " , " + event.latLng.lng();
            });

            google.maps.event.addListener(this._map, 'mousemove', function (event) {
                var txt = document.getElementById("txtCoordinatesMove");
                txt.value = event.latLng.lat() + " , " + event.latLng.lng();
            });

            google.maps.event.addListener(this._map, 'zoom_changed', function () {
                var zoomLevel;
                zoomLevel = me._map.getZoom();
                var txt = document.getElementById("txtZoomLevel");
                txt.value = zoomLevel;
            });

            document.getElementById("debugMode").innerHTML = '<p>' +
                '<label for="txtCoordinatesMove">Coordenadas Move:</label> <input type="text" id="txtCoordinatesMove" style="width:500px"/>' +
                '</p>' +
                '<p>' +
                '<label for="txtCoordinatesClick">Coordenadas Click</label> <input type="text" id="txtCoordinatesClick" style="width:300px"/>' +
                '</p>' +
                '<p>' +
                '<label for="txtZoomLevel">Zoom Level</label> <input type="text" id="txtZoomLevel" style="width:300px"/>' +
                '</p>'
                '<p>' +
                '<label for="bResetMap">Reset Map</label> <input type="button" id="bResetMap" value="Reset Map" style="width:300px" onclick="debugMode.ResetMap()"/>' +
                '</p>';
            document.getElementById("debugMode").style.display = "block";
        },

        ResetMap: function () {
            var mapOptions = {
                maxZoom: null,
                minZoom: null,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                keyboardShortcuts: true,
                disableDoubleClickZoom: true,
                draggable: true,
                scrollwheel: true,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT
                },
                streetViewControl: true,
                panControl: true,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DEFAULT,
                    mapTypeIds: [
                    google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.HYBRID,
                    google.maps.MapTypeId.SATELLITE,
                    google.maps.MapTypeId.TERRAIN
                    ]
                }
            };

            this._map.setOptions(mapOptions);

            this._map.setMapTypeId('Default');
        }
    };

    //Publish object in namespace
    ns.DebugModeService = new DebugModeService();

}(window.DiagnosticsNamespace));



