import Ember from "ember";

export default Ember.Controller.extend({

  counter: 0,

  actions: {
    addCount: function() {
      this.incrementProperty('counter');
    }
  }

});
