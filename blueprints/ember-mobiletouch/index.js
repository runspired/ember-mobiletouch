module.exports = {

  name: 'ember-cli-mobiletouch',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
        { name : 'hammerjs', version : '2.0.4' }
      ];

    return this.addBowerPackagesToProject(bowerPackages);

  }


};
