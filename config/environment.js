'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    version : "1.2.1",
    mobileTouch : {
      useGesturesHash : false,
      alwaysTapOnPress : false,
      defaultTapOnPress : true
    }
  };
};
