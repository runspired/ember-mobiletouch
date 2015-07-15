import Ember from 'ember';
import jQuery from 'jquery';

const {
  deprecate,
  assert,
  Mixin
  } = Ember;

const clickDeprecationNotice = "Use of click in ember-mobileTouch is currently discouraged in favor of `tap`" +
  ", Only Tap will trigger. If a `tap` handler is not present, the click handler will rewritten" +
  "to `tap` and `preventDefault` will not work as expected.  If your app or addon depends on click," +
  "`tap` will work for most cases. `internalClick` is available for edge cases. Fine grained control" +
  "should use mouseDown and touchStart";

const filterDeprecationNotice = "filtering of elements via gestureAllow and gestureExclude has been " +
  "deprecated and will be removed in ember-mobiletouch 2.0, this behavior is easily duplicated within " +
  "your own event handlers. See docs for details.";

//Ember.Component extends Ember.View so this reopen will affect both
export default Mixin.create({

  /**!
   * Set gestureAllow to a jQuery selector string to optionally specify
   * which child elements should be allowed to trigger a gesture.
   *
   * Can be used in tandem with gestureExclude.
   */
  gestureAllow : null,


  /**!
   * Set gestureExclude to a jQuery selector string to optionally specify
   * which child elements should not be allowed to trigger a gesture.
   *
   * Can be used in tandem with gestureAllow.
   */
  gestureExclude : null,


  /**!
   * @deprecated
   *
   * Maps to ENV.mobileTouch.useGestures; Default is `false`. Keep false
   * to improve performance if your app does not utilize the gestures hash.
   */
  __useGesturesHash : false,


  /**!
   *
   * Called when an event is bubbling to determine whether to discard
   * a gesture from firing.
   *
   * @param element
   * @returns {*}
   * @private
   */
  _filterTouchableElements : function (element) {

    var allowed = jQuery(element);
    var filter = this.get('gestureAllow');
    var exclude = this.get('gestureExclude');
    var viewEl = this.$()[0];

    if (element === viewEl) {
      return element;
    }

    deprecate(filterDeprecationNotice, !filter || !exclude);

    if (filter) {
      allowed = allowed.filter(filter);
    }
    if (exclude) {
      allowed = allowed.not(exclude);
    }
    return allowed.length ? element : false;
  },


  /**!
   *  Set's up gestures.
   *  Uses view.init and _super to avoid extra change events
   */
  init: function() {

    var EventManager = this.get('eventManager') || this;
    var events;
    var allow;
    var exclude;
    var gestures = this.get('gestures');

    //warn about gestures, remove in 2.0
    assert(
      'Using the Gestures hash has been deprecated. Set `ENV.mobileTouch.useGesturesHash` to `true` to' +
      ' temporarily allow.', !(!this.get('__useGesturesHash') && !!gestures));

    if (gestures) {
      Ember.Logger.warn('[DEPRECATED] Use of the Gestures hash on views and components will be removed in 2.0');
    }


    //assert about hammerOptions, remove in 2.0
    assert('[DEAD CODE] Configuring hammerOptions directly on a view or component is no' +
    ' longer allowed.  Use ENV.mobileTouch.options in config/environment.js', !this.get('hammerOptions'));


    //warn if hammerAllow is present, remove in 2.0
    allow = this.get('hammerAllow');
    if (allow) {
      deprecate('Use of hammerAllow on views and components will be removed in ember-mobiletouch 2.0.  Use gestureAllow instead.', false);
      this.gestureAllow = allow;
    }


    //warn if hammerExclude is present, remove in 2.0
    exclude = this.get('hammerExclude');
    if (exclude) {
      deprecate("Use of hammerExclude on views and components will be removed in ember-mobiletouch 2.0.  Use gestureExclude instead.", false);
      this.gestureExclude = exclude;
    }


    if (EventManager.get('click')) {
      EventManager.set('tap', EventManager.get('click'));
      delete EventManager['click'];
    }

    if (gestures) {

      events = Ember.keys(gestures);

      //add gesture support for supplied gestures
      events.forEach(function(gesture) {
        EventManager.set(gesture, gestures[gesture]);
        delete gestures[gesture];
      });

    }

    this._super();
  }

});
