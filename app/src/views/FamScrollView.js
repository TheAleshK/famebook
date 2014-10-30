define(function(require, exports, module) {
    var ScrollView    = require("famous/views/Scrollview");
    var StripView     = require('views/StripView');
    var Utility       = require('famous/utilities/Utility');
    var Surface       = require('famous/core/Surface');
    var App           = require('core/Global');
    var AvatarsData   = require('data/AvatarsData');
    var imageData       = null;

    var SMALL_SCALE = 0.445;
    var DISPLAY_SIZE;

    function FamScrollView() {
      ScrollView.apply(this, arguments);

      DISPLAY_SIZE = App.get('deviceView')['containerSize'];

      Utility.loadURL(AvatarsData.getUrl(), _createStripViews.bind(this));
    }

    FamScrollView.prototype = Object.create(ScrollView.prototype);
    FamScrollView.prototype.constructor = FamScrollView;

    function _createStripViews(flickrData) {
      var surfaces = [];
      var sizeX = ~~(DISPLAY_SIZE[0]-8),
        sizeY = ~~(DISPLAY_SIZE[1]-8);
      imageData = AvatarsData.parse(flickrData);
      
      this.sequenceFrom(surfaces);

      for (var i = 0, strip; i < 10; i++) {
        strip = new StripView({
          number: i,
          size: [sizeX, sizeY],
          imageData: imageData
        });

        strip.pipe(this);
        surfaces.push(strip);
      }
    }

    module.exports = FamScrollView;
});