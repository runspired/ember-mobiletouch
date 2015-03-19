var IS_MOBILE;

// Set our belief about whether the devise is mobile by inspecting ontouchstart
var detectMobile = function() {
  IS_MOBILE = !!("ontouchstart" in window);
};

// Return the current belief about whether the browser is mobile.
var isMobile = function() {
  return IS_MOBILE;
};

// This will generally only be done in tests.
var fakeMobile = function(value) {
  IS_MOBILE = value;
};

// Set the initial value of IS_MOBILE so that calls to isMobile will have
// the correct value.
detectMobile();

export {
  detectMobile,
  isMobile,
  fakeMobile
};
