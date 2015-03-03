export default {

  /**!
   *  Which gesture "families" to utilize.
   *
   *  Hammer's 'pinch' and 'rotate' are known to cause issues, read about those
   *  before allowing them on a global scale.
   *
   *  The EventDispatcher will only add event listeners for the events in the families
   *  defined here or by custom recognizers added in `app/recognizers.js`
   */
  use: [
    'tap',
    'press',
    'pan',
    'swipe'
    //'pinch',
    //'rotate'
  ],


  /**!
   * @planned
   * (not implemented)
   *
   * Whether to use fastClick.  This is NOT fastClick.js, but a custom
   * implementation.  `tap` is actually extremely close to `fastClick` for
   * speed and desired behavior.  This `fastClick` will be a `touchstart` based
   * implementation.
   */
  useFastClick: false,


  /**!
   * Whether to always trigger a 'tap' when the user presses.
   * If your app doesn't need to differentiate between the two behaviors,
   * this is a quick and dirty way to make sure not tap events are lost.
   *
   * Alternatively, remove 'press' from `ENV.mobileTouch.use` and tune
   * `ENV.mobileTouch.tap` to wait longer before it's recognizer fails.
   */
  alwaysTapOnPress: false,


  /**!
   * Whether to always trigger a link-to helper on both tap and press
   * when `eventName` is not explicitly defined.
   *
   * Only works with the link-to helper.  It may never be possible
   * to get this to work with the action helper.  If you want some actions
   * to trigger on both tap or press by default but can't use `alwaysTapOnPress`
   * create a custom tappable-element that triggers on either.
   *
   * e.g.
   *
   * components/tappable-element.js
   *
   * ```
   * import Ember from "ember";
   *
   * export default Ember.Component.extend({
   *
   *  action : null,
   *
   *  params : null,
   *
   *  _invoke : function () {
   *    var params = this.get('params');
   *    this.sendAction('action', params);
   *  },
   *
   *  tap : function () { this._invoke(); },
   *
   *  press : function () { this._invoke(); }
   *
   * });
   *
   * ```
   *
   * foo-template.hbs
   * ```
   * {{#tappable-element action="myAction" tagName='li' }}
   *   You can trigger me via tap or press!
   * {{/tappable-element}}
   * ```
   */
  defaultTapOnPress: true,


  /**!
   *
   * The default options passed to the Hammer.Manager instance.
   * `domEvents` MUST be true.  Use `ENV.mobileTouch.tune` to
   * adjust individual recognizers for Hammer's main gesture families.
   *
   * You can define custom recognizers in `app/recognizers.js`
   *
   */
  options:   {
    domEvents: true
  },


  /**!
   * Configurations passed to the instance of Hammer.Manager
   * e.g. Manager.add(new Hammer.Pan(ENV.mobileTouch.pan));
   *
   * This particular tuning has been created to avoid there
   * being a potential gap between tap and press wherein no
   * gesture is triggered, as well as to disable vertical pan/swipe
   * which breaks the ability to scroll on mobile.
   *
   * If you need vertical panning/swiping AND scroll, see the available
   * mixins you can use to allow it on a component/view specific basis.
   *
   * You can examine how this particular tuning works here:
   */
  tune: {
    tap: { time : 250, threshold : 9 }, //Hammer default is 250 / 2
    press: { time : 251, threshold : 9 }, //Hammer default is 500 / 5
    swipe: { direction : 6, velocity : .3, threshold : 25 },
    pan: { direction: 6 },
    pinch: {}, //pinch is disabled by default
    rotate: {} //rotate is disabled by default
  },


  /**!
   * This is the list of event's that Ember typically includes but
   * but which are removed from it's eventing by ember-mobileTouch.
   *
   * See the originals here: https://github.com/emberjs/ember.js/blob/v1.10.0/packages/ember-views/lib/system/event_dispatcher.js#L46-L74
   *
   * The following are removed for performance reasons.
   * - mousemove
   * - mouseenter
   * - mouseleave
   *
   * The following are removed else they create potential code conflicts.
   * - touchstart
   * - touchmove
   * - touchend
   * - touchcancel
   * - mousedown
   * - mouseup
   * - click
   * - dblclick
   *
   */
  events: [
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'mousedown',
    'mouseup',
    'click',
    'dblclick',
    'mousemove',
    'mouseenter',
    'mouseleave'
  ]

}
