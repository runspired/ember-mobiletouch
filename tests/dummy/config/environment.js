/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    podModulePrefix: 'dummy/resources',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: { FEATURES: {} },

    contentSecurityPolicy: {
      'font-src': "'self' https://maxcdn.bootstrapcdn.com",
      'img-src': "'self' https://maxcdn.bootstrapcdn.com",
      'style-src': "'unsafe-inline' 'self' https://maxcdn.bootstrapcdn.com",
      'media-src': "'self' https://maxcdn.bootstrapcdn.com"
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
    ENV.APP.LOG_RESOLVER = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
