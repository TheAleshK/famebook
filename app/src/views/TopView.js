define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function TopView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size
        });

        this.mainNode = this.add(this.rootModifier);

        _createBackground.call(this);
    }

    TopView.prototype = Object.create(View.prototype);
    TopView.prototype.constructor = TopView;

    TopView.DEFAULT_OPTIONS = {
        size: [undefined, 300],
    };

    function _createBackground() {
        var background = new Surface({
            properties: {
                backgroundColor: '#DDDDDD'
            }
        });

        this.mainNode.add(background);
    }

    module.exports = TopView;
});
