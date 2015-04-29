import Ember from "ember";
import VelocityMixin from '../mixins/ember-velocity-mixin';
import VerticalPan from '../mixins/vertical-pan';

const {
  on,
  run,
  set: set,
  get: get
} = Ember;

const jQuery = Ember.$;

const {
  throttle,
  schedule
} = run;

const UPDATE_POSITION_THROTTLE = 1000 / 16; // 60fps ;)
const ANIMATION_LAG = 8;

var SharedListeners = null;

function scheduleAnimation(e) {
  schedule('render', this, animatePosition, e);
}

function animatePosition(e) {

  console.log(this.__pos, e.pageX, e.pageY, e.clientX, e.clientY);

  var dX =  e.pageX - this.__pos.x + 'px';
  var dY =  e.pageY - this.__pos.y + 'px';

  var animation = {};

  if (!this.get('lockX')) {
    animation.translateY = dY;
  }
  if (!this.get('lockY')) {
    animation.translateX = dX;
  }

  console.log('animating', animation);
  this.animate(animation, {duration: ANIMATION_LAG});

}

function onInputMove(e) {
  console.log('onInputMove');
  e = e || window.event;
  throttle(this, scheduleAnimation, e, UPDATE_POSITION_THROTTLE);
}

function onInputStop() {
  console.log('removing draggable bindings');
  this.set('isDragging', false);
  var id = this.get('elementId');
  jQuery('body').off('.draggable-' + id);
}

export default Ember.Component.extend(VelocityMixin, VerticalPan, {

  tagName: 'draggable-item',

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
   * One of
   * - empty (default)
   * - clone
   * - view
   */
  contentBehavior: 'empty',
  _spacerElement: null,
  spacerView: null,

  /**!
   * Cached position of the draggable item.
   *
   * @private
   */
  // @todo: left & top from jQuery or x and y?
  __pos: {
    x: 0,
    y: 0
  },

  isDragging: false,
  startOnPress: true,

  /**!
   * activate isDragging and add movement listeners
   */
  press: function(e) {

    console.log('pressed');

    var $element = jQuery('body');
    var id = this.get('elementId');

    // we're dragging now
    this.set('isDragging', true);

    // get and set offsets
    this.setProperties({
      '__pos.x': e.originalEvent.gesture.pointers[0].x,
      '__pos.y': e.originalEvent.gesture.pointers[0].y
    });

    console.log('namespace: .draggable-'+id);
    console.log(this.__pos);

    // attach both listeners for devices that can do both
    $element.on('mousemove.draggable-' + id + ' touchmove.draggable-' + id, onInputMove.bind(this));
    $element.on('mouseup.draggable-' + id + ' touchend.draggable-' + id, onInputStop.bind(this));

  },

  teardownComponent: on('willDestroyElement', function removeDraggableListeners(){
    var id = this.get('elementId');
    jQuery('body').off('.draggable-' + id);
  })

});
