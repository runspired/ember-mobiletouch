/**
  An HTMLBars AST transformation that replaces all instances of

  ```handlebars
  <div {{action 'foo'}}></div>
  ```

  with

  ```handlebars
  <div {{action 'foo' on='tap'}}></div>
  ```
*/

function DefaultActionToTap() {
  this.syntax = null;
}

DefaultActionToTap.prototype.transform = function DefaultActionToTap_transform(ast) {
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();
  var b = pluginContext.syntax.builders;

  walker.visit(ast, function(node) {
    if (pluginContext.validate(node)) {
      var modifier = elementModifierForPath(node.modifiers, 'action');
      if (!modifier.hash) {
        modifier.hash = b.hash();
      }

      modifier.hash.pairs.push(b.pair(
        'on',
        b.string('tap')
      ));
    }
  });

  return ast;
};

DefaultActionToTap.prototype.validate = function DefaultActionToTap_validate(node) {
  if (node.type !== 'ElementNode') {
    return false;
  }

  var modifier = elementModifierForPath(node.modifiers, 'action');

  return modifier && !hashPairForKey(modifier.hash, 'on');
};

function elementModifierForPath(modifiers, path) {
  for (var i = 0, l = modifiers.length; i < l; i++) {
    var modifier = modifiers[i];
    if (modifier.path.original === path) {
      return modifier;
    }
  }

  return false;
}

function hashPairForKey(hash, key) {
  for (var i = 0, l = hash.pairs.length; i < l; i++) {
    var pair = hash.pairs[i];
    if (pair.key === key) {
      return pair;
    }
  }

  return false;
}

module.exports = DefaultActionToTap;
