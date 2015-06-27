import Ember from "ember";

const jQuery = Ember.$;

export default Ember.Mixin.create({

  /**!
   *
   * If a view or component had defined gestureAllow or gestureExclude,
   * filter gesture events.
   *
   * Stops propagation and preventsDefault if the return value will be false
   * (you will still need to return false to end Ember's event propagation).
   *
   * @param event
   * @returns {Boolean}
   */
  filterGesture: function(event) {

    var filter = this.get('gestureAllow');
    var exclude = this.get('gestureExclude');

    // always allow events or gestures when no rules are present
    if (!filter && !exclude) {
      return true;
    }

    var element = event.target;
    var allowed = jQuery(element);
    var viewElement = this.$()[0];

    // always allow the element
    if (element === viewElement) {
      return true;
    }

    if (filter) { allowed = allowed.filter(filter); }
    if (exclude) { allowed = allowed.not(exclude); }

    //only stop propagation if this gesture is not allowed
    if (!allowed.length) {
      //hammer events have different semantics than normal events, so we must check before invoking
      if (event.stopPropagation) { event.stopPropagation(); }
      if (event.preventDefault) { event.preventDefault(); }
      if (event.preventDefaults) { event.preventDefaults(); }
      return false;
    }

    return true;

  }

});
