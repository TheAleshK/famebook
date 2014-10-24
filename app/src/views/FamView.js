define(function(require, exports, module) {
  var View            = require('famous/core/View');
  var Transform       = require('famous/core/Transform');
  var Modifier        = require("famous/core/Modifier");
  var StateModifier   = require('famous/modifiers/StateModifier');
  var Transitionable  = require("famous/transitions/Transitionable");
  var App             = require('core/Global');
  var Easing          = require('famous/transitions/Easing');
  var FamScrollView   = require('views/FamScrollView');
  var GenericSync = require("famous/inputs/GenericSync");
  var MouseSync   = require("famous/inputs/MouseSync");
  var TouchSync   = require("famous/inputs/TouchSync");

  GenericSync.register({
    "mouse" : MouseSync,
    "touch" : TouchSync
  });

  var SMALL_SCALE = 0.445;
  var Y_TRANSLATION;
  var DISPLAY_SIZE;

  var sizeTrans = new Transitionable(0);
  var scaleTrans = new Transitionable(SMALL_SCALE);
  var posTrans = new Transitionable([0,0]);

  var sync = new GenericSync(
    ["mouse", "touch"],
    {direction : GenericSync.DIRECTION_Y}
  );

  function FamView() {
    View.apply(this, arguments);

    DISPLAY_SIZE = App.get('deviceView')['containerSize'];

    _createScrollView.call(this);

    _setListeners.call(this);
  }

  FamView.prototype = Object.create(View.prototype);
  FamView.prototype.constructor = FamView;

  FamView.DEFAULT_OPTIONS = {
    size: [undefined, undefined]
  };

  var scaleModifier = new Modifier({
    transform : function(){
      var s = scaleTrans.get();

      return Transform.scale(s, s);
    }
  });

  var positionModifier = new Modifier({
    transform : function(){
      var trans = posTrans.get();

      return Transform.translate(trans[0],trans[1],0);
    }
  });

  var SCROLLVIEW;

  function _createScrollView() {
    var sizeX = ~~(DISPLAY_SIZE[0]-8),
      sizeY = ~~(DISPLAY_SIZE[1]-8);

    this.scrollview = new FamScrollView({ direction: 0});
    SCROLLVIEW = this.scrollview;


    Y_TRANSLATION = ~~(sizeY - sizeY*SMALL_SCALE);
    posTrans.set([0, Y_TRANSLATION]);

    this
      .add(positionModifier)
      .add(scaleModifier)
      .add(this.scrollview);
  }

  function _setListeners() {
    this.scrollview._eventInput.pipe(sync);
    sync._eventInput.pipe(this._eventOutput);
  }

  function setSmall(velocity) {
    posTrans.set([0,Y_TRANSLATION], {
      duration: 600,
      curve: Easing.outQuad,
      velocity : velocity
    });

    scaleTrans.set(SMALL_SCALE, {
      duration: 600,
      curve: Easing.outQuad,
      velocity : velocity
    });
  }

  function setBig(velocity) {
    posTrans.set([0,0], {
      duration: 600,
      curve: Easing.outQuad,
      velocity : velocity
    });

    scaleTrans.set(1, {
      duration: 600,
      curve: Easing.outQuad,
      velocity : velocity
    });
  }

  sync.on('update', function(data){
    var delta = data.delta;
    var vel = data.velocity;
    var currentScale = scaleTrans.get();
    var currentX = posTrans.get()[0],
      currentY = posTrans.get()[1];

    if (delta > 0 && currentScale <= SMALL_SCALE) {
        setSmall();
    } else if (delta < 0 && (currentScale >= 1 || currentY <= 0)){
        setBig();
    } else {
      scaleTrans.set(currentScale - delta/306*0.555);
      var x = delta/SCROLLVIEW.getPosition()*scaleTrans.get();
      posTrans.set([currentX-x, currentY+delta]);
    }
  });

  sync.on('end', function(data){
    var delta = data.delta;
    var vel = data.velocity;
    var currentScale = scaleTrans.get();
    var currentX = posTrans.get()[0],
      currentY = posTrans.get()[1];
    var abs = Math.abs;

    if (currentScale === 1 || currentY === 0 || (currentScale >= 0.7 && delta <= 0)
     || (delta <= 0 && vel < -0.2)) {
      setBig(vel);
    } else {
      setSmall(vel);
    }
  });

  module.exports = FamView;
});
