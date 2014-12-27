import Ember from "ember";
import PreventGhostClicks from '../utils/prevent-ghost-clicks';

var DEBUG = true;

//only works with views / components
export default Ember.Mixin.create({

  gestures : null,
  hammerAllow : null,
  hammerExclude : null,

  _filterTouchableElements : function (element) {
    var allowed = Ember.$(element),
      filter = this.get('hammerAllow'),
      exclude = this.get('hammerExclude');

    if (filter) {
      allowed = allowed.filter(filter);
    }
    if (exclude) {
      allowed = allowed.not(exclude);
    }
    return allowed;
  },

  __useGesturesHash : true,

  __setupGestures : function () {

    var self = this,
      gestures = this.get('gestures'),
      events;

    //warn about gestures
    Ember.assert(
      'Using the Gestures hash has been deprecated. Set `ENV.mobileTouch.useGesturesHash` to `true` to' +
      ' temporarily allow.', !(!this.get('_useGesturesHash') && !!gestures));

    if (gestures) {
      Ember.Logger.warn('[DEPRECATED] Use of the Gestures hash on views and components will be removed in 2.0');
    }

    //warn about hammerOptions
    if (this.get('hammerOptions')) {
      Ember.Logger.warn('[DEAD CODE] Configuring hammerOptions directly on a view or component is no' +
        ' longer allowed.  Use ENV.mobileTouch.options in config/environment.js');
    }

    //warn if click is present
    if (this.get('click')) {
      if (['a', 'input', 'button'].indexOf(this.get('tagName')) === -1) {
        Ember.Logger.warn(
          '[DEPRECATED] Use of click is deprecated in favor of `tap`. Mobile will only trigger Tap.' +
          ' Desktop browsers will trigger both. Use click only to preventDefault() on HTML Elements' +
          ' that have an undesired default behavior.  If tagName for this view is not `a` `button` ' +
          'or `input` the click handler will overwrite `tap` and be removed.');

        this.set('tap', this.get('click'));
        delete this['click'];

      } else {
        Ember.Logger.warn('[DEPRECATED] Use of click is deprecated in favor of `tap`. Make sure the click handler' +
        ' on your `a` `button` or `input` is used for preventDefault() only.');
      }
    }

    if (gestures) {

      events = Object.keys(gestures);

      //wrap gestures functions in the appropriate filter
      if (this.get('hammerAllow') || this.get('hammerExclude')) {
        events.forEach(function(gesture) {
          var _func = gestures[gesture];
          gestures[gesture] = function (event) {
            var element = self._filterTouchableElements(event.target);
            if (element) {
              return _func(event);
            }
            return false;
          };
        });
      }

      //add gesture support for supplied gestures
      events.forEach(function(gesture) {
        self.set(gesture, gestures[gesture]);
        delete gestures[gesture];
      });

    }

  }.on('init')

});
