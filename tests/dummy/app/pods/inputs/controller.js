import Ember from 'ember';

export default Ember.Controller.extend({
  name: 'inputs controller',
  checkbox1Checked: false,
  checkbox2Checked: false,
  checkbox3Checked: false,
  watchBoxes: Ember.observer('checkbox1Checked', 'checkbox2Checked', 'checkbox3Checked', function() {
    Ember.Logger.debug('check');
  })
});
