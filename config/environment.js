'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    version : "1.3.1",
    mobileTouch : {
      useGesturesHash : false,
      alwaysTapOnPress : false,
      defaultTapOnPress : true
    }
  };
};
