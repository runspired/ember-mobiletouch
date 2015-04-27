import Ember from "ember";

const DEFAULT_ACTION_TEXT = "You are currently doing nothing.";

export default Ember.Controller.extend({

  currentUserAction: DEFAULT_ACTION_TEXT,

  actions: {
    showLeft: function () {
      this.set('currentUserAction', "You are currently panning left.");
    },
    showRight: function () {
      this.set('currentUserAction', "You are currently panning right.");
    },
    showTap: function () {
      this.set('currentUserAction', "You tapped!");
    },
    showPress: function () {
      this.set('currentUserAction', "You are currently pressing!");
    },
    endPress: function() {
      this.set('currentUserAction', "You stopped pressing.");
    },
    endPan: function () {
      this.set('currentUserAction', "You stopped panning.")
    }
  }
});
