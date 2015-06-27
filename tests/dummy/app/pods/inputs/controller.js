import Ember from 'ember';

const {
  Controller,
  observer,
  Logger
  } = Ember;

export default Controller.extend({
  name: 'inputs controller',
  checkbox1Checked: false,
  checkbox2Checked: false,
  checkbox3Checked: false,
  watchBoxes: observer('checkbox1Checked', 'checkbox2Checked', 'checkbox3Checked', function() {
    Logger.debug('check');
  })
});
