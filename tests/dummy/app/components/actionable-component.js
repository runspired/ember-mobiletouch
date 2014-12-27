import Ember from "ember";

export default Ember.Component.extend({
  tap : function () {
    Ember.Logger.debug('component tap!');
  },
  press : function () {
    Ember.Logger.debug('component press!');
  },
  pan : function () {
    Ember.Logger.debug('component panning!');
  },
  panLeft : function () {
    Ember.Logger.debug('component panningLeft!');
  },
  panRight : function () {
    Ember.Logger.debug('component panningRight!');
  },
  swipe : function () {
    Ember.Logger.debug('component swiping!');
  },
  swipeLeft : function () {
    Ember.Logger.debug('component swipingLeft!');
  },
  swipeRight : function () {
    Ember.Logger.debug('component swipingRight!');
  },
  swipeUp : function () {
    Ember.Logger.debug('component swipingUp!');
  },
  swipeDown : function () {
    Ember.Logger.debug('component swipingDown!');
  }
});
