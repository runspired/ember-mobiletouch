import Ember from "ember";
import VelocityMixin from 'ember-velocity-mixin/main';

const {
  on,
  run
} = Ember;

const {
  throttle,
  debounce,
  schedule
} = Ember;

const UPDATE_POSITION_THROTTLE = 1000 / 16; // 60fps ;)

function scheduleAnimation(e) {
  schedule('render', this, animatePosition, e);
}

function animatePosition(e) {
  var $element = this.$();

  var dX = this.__pos.x - e.screenX;
  var dY = this.__pos.y - e.screenY;

  this.__pos.x += dX;
  this.__pos.y += dY;

  this.animate({translateX: dX, translateY: dY});

}

function onInputMove(e) {
  var e = e || window.event;
  throttle(this, scheduleAnimation, e, UPDATE_POSITION_THROTTLE);
}

function onInputStop(e) {
  var e = e || window.event;
  this.set('isDragging', false);
  this.$().off('draggable');
}

export default Ember.Component.extend(VelocityMixin, {

  isDragging: false,

  __pos: {
    x: 0,
    y: 0
  },

  /**!
   * activate isDragging and add movement listeners
   */
  press: function() {

    var $element = this.$();

    // we're dragging now
    this.set('isDragging', true);

    // attach both listeners for devices that can do both
    $element.on('mousemove.draggable touchmove.draggable', onInputMove.bind(this));
    $element.on('mouseup.draggable touchend.draggable', onInputStop.bind(this));

  },

  teardownComponent: on('willDestroyElement', function removeDraggableListeners(){
    $element.off('draggable');
  }),

  establishInitialPosition: on('didInsertElement', function cacheInitialElementPosition() {
    this.__pos = this.$().position();
  })



});
