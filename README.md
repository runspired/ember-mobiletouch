# Ember-mobiletouch

Ember addon for Fastclick and Hammerjs support in ember based mobile apps and websites.

##What's Included

This addon installs (ember-cli-fastclick)[https://github.com/ember-mobile/ember-cli-fastclick] for you.

It additionally installs (HammerJS 2.0.4)[https://github.com/hammerjs/hammer.js], allows for a
gestures hash on Ember.View and Ember.Component, and modifies LinkView to utilize gestures as needed.

##Usage

```
Ember.View.extend({
  
  hammerOptions : {},
  
  hammerAllow : [],
  
  hammerExclude : [],
  
  gestures : {
    tap : function (e) {
      ;//do something!
    }
  }

})
```


###hammerOptions

An options hash passed to the created hammer instance


###hammerAllow

Optionally specify jQuery selectors for children of the View that can
trigger the defined gestures.


###hammerExclude

Optionally specify child elements of the View which should never
trigger the defined gestures.

**hammerAllow and hammerExclude can be used in tandem**




##This portion outlines the details of collaborating on this Ember addon.

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
