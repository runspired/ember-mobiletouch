import Ember from "ember";

var oldActionHelper;
var newActionHelper;

//HTMLBars version
if (!!Ember.HTMLBars) {

  //cache the old handler
  oldActionHelper = Ember.Handlebars.helpers.action.helperFunction;

  newActionHelper = Ember.Handlebars.helpers.action.helperFunction = function (params, hash /*, options, env*/) {

    //set on to 'tap' if it hasn't been explicitly set
    hash.on = hash.on || 'tap';
    oldActionHelper.apply(this, arguments);

  };

//Pre-HTMLBars version
} else {

  //cache the old handler
  oldActionHelper = Ember.Handlebars.helpers.action;

  newActionHelper = Ember.Handlebars.helpers.action = function (/*actionName*/) {
    var options = arguments[arguments.length - 1];
    var hash = options.hash;
    hash.on = hash.on || 'tap';
    return oldActionHelper.apply(this, arguments);
  };

}

export default newActionHelper;

export {
  oldActionHelper,
  newActionHelper
  };
