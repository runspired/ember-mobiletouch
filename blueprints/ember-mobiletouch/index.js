module.exports = {

  name: 'ember-mobiletouch',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
        { name : 'hammerjs', version : '2.0.4' }
    ];

    var receiver = this;
    return this.addBowerPackagesToProject(bowerPackages).then(function() {
      return receiver.addPackageToProject('ember-cli-fastclick');
    });
  }


};
