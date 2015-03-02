import Ember from "ember";
import hammerEvents from "./hammer-events";

var Gestures = {};

var gestureGroups = Ember.keys(hammerEvents), i;
for (i = 0; i < gestureGroups.length; i++) {
  Ember.merge(Gestures, hammerEvents[gestureGroups[i]]);
}

export default function isGesture(name) {
  return Gestures.hasOwnProperty(name.toLowerCase());
}
