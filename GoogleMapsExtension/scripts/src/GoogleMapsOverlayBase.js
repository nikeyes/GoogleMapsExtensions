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