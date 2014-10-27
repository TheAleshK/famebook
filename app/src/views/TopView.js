define(function(require, exports, module) {
  var View            = require('famous/core/View');
  var Surface         = require('famous/core/Surface');
  var ImageSurface    = require('famous/surfaces/ImageSurface');
  var Transform       = require('famous/core/Transform');
  var StateModifier   = require('famous/modifiers/StateModifier');
  var Utility         = require('famous/utilities/Utility');
  var Timer           = require('famous/utilities/Timer');
  var SlideData       = require('data/SlideData');
  var imageData       = null;
  var imageCounter    = 0;

  function TopView() {
    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: this.options.size
    });

    this.mainNode = this.add(this.rootModifier);

    Utility.loadURL(SlideData.getUrl(), _createBackground.bind(this));
  }

  TopView.prototype = Object.create(View.prototype);
  TopView.prototype.constructor = TopView;

  TopView.DEFAULT_OPTIONS = {
    size: [undefined, 300],
  };

  function _createBackground(data) {
    imageData = SlideData.parse(data);

    var background = new Surface({
      properties: {
        backgroundColor: '#DDDDDD'
      }
    });

    this.photoNode = new ImageSurface({
      size: [undefined, undefined],
      content: imageData[imageCounter],
      properties: {
        zIndex: 2,
        pointerEvents: 'none'
      }
    });

    this.photoModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 0.1)
    });

    this.mainNode.add(background);
    this.mainNode.add(this.photoModifier).add(this.photoNode);

    _rotateBackgroundImage.call(this);
    Timer.setInterval(_rotateBackgroundImage.bind(this), 4000);
  }

  function _rotateBackgroundImage() {
      imageCounter++;

      if (imageData.length < imageCounter) {
        imageCounter = 0;
      }
      this.photoNode.setContent(imageData[imageCounter]);
  }

  module.exports = TopView;
});
