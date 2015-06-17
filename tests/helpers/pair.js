import { module, test } from 'qunit';
import mobileDetection from "ember-mobiletouch/utils/is-mobile";

var currentModuleLabel = null;
var currentModuleHooks = null;
var currentTests = [];

// Save the label and hooks so we can use them with each pair of tests.
var pairModule = function(label, hooks) {
  if (currentModuleLabel || currentModuleHooks) {
    throw new Error("Pair test wasn't cleaned up");
  }
  currentModuleLabel = label;
  currentModuleHooks = hooks;
};

// Save the tests so we can instantiate each test with each module in the pair.
var pairTest = function(label, callback) {
  currentTests.push([label, callback]);
};

// This function is necessary to trigger the tests to be instantiated. We need
// to instantiate all the tests with one module and then all the tests with the
// second module. Without a function to conclude the batch, we won't know when
// the tests are done being defined.
var pairConclude = function() {
  if (!currentModuleLabel) {
    throw "Missing module";
  }

  var hooks = currentModuleHooks || {};
  var label = currentModuleLabel;
  var origBeforeEach = hooks.beforeEach;
  var origAfterEach = hooks.afterEach;

  // Build a module for when IS_MOBILE is true and one for when it's false
  [true,false].forEach(function(isMobile) {

    // Make a new beforeEach and afterEach function.
    hooks.beforeEach = function() {
      mobileDetection.fake(isMobile);
      if (!!origBeforeEach) {
        origBeforeEach.call({});
      }
    };
    hooks.afterEach = function() {
      if (!!origAfterEach) {
        origAfterEach.call({});
      }
      mobileDetection.detect();
    };

    // Instantiate a module with these updated hooks.
    var desc = isMobile ? "(mobile)" : "(desktop)";
    var fullLabel = label + " " + desc;
    module(fullLabel, hooks);

    // Instantiate one of each test for this module.
    currentTests.forEach(function(labelCallbackTuple) {
      var label = labelCallbackTuple[0];
      var callback = labelCallbackTuple[1];
      test(label, callback);
    });

  });

  // Cleanup.
  currentModuleLabel = null;
  currentModuleHooks = null;
  currentTests = [];
};

export { pairTest, pairModule, pairConclude };
