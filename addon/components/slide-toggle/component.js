import Ember from "ember";

export default Ember.Component.extend({

  tagName : 'slide-toggle',

  classNames : ['slideToggle'],

  classNameBindings : ['value:isOn:isOff'],

  layoutName : 'components/slide-toggle',

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

      this.$('.slideToggleButton').css({
        'transform' : 'translate(' + value + 'px , 0)',
        '-o-transform' : 'translate(' + value + 'px , 0)',
        '-moz-transform' : 'translate(' + value + 'px , 0)',
        '-webkit-transform' : 'translate(' + value + 'px , 0)'
      });
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
    this._updateCSS(dX);

    //schedule the dismissal
    Ember.run.debounce(this, this._trigger, Math.abs(dX), 250);
    return false;
  },

  tap : function () {
    return this._trigger();
  },

  press : function () {
    return this._trigger();
  }
});
