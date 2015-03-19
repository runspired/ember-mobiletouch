import Ember from "ember";

export default Ember.View.extend({

  tap : function () {
    this.incrementProperty('controller.taps');
  },

  internalClick : function (e) {
    this.incrementProperty('controller.internalClicks');
    e.preventDefault();
    return false;
  },

  observeClicks : function () {
    var view = this;
    this.set('controller.isInserted', true);
    this.$().on('click', function (e) {
      if (e.fastclick) {
        view.incrementProperty('controller.fastClicks');
      }
      view.incrementProperty('controller.clicks');
    });
  }.on('didInsertElement')

});
