import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

import EventDispatcher from "ember-mobiletouch/overrides/event-dispatcher";
import CustomRecognizers from "../../recognizers";


EventDispatcher.reopen({
  _mobileTouchCustomizations : config,
  _customRecognizers : CustomRecognizers
});



export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
