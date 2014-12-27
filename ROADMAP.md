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
found in `actions : {}` and can be targeted by action helpers `{{action 'myActionHandler' target='tap'}}`

`tap` will become the default action target (instead of `click`, which will be removed from Ember's
eventing along with other "platform specific" (mostly mouse) handlers.  `click` handlers and actions
with `target="click"` will give deprecation notices.



## 1.1
- [ ] Prevent Ghost Clicks
- [ ] Prevent HammerJS Tap firing twice
- [ ] Fast focus on inputs on Cordova apps (`.focus()` available)
- [ ] Fast focus on inputs on mobile apps (`.focus()` broken in Safari)
- [ ] Demo page (for testing)

## 1.2
- [ ] Remove dependency on fastclick.js for a baked in implementation
- [ ] Add "fastClick" event (touchstart based implementation)

## 1.3
- [ ] Utilize a single global Hammer instance
- [ ] Send gestures as Ember Events
- [ ] Convert handlers for "click" to tap with deprecation notice

# 1.4
- [ ] 

# 1.5
- [ ] Global Edge Gestures (based on relative coordinates `["top", "center"]` ),
- [ ] Multi-Touch Gestures (three finger and four finger swipes)

# 1.6
- [ ] Gesture's in action helper `{{action 'myActionHandler' target='tap'}}`

# 1.7
- [ ] Trackpad gesture support?

## 2.0
- [ ] Remove Deprecated support for `gestures : {}` hash
