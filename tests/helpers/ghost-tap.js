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

function EventWithTouches(c) {

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

  this.touches = [{
    clientX : X,
    clientY : Y
  }];
  this.changedTouches = [{
    clientX : X,
    clientY : Y
  }];

}

export default function ghostTap(selector1, selector2) {

  return new Ember.RSVP.Promise(function(resolve, reject) {

    var $element = Ember.$(selector1);
    var coords = $element.offset();
    var TouchStart = Ember.$.Event('touchstart', new EventWithTouches(coords));
    var TouchEnd = Ember.$.Event('touchend', new EventWithTouches(coords));
    var Tap = Ember.$.Event('tap', new EventWithTouches(coords));
    var Click = Ember.$.Event('click', new EventWithCoords(coords));
    $element.trigger(TouchStart);
    $element.trigger(TouchEnd);
    $element.trigger(Tap);
    setTimeout((function () {
      var $new = Ember.$(selector2);
      $new.trigger(Click);
      setTimeout((function () {
        resolve();
      }), 50);
    }), 300);

  });


}
