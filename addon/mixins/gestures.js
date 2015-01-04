import Ember from "ember";
import PreventGhostClicks from '../utils/prevent-ghost-clicks';

var DEBUG = true;

//only works with views / components
export default Ember.Mixin.create({

  gestures : null,
  hammerAllow : null,
  hammerExclude : null,


  _filterTouchableElements : function (element) {

    Ember.Logger.debug('Filtering Touchable Elements');

    var allowed = Ember.$(element),
      filter = this.get('hammerAllow'),
      exclude = this.get('hammerExclude'),
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


  __useGesturesHash : true,


  __setupGestures : function () {

    var self = this,
      eventManager = self.get('eventManager') || self,
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
    if (eventManager.get('click')) {
      Ember.Logger.warn(
        '[DEPRECATED] Use of click is deprecated in favor of `tap`, Only Tap will trigger and' +
        ' the click handler will overwrite `tap` and then be removed.');

      eventManager.set('tap', eventManager.get('click'));
      delete eventManager['click'];
    }

    if (gestures) {

      events = Object.keys(gestures);

      //add gesture support for supplied gestures
      events.forEach(function(gesture) {
        eventManager.set(gesture, gestures[gesture]);
        delete gestures[gesture];
      });

    }

  }.on('init')


});
