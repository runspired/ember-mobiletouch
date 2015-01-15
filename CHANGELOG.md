#Changelog

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

## 1.2.0
- [FEAT] option "alwaysTapOnPress" causes linkView to trigger on tap (much more coming with this feature).
- [DEPRECATE] hammerAllow and hammerExclude are now gestureAllow and gestureExclude, support for the other will be removed in 2.0.
- [FIX] filters will no longer fail to review the view element itself if targeted.
- [FIX] fixes bug where `View.__useGesturesHash` was always null 
- [FIX] `__executeGestureWithFilters` returns false after it runs a handler
- [FIX] non gesture events are not sent through `__filterTouchableElements`

## 1.2.1 - BAD RELEASE, DO NOT USE THIS VERSION
- [FIX] bubble events correctly, cancel events correctly, don't merge final events into the defaultConfig object

## 1.2.2
- [FIX] fix issue from 1.2.1 which removed gestures from eventing
