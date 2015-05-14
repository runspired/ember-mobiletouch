'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    version : "2.0.0-beta.1",
    mobileTouch : {
      useGesturesHash : false,
      alwaysTapOnPress : false,
      defaultTapOnPress : true
    }
  };
};
