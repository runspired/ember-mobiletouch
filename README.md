# Ember-mobiletouch

Ember addon for touch and gesture support in ember based mobile apps and websites.


##Installation

`npm install ember-mobiletouch`

`ember g ember-mobiletouch`

(or, as of recent changes)

`ember install:addon ember-mobiletouch`


##What's Included

This addon installs [HammerJS 2.0.4](https://github.com/hammerjs/hammer.js) and wires it into
your app as a global (Hammer).

It then sets up a single Hammer instance to manage gestures, and pushes the gestures received
through Ember's eventing system.  For a full feature list and configuration, continue reading.


##Usage

```
Ember.View.extend({
  
  gestureAllow : [],
  
  gestureExclude : [],
  
  tap : function (e) {
    ;//do something!
  }

})
```

###gestureAllow

Optionally specify jQuery selectors for children of the View that can
trigger the defined gestures.


###gestureExclude

Optionally specify child elements of the View which should never
trigger the defined gestures.

**gestureAllow and gestureExclude can be used in tandem and will never filter the View itself**
**filters are not applied to non-gestures (e.g. events defined in defaultConfig.events)**


###Action helper

This triggers `myAction` on `tap`

`<div {{action "myAction"}}></div>`

This triggers `myAction` on `press`

`<div {{action "myAction" on="press"}}></div>`

###Link-to helper

Links trigger on `tap`.

`{{#link-to 'dashboard'}}Dashboard{{/link-to}}`

But this would trigger on `press`

`{{#link-to 'dashboard' eventName="press"}}Dashboard{{/link-to}}`

And this would trigger on `swipeRight`

`{{#link-to 'dashboard' eventName="swipeRight"}}Dashboard{{/link-to}}`



##Mobile FastFocus

text/password and similar input types on Mobile and Cordova are focused
on tap or press.  Focus's dependency on `click` and the keyboard opening
on mobile devices otherwise leads to the focus getting lost.

##Mobile Keyboard based submit

On mobile / cordova, the iOS keyboard triggers a 'click' on a form's submit input/button.
`ember-mobiletouch` captures this click, and triggers a `submit` event, allowing action handlers
to work.



##Preventing Click Busting on links and buttons

`ember-mobiletouch` prevents the default behavior of most clicks.

If you find that `ember-mobiletouch` is busting a click that you need to allow,
the `.allow-click` class will prevent the click busting.

By default, the click buster uses the following rules on the target element to
determine if it should prevent the default behavior.

- it does not have the `.allow-click` class

AND

- it is `a[href]` and the href does not have a custom protocol (such as `mailto:` or `tel:`)
- (OR) it is `button[type!="submit"]` or  `input[type="button"]`
- (OR) it is `input[type="submit"]` or `button[type="submit"]` AND does not have the attribute `data-ember-action`



##Custom Recognizers

You can define custom recognizers by adding them in `app/recognizers.js`.  (See the example)[https://github.com/runspired/ember-mobiletouch/blob/master/app/recognizers.js].

For instance, to add a doubleTap gesture.

```
export default function () {

  //the DOM event will be all lowercase (doubletap)
  //the Ember event will be camelCase (doubleTap)
  //the key in this.Recognizers will be SnakeCase (DoubleTap)

  this.recognize({

    name : 'doubleTap', //always camelCase this

    gesture : 'tap', //the base Hammer recognizer to use

    tune : { //the settings to pass to the recognizer, event will be added automatically
      taps : 2
    },

    'with' : ['tap'], //an array of recognizers to recognize with.

    without : [] //an array of recognizers that must first fail
  });

}

```
Be forewarned, this example implementation will still also trigger two taps along with the doubleTap.



##Vertical Swipe/Pan without breaking scroll

`ember-mobileTouch` now comes with two mixins you can use to add localized hammer instances when you need to
add vertical swipe / pan functionality without breaking the ability to scroll on mobile devices.

`import VerticalPanMixin from "ember-mobiletouch/mixins/vertical-pan";`
`import VerticalSwipeMixin from "ember-mobiletouch/mixins/vertical-swipe";`

These mixins can be used together.  The default recognizer configuration for both is

```
{
  direction : Hammer.DIRECTION_VERTICAL
}
```

You can adjust the recognizer configuration by setting the `panConfiguration` and `swipeConfiguration`
properties respectively.



##Configuration

The following settings can be configured in `config/environment.js`.  They are shown below with their defaults.
You can read more by reading the documentation comments in [addon/default-config.js](https://github.com/runspired/ember-mobiletouch/blob/master/addon/default-config.js)

```
ENV.mobileTouch = {

    //which gesture families to allow, will create a recognizer for each
    //a minimum of tap must be present, turning off unused gestures can help performance
    use : ['tap', 'press', 'pan', 'swipe'],

    //whether to alias "press" to tap within Ember's eventing
    // very useful if you don't need to distinguish and don't want to lose
    // taps from people who tap longer
    alwaysTapOnPress : false,
    
    //whether links and actions should trigger tap behavior on press as well
    // if eventName or "on" has not been explicitly defined
    // currently does not work with actions
    defaultTapOnPress : true,

    //passed to new Hammer.Manager(element, options)
    options : {
       domEvents : true
    },
    
    //passed to the respective recognizer
    tune : {
      tap : { time : 250, threshold : 9 }, //Hammer default is 250 / 2
      press : { time : 251, threshold : 9 }, //Hammer default is 500 / 5
      swipe : { direction : 6, velocity : 0.3, threshold : 25 },
      pan : { direction : 6 },
      pinch : {},
      rotate : {}
    },
    
    //what default Ember events should be disabled
    events : [
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'mousedown',
      'mouseup',
      'click',
      'dblclick',
      'mousemove',
      'mouseenter',
      'mouseleave'
    ]

};
```

##touchZone

Sometimes smaller buttons or critical buttons need a larger capture area than their visible area.
You can increase the area that recognizes touch events for a specific button
https://gist.github.com/runspired/506f39a4abb2be48d63f


##Changelog

- [changelog](./CHANGELOG.md)


##Roadmap

- [roadmap](./ROADMAP.md)
