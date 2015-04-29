/* BEGIN-SNIPPET filter-gesture-example-1 */
import Ember from "ember";
import filterMixin from "ember-mobiletouch/mixins/gesture-filter";

export default Ember.View.extend(filterMixin, {

  gestureAllow: '.actionable-example',
  gestureExclude: 'h3',

  tap: function(e) {
    if (this.filterGesture(e)) {
      alert('Tapped!');
    }
  }

});
/* END-SNIPPET */
