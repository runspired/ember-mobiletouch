import Ember from 'ember'; //event dispatcher
import config from '../config/environment'; //ENV.hammer
import GesturesMixin from 'ember-mobiletouch/mixins/gestures';
import LinkViewMods from 'ember-mobiletouch/mixins/link-view-mods';
import HammerEvents from 'ember-mobiletouch/mixins/hammer-events';

var USE_HTMLBARS = !!Ember.HTMLBars;

var overrides = function() {
    var oldActionHelper;
    var defaultTapOnPress = config.mobileTouch.defaultTapOnPress || true;
    var mobileTouchConfig = { _mobileTouchConfig : config.mobileTouch || {} };

    // modify the dispatcher
    Ember.EventDispatcher.reopen(mobileTouchConfig);
    Ember.EventDispatcher.reopen(HammerEvents);

    //components extend Ember.View, so this should be all that's needed
    Ember.View.reopen(GesturesMixin, {
      __useGesturesHash : config.mobileTouch ? config.mobileTouch.useGesturesHash : false
    });
    Ember.LinkView.reopen({ __defaultTapOnPress : defaultTapOnPress }, LinkViewMods);

    if (USE_HTMLBARS) {
      //cache the old handler
      oldActionHelper = Ember.Handlebars.helpers.action.helperFunction;

      Ember.Handlebars.helpers.action.helperFunction = function (params, hash, options, env) {
        hash.on = hash.on || 'tap';
        oldActionHelper.apply(this, arguments);
      };
    } else {
      oldActionHelper = Ember.Handlebars.helpers.action;
      Ember.Handlebars.helpers.action = function (/*actionName*/) {
        var options = arguments[arguments.length - 1];
        var hash = options.hash;
        hash.on = hash.on || 'tap';
        return oldActionHelper.apply(this, arguments);
      };
    }
};

// overrides will be applied immediately and only once when the module is imported
export default overrides();
