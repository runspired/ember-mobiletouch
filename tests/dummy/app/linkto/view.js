import Ember from "ember";

export default Ember.View.extend({

  buster : null,

  observeClicks : function () {

    var bustDefaultBehavior = function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    this.set('buster', bustDefaultBehavior);
    Ember.$('body').on('click', 'a[href]', bustDefaultBehavior);

  }.on('didInsertElement'),

  removeObserver : function () {
    this.set('observer', null);
    Ember.$('body').off('click', this.get('buster'));
  }.on('willDestroyElement')

});
