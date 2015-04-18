import Ember from "ember";

export default Ember.Component.extend({

  tagName : 'div',
  layoutName : 'tappable-element',

  action : null,

  params : null,

  _trigger : function (name, e) {
    var component = this,
      target = this.get('target'),
      action = this.get('action'),
      context = {
        element : component.$(),
        context : component,
        type : name,
        event : e,
        params : this.get("params")
      };

    if (action && target && target.send) {
      target.send(action, context);
    } else {
      this.sendAction('action', context);
    }
    return false;
  },

  press : function (e) {
    return this._trigger('press', e);
  },

  tap : function (e) {
    return this._trigger('tap', e);
  }

});
