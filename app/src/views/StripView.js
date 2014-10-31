/*** StripView.js ***/

define(function(require, exports, module) {
  var View          = require('famous/core/View');
  var Surface       = require('famous/core/Surface');
  var Transform     = require('famous/core/Transform');
  var Modifier      = require("famous/core/Modifier");
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
    marginTop: '10px',
    textAlign: "left",
    fontSize: '40px',
    border: 'solid 1px #f8f8f8'
  };

  function _createBackground() {
    var backgroundSurface = new Surface({
      size: [this.options.width, this.options.height],
      properties: {
        backgroundColor: this.options.backgroundColor,
        boxShadow: '0 0 1px black',
        border: this.options.border
      }
    });

    backgroundSurface.pipe(this._eventOutput);
    this.add(backgroundSurface);
  }

  function _createContent() {
    var that = this;

    var photoNode = new ImageSurface({
      size: [100, 100],
      content: this.options.imageData[this.options.number],
      properties: {
        pointerEvents: 'none'
      }
    });

    var textNode = new Surface({
      content: 'Darth Vader',
      properties: {
        marginTop: this.options.marginTop,
        textAlign: this.options.textAlign,
        fontSize: this.options.fontSize,
        pointerEvents: 'none'  
      }
    })

    var photoModifier = new Modifier({
      transform: Transform.translate(20, 20, 0)
    });

    var textModifier = new Modifier({
      transform: Transform.translate(20, 120, 0)
    })

    this.add(photoModifier).add(photoNode);

    this.add(textModifier).add(textNode);
  }

  function _setListeners() {
  }

    module.exports = StripView;
});
