import Ember from 'ember';
import GesturesMixin from 'ember-mobiletouch/mixins/gestures';

//alter ignoreEvents as needed
var ignoreEvents = [], //['touchmove', 'touchstart', 'touchend', 'touchcancel', 'mousedown', 'mouseup', 'click']

  MobileTouchInitializer = {

  name: 'mobiletouch',

  initialize: function() {

    Ember.EventDispatcher.reopen({
      setup: function () {
        var events = this.get('events'),
          ignoreEvents = Ember.get(defaultOptions, 'ignoreEvents');

        Ember.$.each(ignoreEvents, function (index, value) {
          events[value] = null;
          delete events[value];
        });
        this.set('events', events);

        return this._super(Array.prototype.slice.call(arguments));
      }
    });

    Ember.View.reopen(GesturesMixin);
    Ember.Component.reopen(GesturesMixin);

    Ember.LinkView.reopen({

      touchStart : function (event) {
        this._invoke(event);
        return false; // return `false` to stop bubbling
      },

      gestures: {
        tap : function (event) {
          this._invoke(event);
          return false; // return `false` to stop bubbling
        },
        press : function (event) {
          this._invoke(event);
          return false; // return `false` to stop bubbling
        }
      }

    });

  }
};

export default MobileTouchInitializer;
