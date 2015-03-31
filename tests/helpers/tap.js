import desktopTap from './desktop-tap';
import mobileTap from './mobile-tap';
import mobileDetection from "ember-mobiletouch/utils/is-mobile";

// Tap using the event appropriate to the current IS_MOBILE value
export default function tap(selector) {
  if (mobileDetection.is()) {
    return mobileTap(selector);
  } else {
    return desktopTap(selector);
  }
}
