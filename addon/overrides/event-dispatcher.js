import Ember from "ember";
import preventGhostClicks from "../utils/prevent-ghost-clicks";
import capitalizeWord from "../utils/capitalize-word";
//import isCustomProtocol from "../utils/is-custom-protocol";
import isGesture from "../utils/is-gesture";
import defaultConfiguration from "../default-config";
import hammerEvents from "../utils/hammer-events";
import RecognizerInterface from "../recognizers";
import removeEventsPatch from "../utils/determine-remove-events-patch";
import mobileDetection from "../utils/is-mobile";
import { ActionHelper } from "../overrides/action-helper";

var jQuery = Ember.$;

const {
  View
} = Ember;

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


  _clickBuster : null,


  /**!
   *
   * Sets up the manager instance
   *
   * @private
   */
  _initializeHammer: function (rootElement) {

    var $root = jQuery(rootElement);
    var element = $root[0];
    var self = this;

    Ember.assert('Application has no rootElement', element);

    //setup the Manager instance
    var config = this.get('_mobileTouchConfig');
    this.set('_hammerInstance', new Hammer.Manager(element, config.options));

    //add recognizers
    this._initializeRecognizers();

    /*
     Mobile devices trigger a click after a delay

     Mobile Browsers try to pretend that they are normal browsers, so they fire a "click" event
     a short delay after a "touchEnd". This is great for sites that haven't optimized for mobile,
     but for sites that do use touchEnd to determine taps/clicks, the extra click event needs to
     be captured and discarded, otherwise both the touchEnd and the click event will trigger a tap.
     */
    var GhostClickBuster = preventGhostClicks();
    this.set('_clickBuster', GhostClickBuster);
    GhostClickBuster.add($root);

    /*
     recast the non-fastclick's as a "submit" action

     this allows mobile keyboard submit button and return key based submit to work
     */
    $root.on('click.ember-mobiletouch', 'input[type="submit"], button[type="submit"]', function (e) {
      var $target = jQuery(e.target);
      if (!e.fastclick) {
        $target.closest('form').trigger('submit');
      }
    });


    /*
     We have to click bust clicks that trigger undesirable behaviors,
     but still allow clicks that do.
     */

    $root.on('click.ember-mobiletouch', '[data-ember-action]', function (e) {

      var $currentTarget = jQuery(e.currentTarget);

      // cancel the click only if there is an ember action defined and
      // it does not have the allow-click or needsclick class
      var cancelIf =

        //allow overriding click busting by adding the `allow-click` class
        !$currentTarget.hasClass('allow-click') &&
        !$currentTarget.hasClass('needsclick');


      //bust the click
      if (cancelIf) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
      return true;

    });


    //delegate native click to internalClick
    $root.on('click.ember-mobiletouch', '.ember-view', function(evt, triggeringManager) {

      if (!evt.fastclick) {
        var view = Ember.View.views[this.id];
        var result = true;

        var manager = self.canDispatchToEventManager ?
          self._findNearestEventManager(view, 'internalClick') : null;

        if (manager && manager !== triggeringManager) {
          result = self._dispatchEvent(manager, evt, 'internalClick', view);
        } else if (view) {
          result = self._bubbleEvent(view, evt, 'internalClick');
        }

        return result;
      }
    });



    $root.on('tap.ember-mobiletouch press.ember-mobiletouch', function (e) {
      /*
          Implements fastclick and fastfocus mechanisms on mobile web/Cordova
       */
      if (mobileDetection.is()) {
        var $element = jQuery(e.currentTarget);
        var $target = jQuery(e.target);

        /*
         If the click was on an input element that needs to be able to focus, recast
         the click as a "focus" event.

         This fixes tap events on mobile where keyboardShrinksView or similar is true.
         Such devices depend on the ghost click to trigger focus, but the ghost click
         will never reach the element.
         */
        var notFocusableTypes = ['submit', 'button', 'hidden', 'reset', 'range', 'radio', 'image', 'checkbox'];

        //fastfocus
        if ($element.is('input') && notFocusableTypes.indexOf($element.attr('type')) === -1) {
          $element.focus();

        } else if ($target.is('input') && notFocusableTypes.indexOf($target.attr('type')) === -1) {
          $target.focus();

        //fastclick
        } else {

          var click = jQuery.Event('click');

          //set the fastclick flag so that we can filter this from
          // Ember's eventing later
          click.fastclick = true;
          $target.trigger(click);
        }

      }

    });

  },

  _customRecognizers : null,

  /**!
   * Initializes any custom recognizers added in app/recognizers.js
   */
  _initializeRecognizers : function () {

    var config = this.get('_mobileTouchConfig');
    var EventManager = this;
    var Interface = new RecognizerInterface(this, this.get('_hammerInstance'));

    //add initial recognizers (recognizers defined in app/recognizers.js are added later)
    config.use.forEach(function (name) {
      if (name !== 'rotate' && name !== 'pinch') {
        Interface.Recognizers[capitalizeWord(name)] = EventManager._addRecognizer(name, config.tune[name]);
      }
    });

    //if swipe and pan are present, recognize together
    if (Interface.Recognizers.Swipe && Interface.Recognizers.Pan) {
      Interface.Recognizers.Swipe.recognizeWith(Interface.Recognizers.Pan);
    }

    //add custom recognizers
    var CustomRecognizers = this.get('_customRecognizers');
    if (CustomRecognizers) { CustomRecognizers.call(Interface); }

  },

  /**!
   * Adds a recognizer to the Hammer instance
   */
  _addRecognizer: function(type, options) {
    var Manager = this.get('_hammerInstance');
    var recognizer = new Hammer[capitalizeWord(type)](options);
    Manager.add(recognizer);
    return recognizer;
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
    var customConfig = this.get('_mobileTouchCustomizations');
    var config = Ember.merge(Ember.copy(defaultConfiguration, true), customConfig);

    //assert necessary configurations
    Ember.assert('ENV.mobileTouch.options.domEvents MUST be true!', config.options.domEvents);
    Ember.assert('ENV.mobileTouch.use MUST contain a minimum of `tap`!', (config.use.indexOf('tap') !== -1));

    //save configuration
    this.set('_mobileTouchConfig', config);


    //remove undesirable events from Ember's Eventing
    var events = this.get('events');
    var eventsToRemove = removeEventsPatch(config.events, events);
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


    //probably unnecessary? events should be a reference already
    this.set('events', events);

    //setup hammer
    this._initializeHammer(rootElement);

    //setup rootElement and  event listeners
    this._super(addedEvents, rootElement);

  },


  /**
   Registers an event listener on the rootElement. If the given event is
   triggered, the provided event handler will be triggered on the target view.
   If the target view does not implement the event handler, or if the handler
   returns `false`, the parent view will be called. The event will continue to
   bubble to each successive parent view until it reaches the top.
   @private
   @method setupHandler
   @param {Element} rootElement
   @param {String} event the browser-originated event to listen to
   @param {String} eventName the name of the method to call on the view
   */
  setupHandler: function(rootElement, event, eventName) {
    var self = this;

    rootElement.on(event + '.ember', '.ember-view', function(evt, triggeringManager) {
      var view = View.views[this.id];
      var result = true;

      var manager = self.canDispatchToEventManager ? self._findNearestEventManager(view, eventName) : null;

      if (manager && manager !== triggeringManager) {
        result = self._dispatchEvent(manager, evt, eventName, view);
      } else if (view) {
        result = self._bubbleEvent(view, evt, eventName);
      }

      return result;
    });

    rootElement.on(event + '.ember', '[data-ember-action]', function(evt) {
      var actionId = jQuery(evt.currentTarget).attr('data-ember-action');
      var action   = ActionHelper.registeredActions[actionId];

      // We have to check for action here since in some cases, jQuery will trigger
      // an event on `removeChild` (i.e. focusout) after we've already torn down the
      // action handlers for the view.
      if (action && action.events.indexOf(eventName) !== -1) {
        return action.handler(evt);
      }
    });
  },




  /**
   *
   * extends the default _dispatchEvent
   * to handle internalClick and fastclick
   *
   * @private
   */
  _dispatchEvent: function (object, event, eventName /*, view */) {
    if (event && eventName === 'internalClick' && event.fastclick) {
      event.stopPropagation();
    }
    return this._super.apply(this, arguments);
  },



  /**!
   * Extend the normal destroy method to teardown the hammer manager
   * instance and remove the click buster.
   */
  destroy: function () {

    var hammer = this.get('_hammerInstance');
    var $element = jQuery(this.get('rootElement'));

    // Clean up edge case handlers
    $element.off('tap press click');

    //teardown Hammer
    if (hammer) { hammer.destroy(); }
    this.set('_hammerInstance', null);

    //teardown clickbuster
    this.get('_clickBuster').remove($element);

    //run normal destroy
    this._super();
  }

});
