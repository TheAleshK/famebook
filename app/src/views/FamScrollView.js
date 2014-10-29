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

      for (var i = 0, strip; i < 10; i++) {
        strip = new StripView({
          number: i,
          size: [sizeX, sizeY]
        });

        strip.pipe(this);
        surfaces.push(strip);
      }
    }

    module.exports = FamScrollView;
});