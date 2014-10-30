/*** StripView.js ***/

define(function(require, exports, module) {
  var View          = require('famous/core/View');
  var Surface       = require('famous/core/Surface');
  var Transform     = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface  = require('famous/surfaces/ImageSurface');
  var Utility       = require('famous/utilities/Utility');

  function StripView() {
    View.apply(this, arguments);

    _createBackground.call(this);
    _createContent.call(this);
    _setListeners();
  }

  StripView.prototype = Object.create(View.prototype);
  StripView.prototype.constructor = StripView;

  StripView.DEFAULT_OPTIONS = {
    backgroundColor: 'white',
    direction: Utility.Direction.X,
    paddingTop: '50px',
    textAlign: "center",
    fontSize: '40px',
    border: 'solid 1px #f8f8f8'
  };

  function _createBackground() {
    var backgroundSurface = new Surface({
      size: [this.options.width, this.options.height],
      properties: {
        backgroundColor: this.options.backgroundColor,
        boxShadow: '0 0 1px black',
        paddingTop: this.options.paddingTop,
        textAlign: this.options.textAlign,
        fontSize: this.options.fontSize,
        border: this.options.border
      }
    });

    backgroundSurface.pipe(this._eventOutput);
    this.add(backgroundSurface);
  }

  function _createContent() {
    var that = this;

    this.photoNode = new ImageSurface({
      size: [75, 75],
      content: this.options.imageData[this.options.number],
      properties: {
        pointerEvents: 'none'
      }
    });

    this.photoModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0]
    });

    this.add(this.photoModifier).add(this.photoNode);
  }

  function _setListeners() {
  }

    module.exports = StripView;
});
