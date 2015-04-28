import Ember from "ember";

const DEFAULT_ACTION_TEXT = "You are currently doing nothing.";

export default Ember.Controller.extend({

  fooProp: 1,

  shouldAutosave: false,

  actions: {
    toggleAutosave: function(value, foo) {
      this.set('shouldAutosave', value);
      this.set('fooProp', foo + 1);
    }
  }

});
