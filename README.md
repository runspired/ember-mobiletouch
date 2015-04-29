# Ember-Gestures

[![npm version](https://badge.fury.io/js/ember-mobiletouch.svg)](http://badge.fury.io/js/ember-mobiletouch)
[![Build Status](https://travis-ci.org/runspired/ember-mobiletouch.svg?branch=master)](https://travis-ci.org/runspired/ember-mobiletouch)
[![Ember Observer Score](http://emberobserver.com/badges/ember-mobiletouch.svg)](http://emberobserver.com/addons/ember-mobiletouch)
[![Circle CI](https://circleci.com/gh/runspired/ember-mobiletouch/tree/master.svg?style=svg)](https://circleci.com/gh/runspired/ember-mobiletouch/tree/master)

Ember addon for touch and gesture support in ember based mobile apps and websites.  Interactive
documentation is here: [http://runspired.github.io/ember-mobiletouch/](http://runspired.github.io/ember-mobiletouch/).


### [Changelog](./CHANGELOG.md)

### [Roadmap](./ROADMAP.md)


[![dependencies](https://david-dm.org/runspired/ember-mobiletouch.svg)](https://david-dm.org/runspired/ember-mobiletouch)
[![devDependency Status](https://david-dm.org/runspired/ember-mobiletouch/dev-status.svg)](https://david-dm.org/runspired/ember-mobiletouch#info=devDependencies)


## Installation

If you are on a recent version of `ember-cli`, do the following:

    ember install ember-gestures


This is the equivalent of:

    npm install --save-dev ember-gestures
    ember g ember-gestures

## What's Included

This addon installs [HammerJS 2.0.4](https://github.com/hammerjs/hammer.js) and wires it into
your app as a global (Hammer).

It then sets up a single Hammer instance to manage gestures, and pushes the gestures received
through Ember's eventing system.  For a full feature list and configuration, continue reading.


## Usage

```
Ember.Component.extend({
  
  tap: function (e) {
    ;//do something!
  }

})
```

The default gestures available are:

### [Tap](http://hammerjs.github.io/recognizer-tap/)
- `tap`

### [Press](http://hammerjs.github.io/recognizer-press/)
- `press`
- `pressUp`

### [Pan](http://hammerjs.github.io/recognizer-pan/)
- `panStart`
- `pan`
- `panRight`
- `panLeft`
- `panEnd`

### [Swipe](http://hammerjs.github.io/recognizer-swipe/)
- `swipe`
- `swipeLeft`
- `swipeRight`

`Up`|`Down` variants of `pan` and `swipe` as well as [rotate](http://hammerjs.github.io/recognizer-rotate/)
and [pinch](http://hammerjs.github.io/recognizer-pinch/) are available via mixin for performance and
mobile usability reasons.


## Quick Start

### Action helper

This triggers `myAction` on `tap`

`<div {{action "myAction"}}></div>`

This triggers `myAction` on `press`

`<div {{action "myAction" on="press"}}></div>`

This triggers `myAction` on `pressUp` or `panRight`

`<div {{action "myAction" on="pressUp panRight"}}></div>`

### Link-to helper

Links trigger on `tap`.

`{{#link-to 'dashboard'}}Dashboard{{/link-to}}`

But this would trigger on `press`

`{{#link-to 'dashboard' eventName="press"}}Dashboard{{/link-to}}`

And this would trigger on `swipeRight`

`{{#link-to 'dashboard' eventName="swipeRight"}}Dashboard{{/link-to}}`

And this would trigger on `swipeLeft` or `swipeRight`

`{{#link-to 'dashboard' events="swipeRight swipeLeft"}}Dashboard{{/link-to}}`


## Mobile FastFocus

text/password and similar input types on Mobile and Cordova are focused
on tap, press.  Focus's dependency on `click` and the keyboard opening
on mobile devices otherwise leads to the focus getting lost.


## Mobile Keyboard based submit

On mobile / cordova, the iOS keyboard triggers a 'click' on a form's submit input/button.
`ember-mobiletouch` captures this click, and triggers a `submit` event, allowing action handlers
to work.


## Custom Recognizers

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



## Vertical Swipe/Pan without breaking scroll

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



## Configuration

The following settings can be configured in `config/environment.js`.  They are shown below with their defaults.
You can read more by reading the documentation comments in [addon/default-config.js](https://github.com/runspired/ember-mobiletouch/blob/master/addon/default-config.js)

The default configuration can be examined here: http://codepen.io/anon/pen/bNLJbN?editors=001

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
      'click', //not removed, re-aliased to internalClick.  Use cautiously.
      'dblclick',
      'mousemove',
      'mouseenter',
      'mouseleave'
    ]

};
```

## touchZone

Sometimes smaller buttons or critical buttons need a larger capture area than their visible area.
You can increase the area that recognizes touch events for a specific button
https://gist.github.com/runspired/506f39a4abb2be48d63f



## Testing

When using ember-mobiletouch, actions etc. are no longer triggered by clicks, but by taps.
This can break some of your apps existing tests.

In `test-helper.js` you will need to import the `Ember.EventDispatcher` changes.

`import mobileTouchOverrides from 'yourapp/overrides/ember-mobiletouch';`

In your tests on actions, you will need to use `triggerEvent('#some-selector', 'tap')` instead
of `click('#some-selector')`

**Important** The jQuery events you need to trigger are the Hammer variant, meaning it is entirely lowercase `swiperight`, `panup`.



# Click
==================================================

**Q:** Where did click go?  Why not just alias tap/touchStart/touchEnd to click?

**A:** Aliasing other events to click has unintended results.  You can't preventDefault()
a tap the same way as a click, and a tap could have been triggered by many varying event
conditions.  Aliasing other events to click would force all of your click handlers to need
to examine the event object to determine what type of event it originated as.

Removing click from eventing has it's own complications.  It then becomes necessary to determine
what click events to prevent default behavior on.  Global handlers to catch clicks on links are
error prone because `event.target` may be an element within the link and not the link itself, but
adding a click handler to all views that need to prevent clicks would also introduce complications.

To provide a great gesture API while also addressing these challenges, Mobile Touch uses an
cautious cancelling approach while still providing the ability to custom tailor the behavior where
necessary.

As of 1.4.3, click is aliased to `internalClick`, and used to prevent default behavior on clicks on
link-tos.  Adding `.allow-click` or `.needsclick` to a view, link, or button that would otherwise cancel the
click will allow the click to pass through.  Synthetic clicks are also triggered on tap (not press),
and used as a "fastclick" mechanism on links not within Ember's view ecosystem.  "fastclick" clicks
do not enter Ember's eventing as `internalClick`s but are instead filtered out when they reach the body.

The rules for whether mobile touch will prevent the default behavior of a click are as follows:


- it does not have the `.allow-click` or `.needsclick` (added as a convenience for those coming from fastclick.js) class

AND

- it was on or has bubbled to an `Ember.linkView`
- (OR) it is `button[type!="submit"]` or  `input[type="button"]`
- (OR) it is `input[type="submit"]` or `button[type="submit"]` AND does not have the attribute `data-ember-action`


