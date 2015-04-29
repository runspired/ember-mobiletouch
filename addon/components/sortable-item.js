/**!
 * This is actually just a mirror of draggable-item
 * done for expediency.
 */
import Component from "./draggable-item";

export default Component.extend({
  tagName: 'sortable-item',
  lockY: true,
  boundary: '.sortable-list'
});
