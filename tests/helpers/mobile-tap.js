import Ember from "ember";

function EventWithCoords(c) {
  var e = {};
  var X = c.left + 1;
  var Y = c.top + 1;
  e.pageX = X;
  e.offsetX = X;
  e.clientX = X;
  e.screenX = X + 5;
  e.pageY = Y;
  e.offsetY = Y;
  e.clientY = Y;
  e.screenY = Y + 95;
  return e;
}

export default function mobileTap(selector) {

  return new Ember.RSVP.Promise(function(resolve, reject) {

    var $element = Ember.$(selector);
    var coords = $element.offset();
    var Tap = Ember.$.Event('tap', EventWithCoords(coords));
    var Click = Ember.$.Event('click', EventWithCoords(coords));
    $element.trigger(Tap);
    setTimeout((function () {
      $element.trigger(Click);
      setTimeout((function () {
        resolve();
      }), 5);
    }), 300);

  });


};
