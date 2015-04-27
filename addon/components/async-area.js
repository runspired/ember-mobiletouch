import ActionArea from "./action-area";
import Ember from "ember";

const {
  set: set
} = Ember;

/**!
 *
 * Borrows liberally from ember-cli-async-button to provide a
 * gesture-ful async-button implementation
 *
 * see: https://github.com/dockyard/ember-cli-async-button/blob/master/addon/components/async-button.js
 *
 */
export default ActionArea.extend({

  _getParams: function(actionName) {
    var rawActionArguments = this.getWithDefault('_actionArgs', []);
    var actionArgumentTypes = this.getWithDefault('_argTypes', []);
    var actionArguments = [actionName];
    var defaultParams = this.get('_defaultParams');
    var _this = this;

    function callbackHandler(promise) {
      set(_this, 'promise', promise);
    }

    actionArguments.push(callbackHandler);

    if (defaultParams) {
      actionArguments = actionArguments.concat(defaultParams);
    }

    // Some of the arguments passed in might be bound values (ID type according to
    // the option types stored in _argTypes). If so, we get the stream and retrieve
    // the value when the button is clicked. Once the Stream API is public,
    // the helper will be converted to pass in a concatenated array of streams
    for (var index = 0, length = rawActionArguments.length; index < length; index++) {
      var value = rawActionArguments[index];

      if (actionArgumentTypes[index] === 'ID') {
        value = this._parentView.getStream(value).value();
      }

      actionArguments.push(value);

    }

    return actionArguments;

  },

  text: Ember.computed('textState', 'default', 'pending', 'resolved', 'fulfilled', 'rejected', function() {
    return getWithDefault(this, this.textState, get(this, 'default'));
  }),

  resetObserver: Ember.observer('textState', 'reset', function(){
    var states = ['resolved', 'rejected', 'fulfilled'];
    var found = false;
    var textState = get(this, 'textState');

    for (var idx = 0; idx < states.length && !found; idx++) {
      found = (textState === states[idx]);
    }

    if(get(this, 'reset') && found){
      set(this, 'textState', 'default');
    }
  }),


  _handleActionPromise: Ember.observer('promise', function() {
    var _this = this;
    get(this, 'promise').then(function() {
      if (!_this.isDestroyed) {
        set(_this, 'textState', 'fulfilled');
      }
    }).catch(function() {
      if (!_this.isDestroyed) {
        set(_this, 'textState', 'rejected');
      }
    });
  }),


  setUnknownProperty: function(key, value) {
    if (key === 'resolved') {
      Ember.deprecate("The 'resolved' property is deprecated. Please use 'fulfilled'", false);
      key = 'fulfilled';
    }

    this[key] = null;
    this.set(key, value);
  },

  _href: Ember.computed('href', function() {
    var href = get(this, 'href');
    if (href) { return href; }

    var tagName = get(this, 'tagName').toLowerCase();
    if (tagName === 'a' && href === undefined) { return ''; }
  })



});
