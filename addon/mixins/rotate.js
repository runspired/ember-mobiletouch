import Ember from "ember";

const ROTATE_GESTURES = ['rotate', 'rotateMove', 'rotateEnd', 'rotateCancel'];

const {
  on
  } = Ember;


export default Ember.Mixin.create({

  /**!
   * Stores the reference to the local manager instance
   */
  _hammerInstance : null,

  /**!
   * Set this to something other than null to fine tune your rotate
   * settings
   */
  rotateConfiguration : null,

  /**!
   * Set this to something other than null to adjust the manager's
   * settings.
   *
   * It's not recommended to add anything here, but ff you do
   * set this, make certain you set domEvents to true!
   */
  _hammerOptions : null,


  /**!
   * If false, a Hammer instance/recognizers will not be created unless
   * rotate-based handlers are present.
   */
  alwaysCreateHammerInstance: true,

  /**!
   * Checks if a rotate handler is present
   *
   * @returns {boolean}
   * @private
   */
  __hasRotateHandler: function() {
    var ret = false;
    var self = this;
    ROTATE_GESTURES.forEach(function(name) {
      if (self.get(name)) {
        ret = true;
      }
    });
    return ret;
  },


  /**!
   * Creates a localized hammer manager instance with
   * pinch recognizers.  These events are still sent
   * through as domEvents, so in your component/view you
   * will still use pinch normally.
   *
   * It's heavily recommended to debounce or throttle events that fire
   * rapidly.  E.G.
   *
   * ```
   * pinchMove : function (event) {
   *     Ember.run.debounce(this, this.doSomething, event, 10);
   * }
   * ```
   */
  __setupHammer: on('didInsertElement', function setupHammerInstance() {

    if (!this.get('alwaysCreateHammerInstance') && !this.__hasRotateHandler()) {
      return;
    }

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
      var rotateConfiguration = this.get('rotateConfiguration') || {};
      instance.add(new Hammer.Rotate(rotateConfiguration));

    }

  }),


  /**!
   * Destroy the localized instance when the view/component is destroyed
   */
  __teardownHammer: on('willDestroyElement', function teardownHammerInstance() {
    var hammer = this.get('_hammerInstance');
    if (hammer) {
      hammer.destroy();
      this.set('_hammerInstance', null);
    }
  })

});
