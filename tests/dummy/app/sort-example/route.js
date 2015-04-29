import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    return Ember.A([
      {id: 1, name: 'Adam'},
      {id: 1, name: 'Bob'},
      {id: 1, name: 'Chris'},
      {id: 1, name: 'Daniel'},
      {id: 1, name: 'Eric'},
      {id: 1, name: 'Frank'},
      {id: 1, name: 'Gabriel'}
    ]);
  }
});
