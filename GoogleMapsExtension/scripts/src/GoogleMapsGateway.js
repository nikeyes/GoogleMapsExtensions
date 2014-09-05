(function (ns) {
    'use strict'
    /**
    * Para usar esta libreríra es necesario tener el script de GoogleMaps:
     <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=PRIVATE_KEY&sensor=false"></script>
    */
    //TODO Para depuración Añadir objecto para controlar los eventos que 
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
        * Cómo colocar los controles: https://developers.google.com/maps/documentation/javascript/reference?hl=es&csw=1#ControlPosition
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

