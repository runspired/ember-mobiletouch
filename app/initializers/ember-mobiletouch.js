import config from '../config/environment'; //get ENV.mobileTouch
import defaultConfig from 'ember-mobiletouch/default-config';

//activate overrides
import ModifiedView from 'ember-mobiletouch/overrides/view';
import ModifiedLinkTo from 'ember-mobiletouch/overrides/link-to';
import ModifiedEventDispatcher from '../overrides/ember-mobiletouch';
import ModifiedActionHelper from 'ember-mobiletouch/overrides/action-helper';


export default {

  name: 'mobiletouch',

  initialize: function() {

    var mergedConfig = Ember.merge({}, defaultConfig, config);

    //add config settings to overrides
    ModifiedView.reopen({ __useGesturesHash : mergedConfig.useGesturesHash });

  }
};
