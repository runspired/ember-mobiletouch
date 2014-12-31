# Roadmap

`ember-mobiletouch` wants to become the ideal drop-in solution for handling touch regardless
of environment (desktop/mobile/cordova).  It's being developed in conjunction with apps that
support all three environments using `ember-cli-cordova`.  `1.0.x` series is nearly entirely
a port of the event system set up in those apps currently.

That system got us pretty far, but it has some performance issues that could be fixed by reducing
the number of Hammer instances generated, as well as some edge cases where nested Hammer instances
produce highly undesirable behavior.  It would also be nice to have an API more in line with 
Ember's conventions, which would also make it easier to prevent unintentional gesture collisions.

The current API (gestures hash) will continue to be supported until `2.0`.  It will be deprecated
in favor of an "ember-centric" approach in which gestures are sent as events, trigger handlers
found in `actions : {}` and can be targeted by action helpers `{{action 'myActionHandler' on='tap'}}`

`tap` will become the default action target (instead of `click`, which will be removed from Ember's
eventing along with other "platform specific" (mostly mouse) handlers.  `click` handlers and actions
with `target="click"` will give deprecation notices.



## 1.1
- [X] Prevent Ghost Clicks
- [?] Prevent HammerJS Tap firing twice
- [X] Gesture's in action helper `{{action 'myActionHandler' target='tap'}}`
- [X] Remove dependency on fastclick.js for a baked in implementation
- [X] Utilize a single global Hammer instance
- [X] Send gestures as Ember Events
- [X] Convert handlers for "click" to tap with deprecation notice
- [X] Demo page (for testing)
- [X] FEAT: EventManager support (add gestures to eventManager instead of directly to the view)
- [X] Either deprecate hammerAllow and hammerExclude or make them work on events defined directly on the view
- [X] action handlers utilize tap by default

## 1.2
- [ ] Fast focus on inputs on Cordova apps (`.focus()` available)
- [ ] Fast focus on inputs on mobile apps (`.focus()` broken in Safari)
- [ ] Add "fastClick" event (touchstart based implementation)

# 1.3
- [ ] Global Edge Gestures (based on relative coordinates `["top", "center"]` ),
- [ ] Multi-Touch Gestures (three finger and four finger swipes)

# 1.4
- [ ] FEAT: Trackpad gesture support?

# 1.5
- [-] PERF: Can we send events from hammer to Ember's delegator directly, or do we have to trigger the DOM events?

# 1.6
- [ ] Automated Tests

# 1.7
- [ ] Investigate this further: https://gist.github.com/weotch/5730563

## 2.0
- [ ] Remove Deprecated support for `gestures : {}` hash
