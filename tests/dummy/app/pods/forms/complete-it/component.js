import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn'],
  type: 'submit',
  attributeBindings: ['type'],
});
