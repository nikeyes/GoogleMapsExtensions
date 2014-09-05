///#source 1 1 /scripts/src/Namespaces.js
var GoogleMapsExtensions = {
    //Global Helper Functions 
    IsNullOrEmpty: function (element) {
        return (element === null || element === "" || typeof element === "undefined");
    }
};



///#source 1 1 /scripts/src/GeographicalPrimitives.js
(function (ns) {
    "use strict";

    var GeographicalPoint = function (lat, lng) {
        this._lat = lat;
        this._lng = lng;
    };

    GeographicalPoint.prototype = {
        GetLat: function () {
            return this._lat;
        },

        GetLng: function () {
            return this._lng;
        },

        SetLat: function (lat) {
            this._lat = lat;
        },

        SetLng: function (lng) {
            this._lng = lng;
        }
    };

    var GeographicalRectangle = function ( southWestLat, southWestLng, northEastLat, northEastLng ) {
        this._southWest = new ns.GeographicalPoint(southWestLat, southWestLng);
        this._northEast = new ns.GeographicalPoint(northEastLat, northEastLng);
    };

    GeographicalRectangle.prototype = {
        constructor: GeographicalRectangle,
        GetSouthWest: function () {
            return this._southWest;
        },

        GetNorthEast: function () {
            return this._northEast;
        },

        GetMaxLat: function ()
        {
            return this._northEast.GetLat();
        },

        GetMaxLng: function ()
        {
            return this._northEast.GetLng();
        },

        GetMinLat: function ()
        {
            return this._southWest.GetLat();
        },

        GetMinLng: function ()
        {
            return this._southWest.GetLng();
        }

    };

    // Publicamos las "clases" en el namespace
    ns.GeographicalPoint = GeographicalPoint;
    ns.GeographicalRectangle = GeographicalRectangle;

}(window.GoogleMapsExtensions || {}));
///#source 1 1 /scripts/src/JsonHtmlMarkersMasterData.js
/// <reference path="GeographicalPrimitives.js" />
/// <reference path="GoogleMapsGateway.js" />

(function (ns) {
    "use strict";
    //Constructor
    var JsonHtmlMarkersMasterData = function (googleMapsGateway, idTextValueHtml) {
        //Instance attributes
        this._googleMapsGateway = googleMapsGateway;
        this._jsonHtmlMarkers = [];

        var i,
            mapBounds,
            minLat,
            maxLat,
            minLng,
            maxLng;

        mapBounds = this._googleMapsGateway.GetBounds();
        minLat = mapBounds.GetMinLat();
        minLng = mapBounds.GetMinLng();
        maxLat = mapBounds.GetMaxLat();
        maxLng = mapBounds.GetMaxLng();

        for(i=0; i<10; i++)
        {
            this._jsonHtmlMarkers.push({
                Id: i,
                Html: document.getElementById(idTextValueHtml).value,
                Lat: Math.random() * (maxLat - minLat) + minLat,//Math.random() * (41.54256977491056 - 41.535406494246885) + 41.535406494246885,
                Lon: Math.random() * (maxLng - minLng) + minLng,//Math.random() * (2.4521398544311523 - 2.4334287643432617) + 2.4334287643432617,
                Rot: 0,//Math.random() * 360,
                AdjustPixelsX: 0,
                AdjustPixelsY: 0
            });
        }
    };

    //Public Prototype 
    JsonHtmlMarkersMasterData.prototype = {
        constructor: JsonHtmlMarkersMasterData,
        GetJsonHtmlMarkers: function () {
            return this._jsonHtmlMarkers;
        }
    };

    //Publicamos el objecto en el Namespace
    ns.JsonHtmlMarkersMasterData = JsonHtmlMarkersMasterData;

}(window.GoogleMapsExtensions || {}));

///#source 1 1 /scripts/src/GoogleMapsGateway.js
(function (ns) {
    'use strict'
    /**
    * Para usar esta librer�ra es necesario tener el script de GoogleMaps:
     <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=PRIVATE_KEY&sensor=false"></script>
    */
    //TODO Para depuraci�n A�adir objecto para controlar los eventos que 
    //se registres/desregistran porque no son consultables desde al API.
    var GoogleMapsGateway = function (mapDivDOMElement, mapOptions) {
        this._map = _CreateMap.call(this, mapDivDOMElement, mapOptions);
    };

    var _CreateMap = function (mapDivDOMElement, mapOptions) {
        return new google.maps.Map(mapDivDOMElement, mapOptions);
    };

    GoogleMapsGateway.prototype = {
        constructor: GoogleMapsGateway,

        FromLatLngToScreenPoint: function (lat, lng) {
            var topRight,
             bottomLeft, 
             scale, 
             latLng, 
             worldPoint;

            topRight = this._map.getProjection().fromLatLngToPoint(this._map.getBounds().getNorthEast());
            bottomLeft = this._map.getProjection().fromLatLngToPoint(this._map.getBounds().getSouthWest());
            scale = Math.pow(2, this._map.getZoom());
             latLng = new google.maps.LatLng(lat, lng);
             worldPoint = this._map.getProjection().fromLatLngToPoint(latLng);

            return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
        },

        GetMap : function () {
            return this._map;
        },

        CreateLatLng : function (lat, lng) {
            return new google.maps.LatLng(lat, lng);
        },

        CreateSize: function (width, height) {
            return new google.maps.Size(width, height);
        },

        CreatePoint: function (x, y) {
            return new google.maps.Point(x, y);
        },

        CreateBounds: function () {
            return new google.maps.LatLngBounds();
        },

        CreateMarker: function (mapObject, insertPoint, googleMapsIcon, title) {
            var marker = new google.maps.Marker(
            {
                map: mapObject,
                position: insertPoint,
                icon: googleMapsIcon,
                title: title
            });

            return marker;
        },

        CreateLabel: function (id, text, rotation, lat, lng) {
            return new ns.GoogleMapsCustomLabel(id, text, rotation, lat, lng);
        },

        AddStyledMapType: function (styleName, styleType) {
            var StyleTypeObject = new google.maps.StyledMapType(styleType);
            this._map.mapTypes.set(styleName, StyleTypeObject);
        },

        GetRoadmapStyle: function () {
            return google.maps.MapTypeId.ROADMAP;
        },

        GetTopCenterControlPosition: function () {
            return google.maps.ControlPosition.TOP_CENTER;
        },

        GetBottomCenterControlPosition: function () {
            return google.maps.ControlPosition.BOTTOM_CENTER;
        },

        GetLeftCenterControlPosition: function () {
            return google.maps.ControlPosition.LEFT_CENTER;
        },

        GetRightCenterControlPosition: function () {
            return google.maps.ControlPosition.RIGHT_CENTER;
        },

        GetBounds: function () {
            var gMapsBounds,
                geoRectangle,
                geoPointSouthWest,
                geoPointNorthEast;

            gMapsBounds = this._map.getBounds();
            geoPointSouthWest = gMapsBounds.getSouthWest();
            geoPointNorthEast = gMapsBounds.getNorthEast();

            geoRectangle = new ns.GeographicalRectangle(geoPointSouthWest.lat(),
                            geoPointSouthWest.lng(),
                            geoPointNorthEast.lat(),
                            geoPointNorthEast.lng());

            return geoRectangle;
        },

        AddOnBoundsChangedListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addListener(object, 'bounds_changed', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        AddOnClickListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addListener(object, 'click', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        AddOnClickDOMListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addDomListener(object, 'click', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        AddOnMouseOverListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addListener(object, 'mouseover', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        AddOnMouseOverDOMListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addDomListener(object, 'mouseover', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        AddOnMouseOutListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addListener(object, 'mouseout', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        AddOnMouseOutDOMListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addDomListener(object, 'mouseout', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        AddOnZoomChangedListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addListener(object, 'zoom_changed', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        AddOnDragEndListener: function (object, callback) {
            if (typeof callback !== 'undefined') {
                return google.maps.event.addListener(object, 'dragend', callback);
            }
            else {
                throw "Mandatory callback parameter. Example: function () {alert('test')}";
            }

        },

        TriggerOnMouseOutEvent: function (object, event) {
            if (typeof event !== 'undefined') {
                return google.maps.event.trigger(object, "onmouseout", event);
            }
            else {
                throw "Mandatory event parameter";
            }
        },

        TriggerOnMouseOverEvent: function (object, event) {
            if (typeof event !== 'undefined') {
                return google.maps.event.trigger(object, "onmouseover", event);
            }
            else {
                throw "Mandatory event parameter";
            }
        },

        TriggerOnClikEvent: function (object, event) {
            if (typeof event !== 'undefined') {
                return google.maps.event.trigger(object, "onclick", event);
            }
            else {
                throw "Mandatory event parameter";
            }
        },


        /**
        * C�mo colocar los controles: https://developers.google.com/maps/documentation/javascript/reference?hl=es&csw=1#ControlPosition
        * Valores posibles para position: 
        * {TOP_LEFT: 1,TOP_CENTER: 2,TOP: 2,TOP_RIGHT: 3,LEFT_CENTER: 4,LEFT_TOP: 5,LEFT: 5,LEFT_BOTTOM: 6,RIGHT_TOP: 7,RIGHT: 7,RIGHT_CENTER: 8,RIGHT_BOTTOM: 9,BOTTOM_LEFT: 10,BOTTOM_CENTER: 11,BOTTOM: 11,BOTTOM_RIGHT: 12,CENTER: 13};
        * Un custom control es cualquier elemento HTML
        */
        AddCustomControl: function ( control, position) {

            this._map.controls[position].push(control);
        }
    };

    // Publicamos la "clase" en el namespace
    ns.GoogleMapsGateway = GoogleMapsGateway;

}(window.GoogleMapsExtensions || {}));


///#source 1 1 /scripts/src/GoogleMapsHtmlMarker.js

(function (ns) {
    var GoogleMapsHtmlMarker = function (jsonHtmlMarker) {
        this._id = jsonHtmlMarker.Id;
        this._htmlContent = jsonHtmlMarker.Html;
        this._angle = jsonHtmlMarker.Rot;
        this._lat = jsonHtmlMarker.Lat;
        this._lng = jsonHtmlMarker.Lon;
        
        this._adjustPixelsX;
        this._adjustPixelsY;

        _SetDistanceFromInsertPoint.call(this, jsonHtmlMarker.AdjustPixelsX, jsonHtmlMarker.AdjustPixelsY);

        this._divLabel = document.createElement("div");
        this._divLabel.id = jsonHtmlMarker.Id;

        
    };

     var _GetCssRotation = function () {
        var angle = this._angle,
            rad = angle * Math.PI * 2 / 360,
            cos = Math.cos(rad),
            sin = Math.sin(rad),
            cssStyle;
        //TODO Correct Rotation IE8 -> https://github.com/heygrady/transform/wiki/correcting-transform-origin-and-translate-in-ie
        cssStyle = 'position: absolute;' +
                        'transform: rotate(' + angle + 'deg);' + /* CSS3 Browsers*/
                        'transform-origin:0% 0%;' + /* CSS3 Browsers*/
                        '-ms-transform: rotate(' + angle + 'deg);' + /* IE 9 */
                        '-ms-transform-origin:0% 0%;' + /* IE 9 */
                        '-webkit-transform: rotate(' + angle + 'deg); ' + /* Safari and Chrome */
                        '-webkit-transform-origin:0% 0%;' + /* Safari and Chrome */
                        'filter: progid:DXImageTransform.Microsoft.Matrix(sizingMethod="auto expand", M11=' + cos + ', M12=' + (-sin) + ', M21=' + sin + ', M22=' + cos + ');' + /* IE6,IE7 */
                        '-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(SizingMethod="auto expand", M11=' + cos + ', M12=' + (-sin) + ', M21=' + sin + ', M22=' + cos + ');'; /* IE8 */

        return cssStyle;
    };

     var _CalculateInsertionPoint = function (projection) {
        var geoInsertPointLabel,
            screenInsertPointLabel;

        geoInsertPointLabel = new google.maps.LatLng(this._lat, this._lng);
        screenInsertPointLabel = projection.fromLatLngToDivPixel(geoInsertPointLabel);
        
        /*Los "+" delante de las varibles es para convertirlos en numeric y poder sumarlos.
         * Sino interpreta que se tienen que concatenar 2 Strings;
        */
        var numberDistX = +this._adjustPixelsX;
        var numberDistY = +this._adjustPixelsY;
        var numberPositionX = +screenInsertPointLabel.x;
        var numberPositionY = +screenInsertPointLabel.y;
        screenInsertPointLabel = new google.maps.Point(numberPositionX + numberDistX, numberPositionY + numberDistY);
        

        return screenInsertPointLabel;
     };

     var _SetDistanceFromInsertPoint = function (distX, distY) {
         if (!ns.IsNullOrEmpty(distX)) {
             this._adjustPixelsX = distX;
         }
         else {
             this._adjustPixelsX = 0;
         }

         if (!ns.IsNullOrEmpty(distY)) {
             this._adjustPixelsY = distY;
         }
         else {
             this._adjustPixelsY = 0;
         }

     };


     GoogleMapsHtmlMarker.prototype = {
         constructor: GoogleMapsHtmlMarker,
         GetHTMLSource: function (projection) {
             var divParent,
                 spanElement,
                 screenInsertPointLabel;

             this._divLabel.innerHTML = "";
             divParent = this._divLabel;

             screenInsertPointLabel = _CalculateInsertionPoint.call(this, projection);

             divParent.style.cssText = 'left:' + screenInsertPointLabel.x + 'px; '
                                         + 'top:' + screenInsertPointLabel.y + 'px; '
                                         + _GetCssRotation.call(this);


             spanElement = document.createElement('span');
             spanElement.innerHTML = this._htmlContent;
             divParent.appendChild(spanElement);

             return divParent;
         },         

         SetVisible: function (isVisible) {
             if (isVisible === true) {
                 this._divLabel.style.display = 'block';
             }
             else {
                 this._divLabel.style.display = 'none';
             }
             
         }
     };

    // Publicamos la "clase" en el namespace
     ns.GoogleMapsHtmlMarker = GoogleMapsHtmlMarker;

}(window.GoogleMapsExtensions || {}));



///#source 1 1 /scripts/src/GoogleMapsOverlayBase.js
(function (ns) {
    "use strict";
    var GoogleMapsOverlayBase = function () {
        google.maps.OverlayView.call(this);
    };

    GoogleMapsOverlayBase.prototype = new google.maps.OverlayView();

    GoogleMapsOverlayBase.prototype.constructor = GoogleMapsOverlayBase;

    GoogleMapsOverlayBase.prototype.SetMap = function () {
        throw new Error("This method must be overwritten!");
    };

    GoogleMapsOverlayBase.prototype.CreateCityLabel = function (distX, distY) {
        throw new Error("This method must be overwritten!");
    };

    GoogleMapsOverlayBase.prototype.SetCssClass = function (cssClass) {
        throw new Error("This method must be overwritten!");
    };

    GoogleMapsOverlayBase.prototype.onAdd = function () {
        throw new Error("This method must be overwritten!");
    };

    GoogleMapsOverlayBase.prototype.onRemove = function () {
        throw new Error("This method must be overwritten!");
    };
       
    GoogleMapsOverlayBase.prototype.draw = function () {
        throw new Error("This method must be overwritten!");
    };

    ns.GoogleMapsOverlayBase = GoogleMapsOverlayBase;

}(window.GoogleMapsExtensions || {}));
///#source 1 1 /scripts/src/GoogleMapsHtmlMarkerManager.js
(function (ns) {
    /**
     *  Define the overlay, derived from google.maps.OverlayView
     *  to create a Custom label with rotation and padding from insert point
     *  For performance issues with IE8 and Firefox, onle create one
     *  Overlay over GoogleMaps that covers all map.
     *  This class draw the labels over this overlay
    */
    var GoogleMapsHtmlMarkerManager = function (googleMapsGateway, listOfJsonHtmlMarkers) {
        ns.GoogleMapsOverlayBase.call(this);
        this._mapsGateway = googleMapsGateway;
        this._listOfJsonHtmlMarkers = listOfJsonHtmlMarkers;

        this._htmlMarkersArray = [];
        this._htmlMarkerLayer;
        this._map;
        _SetMap.call(this, googleMapsGateway.GetMap());
    };

    var _RemoveHtmlMarkersLayer = function () {
        while (this._htmlMarkerLayer.hasChildNodes()) {
            this._htmlMarkerLayer.removeChild(this._htmlMarkerLayer.firstChild);
        }
    };

    var _SetMap = function (map) {
        if (typeof map === "undefined") {
            throw "Map not initialize. Please provide Map object.";
        }
        this._map = map;
        this.setMap(map);
    }

    GoogleMapsHtmlMarkerManager.prototype = new ns.GoogleMapsOverlayBase();

    GoogleMapsHtmlMarkerManager.prototype.constructor = GoogleMapsHtmlMarkerManager;   

    GoogleMapsHtmlMarkerManager.prototype.ShowHtmlMarkers = function () {
        var index,
            listOfJsonHtmlMarkersLenght,
            jsonHtmlMarker,
            htmlMarker;
        
        listOfJsonHtmlMarkersLenght = this._listOfJsonHtmlMarkers.length;

        for (index = 0; index < listOfJsonHtmlMarkersLenght ; index++) {
            jsonHtmlMarker = this._listOfJsonHtmlMarkers[index];

            htmlMarker = new GoogleMapsExtensions.GoogleMapsHtmlMarker(jsonHtmlMarker);

            htmlMarker.SetVisible(true);

            this._htmlMarkersArray.push(htmlMarker);
        }
    };

    GoogleMapsHtmlMarkerManager.prototype.onAdd = function () {
        this._htmlMarkerLayer = document.createElement('div');
        this._htmlMarkerLayer.className = 'overlayHtmlMarkers';
        this._htmlMarkerLayer.id = "divOverlayHtmlMarkers";

        this.set('zIndex', 100);

        var pane = this.getPanes().overlayImage;
        pane.appendChild(this._htmlMarkerLayer);
    };

    GoogleMapsHtmlMarkerManager.prototype.onRemove = function () {
        _RemoveHtmlMarkersLayer.call(this);
        this._htmlMarkerLayer = null;
    };

    GoogleMapsHtmlMarkerManager.prototype.draw = function () {
        var projection,
            fragment,
            indexHtmlMarkersArray,
            lengthHtmlMarkersArray,
            htmlMarkerInArray,
            htmlMarkerSource;

        projection = this.getProjection();

        fragment = document.createDocumentFragment();

        _RemoveHtmlMarkersLayer.call(this); // Empty any previous rendered markers

        lengthHtmlMarkersArray = this._htmlMarkersArray.length;
        for (indexHtmlMarkersArray = 0; indexHtmlMarkersArray < lengthHtmlMarkersArray; indexHtmlMarkersArray++) {
            htmlMarkerInArray = this._htmlMarkersArray[indexHtmlMarkersArray];

            htmlMarkerSource = htmlMarkerInArray.GetHTMLSource(projection);

            // Append the HTML to the fragment in memory
            fragment.appendChild(htmlMarkerSource);

        }

        // Now append the entire fragment from memory onto the DOM
        this._htmlMarkerLayer.appendChild(fragment);
    };
    

    // Publicamos la "clase" en el namespace
    ns.GoogleMapsHtmlMarkerManager = GoogleMapsHtmlMarkerManager;

}(window.GoogleMapsExtensions || {}));




///#source 1 1 /scripts/src/DebugModeService.js
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




