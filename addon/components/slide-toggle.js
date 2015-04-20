import Ember from "ember";
import VelocityMixin from '../mixins/ember-velocity-mixin';

const {
  run
} = Ember;

const {
  throttle,
  debounce
} = run;

export default Ember.Component.extend({

  tagName : 'slide-toggle',
  classNameBindings : ['value:isOn:isOff'],

  value : false,

  _updateCSS : function (value) {

    if (!value) {
      this.$('.slideToggleButton').removeAttr('style');
    } else {

      var maxMovement = this.$('.slideToggleButton').get(0).clientWidth * 0.75;

      if (Math.abs(value) > maxMovement) {
        value = (value < 0) ? 0 : maxMovement;
      } else if (value < 0) {
        value = maxMovement + value;
      }

      this.animate({transformX: value + 'px'}, 1);
    }

  },

  _trigger : function (dX) {

    this._updateCSS();

    if ((dX && dX > 8) || (!dX && dX !== 0)) {
      this.set('value', !this.get('value'));
    }
    return false;
  },

  pan : function (e) {

    var allowPanRight = !this.get('value');
    var dX = e.originalEvent.gesture.deltaX;

    if (allowPanRight) {
      if (dX < 0) { dX = 0; }
    } else {
      if (dX > 0) { dX = 0; }
    }

    throttle(this, this.__updateCSS, dX, 8);

    //schedule the dismissal
    debounce(this, this._trigger, Math.abs(dX), 250);
    return false;
  },

  tap : function () {
    return this._trigger();
  },

  press : function () {
    return this._trigger();
  }

});
