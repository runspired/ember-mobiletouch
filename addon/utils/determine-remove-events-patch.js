import Ember from "ember";

export default function (config, defaults) {

  if (!config) {
    return [];
  }

  if (Ember.isArray(config)) {
    return config;
  }

  var eventsToRemove = [], i;

  for (i in defaults) {
    //if the event is in defaults but not in the config then we remove it
    if (defaults.hasOwnProperty(i) && !config.hasOwnProperty(i)) {
      eventsToRemove.push(i);
    }
  }

  return eventsToRemove;
}
