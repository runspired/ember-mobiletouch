import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('test-successful');
  this.route('linkto');
  this.route('actions');
  this.route('links');
  this.route('inputs');
  this.route('buttons');
  this.route('forms');
  this.route('ghosts');
  this.route('drag-and-drop');
});

export default Router;
