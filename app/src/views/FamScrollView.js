define(function(require, exports, module) {
    var ScrollView    = require("famous/views/Scrollview");
    var StripView     = require('views/StripView');
    var Utility       = require('famous/utilities/Utility');
    var Surface       = require('famous/core/Surface');
    var App           = require('core/Global');

    var SMALL_SCALE = 0.445;
    var DISPLAY_SIZE;

    function FamScrollView() {
      ScrollView.apply(this, arguments);

      DISPLAY_SIZE = App.get('deviceView')['containerSize'];

      _createStripViews.call(this);
    }

    FamScrollView.prototype = Object.create(ScrollView.prototype);
    FamScrollView.prototype.constructor = FamScrollView;

    function _createStripViews() {
      var surfaces = [];
      var sizeX = ~~(DISPLAY_SIZE[0]-8),
        sizeY = ~~(DISPLAY_SIZE[1]-8);

      this.sequenceFrom(surfaces);

      for (var i = 0, temp, image; i < 20; i++) {

        temp = new Surface({
           content: "Surf: " + (i + 1),
           size: [sizeX, sizeY],
           properties: {
             backgroundColor: "hsl(" + (i * 360 / 20) + ", 100%, 50%)",
             paddingTop: '50px',
             textAlign: "center",
             fontSize: '40px'
           }
        });

        temp.pipe(this);
        surfaces.push(temp);
      }
    }

    module.exports = FamScrollView;
});