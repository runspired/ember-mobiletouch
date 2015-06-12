import Ember from "ember";
import { module, test } from 'qunit';
import { pairModule, pairTest, pairConclude } from '../helpers/pair';
import startApp from '../helpers/start-app';
import mobileDetection from "ember-mobiletouch/utils/is-mobile";

var App;

pairModule("Checkbox Integration Tests", {

  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }

});

pairTest("A checkbox can be checked via a tap", function(assert) {
  assert.expect(5);

  var controller = getController('checkboxes');
  assert.ok(!controller.get('isChecked'), 'controller property not checked yet');
  visit('/checkboxes');

  andThen(function() {
    assert.ok($('#checkbox-1').length, 'checkbox exists');
    assert.ok($('#checkbox-1').prop('checked') === false, 'not checked');
  });

  triggerTap('#checkbox-1');

  andThen(function() {
    assert.ok($('#checkbox-1').prop('checked'), 'is checked');
    assert.ok(controller.get('isChecked'), 'controller property indicates checked');
  });
});

pairConclude();


