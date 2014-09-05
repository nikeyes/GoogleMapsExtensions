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
