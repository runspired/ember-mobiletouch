import Ember from 'ember';
import jQuery from 'jquery';

const {
  on,
  View
  } = Ember;

export default View.extend({

  tap() {
    this.incrementProperty('controller.taps');
  },

  internalClick(e) {
    this.incrementProperty('controller.internalClicks');
  },

  observer: null,

  observeClicks: on('didInsertElement', function() {
    var view = this;

    var observer = function(e) {
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
    jQuery('body').on('click', 'a[href]', bustDefaultBehavior);

    this.set('controller.isInserted', true);
    this.$().on('click', observer);
    this.set('observer', observer);
  }),

  removeObserver: on('willDestroyElement', function() {
    this.$().off('click', this.get('observer'));
    this.set('observer', null);

    jQuery('body').off('click', this.get('buster'));
  })

});
