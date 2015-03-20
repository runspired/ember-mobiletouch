import Ember from "ember";

export default Ember.Controller.extend({

  foo : 'bar',
  success : false,

  actions : {

    anotherAction : function() {
    },

    genericAction : function () {
      this.set('success', true);
    },

    actionWithParams : function(params) {
      if (params === 'bar') {
        this.set('success', true);
      }
    }

  }

});
