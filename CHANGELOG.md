#Changelog

## 1.1.0

- [Fix] Prevent Ghost Clicks
- [Fix] Prevent HammerJS Tap firing twice
- [FEATURE] Gesture's in action helper `{{action 'myActionHandler' target='tap'}}`
- [FEATURE] Remove dependency on fastclick.js for a baked in implementation
- [PERF] Utilize a single global Hammer instance
- [PERF/FEATURE] Send gestures as Ember Events
- [DEPRECATE] Convert handlers for "click" to tap with deprecation notice
- Demo page (for testing)
- EventManager support (add gestures to eventManager instead of directly to the view)
- [FEATURE] hammerAllow and hammerExclude work on events defined directly on the view, in gestures, or in eventManager
- [FEATURE] action handlers utilize tap by default
- The Gestures Mixin no longer sets up / tears down a Hammer instance
- [BREAKING] hammerOptions on a View/Component has been replaced by global options set in `ENV.mobileTouch.options`

## 1.0.6

[BREAKING] `setupGestures` and `teardownGestures` are now private (begin with `_`) methods on the mixin.

## 1.0.5

[BREAKING] `hammerFilter` is now `hammerAllow`.  This should always have been the case. Docs have read `hammerAllow`
