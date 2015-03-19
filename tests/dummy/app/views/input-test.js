import Ember from "ember";

export default Ember.TextField.extend({

  tagName : 'input',
  type : 'text',

  focuses : 0,
  blurs : 0,
  submits: 0,
  submitEvents: 0,
  fastClicks : 0,
  internalClicks : 0,
  preventedClicks : 0,
  taps : 0,
  clicks: 0,

  focusIn : function () {
    this.incrementProperty('focuses');
  },
  focusOut : function () {
    this.incrementProperty('blurs');
  },

  tap : function () {
    this.incrementProperty('taps');
  },

  internalClick : function (e) {
    this.incrementProperty('internalClicks');
    if (e.isDefaultPrevented()) {
      this.incrementProperty('preventedClicks');
    } else if (e.isDesktop) {
      //trigger focus because clicks can't trigger focus in tests
      this.$().focus();
    }

    return true;
  },

  observer: null,

  observeClicks : function () {
    var view = this;
    var observer = function (e) {
      if (e.fastclick) {
        view.incrementProperty('fastClicks');
      }
      view.incrementProperty('clicks');
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
