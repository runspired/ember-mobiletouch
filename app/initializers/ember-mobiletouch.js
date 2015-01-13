import Ember from 'ember'; //event dispatcher
import config from '../config/environment'; //ENV.hammer
import HammerEvents from 'ember-mobiletouch/mixins/hammer-events';
import GesturesMixin from 'ember-mobiletouch/mixins/gestures';
import LinkViewMods from 'ember-mobiletouch/mixins/link-view-mods';

export default {

  name: 'mobiletouch',

  initialize: function() {

    Ember.EventDispatcher.reopen({ _mobileTouchConfig : config.mobileTouch || {} }, HammerEvents);

    //components extend Ember.View, so this should be all that's needed
    Ember.View.reopen(GesturesMixin, {
      __useGesturesHash : config.mobileTouch ? config.mobileTouch.useGesturesHash : false
    });

    Ember.LinkView.reopen({ __alwaysTapOnPress : config.mobileTouch.alwaysTapOnPress || false }, LinkViewMods);

    var oldActionHelper = Ember.Handlebars.helpers.action;
    Ember.Handlebars.helpers.action = function (params, hash, options, env) {
      var opts = options ? options : hash.hash;
      opts.on = opts.on || 'tap';
      return oldActionHelper.apply(null, arguments);
    }

  }
};
