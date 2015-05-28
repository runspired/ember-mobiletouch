import Ember from "ember";
import {
  isSimpleClick,
  isStream,
  readUnwrappedModel
} from "../lib/ember-imports";

const {
  run,
  uuid,
  assert
} = Ember;


function actionArgs(parameters, actionName) {
  var ret, i, l;

  if (actionName === undefined) {
    ret = new Array(parameters.length);
    for (i=0, l=parameters.length;i<l;i++) {
      ret[i] = readUnwrappedModel(parameters[i]);
    }
  } else {
    ret = new Array(parameters.length + 1);
    ret[0] = actionName;
    for (i=0, l=parameters.length;i<l; i++) {
      ret[i + 1] = readUnwrappedModel(parameters[i]);
    }
  }

  return ret;
}

const keys = ["alt", "shift", "meta", "ctrl"];
const POINTER_EVENT_TYPE_REGEX = /^click|mouse|touch/;

function isAllowedEvent(event, allowedKeys) {
  if (typeof allowedKeys === "undefined") {
    if (POINTER_EVENT_TYPE_REGEX.test(event.type)) {
      return isSimpleClick(event);
    } else {
      allowedKeys = '';
    }
  }

  if (allowedKeys.indexOf("any") >= 0) {
    return true;
  }

  for (var i=0, l=keys.length;i<l;i++) {
    if (event[keys[i] + "Key"] && allowedKeys.indexOf(keys[i]) === -1) {
      return false;
    }
  }

  return true;
}

var ActionHelper = {
  registeredActions : {}
};

ActionHelper.registerAction = function registerAction(actionNameOrStream, options, allowedKeys) {
  var actionId = uuid();
  var events = options.events;
  var parameters = options.parameters;

  ActionHelper.registeredActions[actionId] = {

    events: events,

    handler: function handleRegisteredAction(event) {

      if (!isAllowedEvent(event, allowedKeys)) { return true; }

      if (options.preventDefault !== false) {
        event.preventDefault();
      }

      if (options.bubbles === false) {
        event.stopPropagation();
      }

      var target = options.target.value();

      var actionName;

      if (isStream(actionNameOrStream)) {
        actionName = actionNameOrStream.value();

        assert("You specified a quoteless path to the {{action}} helper " +
          "which did not resolve to an action name (a string). " +
          "Perhaps you meant to use a quoted actionName? (e.g. {{action 'save'}}).",
          typeof actionName === 'string');
      } else {
        actionName = actionNameOrStream;
      }

      run(function runRegisteredAction() {
        if (target.send) {
          target.send.apply(target, actionArgs(parameters, actionName));
        } else {
          assert("The action '" + actionName + "' did not exist on " + target, typeof target[actionName] === 'function');
          target[actionName].apply(target, actionArgs(parameters));
        }
      });
    }
  };

  options.view.on('willClearRender', function() {
    delete ActionHelper.registeredActions[actionId];
  });

  return actionId;
};

export { ActionHelper };

function actionHelper(params, hash, options, env) {
  var view = env.data.view;
  var target;
  if (!hash.target) {
    target = view.getStream('controller');
  } else if (isStream(hash.target)) {
    target = hash.target;
  } else {
    target = view.getStream(hash.target);
  }

  var events = (hash.on || 'tap').split(' ');

  var actionOptions = {
    events: events,
    parameters: params.slice(1),
    view: view,
    bubbles: hash.bubbles,
    preventDefault: hash.preventDefault,
    target: target,
    withKeyCode: hash.withKeyCode
  };

  var actionId = ActionHelper.registerAction(params[0], actionOptions, hash.allowedKeys);
  env.dom.setAttribute(options.element, 'data-ember-action', actionId);
}


Ember.Handlebars.helpers.action = actionHelper;

export default actionHelper;
