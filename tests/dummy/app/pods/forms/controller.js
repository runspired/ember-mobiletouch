import Ember from 'ember';

export default Ember.Controller.extend({
  submitEvidence: null,

  reset: function() {
    this.set('submitEvidence', 0);
  }.on('init'),

  actions: {
    submitForm: function() {
      this.incrementProperty('submitEvidence');
    }
  }
});
