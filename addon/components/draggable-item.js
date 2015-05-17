import Ember from "ember";
import VelocityMixin from '../mixins/ember-velocity-mixin';
import VerticalPan from '../mixins/vertical-pan';

const {
  run,
  set: set
} = Ember;

const jQuery = Ember.$;

const {
  throttle,
  schedule
} = run;

const UPDATE__posITION_THROTTLE = 1000 / 32; // 120fps ;)
const ANIMATION_LAG = 4;


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
  __pos: null,

  startOnPress: true,

  _getAdjustedPosition: function(e) {
    var startPosition = this.get('__pos');
    return this._keepInBoundary(
      startPosition.dX + e.originalEvent.gesture.deltaX,
      startPosition.dY + e.originalEvent.gesture.deltaY
    );
  },

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

    console.log('checking boundaries');

    // TODO optimize element usage
    var element = this.element;
    var box = jQuery(this.get('boundary')).get(0);
    var current = element.getBoundingClientRect();
    var boundary = box.getBoundingClientRect();

    console.log('bounds', dX, dY);

    if (current.right + dX > boundary.right) {
      console.log('adjusting right dX');
      dX = boundary.right - current.right;
    } else if (current.left + dX < boundary.left) {
      console.log('adjusting left dX');
      dX = boundary.left - current.left;
    }

    // A + B = C + D
    // D = A + B - C

    if (current.top + dY < boundary.top) {
      console.log('adjusting top dY', boundary.top - current.top + dY);
      dY = boundary.top - current.top + dY;
    } else if (current.bottom + dY > boundary.bottom) {
      console.log('adjusting bottom dY', boundary.bottom - current.bottom + dY);
      dY = boundary.bottom - current.bottom + dY;
    }

    return {
      dX: dX,
      dY: dY
    };

  },

  animatePosition: function(e) {

    var deltas =  this._getAdjustedPosition(e);
    var animation = {};

    if (!this.get('lockX')) {
      animation.translateY = deltas.dY + 'px';
    }
    if (!this.get('lockY')) {
      animation.translateX = deltas.dX + 'px';
    }

    this.animate(animation, {duration: ANIMATION_LAG});

  },

  scheduleAnimation: function(e) {
    schedule('render', this, this.animatePosition, e);
  },

  move: function(e) {
    throttle(this, this.scheduleAnimation, e, UPDATE__posITION_THROTTLE);
  },

  pan: function(e) {
    if (this.get('isDragging')) {
      this.move(e);
    }
  },

  end: function(e) {
    this.set('isDragging', false);
    var deltas = this._getAdjustedPosition(e);
    this.setProperties({
      '__pos.dX': deltas.dX,
      '__pos.dY': deltas.dY
    });
  },

  panStart: function() {
    if (!this.get('startOnPress') && !this.get('isDragging')) {
      set(this, 'isDragging', true);
    }
  },

  press: function() {
    if (this.get('startOnPress') && !this.get('isDragging')) {
      set(this, 'isDragging', true);
    }
  },

  panEnd: function(e) {
    if(this.get('isDragging')) {
      this.end(e);
    }
  },

  pressUp: function(e) {
    if(this.get('isDragging')) {
      console.log('press end');
      this.end(e);
    }
  },

  init: function() {
    this._super();
    this.set('__pos', {
      dX: 0,
      dY: 0
    });
  }

});
