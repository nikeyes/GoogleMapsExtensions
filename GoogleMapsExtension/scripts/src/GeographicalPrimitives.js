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