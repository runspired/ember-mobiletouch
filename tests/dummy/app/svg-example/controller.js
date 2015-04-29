import Ember from "ember";

const COLORS = [
  '#FFBE57',
  '#00dd55',
  '#ee3300',
  '#000000'
];

const SHADES = [
  '#222222',
  '#555555',
  '#888888',
  '#bbbbbb'
];

export default Ember.Controller.extend({

  highlightColor: '#FFBE57',
  bodyFill: '#222222',

  highlightIndex: 0,
  bodyIndex: 0,

  actions: {

    alterColor: function() {
      var index = this.get('highlightIndex') + 1;
      if (index > 3) {
        index = 0;
      }
      this.set('highlightIndex', index);
      this.set('highlightColor', COLORS[index]);
    },

    alterShade: function() {
      var index = this.get('bodyIndex') + 1;
      if (index > 3) {
        index = 0;
      }
      this.set('bodyIndex', index);
      this.set('bodyFill', SHADES[index]);
    }

  }
});
