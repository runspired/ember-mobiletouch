module.exports = {

  name: 'ember-mobiletouch',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
        { name: 'hammer.js', target: '2.0.4' }
      ];

    return this.addBowerPackagesToProject(bowerPackages);
  }


};
