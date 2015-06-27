import Ember from "ember";
import MobiletouchMixin from '../mixins/-mobiletouch';

//In Ember 1.12 and prior Ember.Component extends Ember.View so this reopen will affect both
export default Ember.View.reopen(MobiletouchMixin);
