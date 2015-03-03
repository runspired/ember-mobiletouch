import capitalizeWord from "./utils/capitalize-word";
import Ember from "Ember";

export default function (EventManager, instance) {

  var self = this;
  this.Recognizers = {};
  this.Manager = instance;
  this.recognize = function (recognizer) {

    Ember.assert('Custom Recognizers must provide a name.  Names should be camelCased, but this is not enforced.', recognizer.name);
    Ember.assert('Custom Recognizers must provide the name of the gesture class to use', recognizer.gesture);

    var key = capitalizeWord(recognizer.name),
      eventName = recognizer.name.toLowerCase();

    //add the recognizer
    recognizer.tune = recognizer.tune || {};
    recognizer.tune.event = eventName;
    var Recognizer = new Hammer[capitalizeWord(recognizer.gesture)](recognizer.tune);

    //recognizeWith
    if (recognizer.with) {
      Recognizer.recognizeWith(recognizer.with.map(function(name) {
        return self.Recognizers[capitalizeWord(name)];
      }));
    }

    //recognizeFailure
    if (recognizer.without) {
      Recognizer.requireFailure(recognizer.with.map(function(name) {
        return self.Recognizers[capitalizeWord(name)];
      }));
    }

    //add to the manager and register
    this.Recognizers[key] = Recognizer;
    this.Manager.add(Recognizer);

    //add the ember event
    this._setupEvent(recognizer.name);

  };


  //add the event to Ember's eventing
  this._setupEvent = function (name) {
    var events = EventManager.get('events');
    events[name.toLowerCase()] = name;
    EventManager.reopen({ events : events });
  }

}
