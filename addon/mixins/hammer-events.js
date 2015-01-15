import Ember from "ember";
import PreventGhostClicks from "ember-mobiletouch/utils/prevent-ghost-clicks";

//These settings can be overwritten by adding ENV.hammer in environment.js
var hammerEvents = {
  fastclick : {fastclick : 'fastClick' },
  pan : { pan : 'pan', panstart : 'panStart', panmove : 'panMove', panend : 'panEnd', pancancel : 'panCancel', panleft : 'panLeft', panright : 'panRight', panup : 'panUp', pandown : 'panDown' },
  pinch : { pinch : 'pinch', pinchstart : 'pinchStart', pinchmove : 'pinchMove', pinchend : 'pinchEnd', pinchcancel : 'pinchCancel', pinchin : 'pinchIn', pinchout : 'pinchOut' },
  press : { press : 'press', pressup : 'pressUp' },
  rotate : { rotate : 'rotate', rotatestart : 'rotateStart', rotatemove : 'rotateMove', rotateend : 'rotateEnd', rotatecancel : 'rotateCancel' },
  swipe : { swipe : 'swipe', swipeleft : 'swipeLeft', swiperight : 'swipeRight', swipeup : 'swipeUp', swipedown : 'swipeDown' },
  tap : { tap : 'tap' }
  },

  defaultConfig = {
    use : ['fastclick', 'pan', 'pinch', 'press', 'rotate', 'swipe', 'tap'],
    fastclick : false,
    options : {
      domEvents : true,
      swipeVelocity : 0.3,
      swipeThreshold : 25
    },
    events: {
      keydown     : 'keyDown',
      keyup       : 'keyUp',
      keypress    : 'keyPress',
      contextmenu : 'contextMenu',
      mousemove   : 'mouseMove',
      focusin     : 'focusIn',
      focusout    : 'focusOut',
      mouseenter  : 'mouseEnter',
      mouseleave  : 'mouseLeave',
      submit      : 'submit',
      input       : 'input',
      change      : 'change',
      dragstart   : 'dragStart',
      drag        : 'drag',
      dragenter   : 'dragEnter',
      dragleave   : 'dragLeave',
      dragover    : 'dragOver',
      drop        : 'drop',
      dragend     : 'dragEnd'
    }
  };

function isGesture(name) {
  return !defaultConfig.events.hasOwnProperty(name.toLowerCase());
}

function isInputEvent(name) {
  var isKey = name.toLowerCase().indexOf('key') !== -1,
    isInput = name.toLowerCase() === 'input';
  return isKey || isInput;
}

export default Ember.Mixin.create({

  /**
   *
   *
   */
  _hammerInstance : null,
  _hammerOptions : null,

  _initializeHammer : function () {
    var element = Ember.$(this.get('rootElement'))[0],
      options = this.get('_hammerOptions');

    Ember.assert('Application has no rootElement', element);
    Ember.assert('hammer.options.domEvents MUST be true!', options.domEvents);
    Ember.assert('hammer.options.tap MUST be true!', options.tap);

    this.set('_hammerInstance', new Hammer(element, options));

    //prevent default behavior on links and buttons
    document.body.addEventListener('click', function (e) {
      e = e || window.event;
      var cancelOn = Ember.$(e.target).filter('a[href], button, input[type="submit"], input[type="button"]');
      if (cancelOn.length) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });

    PreventGhostClicks.add(element);

  },

  destroy : function () {
    var hammer = this.get('_hammerInstance'),
        element = Ember.$(this.get('rootElement'))[0];

    if (hammer) {
      hammer.destroy();
    }
    this.set('_hammerInstance', null);
    PreventGhostClicks.remove(element);

    this._super();
  },

  /**
   * placeholder, will be in before 2.0
   */
  useMultiTouch : true,

  /**
   * placeholder, will be in before 2.0
   */
  multiSwipeWithAlt : true,

  setup : function (addedEvents, rootElement) {

    //set up events hash
    var mobileSettings = this.get('_mobileTouchConfig') || {},
      events = Ember.merge({}, mobileSettings.events || defaultConfig.events),
      gestures = mobileSettings.use || defaultConfig.use,
      alwaysTapOnPress = mobileSettings.alwaysTapOnPress || false;

    gestures.forEach(function (category) {
      Ember.merge(events, hammerEvents[category] || {});
      defaultConfig.options[category] = true;
    });
    this.set('events', events);

    //setup rootElement and initial events
    this._super(addedEvents, rootElement);

    //setup hammer
    this.set('_hammerOptions', Ember.$.extend({}, defaultConfig.options, mobileSettings.options || {}));
    this._initializeHammer();
  },


  __executeGestureWithFilters : function (eventName, event, view, context) {

    var shouldFilter = isGesture(eventName) ? (view.get('gestureAllow') || view.get('gestureExclude')) : false,
      element, result;

    if (context) {

      element = shouldFilter ? view._filterTouchableElements.call(view, event.target) : false;

      if (shouldFilter && !element) {
        result = false;
      } else {
        result = Ember.run(context, context[eventName], event, view);
      }

    } else {

      element = shouldFilter ? view._filterTouchableElements.call(view, event.target) : false;

      if (shouldFilter && !element) {
        result = false;
      } else {
        result = Ember.run.join(view, view.handleEvent, eventName, event);
      }

    }

    if (result === false) {
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (event.preventDefaults) {
        event.preventDefaults();
      }
    }
    return result;

  },


  _dispatchEvent: function(object, event, eventName, view) {
    var result = true;

    var handler = object[eventName];
    if (Ember.typeOf(handler) === 'function') {
      result = this.__executeGestureWithFilters(eventName, event, view, object);
      // Do not preventDefault in eventManagers.
      event.stopPropagation();
    } else if (view) {
      result = this._bubbleEvent(view, event, eventName);
    }

    return result;
  },

  _bubbleEvent: function(view, event, eventName) {
    return this.__executeGestureWithFilters(eventName, event, view);
  }

});
