import Ember from "ember";

export default Ember.Mixin.create({

  /**!
   * Stores the reference to the local manager instance
   */
  _hammerInstance : null,

  /**!
   * Set this to something other than null to fine tune your pinch
   * settings
   */
  pinchConfiguration : null,

  /**!
   * Set this to something other than null to adjust the manager's
   * settings.
   *
   * It's not recommended to add anything here, but ff you do
   * set this, make certain you set domEvents to true!
   */
  _hammerOptions : null,


  __setupHammer : function () {

    var element = this.$()[0];
    var instance = this.get('_hammerInstance');

    if (!element) {
      return;
    }

    //initialize Hammer if necessary
    if (!instance) {

      //setup the manager instance
      var managerConfiguration = this.get('_hammerOptions') || {
          domEvents : true
        };
      instance = new Hammer.Manager(element, managerConfiguration);
      this.set('_hammerInstance', instance);

      //add pan configuration
      var pinchConfiguration = this.get('pinchConfiguration') || {};
      instance.add(new Hammer.Pinch(pinchConfiguration));

    }

  }.on('didInsertElement'),


  /**!
   * Destroy the localized instance when the view/component is destroyed
   */
  __teardownHammer : function () {
    var hammer = this.get('_hammerInstance');
    if (hammer) {
      hammer.destroy();
      this.set('_hammerInstance', null);
    }
  }.on('willDestroyElement')

});
