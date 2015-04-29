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
   * An jQuery selector for an element which
   * the draggable element cannot leave.
   */
  boundary: '',

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
   *
   * @param dX left movement
   * @param dY right movement
   * @returns {{}}
   * @private
   */
  _keepInBoundary: function(dX, dY) {
    var hasBoundary = this.get('boundary');
    if (!hasBoundary) {
      return {
        dX: dX,
        dY: dY
      };
    }
    // TODO optimize element usage
    var element = this.element;
    var box = jQuery(this.get('boundary')).get(0);
    var current = element.getBoundingClientRect();
    var boundary = box.getBoundingClientRect();

    if (current.right + dX > boundary.right) {
      console.log('adjusting right dX');
      dX = boundary.right - current.right;
    }
    if (current.left + dX < boundary.left) {
      console.log('adjusting left dX');
      dX = boundary.left - current.left;
    }
    if (current.top + dY > boundary.top) {
      console.log('adjusting top dY');
      dY = boundary.top - current.top;
    }
    if (current.bottom + dY < boundary.bottom) {
      console.log('adjusting bottom dY');
      dY = boundary.bottom - current.bottom;
    }

    return {
      dX: dX,
      dY: dY
    };

  },

  /**!
   * activate isDragging and add movement listeners
   */
  start: function(e) {

    // fix panStart firing twice?
    if(!get(this, 'isDragging')) {
      console.log('meta start');
      set(this, 'isDragging', true);

      this.setProperties({
        '__pos.x': e.originalEvent.gesture.pointers[0].x,
        '__pos.y': e.originalEvent.gesture.pointers[0].y
      });

    }

  },

  move: function(e) {
    throttle(this, scheduleAnimation, e, UPDATE_POSITION_THROTTLE);
  },

  pan: function(e) {
    if (this.get('isDragging')) {
      this.move(e);
    }
  },

  end: function(e) {
    // TODO cache position
    this.set('isDragging', false);
  },

  panStart: function(e) {
    if (!this.get('startOnPress') && !this.get('isDragging')) {
      this.start(e);
    }
  },

  press: function(e) {
    if (this.get('startOnPress') && !this.get('isDragging')) {
      this.start(e);
    }
  },

  panEnd: function(e) {
    this.end(e);
  },

  pressUp: function(e) {
    this.end(e);
  }

});
