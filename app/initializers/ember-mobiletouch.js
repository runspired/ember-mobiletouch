import config from '../config/environment'; //get ENV.mobileTouch
import defaultConfig from 'ember-mobiletouch/default-config';

//activate overrides
import ModifiedView from 'ember-mobiletouch/overrides/view';
import ModifiedComponent from 'ember-mobiletouch/overrides/component';
import ModifiedCheckbox from 'ember-mobiletouch/overrides/checkbox';
import ModifiedLinkView from 'ember-mobiletouch/overrides/link-view';
import ModifiedEventDispatcher from '../overrides/ember-mobiletouch';
import ModifiedActionHelper from 'ember-mobiletouch/overrides/action-helper';


export default {

  name: 'mobiletouch',

  initialize: function() {

    var mergedConfig = Ember.merge({}, defaultConfig, config);

    //add config settings to overrides
    ModifiedView.reopen({ __useGesturesHash : mergedConfig.useGesturesHash });
    ModifiedComponent.reopen({ __useGesturesHash : mergedConfig.useGesturesHash });
    ModifiedCheckbox.reopen({ __useGesturesHash : mergedConfig.useGesturesHash });
    ModifiedLinkView.reopen({ __defaultTapOnPress : mergedConfig.defaultTapOnPress });

  }
};
