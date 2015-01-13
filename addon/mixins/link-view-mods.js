import Ember from "ember";

export default Ember.Mixin.create({
  eventName : 'tap',
  init: function() {
    this._super.apply(this, arguments);

    // Map desired event name to invoke function
    var alwaysTapOnPress = this.get('__alwaysTapOnPress'),
      eventName = this.get('eventName');

    if (alwaysTapOnPress && eventName === 'tap') {
      this.on('press', this, this._invoke);
    }
  }

});
