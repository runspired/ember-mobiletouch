import config from "../config/environment";
import EventManager from "ember-mobiletouch/overrides/event-manager";

export default EventManager.reopen({ _mobileTouchCustomizations : config });
