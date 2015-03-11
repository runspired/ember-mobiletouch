import Ember from "ember";

export default Ember.Controller.extend({

  foo : 'bar',

  actions : {

    anotherAction : function() {
    },

    genericAction : function () {
      this.transitionToRoute('test-successful');
    },

    actionWithParams : function(params) {
      if (params === 'bar') {
        this.transitionToRoute('test-successful');
      }
    }

  }

});
