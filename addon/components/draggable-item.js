import Ember from "ember";
import VelocityMixin from '../mixins/ember-velocity-mixin';
import VerticalPan from '../mixins/vertical-pan';

const {
  on,
  run
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

  var dX =  e.pageX - this.__pos.left + 'px';
  var dY =  e.pageY - this.__pos.top + 'px';

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
  e = e || window.event;
  throttle(this, scheduleAnimation, e, UPDATE_POSITION_THROTTLE);
}

function onInputStop() {
  console.log('removing draggable bindings');
  this.set('isDragging', false);
  var id = this.get('elementId');
  jQuery('body').off('.draggable-' + id);
}

export default Ember.Component.extend(VelocityMixin, {

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
  __pos: {
    x: 0,
    y: 0
  },

  isDragging: false,
  startOnPress: true,

  /**!
   * activate isDragging and add movement listeners
   */
  press: function() {

    var $element = jQuery('body');
    var id = this.get('elementId');

    // we're dragging now
    this.set('isDragging', true);

    console.log('namespace: .draggable-'+id);

    // attach both listeners for devices that can do both
    $element.on('mousemove.draggable-' + id + ' touchmove.draggable-' + id, onInputMove.bind(this));
    $element.on('mouseup.draggable-' + id + ' touchend.draggable-' + id, onInputStop.bind(this));

  },

  teardownComponent: on('willDestroyElement', function removeDraggableListeners(){
    var id = this.get('elementId');
    jQuery('body').off('.draggable-' + id);
  }),

  establishInitialPosition: on('didInsertElement', function cacheInitialElementPosition() {
    this.__pos = this.$().position();
  })



});
