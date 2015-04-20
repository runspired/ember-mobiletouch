import Ember from "ember";

export default Ember.Controller.extend({

  hasBeenTriggered : false,

  actions : {

    switchContent : function () {
      this.set('hasBeenTriggered', true);
    }

  }

});
