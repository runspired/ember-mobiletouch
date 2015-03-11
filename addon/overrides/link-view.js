import Ember from "ember";
import isCustomProtocol from "../utils/is-custom-protocol";

export default Ember.LinkView.reopen({

  eventName : 'tap',

  __defaultTapOnPress : true,

  init: function() {

    //run normal linkView setup
    this._super.apply(this, arguments);

    // Map desired event name to invoke function
    var defaultTapOnPress = this.get('__defaultTapOnPress'),
      eventName = this.get('eventName');

    if (defaultTapOnPress && eventName === 'tap') {
      this.on('press', this, this._invoke);
    }

  },

  // Allow the click to cause default behavior if either the class `allow-click` is present
  // on the the link element or if there is a custom protocol like `mailto:` or `tel:`.
  // If this is overridden, be sure to call _super() if you want to keep this behavior.
  internalClick: function(e) {
    var $self = this.$();
    var allow =  $self.hasClass('allow-click') ||
      $self.is('a[href]') && isCustomProtocol($self.attr('href'));
    if (!allow) {
      e.preventDefault();
    }
  }

});
