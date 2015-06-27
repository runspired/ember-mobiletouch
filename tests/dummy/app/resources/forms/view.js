import Ember from "ember";

export default Ember.View.extend({

  tap : function () {
    this.incrementProperty('controller.taps');
  },

  submit : function () {
    this.incrementProperty('controller.submitEvents');
  },

  internalClick : function (e) {
    this.incrementProperty('controller.internalClicks');
    e.preventDefault();
    return false;
  },

  observer: null,

  observeClicks : function () {
    this.incrementProperty('controller.fired');
    var view = this;
    var observer = function (e) {
      if (e.fastclick) {
        view.incrementProperty('controller.fastClicks');
      }
      view.incrementProperty('controller.clicks');
    };
    this.set('controller.isInserted', true);
    this.$().on('click', observer);
    this.set('observer', observer);
  }.on('didInsertElement'),

  removeObserver : function () {
    this.$().off('click', this.get('observer'));
    this.set('observer', null);
  }.on('willDestroyElement')

});
