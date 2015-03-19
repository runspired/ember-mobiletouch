import Ember from "ember";

function EventWithCoords(c) {

  var X = c.left + 1;
  var Y = c.top + 1;
  this.pageX = X;
  this.offsetX = X;
  this.clientX = X;
  this.screenX = X + 5;
  this.pageY = Y;
  this.offsetY = Y;
  this.clientY = Y;
  this.screenY = Y + 95;

}

export default function mobileTap(selector) {

  return new Ember.RSVP.Promise(function(resolve, reject) {

    var $element = Ember.$(selector);
    var coords = $element.offset();
    var Tap = Ember.$.Event('tap', new EventWithCoords(coords));
    var Click = Ember.$.Event('click', new EventWithCoords(coords));
    $element.trigger(Tap);
    setTimeout((function () {
      $element.trigger(Click);
      setTimeout((function () {
        resolve();
      }), 50);
    }), 300);

  });


}
