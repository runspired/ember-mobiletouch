import config from "../config/environment";
import EventManager from "ember-mobiletouch/overrides/event-manager";
import CustomRecognizers from "../recognizers";


export default EventManager.reopen({
  _mobileTouchCustomizations : config,
  _customRecognizers : CustomRecognizers
});
