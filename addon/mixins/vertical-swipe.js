import Ember from "ember";

const {
  on
  } = Ember;

export default Ember.Mixin.create({

  /**!
   * Stores the reference to the local manager instance
   */
  _hammerInstance: null,

  /**!
   * Set this to something other than null to fine tune your swipe
   * settings
   */
  swipeConfiguration: null,

  /**!
   * Set this to something other than null to adjust the manager's
   * settings.
   *
   * It's not recommended to add anything here, but ff you do
   * set this, make certain you set domEvents to true!
   */
  _hammerOptions: null,

  /**!
   * Internal flag used to make the vertical-pan and vertical-swipe
   * mixins capable of both being added to the same view or component.
   */
  __hasSwipeMixin: true,

  /**!
   * If false, a Hammer instance/recognizers will not be created unless
   * panUp or panDown are present.
   */
  alwaysCreateHammerInstance: true,


  /**!
   * Creates a localized hammer manager instance with
   * vertical recognizers.  These events are still sent
   * through as domEvents, so in your component/view you
   * will still use swipeUp and swipeDown normally.
   *
   * It's heavily recommended to debounce events that fire
   * rapidly.  E.G.
   *
   * ```
   * swipeUp : function (event) {
   *     Ember.run.debounce(this, this.doSomething, event, 10);
   * }
   * ```
   */
  __setupHammer: on('didInsertElement', function setupHammerInstance() {

    if (!this.get('alwaysCreateHammerInstance') && !this.get('panUp') && !this.get('panDown')) {
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

      //add swipe configuration
      var swipeConfiguration = this.get('swipeConfiguration') || {
          direction : Hammer.DIRECTION_VERTICAL
        };
      instance.add(new Hammer.Swipe(swipeConfiguration));

      //play nice with pan mixin if it's been added too
      if (this.get('__hasPanMixin')) {
        var panConfiguration = this.get('panConfiguration') || {
            direction : Hammer.DIRECTION_VERTICAL
          };
        instance.add(new Hammer.Pan(panConfiguration));
      }

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
