import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { isMobile, fakeMobile, detectMobile } from "ember-mobiletouch/utils/is-mobile";
var App;

module('Form Integration Tests - faking non-mobile', {

  beforeEach: function() {
    fakeMobile(false);
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    detectMobile();
  }

 });

test("Clicking button triggers default form action", function(assert) {
  assert.expect(2);

  var formsController = getController('forms');
  formsController.reset();

  visit('/forms');

  andThen(function() {
    assert.equal(formsController.get('submitEvidence'), 0);
  });

  triggerEvent('#submit-button-1', 'click');

  andThen(function() {
    assert.equal(formsController.get('submitEvidence'), 1);
  });

});

module('Form Integration Tests - faking mobile', {

  beforeEach: function() {
    fakeMobile(true);
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    detectMobile();
  }

 });

test("Receiving tap on a button triggers default form action", function(assert) {
  assert.expect(2);

  var formsController = getController('forms');
  formsController.reset();

  visit('/forms');

  andThen(function() {
    assert.equal(formsController.get('submitEvidence'), 0);
  });

  triggerEvent('#submit-button-1', 'tap');

  andThen(function() {
    assert.equal(formsController.get('submitEvidence'), 1);
  });

});

