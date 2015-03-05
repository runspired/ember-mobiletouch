import Ember from "ember";

export default Ember.LinkView.reopen({

  eventName : 'tap',

  __defaultTapOnPress : true,

  click: function(event) {
    event.preventDefault();
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
