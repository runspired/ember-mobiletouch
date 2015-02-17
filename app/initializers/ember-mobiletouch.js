import Ember from 'ember'; //event dispatcher
import config from '../config/environment'; //ENV.hammer
import HammerEvents from 'ember-mobiletouch/mixins/hammer-events';
import GesturesMixin from 'ember-mobiletouch/mixins/gestures';
import LinkViewMods from 'ember-mobiletouch/mixins/link-view-mods';

var USE_HTMLBARS = !!Ember.HTMLBars;

export default {

  name: 'mobiletouch',

  initialize: function(container) {

    var dispatcher = Ember.EventDispatcher.extend({ _mobileTouchConfig : config.mobileTouch || {} }, HammerEvents),
      oldActionHelper;

    //components extend Ember.View, so this should be all that's needed
    Ember.View.reopen(GesturesMixin, {
      __useGesturesHash : config.mobileTouch ? config.mobileTouch.useGesturesHash : false
    });

    Ember.LinkView.reopen({ __defaultTapOnPress : config.mobileTouch.defaultTapOnPress || false }, LinkViewMods);

    if (USE_HTMLBARS) {
      //do nothing for a moment
      oldActionHelper = Ember.Handlebars.helpers.action.helperFunc;
      Ember.Handlebars.helpers.action.helperFunc = function (/*actionName*/) {
        var options = arguments[arguments.length - 1];
        var hash = options.hash;
        hash.on = hash.on || 'tap';
        return oldActionHelper.apply(this, arguments);
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

    container.register('event_dispatcher:main', dispatcher);

  }
};
