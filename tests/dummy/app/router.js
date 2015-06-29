import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  // Primitives
  this.route('link-example');
  this.route('action-example');
  this.route('action-area-example');
  this.route('async-area-example');
  this.route('context-area-example');
  this.route('gesture-mixin-example');
  this.route('input-example');
  this.route('svg-example');

  // Examples
  this.route('slide-toggle-example');

  // Docs
  this.route('customization-docs');

  // Testing
  this.route('test-successful');
  this.route('linkto');
  this.route('actions');
  this.route('links');
  this.route('inputs');
  this.route('buttons');
  this.route('forms');
  this.route('ghosts');
});

export default Router;
