import Ember from 'ember';

const {
  observer,
  Controller
  } = Ember;

export default Controller.extend({
  name: 'inputs controller',
  checkbox1Checked: false,
  checkbox2Checked: false,
  checkbox3Checked: false,
  watchBoxes: observer('checkbox1Checked', 'checkbox2Checked', 'checkbox3Checked', function() {
    console.log('check');
  })
});
