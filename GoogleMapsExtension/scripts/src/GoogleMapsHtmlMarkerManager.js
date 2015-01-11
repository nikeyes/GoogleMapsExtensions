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
        this._htmlMarkerLayer = null;
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



