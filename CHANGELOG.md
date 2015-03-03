#Changelog

## 1.4.0

While loaded with some great new features, the main attraction is an internal refactor that improves
testability and maintainability.  This refactor produces one major change in `config` settings.
A shim has been put into place to continue to support user's using the original way the config worked.

- [FEAT] Fast focus on inputs on mobile web / Cordova apps.
- [FEAT] Custom recognizers: Multi-Touch Gestures (e.g. 2/3/4 finger swipes) and doubleTap can be achieved via custom recognizers added in recognizers.js
- [FIX] submit buttons on mobile keyboards will now work correctly.
- [FIX] clicks are not busted on links with custom protocols (e.g. mailto: tel:)
- [FEAT] adding the `allow-click` class to a link or button will prevent click busting.
- [FEAT] mixins are now available for enabling vertical pan/swipe without breaking scrolling.
- [FEAT] if you are using `ENV.mobileTouch.events`, this property is now an array of default ember events to disable.
- [BREAKING] the default config for swipe and pan will now prevent vertical panning/swiping so as to not break scroll.

In order to make testing easier, we now reopen the EventManager instead of extending it.  This means we subtract events
from Ember's existing events instead of merely defining all our own.  `ENV.mobileTouch.events` should now be an
array containing only those events you wish to remove from Ember's defauly eventing.  This has the added benefit of
making configuration in this area easier.

In order to be backwards compatible, a shim has been included.  When `ENV.mobileTouch.events` is defined as an
object, the events in that object are diffed with Ember's default events and the difference is used to determine
which default events are ignored.



## 1.3.2
- [FIX] HTMLBars support

## 1.3.1
- [FIX] brings in `defaultTapOnPress` (meant to be included in 1.3.0)

## 1.3.0
- [FIX] Thanks to @huafu who identified and fixed an issue preventing action params from being sent with the action
- [DOC] Better documentation of configuration (more coming)
- [FEAT] `alwaysTapOnPress` is now fully implemented, when true press events are aliased to tap events
- [FIX] `defaultTapOnPress` is now sent to linkView instead of `alwaysTapOnPress`
- [BREAKING] `pinch` and `rotate` are no longer recognized by default.
- [FEAT] `ENV.mobileTouch.tune` can now be used to add customized recognizer settings.
- [BREAKING] As part of the new recognizer tune-ability, recognizer defaults have been changed (see below).


**About Breaking Change 1:** In the previously poorly documented configuration options, `ENV.mobileTouch.use = ['tap', 'press']` should have
stated `tap` and `press` as the only recognizers added by default.  This is for performance reasons.  Unfortunately, neither
the docs nor the code actually implemented this intention properly, so until 2.0, the default recognizers will be
`['tap', 'press', 'swipe', 'pan']`.  `pinch` and `rotate` have been removed as Hammer's implementation of them is very
buggy.  If your implementation was relying on `pinch` or `rotate`, you simply need to add the following to your config
for mobileTouch.  `ENV.mobileTouch.use = ['tap', 'press', 'swipe', 'pan', 'pinch', 'rotate'];`

**About Breaking Change 2:** Hammer's default settings for tap and press leave a gap in which a user can perform an
action but no gesture will be recognized.  Specifically, tap events time out at 250ms but press events don't begin
until 500ms.  While this gap is small, we noticed a high incidence of failed taps because of it.  **Press now triggers
at 251ms, instead of 500ms.**

Similarly, Hammer doesn't begin recognizing `pan` or `swipe` until 10px of movement have occurred (we adjusted swipe
to 25px from the beginning).  However, the default movement allowed for tap was 2px and for press 5px.  This again
left an error zone in which someone would trigger no behavior at all.  We observed that clientele with less stable hands
or whom tapped / pressed from the side of their finger would often record too much movement to trigger tap or press.
For this reason, **tap and press now allow up to 9px of movement by default**


## 1.2.2
- [FIX] fix issue from 1.2.1 which removed gestures from eventing


## 1.2.1 - BAD RELEASE, DO NOT USE THIS VERSION
- [FIX] bubble events correctly, cancel events correctly, don't merge final events into the defaultConfig object


## 1.2.0
- [FEAT] option "alwaysTapOnPress" causes linkView to trigger on tap (much more coming with this feature).
- [DEPRECATE] hammerAllow and hammerExclude are now gestureAllow and gestureExclude, support for the other will be removed in 2.0.
- [FIX] filters will no longer fail to review the view element itself if targeted.
- [FIX] fixes bug where `View.__useGesturesHash` was always null 
- [FIX] `__executeGestureWithFilters` returns false after it runs a handler
- [FIX] non gesture events are not sent through `__filterTouchableElements`


## 1.1.0

- [Fix] Prevent Ghost Clicks
- [Fix] Prevent HammerJS Tap firing twice
- [FEATURE] Gesture's in action helper `{{action 'myActionHandler' on='swipeLeft'}}`
- [FEATURE] Remove dependency on fastclick.js for a baked in implementation
- [PERF] Utilize a single global Hammer instance
- [PERF/FEATURE] Send gestures as Ember Events
- [DEPRECATE] Convert handlers for "click" to tap with deprecation notice
- Demo page (for testing)
- EventManager support (add gestures to eventManager instead of directly to the view)
- [FEATURE] hammerAllow and hammerExclude work on events defined directly on the view, in gestures, or in eventManager
- [FEATURE] action handlers utilize tap by default
- [PERF] The Gestures Mixin no longer sets up / tears down a Hammer instance
- [BREAKING] hammerOptions on a View/Component has been replaced by global options set in `ENV.mobileTouch.options`


## 1.0.6

[BREAKING] `setupGestures` and `teardownGestures` are now private (begin with `_`) methods on the mixin.


## 1.0.5

[BREAKING] `hammerFilter` is now `hammerAllow`.  This should always have been the case. Docs have read `hammerAllow`
