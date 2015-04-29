import Ember from "ember";

const DEFAULT_ACTION_TEXT = "You are currently doing nothing.";

function randomBoolean() {
  return Math.random() > 0.5;
}

export default Ember.Controller.extend({

  currentUserAction: "",

  actions: {
    showTap: function (callback) {

      var self = this;
      var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.run.later(self, function() { this.set('currentUserAction', "Fetching my walking stick."); }, 1000);
        Ember.run.later(self, function() { this.set('currentUserAction', "Locking The Door."); }, 2000);
        Ember.run.later(self, function() { this.set('currentUserAction', "Minding My Feet."); }, 3000);
        Ember.run.later(self, function() { this.set('currentUserAction', "Heading Over The Rainbow."); }, 4000);
        Ember.run.later(self, function() {

          if (randomBoolean()) {
            this.set('currentUserAction', "I only found some golden flowers :/"); reject();
          } else {
            this.set('currentUserAction', "Truly this is a king's treasure!"); resolve();
          }
        }, 5000);
      });

      this.set('currentUserAction', "Putting on my boots and coat.");
      callback(promise);
    }
  }
});
