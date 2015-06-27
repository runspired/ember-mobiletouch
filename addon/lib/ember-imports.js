import Ember from "ember";

const {
  get: get,
  ControllerMixin
  } = Ember;

function isSimpleClick (event) {
  var modifier = event.shiftKey || event.metaKey || event.altKey || event.ctrlKey;
  var secondaryClick = event.which > 1; // IE9 may return undefined

  return !modifier && !secondaryClick;
}

function isStream(object) {
  return object && object.isStream;
}

function readUnwrappedModel(object) {
  if (isStream(object)) {
    var result = object.value();

    // If the path is exactly `controller` then we don't unwrap it.
    if (!object._isController) {
      while (ControllerMixin.detect(result)) {
        result = get(result, 'model');
      }
    }

    return result;
  } else {
    return object;
  }
}

export {
  isSimpleClick,
  isStream,
  readUnwrappedModel
  };
