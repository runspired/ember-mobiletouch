import Ember from "ember";

export default Ember.Controller.extend({
  actions : {
    alert : function () {
      Ember.Logger.debug('The alert triggered!');
    },
    panning : function () {
      Ember.Logger.debug('panning!');
    },
    panningLeft : function () {
      Ember.Logger.debug('panningLeft!');
    },
    panningRight : function () {
      Ember.Logger.debug('panningRight!');
    },
    swiping : function () {
      Ember.Logger.debug('swiping!');
    },
    swipingLeft : function () {
      Ember.Logger.debug('swipingLeft!');
    },
    swipingRight : function () {
      Ember.Logger.debug('swipingRight!');
    },
    swipingUp : function () {
      Ember.Logger.debug('swipingUp!');
    },
    swipingDown : function () {
      Ember.Logger.debug('swipingDown!');
    }
  }
});
