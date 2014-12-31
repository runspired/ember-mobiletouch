import Ember from "ember";

export default Ember.Mixin.create({

  focus : function (e) {
    Ember.Logger.debug('Focused!', e);
  },

  touchStart : function (e) {

    if ("activeElement" in document && document.activeElement === this.$()[0]) {
      Ember.Logger.debug('touchStart:Element is already focused');
      return false;
    }

    Ember.Logger.debug('touchStart:Focusing');
    //prevent other events from also triggering focus
    e.preventDefault();
    e.stopImmediatePropagation();
    this.$().focus();
    return false;


  },

  gestures : {

    tap : function () { return false; },

    press : function () {return false; }

  }

});
