import Ember from "ember";

export default Ember.Controller.extend({

  text: "hello",

  counter: 0,

  actions: {
    addCount: function() {
      this.incrementProperty('counter');
    }
  }

});
