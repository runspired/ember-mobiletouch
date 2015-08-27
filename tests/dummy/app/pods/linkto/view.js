import Ember from 'ember';
import jQuery from 'jquery';

const {
  on,
  View
  } = Ember;

export default View.extend({

  buster: null,

  observeClicks: on('didInsertElement', function() {

    var bustDefaultBehavior = function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    this.set('buster', bustDefaultBehavior);
    jQuery('body').on('click', 'a[href]', bustDefaultBehavior);

  }),

  removeObserver: on('willDestroyElement', function() {
    this.set('observer', null);
    jQuery('body').off('click', this.get('buster'));
  })

});
