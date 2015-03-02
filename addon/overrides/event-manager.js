import Ember from "ember";
import PreventGhostClicks from "../utils/prevent-ghost-clicks";
import capitalizeWord from "../utils/capitalize-word";
import isCustomProtocol from "../utils/is-custom-protocol";
import isGesture from "../utils/is-gesture";
import defaultConfiguration from "../default-config";
import hammerEvents from "../utils/hammer-events";

var IS_MOBILE = !!("ontouchstart" in window);

export default Ember.EventDispatcher.reopen({

  /**!
   * Used to store the Hammer.js Manager instance
   */
  _hammerInstance: null,

  /**!
   * Gets set during initialization with the user's
   * custom configuration
   */
  _mobileTouchCustomizations : null,

  /**!
   * Stores the result of merging the user's customizations
   * with the default configuration.
   */
  _mobileTouchConfig : null,


  /**!
   *
   * Sets up the manager instance
   *
   * @private
   */
  _initializeHammer: function () {

    var element = Ember.$(this.get('rootElement'))[0];
    Ember.assert('Application has no rootElement', element);

    //setup the Manager instance
    var config = this.get('_mobileTouchConfig');
    this.set('_hammerInstance', new Hammer.Manager(element, config.options));


    //add initial recognizers (recognizers defined in app/recognizers.js are added later)
    var EventManager = this;
    config.use.forEach(function (name) {
      EventManager._addRecognizer(name, config.tune[name]);
    });


    /*
      We have to click bust clicks that trigger undesirable behaviors,
      but still allow clicks that do.
     */
    document.body.addEventListener('click', function (e) {

      e = e || window.event;
      var $element = Ember.$(e.target);

      // cancel the click only if there is an ember action defined on the input or button of type submit
      var cancelIf =

        //allow overriding click busting by adding the `allow-click` class
        !$element.hasClass('allow-click') &&
        (
          //bust clicks on links that don't have a custom protocol such as `mailto:` or `tel:`
          ($element.is('a[href]') && !isCustomProtocol($element.attr('href'))) ||

          //bust clicks on buttons and input buttons that aren't 'submit' buttons
          $element.is('button[type!="submit"], input[type="button"]') ||

          //bust clicks on inputs/buttons of type submit when they have a defined action handler
          ($element.is('input[type="submit"], button[type="submit"]') && $element.attr('data-ember-action'))
        );

      /*
        recast the click as a "submit" action if we're on mobile
        this allows mobile keyboard submit button to work
       */
      if (IS_MOBILE && $element.is('input[type="submit"], button[type="submit"]')) {
        $element.trigger('submit');
      }

      //bust the click
      if (cancelIf) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

    });


    /*
      Mobile devices trigger a click after a delay

      Mobile Browsers try to pretend that they are normal browsers, so they fire a "click" event
      a short delay after a "touchEnd". This is great for sites that haven't optimized for mobile,
      but for sites that do use touchEnd to determine taps/clicks, the extra click event needs to
      be captured and discarded, otherwise both the touchEnd and the click event will trigger a tap.
     */
    PreventGhostClicks.add(element);

  },


  /**!
   * Adds a recognizer to the Hammer instance
   */
  _addRecognizer: function(type, options) {
    var Manager = this.get('_hammerInstance');
    Manager.add(new Hammer[capitalizeWord(type)](options));
  },





  /**!
   *
   * Setup the mobileTouch configuration
   *
   * @param addedEvents
   * @param rootElement
   */
  setup: function (addedEvents, rootElement) {

    //merge the default configuration with the user's alterations
    var config = Ember.merge({}, defaultConfiguration, this.get('_mobileTouchCustomizations'));

    //assert necessary configurations
    Ember.assert('ENV.mobileTouch.options.domEvents MUST be true!', config.options.domEvents);
    Ember.assert('ENV.mobileTouch.use MUST contain a minimum of `tap`!', (config.use.indexOf('tap') !== -1));


    //save configuration
    this.set('_mobileTouchConfig', config);


    //remove undesirable events from Ember's Eventing
    var eventsToRemove = config.events;
    var events = this.get('events');
    eventsToRemove.forEach(function (name) {
      delete events[name];
    });


    //add gesture events
    config.use.forEach(function (category) {
      Ember.merge(events, hammerEvents[category]);
    });


    //allow `alwaysTapOnPress` configuration
    if (config.use.indexOf('press') !== -1 && config.alwaysTapOnPress) {
      events.press = 'tap';
      delete events.pressUp;
    }

    //on mobile browsers, we don't want to prevent form submissions via the keyboard
    // mobile browser trigger the form submission by sending 'click' to the very first
    // input button in the form.  Hammer uses mouse events, not click, for tap detection.
    if (IS_MOBILE) {
      events.click = 'submit';
    }


    //probably unnecessary? events should be a reference already
    this.set('events', events);


    //setup rootElement and initial events
    this._super(addedEvents, rootElement);


    //setup hammer
    this._initializeHammer();

  },




  /**!
   *
   * If a view or component had defined gestureAllow or gestureExclude,
   * filter gesture events.
   *
   * @param eventName
   * @param event
   * @param view
   * @param context
   * @returns {*}
   * @private
   */
  __executeGestureWithFilters: function (eventName, event, view, context) {

    var shouldFilter = isGesture(eventName) ? (view.get('gestureAllow') || view.get('gestureExclude')) : false,
      element, result;

    if (context) {

      element = shouldFilter ? view._filterTouchableElements.call(view, event.target) : false;
      result = (shouldFilter && !element) ? false : Ember.run(context, context[eventName], event, view);

    } else {

      element = shouldFilter ? view._filterTouchableElements.call(view, event.target) : false;
      result = (shouldFilter && !element) ? false : Ember.run.join(view, view.handleEvent, eventName, event);

    }

    //only stop propagation if result is explicitly false, not null or undefined
    if (result === false) {
      //hammer events have different semantics than normal events, so we must check before invoking
      if (event.stopPropagation) { event.stopPropagation(); }
      if (event.preventDefault) { event.preventDefault(); }
      if (event.preventDefaults) { event.preventDefaults(); }
    }

    return result;

  },




  /**
   *
   * Alters the normal _dispatchEvent to allow gesture filtering
   *
   * @param object
   * @param event
   * @param eventName
   * @param view
   * @returns {boolean}
   * @private
   */
  _dispatchEvent: function (object, event, eventName, view) {
    var result = true;

    var handler = object[eventName];
    if (Ember.typeOf(handler) === 'function') {
      result = this.__executeGestureWithFilters(eventName, event, view, object);
      // Do not preventDefault in eventManagers.
      event.stopPropagation();
    }
    else if (view) {
      result = this._bubbleEvent(view, event, eventName);
    }

    return result;
  },




  /**
   *
   * Alters the normal _bubbleEvent to allow gesture filtering
   *
   * @param view
   * @param event
   * @param eventName
   * @returns {*}
   * @private
   */
  _bubbleEvent: function (view, event, eventName) {
    return this.__executeGestureWithFilters(eventName, event, view);
  },




  /**!
   * Extend the normal destroy method to teardown the hammer manager
   * instance and remove the click buster.
   */
  destroy: function () {

    var hammer = this.get('_hammerInstance'),
      element = Ember.$(this.get('rootElement'))[0];

    //teardown Hammer
    if (hammer) { hammer.destroy(); }
    this.set('_hammerInstance', null);

    //teardown clickbuster
    PreventGhostClicks.remove(element);

    //run normal destroy
    this._super();
  }

});
