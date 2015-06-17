import Ember from 'ember';

export default Ember.Controller.extend({

  submits: 0,
  submitEvents: 0,
  fastClicks : 0,
  internalClicks : 0,
  taps : 0,
  clicks: 0,
  isInserted : false,
  textFieldText: null,
  fired: 0,

  actions: {
    submitForm: function() {
      this.incrementProperty('submits');
    }
  }
});
