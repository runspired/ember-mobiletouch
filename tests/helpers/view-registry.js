import Ember from 'ember';

export default function(app) {
  return app.__container__.lookup('-view-registry:main') || Ember.View.views;
}
