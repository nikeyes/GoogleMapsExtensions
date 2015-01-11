///#source 1 1 /scripts/src/Namespaces.js
/*!
 * GoogleMapsExtension JavaScript Library v1.3.0
 * https://github.com/nikeyes/GoogleMapsExtensions
 *
 * Sample
 * http://nikeyes.github.io/GoogleMapsExtensions/
 *
 * Released under the MIT license
 * https://raw.githubusercontent.com/nikeyes/GoogleMapsExtensions/master/licence.txt
 *
 * Date: 2014/12/12
 */

/* exported GoogleMapsExtensions */
var GoogleMapsExtensions = {
    //Global Helper Functions 
    IsNullOrEmpty: function (element) {
        return !element;
    },

    isFunction: function (fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    }
    
    
};



///#source 1 1 /scripts/src/GoogleMapsHtmlMarker.js

(function (ns) {
    var GoogleMapsHtmlMarker = function (jsonHtmlMarker) {
        this._id = jsonHtmlMarker.Id;
        this._htmlContent = jsonHtmlMarker.Html;
        this._angle = jsonHtmlMarker.Rot;
        this._lat = jsonHtmlMarker.Lat;
        this._lng = jsonHtmlMarker.Lon;
        this._fnOnMouseOver = jsonHtmlMarker.fnOnMouseOver;
        this._fnOnMouseOut = jsonHtmlMarker.fnOnMouseOut;
        this._fnOnClick = jsonHtmlMarker.fnOnClick;
        this._zIndex = (jsonHtmlMarker.zIndex === null) ? 0 : jsonHtmlMarker.zIndex;

        
        this._adjustPixelsX;
        this._adjustPixelsY;

        _SetDistanceFromInsertPoint.call(this, jsonHtmlMarker.AdjustPixelsX, jsonHtmlMarker.AdjustPixelsY);

        this._divLabel = document.createElement("div");
        this._divLabel.id = jsonHtmlMarker.Id;

        
    };

     var _GetCssRotation = function () {
        var angle = this._angle,
            rad = angle * Math.PI / 180,
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
                                         + 'z-index:' + this._zIndex + ';'
                                         + _GetCssRotation.call(this);
                                         


             spanElement = document.createElement('span');
             spanElement.innerHTML = this._htmlContent;

             divParent.appendChild(spanElement);

             if (ns.isFunction(this._fnOnMouseOver)) {
                 divParent.onmouseover = this._fnOnMouseOver;
             }

             if (ns.isFunction(this._fnOnMouseOut)) {
                 divParent.onmouseout = this._fnOnMouseOut;
             }

             if (ns.isFunction(this._fnOnClick)) {
                 divParent.onclick = this._fnOnClick;
             }

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
    var GoogleMapsHtmlMarkerManager = function (map, listOfJsonHtmlMarkers) {
        ns.GoogleMapsOverlayBase.call(this);
        this._listOfJsonHtmlMarkers = listOfJsonHtmlMarkers;

        this._htmlMarkersArray = [];
        this._htmlMarkerLayer;
        this._map = map;
        _SetMap.call(this, map);
        _ShowHtmlMarkers.call(this);
    };

    var _RemoveHtmlMarkersLayer = function () {
        var child;
        while (this._htmlMarkerLayer.hasChildNodes()) {
            /*Detach events of the DOM Object and Delete element*/
            child = this._htmlMarkerLayer.firstChild;
            child.onmouseover = null;
            child.onmouseout = null;
            child.onclick = null;
            this._htmlMarkerLayer.removeChild(child);
        }
    };

    var _SetMap = function (map) {
        if (typeof map === "undefined") {
            throw "Map not initialize. Please provide Map object.";
        }
        this._map = map;
        this.setMap(map);
    };

    var _ShowHtmlMarkers = function () {
        var index,
             listOfJsonHtmlMarkersLenght,
             jsonHtmlMarker,
             htmlMarker;

        listOfJsonHtmlMarkersLenght = this._listOfJsonHtmlMarkers.length;

        for (index = 0; index < listOfJsonHtmlMarkersLenght ; index++) {
            jsonHtmlMarker = this._listOfJsonHtmlMarkers[index];

            htmlMarker = new ns.GoogleMapsHtmlMarker(jsonHtmlMarker);

            htmlMarker.SetVisible(true);

            this._htmlMarkersArray.push(htmlMarker);
        }
    };

    GoogleMapsHtmlMarkerManager.prototype = new ns.GoogleMapsOverlayBase();

    GoogleMapsHtmlMarkerManager.prototype.constructor = GoogleMapsHtmlMarkerManager;

    GoogleMapsHtmlMarkerManager.prototype.RemoveMarkers = function () {
        _SetMap.call(this, null);
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




