import Ember from 'ember';

export default Ember.View.extend({

  clickEvidence: 0,
  tapEvidence: 0,
  internalClickEvidence: 0,

  reset() {
    this.set('internalClickEvidence', 0);
    this.set('clickEvidence', 0);
    this.set('tapEvidence', 0);
  },

  internalClick() {
    this.incrementProperty('internalClickEvidence');
  },

  tap() {
    this.incrementProperty('tapEvidence');
  },

  init() {
    this._super();
    this.reset();
  }

});
