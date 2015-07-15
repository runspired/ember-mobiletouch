import Ember from "ember"; // Ember.run.bind
import mobileDetection from "./is-mobile";

/**
 * Prevent click events after a touchend.
 *
 * Inspired/copy-paste from this article of Google by Ryan Fioravanti
 * https://developers.google.com/mobile/articles/fast_buttons#ghost
 *
 * USAGE:
 * Prevent the click event for an certain element
 * ````
 *  PreventGhostClick($element);
 * ````
 *
 */
function makeGhostBuster() {
  var coordinates = [];
  var threshold = 25;
  var timeout = 2500;

  // no touch support
  if(!mobileDetection.is()) {
    return { add : function(){}, remove : function(){} };
  }

  /**
   * prevent clicks if they're in a registered XY region
   * @param {MouseEvent} event
   */
  function preventGhostClick(event) {

    // console.log('prevent ghost click');

    var ev = event.originalEvent || event;
    //don't prevent fastclicks
    if (ev.fastclick) { return true; }

    // console.log('preventing');

    for (var i = 0; i < coordinates.length; i++) {
      var x = coordinates[i][0];
      var y = coordinates[i][1];

      // within the range, so prevent the click
      if (Math.abs(ev.clientX - x) < threshold && Math.abs(ev.clientY - y) < threshold) {

        // console.log('prevented');
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
      }
    }

  }

  /**
   * reset the coordinates array
   */
  function resetCoordinates() {
    coordinates = [];
  }

  /**
   * remove the first coordinates set from the array
   */
  function popCoordinates() {
    coordinates.splice(0, 1);
  }

  /**
   * if it is an final touchend, we want to register it's place
   * @param {TouchEvent} event
   */
  function registerCoordinates(event) {
    var ev = event.originalEvent || event;

    // It seems that touchend is the cause for derived events like 'change' for
    // checkboxes. Since we're creating fastclicks, which will also cause 'change'
    // events to fire, we need to prevent default on touchend events, which has
    // the effect of not causing these derived events to be created. I am not
    // sure if this has any other negative consequences.
    ev.preventDefault();

    // touchend is triggered on every releasing finger
    // changed touches always contain the removed touches on a touchend
    // the touches object might contain these also at some browsers (firefox os)
    // so touches - changedTouches will be 0 or lower, like -1, on the final touchend
    if(ev.touches.length - ev.changedTouches.length <= 0) {
      var touch = ev.changedTouches[0];
      coordinates.push([touch.clientX, touch.clientY]);
      setTimeout(popCoordinates, timeout);
    }
  }


  /**
   * prevent click events for the given element
   * @param {EventTarget} $element jQuery object
   */
  return {
    add : Ember.run.bind(this, function ($element) {
      $element.on("touchstart.ghost-click-buster", resetCoordinates);
      $element.on("touchend.ghost-click-buster", registerCoordinates);

      // register the click buster on with the selector, '*', which will
      // cause it to fire on the first element that gets clicked on so that
      // if this is a ghost click it will get killed immediately.
      $element.on("click.ghost-click-buster", '*', preventGhostClick);
      //$element.on("click.ghost-click-buster", preventGhostClick);
      //$element.on("click.ghost-click-buster", '.ember-view', preventGhostClick);
    }),
    remove : Ember.run.bind(this, function ($element) {
      $element.off('.ghost-click-buster');
    })
  };

}

var preventGhostClicks = makeGhostBuster;

export default preventGhostClicks;
