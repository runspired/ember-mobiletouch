import Ember from "ember";

//Ember.Component extends Ember.View so this reopen will affect both
export default Ember.View.reopen({

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

    var allowed = Ember.$(element),
      filter = this.get('gestureAllow'),
      exclude = this.get('gestureExclude'),
      viewEl = this.$()[0];

    if (element === viewEl) {
      return element;
    }
    if (filter) {
      allowed = allowed.filter(filter);
    }
    if (exclude) {
      allowed = allowed.not(exclude);
    }
    return allowed.length ? element : false;
  },


  /**!
   *
   */
  __setupGestures : function () {

    var EventManager = this.get('eventManager') || this;
    var events;
    var allow;
    var exclude;
    var gestures = this.get('gestures');

    //warn about gestures, remove in 2.0
    Ember.assert(
      'Using the Gestures hash has been deprecated. Set `ENV.mobileTouch.useGesturesHash` to `true` to' +
      ' temporarily allow.', !(!this.get('__useGesturesHash') && !!gestures));

    if (gestures) {
      Ember.Logger.warn('[DEPRECATED] Use of the Gestures hash on views and components will be removed in 2.0');
    }


    //warn about hammerOptions, remove in 2.0
    if (this.get('hammerOptions')) {
      Ember.Logger.warn('[DEAD CODE] Configuring hammerOptions directly on a view or component is no' +
      ' longer allowed.  Use ENV.mobileTouch.options in config/environment.js');
    }


    //warn if hammerAllow is present, remove in 2.0
    allow = this.get('hammerAllow');
    if (allow) {
      Ember.Logger.warn('[DEPRECATED] Use of hammerAllow on views and components will be removed in 2.0.  Use gestureAllow instead.');
      this.gestureAllow = allow;
    }


    //warn if hammerExclude is present, remove in 2.0
    exclude = this.get('hammerExclude');
    if (exclude) {
      Ember.Logger.warn('[DEPRECATED] Use of hammerExclude on views and components will be removed in 2.0.  Use gestureExclude instead.');
      this.gestureExclude = exclude;
    }


    //warn if click is present
    if (EventManager.get('click')) {
      Ember.Logger.warn(
        '[DEPRECATED] Use of click is deprecated in favor of `tap`, Only Tap will trigger and' +
        ' the click handler will overwrite `tap` and then be removed.');

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

  }.on('init')


});
