import Ember from "ember";

const DEFAULT_ACTION_TEXT = "You are currently doing nothing.";

export default Ember.Controller.extend({

  currentUserAction: DEFAULT_ACTION_TEXT,

  elementClass: 'none-detected-yet',
  componentFoo: 'none-detected-yet',

  actions: {
    showLeft: function (element, component) {
      this.set('currentUserAction', "You are currently panning left.");
      this.set('elementClass', element.getAttribute('class'));
      this.set('componentFoo', component.get('foo'));
    },
    showRight: function (element, component) {
      this.set('currentUserAction', "You are currently panning right.");
      this.set('elementClass', element.getAttribute('class'));
      this.set('componentFoo', component.get('foo'));
    },
    showTap: function (element, component) {
      this.set('currentUserAction', "You tapped!");
      this.set('elementClass', element.getAttribute('class'));
      this.set('componentFoo', component.get('foo'));
    },
    showPress: function (element, component) {
      this.set('currentUserAction', "You are currently pressing!");
      this.set('elementClass', element.getAttribute('class'));
      this.set('componentFoo', component.get('foo'));
    },
    endPress: function(element, component) {
      this.set('currentUserAction', "You stopped pressing.");
      this.set('elementClass', element.getAttribute('class'));
      this.set('componentFoo', component.get('foo'));
    },
    endPan: function (element, component) {
      this.set('currentUserAction', "You stopped panning.");
      this.set('elementClass', element.getAttribute('class'));
      this.set('componentFoo', component.get('foo'));
    }
  }
});
