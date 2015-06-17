import Ember from 'ember';

export default function(message, e) {
  var classNames = Ember.$(e.target).attr('class');
  if (classNames) {
    classNames = classNames.replace(/ /g, '.');
  }
  var targetId = e.target && e.target.id;
  var notes = [
    message,
    "event="+Ember.guidFor(e),
    "type="+e.type,
    "when="+e.timeStamp,
    "target=#"+targetId+"."+classNames,
    "fastclick="+!!e.fastclick
  ];
  if (e.originalEvent) {
    notes.push("orig-event="+Ember.guidFor(e.originalEvent));
    notes.push("orig-type="+e.originalEvent.type);
    notes.push("orig-when="+e.originalEvent.timeStamp);
    notes.push("orig-fastclick="+!!e.originalEvent.fastclick);
  }
  console.log(notes.join(", "));
}
