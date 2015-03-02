import capitalizeWord from "./utils/capitalize-word";

export default function (EventManager, instance) {

  this.Recognizers = {};
  this.Manager = instance;
  this.recognize = function (type, settings) {

    //add the recognizer
    var event = settings.event;
    settings.event = settings.event.toLowerCase();
    var recognizer = new Hammer[capitalizeWord(type)](settings);
    this.Recognizers[settings.event] = recognizer;
    this.Manager.add(recognizer);

    //add the ember event
    this._setupEvent(event);

  };

  this._setupEvent = function (name) {
    var events = EventManager.get('events');
    events[name.toLowerCase()] = name;
    EventManager.reopen({ events : events });
  }

}
