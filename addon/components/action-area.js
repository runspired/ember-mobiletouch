import Ember from "ember";
import uncapitalize from "../utils/uncapitalize-word";

export default Ember.Component.extend({

  classBindings: ['requestState'],

  _defaultParams: null,
  _getParams: function(actionName) {
    var rawActionArguments = this.getWithDefault('_actionArgs', []);
    var actionArgumentTypes = this.getWithDefault('_argTypes', []);
    var actionArguments = [actionName];
    var defaultParams = this.get('_defaultParams');

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

  init : function () {

    this._super();

    var v;
    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        v = this[key];
        if (v === 'toString') {
          continue;
        } // ignore useless items
        if (Ember.typeOf(v) === 'function') {
          continue;
        }

        //setup listener for key
        if (key.indexOf('on') === 0) {
          let event = uncapitalize(key.substr(2));
          let action = this[key];

          this.set(event + 'Action', action);

          this.set(event, function () {

            var context = this._getParams(event + 'Action');
            var target = this.get('target');

            if (target && target.send) {
              target.send.apply(this, context);
            } else {
              this.sendAction.apply(this, context);
            }

          }.bind(this));
        }

      }
    }

  }

});
