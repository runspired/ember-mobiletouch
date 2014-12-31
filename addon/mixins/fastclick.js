import Ember from "ember";

export default Ember.Mixin.create({

  fastclickElementOnly : false,
  triggerFastClickOn : 'touchStart', //you may prefer 'touchEnd'
  stopTouchEnd : true,

  __filterActionElements : function (element) {

    if (this.get('fastclickElementOnly')) {
      return element === this.$()[0] ? element : false;
    }

    if (!this._filterTouchableElements(element).length) {
      return false;
    }

    if (element !== this.$()[0] && !Ember.$(element).not('input, a, button').length) {
     return false;
    }

    return element;
  },

  _fastclickOccurred : false,

  _touchEnd : function (e) {
    Ember.Logger.debug('Triggering Fastclick Touchend', e);
    if (this.get('_fastclickOccurred')) {
      Ember.Logger.debug('Preventing touchend');
      this.set('_fastclickOccurred', false);
      e.preventDefault();
      if (e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      return false;
    }
  },

  __fastclick : function (e) {

    Ember.Logger.debug('Initializing FastClick', e);

    if (this.__filterActionElements(e.target)) {

      Ember.Logger.debug('Triggering Fastclick', e);
      if (e.preventDefault) {

        Ember.Logger.debug('Setting Fastclick Occurred to True');
        //this is a touchStart
        e.preventDefault();
        if (e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }
        if (e.stopPropagation) {
          e.stopPropagation();
        }

        //prevent the next touchEnd
        this.set('_fastclickOccurred', true);

      }
      return this.click() || false;
    }

  },

  __addDefaultGesture : function (name) {
    if (!this.get(name)) {
      this.set(name, this.__fastclick);
    }
  },

  init : function () {
    this._super();

    if (this.get('click')) {
      if (!this.get('gestures')) {
        this.set('gestures', {});
      }
      this.__addDefaultGesture(this.get('triggerFastClickOn'));
      this.__addDefaultGesture('gestures.tap');
      this.__addDefaultGesture('gestures.press');
      if (this.get('stopTouchEnd')) {
        Ember.Logger.debug('adding touch end and cancel event to view');
        this.set('touchEnd', this._touchEnd);
        this.set('touchCancel', this._touchEnd);
      }

    }

  }

});
