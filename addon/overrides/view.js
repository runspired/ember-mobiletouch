import Ember from "ember";

const {
  deprecate
} = Ember;

const clickDeprecationNotice = "Use of click in ember-mobileTouch is deprecated in favor of `ta" +
  "p`, Only Tap will trigger. If a `tap` handler is not present, the click handler will rewritt" +
  "en to `tap` and `preventDefault` will not work as expected.  If a `tap` handler is present, " +
  "the click handler will bre rewritten to `internalClick`.  If your app or addon depends on cl" +
  "ick, `tap` will work for most cases. `internalClick` is available for edge cases. Fine grain" +
  "ed control should use mouseDown and touchStart";

//Ember.Component extends Ember.View so this reopen will affect both
export default Ember.View.reopen({

  /**!
   *  Ensures valid `click` usage.
   *  Uses view.init and _super to avoid extra change events
   */
  init: function() {

    var EventManager = this.get('eventManager') || this;

    //warn if click is present
    if (EventManager.get('click')) {
      deprecate(clickDeprecationNotice, false);
      if (!EventManager.get('tap')) {
        EventManager.set('tap', EventManager.get('click'));
      } else if (!EventManager.get('internalClick')) {
        EventManager.set('internalClick', EventManager.get('click'));
      }
      delete EventManager['click'];
    }

    this._super.apply(this, arguments);
  }


});
