import Ember from "ember";
import MobiletouchMixin from '../mixins/-mobiletouch';

// Ember.Checkbox in 1.13 extends from the private/internal `Ember.View` that
// we cannot reopen in a 'normal' fashion, this reopens it directly
//
// In Ember 2.0.0 Ember.Checkbox will extend from Ember.Component
export default Ember.Checkbox.reopen(MobiletouchMixin);
