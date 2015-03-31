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

export default function desktopTap(selector) {

  return new Ember.RSVP.Promise(function(resolve, reject) {

    var $element = Ember.$(selector);
    var coords = $element.offset();
    var MouseDown = Ember.$.Event('mousedown', new EventWithCoords(coords));
    var MouseUp = Ember.$.Event('mouseup', new EventWithCoords(coords));
    var Tap = Ember.$.Event('tap', new EventWithCoords(coords));
    var Click = Ember.$.Event('click', new EventWithCoords(coords));
    Click.isDesktop = true;
    $element.trigger(MouseDown);
    $element.trigger(MouseUp);
    $element.trigger(Tap);
    $element.trigger(Click);
    setTimeout((function () {
      resolve();
    }), 100);

  });

}
