/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    podModulePrefix: 'dummy/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'none',
    EmberENV: { FEATURES: {} },
    contentSecurityPolicy: {
      'style-src': "'self' https://maxcdn.bootstrapcdn.com"
    },

    APP: {}
  };

  if (environment === 'test') {

    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
