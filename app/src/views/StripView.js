/*** StripView.js ***/

define(function(require, exports, module) {
  var View          = require('famous/core/View');
  var Surface       = require('famous/core/Surface');
  var Transform     = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface  = require('famous/surfaces/ImageSurface');
  var Utility = require('famous/utilities/Utility');

  function StripView() {
    View.apply(this, arguments);

    _createBackground.call(this);
  }

  StripView.prototype = Object.create(View.prototype);
  StripView.prototype.constructor = StripView;

  StripView.DEFAULT_OPTIONS = {
    backgroundColor: 'white',
    direction: Utility.Direction.X,
    paddingTop: '50px',
    textAlign: "center",
    fontSize: '50px'
  };

  function _createBackground() {
    var backgroundSurface = new Surface({
      size: [this.options.width, this.options.height],
      content: 'Surface '+ this.options.number,
      properties: {
        backgroundColor: this.options.backgroundColor,
        boxShadow: '0 0 1px black',
        paddingTop: this.options.paddingTop,
        textAlign: this.options.textAlign,
        fontSize: this.options.fontSize
      }
    });

    backgroundSurface.pipe(this._eventOutput);
    this.add(backgroundSurface);
  }

  module.exports = StripView;
});
