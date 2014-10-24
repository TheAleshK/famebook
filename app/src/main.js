// /* globals define */
define(function(require, exports, module) {
  var Engine     = require('famous/core/Engine');
  var App        = require('core/Global');
  var FamView    = require('views/FamView');
  var DeviceView = require('views/DeviceView');
  var Transform  = require('famous/core/Transform');
  var Easing     = require('famous/transitions/Easing');
  var Modifier   = require('famous/core/Modifier');
  
  var mainContext = Engine.createContext();

  createDevice();

  function createDevice() {
    
    var deviceView = new DeviceView({
      type: 'iphone',
      screenWidth: 'default'
    });

    var deviceMod = new Modifier({
      size: deviceView.getSize(),
      origin: [0, .5],
      transform: Transform.scale(.1, .1, 1)
    });

    var s = (window.innerHeight-20) / Math.max(window.innerHeight-20, deviceView.getSize()[0], deviceView.getSize()[1]);
    deviceMod.setTransform(Transform.scale(s, s, 1), {duration: 500, curve: Easing.outBack});

    App.set('deviceView', {
      'size': deviceView.getSize(),
      'containerSize': deviceView.container.getSize()
    });

    var famView = new FamView();

    famView.pipe(deviceView);
    deviceView.add(famView);
    mainContext.add(deviceMod).add(deviceView);
  }

  mainContext.setPerspective(1);
});
