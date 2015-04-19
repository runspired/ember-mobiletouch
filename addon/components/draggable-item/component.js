import Ember from "ember";
import VelocityMixin from '../../mixins/ember-velocity-mixin';

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

  var dX = this.__pos.x - e.screenX;
  var dY = this.__pos.y - e.screenY;

  this.__pos.x += dX;
  this.__pos.y += dY;

  console.log('animating', dX, dY);
  this.animate({translateX: dX, translateY: dY});

}

function onInputMove(e) {
  e = e || window.event;
  throttle(this, scheduleAnimation, e, UPDATE_POSITION_THROTTLE);
}

function onInputStop(e) {
  e = e || window.event;
  this.set('isDragging', false);
  this.$().off('draggable');
}

export default Ember.Component.extend(VelocityMixin, {

  /**!
   * Whether the item is currently being dragged
   */
  isDragging: false,

  /**!
   * Whether the item should only move horizontally
   */
  lockX: false,

  /**!
   * whether the item should only move vertically
   */
  lockY: false,

  /**!
   * whether the item's movement should snap to a grid,
   * if true, use columnWidth and rowHeight to set
   * dimensions to be snapped to.
   */
  snapToGrid: false,
  columnWidth: 0,
  rowHeight: 0,

  /**!
   * Cached position of the draggable item.
   *
   * @private
   */
  __pos: {
    x: 0,
    y: 0
  },

  /**!
   * One of
   * - empty (default)
   * - clone
   * - view
   */
  contentBehavior: 'empty',
  _spacerElement: null,
  spacerView: null,

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
