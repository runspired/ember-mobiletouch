/* global alert */
import Ember from "ember";

const DEFAULT_ACTION_TEXT = "You are currently doing nothing.";

export default Ember.Controller.extend({

  currentUserAction: DEFAULT_ACTION_TEXT,

  fooProp: 'hello world!',
  barProp: 'goodnight moon',

  actions: {
    showLeft: function () {
      this.set('currentUserAction', "You are currently panning left.");
    },
    showRight: function () {
      this.set('currentUserAction', "You are currently panning right.");
    },
    showPanUp: function () {
      this.set('currentUserAction', "You are currently panning up.");
    },
    showPanDown: function () {
      this.set('currentUserAction', "You are currently panning down.");
    },
    showPinch: function () {
      this.set('currentUserAction', "You are currently pinching.");
    },
    showRotate: function () {
      this.set('currentUserAction', "You are currently rotating.");
    },
    showTap: function () {
      Ember.Logger.debug('arguments!', arguments);
      if (arguments.length) {
        let i;
        let str = "";
        for (i = 0; i < arguments.length; i++) {
         str += arguments[i];
        }
        alert("I was passed: " + str);
      }
      this.set('currentUserAction', "You tapped!");
    },
    showPress: function () {
      this.set('currentUserAction', "You are currently pressing!");
    },
    endPress: function() {
      this.set('currentUserAction', "You stopped pressing.");
    },
    endPan: function () {
      this.set('currentUserAction', "You stopped panning.");
    }
  }
});
