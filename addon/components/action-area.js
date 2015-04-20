import Ember from "ember";

export default Ember.Component.extend({

  init : function () {

    this._super();

    var v, ret = [];
    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        v = this[key];
        if (v === 'toString') {
          continue;
        } // ignore useless items
        if (Ember.typeOf(v) === 'function') {
          continue;
        }

        //setup listener for key
        if (key.indexOf('on') === 0) {
          let event = key.substr(2);
          let action = this[key];
          this.set(event + 'Action', action);
          this.set(event, function () {
            this.sendAction(event + 'Action');
          }.bind(this));
        }

      }
    }

  }

});
