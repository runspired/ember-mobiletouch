import Ember from "ember";
import MobiletouchMixin from '../mixins/-mobiletouch';

// In Ember 1.13 and higher Ember.Component does not extend from
// the global Ember.View (as that is a deprecated class)
export default Ember.Component.reopen(MobiletouchMixin);
