module.exports = {

  name: 'ember-mobiletouch',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var success = true,
      bowerPackages = [
        { name : 'hammerjs', version : '2.0.4' }
      ],
      npmPackages = [
        {name : 'ember-cli-fastclick', version : '1.0.3'}
      ];

    success = this.addBowerPackagesToProject(bowerPackages);

    if (success) {
      success = this.addPackagesToProject(npmPackages);
    }

    return success;

  }


};
