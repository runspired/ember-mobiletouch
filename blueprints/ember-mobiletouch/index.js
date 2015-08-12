module.exports = {

  name: 'ember-mobiletouch',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var success = true,
      bowerPackages = [
        { name : 'hammerjs', version : '2.0.4' }
      ];

    success = this.addBowerPackagesToProject(bowerPackages);

    return success;

  }


};
