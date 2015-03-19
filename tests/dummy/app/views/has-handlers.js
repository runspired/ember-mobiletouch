import Ember from 'ember';

export default Ember.View.extend({

  clickEvidence: 0,
  tapEvidence: 0,
  internalClickEvidence: 0,

  reset: function() {
    this.set('internalClickEvidence', 0);
    this.set('clickEvidence', 0);
    this.set('tapEvidence', 0);
  }.on('init'),

  internalClick: function() {
    this.incrementProperty('internalClickEvidence');
  },

  tap: function() {
    this.incrementProperty('tapEvidence');
  }

});
