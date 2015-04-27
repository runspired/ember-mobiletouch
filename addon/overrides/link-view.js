import Ember from "ember";

export default Ember.LinkView.reopen({

  eventName: 'tap',

  events: '',

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

    var eventName = this.get('events').split(' ');

    if (!eventName[0]) {
      this._super.apply(this, arguments);

    } else {
      var remainingEvents = Ember.A(eventName.splice(1));
      var Component = this;

      this.set('eventName', eventName[0]);
      this._super.apply(this, arguments);

      remainingEvents.forEach(function(event) {
        Ember.Logger.debug('Adding trigger for', event);
        Component.on(event, Component, Component._invoke);
      });

    }


  }

});
