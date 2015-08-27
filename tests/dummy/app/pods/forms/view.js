import Ember from 'ember';

const {
  on,
  View
  } = Ember;

export default View.extend({

  tap() {
    this.incrementProperty('controller.taps');
  },

  submit() {
    this.incrementProperty('controller.submitEvents');
  },

  internalClick(e) {
    this.incrementProperty('controller.internalClicks');
    e.preventDefault();
    return false;
  },

  observer: null,

  observeClicks: on('didInsertElement', function() {
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
  }),

  removeObserver: on('willDestroyElement', function() {
    this.$().off('click', this.get('observer'));
    this.set('observer', null);
  })

});
