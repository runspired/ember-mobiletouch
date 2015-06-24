import Ember from "ember";

var LinkComponent = Ember.LinkComponent || Ember.LinkView;

export default LinkComponent.reopen({

  eventName : 'tap',

  __defaultTapOnPress : true,

  /**!
   *
   * Allow the click to cause default behavior if either the class `allow-click`
   * or `needsclick` is present.
   *
   * If this is overridden, be sure to call _super() if you want to keep this behavior.
   *
   */
  internalClick: function(e) {
    var $self = this.$();
    var allow =  $self.hasClass('allow-click') || $self.hasClass('needsclick');
    if (!allow) {
      e.preventDefault();
    }
  },

  init: function() {

    //run normal linkView setup
    this._super.apply(this, arguments);

    // Map desired event name to invoke function
    var defaultTapOnPress = this.get('__defaultTapOnPress'),
      eventName = this.get('eventName');

    if (defaultTapOnPress && eventName === 'tap') {
      this.on('press', this, this._invoke);
    }

  }

});
