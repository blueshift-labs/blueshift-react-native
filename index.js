import { DeviceEventEmitter, Linking, NativeEventEmitter, NativeModules, Platform } from 'react-native';

const BlueshiftEventEmitter = NativeModules.BlueshiftReactEventsManager ? new NativeEventEmitter(NativeModules.BlueshiftReactEventsManager) : DeviceEventEmitter;

var Blueshift = {

    /**
     * Add event listener for a event name to listen to events fired by Blueshift SDK
     *
     * @param {string} eventName    Name of event to listen to.
     * @param {function} callback    callback function to handle the event
     *
     * Usage - 
     * Blueshift.addEventListener("PushNotificationClickedEvent", this.handlePush);
     * 
     */
    addEventListener: function(eventName, callback) {
        if (BlueshiftEventEmitter) {
            BlueshiftEventEmitter.addListener(eventName, callback);
        }

        if (Platform.OS === 'android') {
            NativeModules.BlueshiftBridge.onAddEventListener(eventName);      
        }
    },

    /**
     * Remove the event listener.
     *
     * @param {string} eventName    Name of event remove the listener.
     *
     * Usage - 
     * Blueshift.removeEventListener("PushNotificationClickedEvent");
     * 
     */
    removeEventListener: function(eventName) {
        if (BlueshiftEventEmitter) {
            BlueshiftEventEmitter.removeAllListeners(eventName);
        }
    },

    /**
     * Registers a page for showing in-app message.
     *
     * @param {String} screenName    Name of the screen.
     *
     * Usage - 
     * Blueshift.registerForInAppMessage("IndexScreen");
     * 
     */
    registerForInAppMessage: function(screenName) {
        NativeModules.BlueshiftBridge.registerForInAppMessage(screenName);
    },

    /**
     * Unregisters a page from showing in-app message.
     *
     * Usage - 
     * Blueshift.unregisterForInAppMessage();
     * 
     */
    unregisterForInAppMessage: function() {
        NativeModules.BlueshiftBridge.unregisterForInAppMessage();
    },

    /**
     * Fetches in-app messages from the Blueshift API and provides them in the callbacks.
     * 
     *
     * Usage - 
     * Blueshift.fetchInAppNotification();
     * 
     */

    fetchInAppNotification: function() {
        NativeModules.BlueshiftBridge.fetchInAppNotification();
    },

    /**
     * Display in-app message if the current page is registered for in-app messages.
     *
     * Usage - 
     * Blueshift.displayInAppNotification();
     * 
     */

    displayInAppNotification: function() {
        NativeModules.BlueshiftBridge.displayInAppNotification();
    },

    /**
     * Sends an identify event with the details available.
     * 
     * @param {Object} extras   Additional params (if any)
     *
     * Usage - 
     * Blueshift.Blueshift.identifyWithDetails({})
     * 
     */

    identifyWithDetails: function(details) {
        NativeModules.BlueshiftBridge.identifyWithDetails(details);
    },

    /**
     * Send any custom event to Blueshift.
     * 
     * @param {String} eventName    Name of the custom event.
     * @param {Object} extras       Additional params (if any).
     * @param {Boolean} canBatch    Tells if this event can be batched or not.
     *
     * Usage - 
     * Blueshift.trackCustomEvent("CustomEvent",{},false);
     * 
     */

    trackCustomEvent: function(eventName, details, isBatch) {
        NativeModules.BlueshiftBridge.trackCustomEvent(eventName, details, isBatch);
    },

    /**
     * Track screen view using Blueshift.
     * 
     * @param {String} screenName   Name of the screen to track.
     * @param {Object} extras       Additional params (if any).
     * @param {Boolean} canBatch    Tells if this event can be batched or not.
     *
     * Usage - 
     * Blueshift.trackScreenView("IndexScreen",{},false);
     * 
     */
    trackScreenView: function(screenName, details, isBatch) {
        NativeModules.BlueshiftBridge.trackScreenView(screenName, details, isBatch);
    },


    /**
     * Save email in the SDK.
     * 
     * @param {String} email email of the customer.
     *
     * Usage - 
     * Blueshift.setUserInfoEmailId("test@test.com");
     * 
     */

    setUserInfoEmailId: function(emailId) {
        NativeModules.BlueshiftBridge.setUserInfoEmailId(emailId);
    },

    /**
     * Save customerId in the SDK.
     * 
     * @param {String} customerId customerId of the customer.
     *
     * Usage - 
     * Blueshift.setUserInfoCustomerId("cust123456");
     * 
     */

    setUserInfoCustomerId: function(customerId) {
        NativeModules.BlueshiftBridge.setUserInfoCustomerId(customerId);
    },

    /**
     * Save firstname in the SDK.
     * 
     * @param {String} firstname firstname of the customer.
     *
     * Usage - 
     * Blueshift.setUserInfoFirstName("John");
     * 
     */
    setUserInfoFirstName: function(firstname) {
        NativeModules.BlueshiftBridge.setUserInfoFirstName(firstname);
    },

    /**
     * Save lastname in the SDK.
     * 
     * @param {String} lastname lastname of the customer.
     *
     * Usage - 
     * Blueshift.setUserInfoLastName("Cartor");
     * 
     */
    setUserInfoLastName: function(lastname) {
        NativeModules.BlueshiftBridge.setUserInfoLastName(lastname);
    },

    /**
     * Save additional user info in the SDK.
     * 
     * @param {Object} extras additional user info.
     *
     * Usage - 
     * Blueshift.setUserInfoExtras({"profession":"software engineer", "usertype":"premium"});
     * 
     */
    setUserInfoExtras: function(extras) {
        NativeModules.BlueshiftBridge.setUserInfoExtras(extras);
    },

    /**
     * Remove all the saved user info from the SDK.
     *
     * Usage - 
     * Blueshift.removeUserInfo();
     * 
     */
    removeUserInfo: function() {
        NativeModules.BlueshiftBridge.removeUserInfo();
    },

    /**
     * Enable/disable SDK's event tracking.
     * 
     * @param {Boolean} enabled When true, tracking is enabled. When false, disabled.
     *
     * Usage - 
     * Blueshift.setEnableTracking(true);
     * 
     */
     setEnableTracking: function(enabled) {
        NativeModules.BlueshiftBridge.setEnableTracking(enabled);
    },

    /**
     * Opt-in or opt-out of push notifications sent from Blueshift.
     * 
     * @param {Boolean} enabled When true, opt-in else opt-out.
     *
     * Usage - 
     * Blueshift.setEnablePush(true);
     * 
     */
    setEnablePush: function(isEnabled) {
        NativeModules.BlueshiftBridge.setEnablePush(isEnabled);
    },

    /**
     * Opt-in or opt-out of in-app notifications sent from Blueshift.
     * 
     * @param {Boolean} enabled When true, opt-in else opt-out.
     *
     * Usage - 
     * Blueshift.setEnableInApp(true);
     * 
     */

    setEnableInApp: function(isEnabled) {
        NativeModules.BlueshiftBridge.setEnableInApp(isEnabled);
    },

    /**
     * Set IDFA of the device in the Blueshift SDK.
     * Note - This is only applicable for the iOS devices.
     *
     * @param {String} IDFAString IDFA value.
     *
     * Usage - 
     * Blueshift.setIDFA("EA7583CD-A667-48BC-B806-42ECB2B48606");
     * 
     */
    setIDFA: function(IDFAString) {
        if (Platform.OS === 'ios') {
            NativeModules.BlueshiftBridge.setIDFA(IDFAString);
        }
    },

    /**
     * Register for remote notifications using SDK. Calling this method will show push permission dialogue to the user.
     * Note - This is only applicable for the iOS devices.
     *
     * Usage - 
     * Blueshift.registerForRemoteNotification();
     * 
     */

    registerForRemoteNotification: function() {
        if (Platform.OS === 'ios') {
            NativeModules.BlueshiftBridge.registerForRemoteNotification();
        }
    },

    /**
     * Set current location of the device in the Blueshift SDK.
     * Note - This is only applicable for the iOS devices.
     *
     * @param {double} latitude location latitude value.
     * @param {double} longitude location longitude value.
     *
     * Usage - 
     * Blueshift.setCurrentLocation(18.5245649,73.7228812);
     * 
     */
    setCurrentLocation: function(latitude, longitude) {
        if (Platform.OS === 'ios') {
            NativeModules.BlueshiftBridge.setCurrentLocation(latitude, longitude)
        }
    },

    /**
     * Calls Blueshift's live content API with email and given slot name and live content context.
     * 
     * @param {String} slot slot name of the live content.
     * @param {Object} lcContext live content context.
     * @param {function} callback callback function.
     *
     * Usage - 
     *    Blueshift.getLiveContentByEmail("testSlot",{},(err,result) => {
     *         if (result) {
     *           console.log(result);
     *         } else {
     *           console.log(err);
     *         }
     *    });
     */  
    getLiveContentByEmail: function(slot, lcContext, callback) {
        NativeModules.BlueshiftBridge.getLiveContentByEmail(slot,lcContext,callback);
    },

    /**
     * Calls Blueshift's live content API with customer id and given slot name and live content context.
     * 
     * @param {String} slot slot name of the live content.
     * @param {Object} lcContext live content context.
     * @param {function} callback callback function.
     *
     * Usage - 
     *    Blueshift.getLiveContentByCustomerId("testSlot",{},(err,result) => {
     *         if (result) {
     *           console.log(result);
     *         } else {
     *           console.log(err);
     *         }
     *    });
     */  
    getLiveContentByCustomerId: function(slot, lcContext, callback) {
        NativeModules.BlueshiftBridge.getLiveContentByCustomerId(slot,lcContext,callback);
    },

    /**
     * Calls Blueshift's live content API with device id and given slot name and live content context.
     * 
     * @param {String} slot slot name of the live content.
     * @param {Object} lcContext live content context.
     * @param {function} callback callback function.
     *
     * Usage - 
     *    Blueshift.getLiveContentByDeviceId("testSlot",{},(err,result) => {
     *         if (result) {
     *           console.log(result);
     *         } else {
     *           console.log(err);
     *         }
     *    });
     */    
     getLiveContentByDeviceId: function(slot, lcContext, callback) {
        NativeModules.BlueshiftBridge.getLiveContentByDeviceId(slot,lcContext,callback);
    },

    /**
     * Get opt-in or opt-out status of in-app notifications set in the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getEnableInAppStatus((value) => {
     *       console.log("status"+value);
     *   });
     */
    getEnableInAppStatus: function(callback) {
        NativeModules.BlueshiftBridge.getEnableInAppStatus(callback);
    },

    /**
     * Get opt-in or opt-out status of push notifications set in the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getEnablePushStatus((value) => {
     *       console.log("status"+value);
     *   });
     */
    getEnablePushStatus: function(callback) {
        NativeModules.BlueshiftBridge.getEnablePushStatus(callback);
    },

    /**
     * Get status of event tracking set in the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getEnableTrackingStatus((value) => {
     *       console.log("status"+value);
     *   });
     */
    getEnableTrackingStatus: function(callback) {
        NativeModules.BlueshiftBridge.getEnableTrackingStatus(callback);
    },

    /**
     * Get email id string set in the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getUserInfoEmailId((value) => {
     *       console.log("Email id"+value);
     *   });
     */
    getUserInfoEmailId: function(callback) {
        NativeModules.BlueshiftBridge.getUserInfoEmailId(callback);
    },

    /**
     * Get customer id string set in the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getUserInfoCustomerId((value) => {
     *       console.log("Customer id"+value);
     *   });
     */
    getUserInfoCustomerId: function(callback) {
        NativeModules.BlueshiftBridge.getUserInfoCustomerId(callback);
    },

    /**
     * Get first name string set in the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getUserInfoFirstName((value) => {
     *       console.log("First name"+value);
     *   });
     */
    getUserInfoFirstName: function(callback) {
        NativeModules.BlueshiftBridge.getUserInfoFirstName(callback);
    },

    /**
     * Get last name string set in the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getUserInfoLastName((value) => {
     *       console.log("Last name"+value);
     *   });
     */
    getUserInfoLastName: function(callback) {
        NativeModules.BlueshiftBridge.getUserInfoLastName(callback);
    },

    /**
     * Get extras JSON data set in the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getUserInfoExtras((value) => {
     *       console.log("Extras"+value);
     *   });
     */
    getUserInfoExtras: function(callback) {
        NativeModules.BlueshiftBridge.getUserInfoExtras(callback);
    },

    /**
     * Get current device id string used by the SDK.
     *
     * @param {function} success success callback.
     *
     * Usage - 
     *  Blueshift.getCurrentDeviceId((value) => {
     *       console.log("Device id"+value);
     *   });
     */
    getCurrentDeviceId: function(callback) {
        NativeModules.BlueshiftBridge.getCurrentDeviceId(callback);
    },

     /**
     * Process the Blueshift url and provide the final url to Linking's "url" callback
     * 
     * @param {String} url 
     */
    processBlueshiftUrl: function(url) {
        if (Platform.OS === 'android') {
            NativeModules.BlueshiftBridge.processBlueshiftUrl(url);
        }
    },

    /**
     * Checks if the given Url is of Blueshift's format.
     * 
     * @param {String} url 
     */
    isBlueshiftUrl: function(url) {
        if (url) {
            let hasBlueshiftPath =  url.includes("/track") || url.includes("/z/");
            let hasBlueshiftArgs =  url.includes("eid=") || (url.includes("mid=") && url.includes("uid="));

            return hasBlueshiftPath && hasBlueshiftArgs;
        } else {
            console.log("Blueshift: The URL is null.")
        }

        return false;
    },
}


module.exports = Blueshift;