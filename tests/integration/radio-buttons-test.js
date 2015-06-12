import Ember from "ember";
import { module, test } from 'qunit';
import { pairModule, pairTest, pairConclude } from '../helpers/pair';
import startApp from '../helpers/start-app';
import mobileDetection from "ember-mobiletouch/utils/is-mobile";

var App;

pairTest("Radio Buttons Integration Tests", {

  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }

});

pairTest("Radio button can be selected via taps", function(assert) {
  assert.expect(6);

  visit('/forms');

  andThen(function() {
    assert.ok($('#am-radio').length, 'am radio exists');
    assert.ok($('#fm-radio').length, 'fm radio exists');
    assert.ok(!$('#am-radio').prop('checked'), 'am not checked yet');
    assert.ok(!$('#fm-radio').prop('checked'), 'fm not checked yet');
  });

  triggerTap('#am-radio');

  andThen(function() {
    assert.ok($('#am-radio').prop('checked'), 'am is checked');
    assert.ok(!$('#fm-radio').prop('checked'), 'fm not checked yet');
  });

  triggerTap('#fm-radio');

  andThen(function() {
    assert.ok(!$('#am-radio').prop('checked'), 'am not checked any more');
    assert.ok($('#fm-radio').prop('checked'), 'now fm is checked');
  });
});


