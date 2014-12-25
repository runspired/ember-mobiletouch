export default Ember.Mixin.create({

  gestures : null,

  _hammerInstance : null,

  hammerAllow : null,
  hammerExclude : null,

  _filterTouchableElements : function (element) {
    var allowed = Ember.$(element),
      filter = this.get('hammerAllow'),
      exclude = this.get('hammerExclude');

    if (filter) {
      allowed = allowed.filter(filter);
    }
    if (exclude) {
      allowed = allowed.not(exclude);
    }
    return allowed;
  },

  //only works with views / components
  setupGestures : function () {

    var self = this,
      defaultOptions = {},
      gestures = this.get('gestures'),
      options,
      element = this.$()[0],
      instance = this.get('_hammerInstance'),
      events;

    if (!element) {
      Ember.Logger.warn("View had no element when didInsertElement was called");
      return;
    }

    if (gestures) {

      //initialize Hammer if necessary
      if (!instance) {
        options = Ember.$.extend({},
          defaultOptions,
          this.get('hammerOptions') || {}
        );
        instance = new Hammer(element, options);
        this.set('_hammerInstance', instance);
      }

      //add gesture support for supplied gestures
      events = Object.keys(gestures);
      Ember.$.each(events, function (index, value) {
        instance.on(value.toLowerCase(), function (gesture) {
          var output,
            el = self._filterTouchableElements(gesture.target);

          if (el.length) {
            output = self.gestures[value].apply(self, Array.prototype.slice.call(arguments));
          } else {
            output = true;
          }

          if (output === false) {
            gesture.srcEvent.stopPropagation();
            gesture.srcEvent.preventDefault();
            if (gesture.srcEvent.stopImmediatePropagation) {
              gesture.srcEvent.stopImmediatePropagation();
            }
          }
          return output;
        });
      });

    }

  }.on('didInsertElement'),

  teardownGestures : function () {
    var hammer = this.get('_hammerInstance');
    if (hammer && typeof hammer.dispose === "function") {
      hammer.dispose();
    }
    this.set('_hammerInstance', null);
  }.on('willDestroyElement')

});
