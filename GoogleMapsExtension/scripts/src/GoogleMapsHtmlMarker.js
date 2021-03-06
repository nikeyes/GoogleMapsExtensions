/* jscs: enable */
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


        this._adjustPixelsX = 0;
        this._adjustPixelsY = 0;

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
         else
             this._adjustPixelsY = 0;
         

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


