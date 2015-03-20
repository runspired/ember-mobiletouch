import Ember from "ember";

export default Ember.View.extend({

  tap : function () {
    this.incrementProperty('controller.taps');
  },

  internalClick : function (e) {
    this.incrementProperty('controller.internalClicks');
  },

  observer: null,

  observeClicks : function () {
    var view = this;

    var observer = function (e) {
      if (e.fastclick) {
        view.incrementProperty('controller.fastClicks');
      }
      view.incrementProperty('controller.clicks');
    };

    var bustDefaultBehavior = function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    this.set('buster', bustDefaultBehavior);
    Ember.$('body').on('click', 'a[href]', bustDefaultBehavior);

    this.set('controller.isInserted', true);
    this.$().on('click', observer);
    this.set('observer', observer);

  }.on('didInsertElement'),

  removeObserver : function () {
    this.$().off('click', this.get('observer'));
    this.set('observer', null);

    Ember.$('body').off('click', this.get('buster'));

  }.on('willDestroyElement')

});
