import config from "../config/environment";
import EventDispatcher from "ember-mobiletouch/overrides/event-dispatcher";
import CustomRecognizers from "../recognizers";


export default EventDispatcher.reopen({
  _mobileTouchCustomizations : config.mobileTouch,
  _customRecognizers : CustomRecognizers
});
