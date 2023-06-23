import {
  DeviceEventEmitter,
  Linking,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from "react-native";

const BlueshiftEventEmitter = new NativeEventEmitter(
  NativeModules.BlueshiftReactEventsManager
);

var Blueshift = {
  /**
   * Initialize the components of the Blueshift SDK. This mainly initializes the
   * event emitter instance to start firing the events when the app is ready to
   * receive them.
   *
   * Usage -
   * Blueshift.init();
   *
   */
  init: function () {
    if (Platform.OS === "android") {
      NativeModules.BlueshiftBridge.init();
    }
  },

  /**
   * Add event listener for a event name to listen to events fired by Blueshift SDK
   *
   * Usage -
   * Blueshift.addEventListener("PushNotificationClickedEvent", this.handlePush);
   *
   * @param {string} eventName    Name of event to listen to.
   * @param {function} callback    callback function to handle the event
   *
   */
  addEventListener: function (eventName, callback) {
    if (BlueshiftEventEmitter) {
      BlueshiftEventEmitter.addListener(eventName, callback);
    }

    if (Platform.OS === "android") {
      NativeModules.BlueshiftBridge.onAddEventListener(eventName);
    }
  },

  /**
   * Remove the event listener.
   *
   * Usage -
   * Blueshift.removeEventListener("PushNotificationClickedEvent");
   *
   * @param {string} eventName    Name of event remove the listener.
   *
   */
  removeEventListener: function (eventName) {
    if (BlueshiftEventEmitter) {
      BlueshiftEventEmitter.removeAllListeners(eventName);
    }
  },

  /**
   * Registers a page for showing in-app message.
   *
   * Usage -
   * Blueshift.registerForInAppMessage("IndexScreen");
   *
   * @param {string} screenName    Name of the screen.
   *
   */
  registerForInAppMessage: function (screenName) {
    NativeModules.BlueshiftBridge.registerForInAppMessage(screenName);
  },

  /**
   * Unregisters a page from showing in-app message.
   *
   * Usage -
   * Blueshift.unregisterForInAppMessage();
   *
   */
  unregisterForInAppMessage: function () {
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

  fetchInAppNotification: function () {
    NativeModules.BlueshiftBridge.fetchInAppNotification();
  },

  /**
   * Display in-app message if the current page is registered for in-app messages.
   *
   * Usage -
   * Blueshift.displayInAppNotification();
   *
   */

  displayInAppNotification: function () {
    NativeModules.BlueshiftBridge.displayInAppNotification();
  },

  /**
   * Sends an identify event with the details available.
   *
   * Usage -
   * Blueshift.Blueshift.identifyWithDetails({})
   *
   * @param {object} details   Additional params (if any)
   *
   */

  identifyWithDetails: function (details) {
    NativeModules.BlueshiftBridge.identifyWithDetails(details);
  },

  /**
   * Send any custom event to Blueshift.
   *
   * Usage -
   * Blueshift.trackCustomEvent("CustomEvent",{},false);
   *
   * @param {string} eventName    Name of the custom event.
   * @param {object} details      Additional params (if any).
   * @param {boolean} isBatch     Tells if this event can be batched or not.
   *
   */

  trackCustomEvent: function (eventName, details, isBatch) {
    NativeModules.BlueshiftBridge.trackCustomEvent(eventName, details, isBatch);
  },

  /**
   * Track screen view using Blueshift.
   *
   * Usage -
   * Blueshift.trackScreenView("IndexScreen",{},false);
   *
   * @param {string} screenName   Name of the screen to track.
   * @param {object} details      Additional params (if any).
   * @param {boolean} isBatch     Tells if this event can be batched or not.
   *
   */
  trackScreenView: function (screenName, details, isBatch) {
    NativeModules.BlueshiftBridge.trackScreenView(screenName, details, isBatch);
  },

  /**
   * Save email in the SDK.
   *
   * Usage -
   * Blueshift.setUserInfoEmailId("test@test.com");
   *
   * @param {string} emailId email of the customer.
   *
   */

  setUserInfoEmailId: function (emailId) {
    NativeModules.BlueshiftBridge.setUserInfoEmailId(emailId);
  },

  /**
   * Save customerId in the SDK.
   *
   * Usage -
   * Blueshift.setUserInfoCustomerId("cust123456");
   *
   * @param {string} customerId customerId of the customer.
   *
   */

  setUserInfoCustomerId: function (customerId) {
    NativeModules.BlueshiftBridge.setUserInfoCustomerId(customerId);
  },

  /**
   * Save firstname in the SDK.
   *
   * Usage -
   * Blueshift.setUserInfoFirstName("John");
   *
   * @param {string} firstname firstname of the customer.
   *
   */
  setUserInfoFirstName: function (firstname) {
    NativeModules.BlueshiftBridge.setUserInfoFirstName(firstname);
  },

  /**
   * Save lastname in the SDK.
   *
   * Usage -
   * Blueshift.setUserInfoLastName("Cartor");
   *
   * @param {string} lastname lastname of the customer.
   *
   */
  setUserInfoLastName: function (lastname) {
    NativeModules.BlueshiftBridge.setUserInfoLastName(lastname);
  },

  /**
   * Save additional user info in the SDK.
   *
   * Usage -
   * Blueshift.setUserInfoExtras({"profession":"software engineer", "usertype":"premium"});
   *
   * @param {object} extras additional user info.
   *
   */
  setUserInfoExtras: function (extras) {
    NativeModules.BlueshiftBridge.setUserInfoExtras(extras);
  },

  /**
   * Remove all the saved user info from the SDK.
   *
   * Usage -
   * Blueshift.removeUserInfo();
   *
   */
  removeUserInfo: function () {
    NativeModules.BlueshiftBridge.removeUserInfo();
  },

  /**
   * Enable/disable SDK's event tracking.
   *
   * Usage -
   * Blueshift.setEnableTracking(true);
   *
   * @param {boolean} enabled When true, tracking is enabled. When false, disabled.
   *
   */
  setEnableTracking: function (enabled) {
    NativeModules.BlueshiftBridge.setEnableTracking(enabled);
  },

  /**
   * Opt-in or opt-out of push notifications sent from Blueshift.
   *
   * Usage -
   * Blueshift.setEnablePush(true);
   *
   * @param {boolean} isEnabled When true, opt-in else opt-out.
   *
   */
  setEnablePush: function (isEnabled) {
    NativeModules.BlueshiftBridge.setEnablePush(isEnabled);
  },

  /**
   * Opt-in or opt-out of in-app notifications sent from Blueshift.
   *
   * Usage -
   * Blueshift.setEnableInApp(true);
   *
   * @param {boolean} isEnabled When true, opt-in else opt-out.
   *
   */
  setEnableInApp: function (isEnabled) {
    NativeModules.BlueshiftBridge.setEnableInApp(isEnabled);
  },

  /**
   * Set IDFA of the device in the Blueshift SDK.
   * Note - This is only applicable for the iOS devices.
   *
   * Usage -
   * Blueshift.setIDFA("EA7583CD-A667-48BC-B806-42ECB2B48606");
   *
   * @param {string} IDFAString IDFA value.
   *
   */
  setIDFA: function (IDFAString) {
    if (Platform.OS === "ios") {
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
  registerForRemoteNotification: function () {
    if (Platform.OS === "ios") {
      NativeModules.BlueshiftBridge.registerForRemoteNotification();
    }
  },

  /**
   * Set current location of the device in the Blueshift SDK.
   * Note - This is only applicable for the iOS devices.
   *
   * Usage -
   * Blueshift.setCurrentLocation(18.5245649,73.7228812);
   *
   * @param {Number} latitude location latitude value.
   * @param {Number} longitude location longitude value.
   *
   */
  setCurrentLocation: function (latitude, longitude) {
    if (Platform.OS === "ios") {
      NativeModules.BlueshiftBridge.setCurrentLocation(latitude, longitude);
    }
  },

  /**
   * Calls Blueshift's live content API with email and given slot name and live content context.
   *
   * Usage -
   *    Blueshift.getLiveContentByEmail("testSlot",{},(err,result) => {
   *         if (result) {
   *           console.log(result);
   *         } else {
   *           console.log(err);
   *         }
   *    });
   *
   * @param {string} slot slot name of the live content.
   * @param {object} lcContext live content context.
   * @param {function} callback callback function.
   *
   */
  getLiveContentByEmail: function (slot, lcContext, callback) {
    NativeModules.BlueshiftBridge.getLiveContentByEmail(
      slot,
      lcContext,
      callback
    );
  },

  /**
   * Calls Blueshift's live content API with customer id and given slot name and live content context.
   *
   * Usage -
   *    Blueshift.getLiveContentByCustomerId("testSlot",{},(err,result) => {
   *         if (result) {
   *           console.log(result);
   *         } else {
   *           console.log(err);
   *         }
   *    });
   *
   * @param {string} slot slot name of the live content.
   * @param {object} lcContext live content context.
   * @param {function} callback callback function.
   *
   */
  getLiveContentByCustomerId: function (slot, lcContext, callback) {
    NativeModules.BlueshiftBridge.getLiveContentByCustomerId(
      slot,
      lcContext,
      callback
    );
  },

  /**
   * Calls Blueshift's live content API with device id and given slot name and live content context.
   *
   * Usage -
   *    Blueshift.getLiveContentByDeviceId("testSlot",{},(err,result) => {
   *         if (result) {
   *           console.log(result);
   *         } else {
   *           console.log(err);
   *         }
   *    });
   *
   * @param {string} slot slot name of the live content.
   * @param {object} lcContext live content context.
   * @param {function} callback callback function.
   *
   */
  getLiveContentByDeviceId: function (slot, lcContext, callback) {
    NativeModules.BlueshiftBridge.getLiveContentByDeviceId(
      slot,
      lcContext,
      callback
    );
  },

  /**
   * Get opt-in or opt-out status of in-app notifications set in the SDK.
   *
   * Usage -
   *  Blueshift.getEnableInAppStatus((value) => {
   *       console.log("status"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getEnableInAppStatus: function (callback) {
    NativeModules.BlueshiftBridge.getEnableInAppStatus(callback);
  },

  /**
   * Get opt-in or opt-out status of push notifications set in the SDK.
   *
   * Usage -
   *  Blueshift.getEnablePushStatus((value) => {
   *       console.log("status"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getEnablePushStatus: function (callback) {
    NativeModules.BlueshiftBridge.getEnablePushStatus(callback);
  },

  /**
   * Get status of event tracking set in the SDK.
   *
   * Usage -
   *  Blueshift.getEnableTrackingStatus((value) => {
   *       console.log("status"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getEnableTrackingStatus: function (callback) {
    NativeModules.BlueshiftBridge.getEnableTrackingStatus(callback);
  },

  /**
   * Get email id string set in the SDK.
   *
   * Usage -
   *  Blueshift.getUserInfoEmailId((value) => {
   *       console.log("Email id"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getUserInfoEmailId: function (callback) {
    NativeModules.BlueshiftBridge.getUserInfoEmailId(callback);
  },

  /**
   * Get customer id string set in the SDK.
   *
   * Usage -
   *  Blueshift.getUserInfoCustomerId((value) => {
   *       console.log("Customer id"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getUserInfoCustomerId: function (callback) {
    NativeModules.BlueshiftBridge.getUserInfoCustomerId(callback);
  },

  /**
   * Get first name string set in the SDK.
   *
   * Usage -
   *  Blueshift.getUserInfoFirstName((value) => {
   *       console.log("First name"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getUserInfoFirstName: function (callback) {
    NativeModules.BlueshiftBridge.getUserInfoFirstName(callback);
  },

  /**
   * Get last name string set in the SDK.
   *
   * Usage -
   *  Blueshift.getUserInfoLastName((value) => {
   *       console.log("Last name"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getUserInfoLastName: function (callback) {
    NativeModules.BlueshiftBridge.getUserInfoLastName(callback);
  },

  /**
   * Get extras JSON data set in the SDK.
   *
   * Usage -
   *  Blueshift.getUserInfoExtras((value) => {
   *       console.log("Extras"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getUserInfoExtras: function (callback) {
    NativeModules.BlueshiftBridge.getUserInfoExtras(callback);
  },

  /**
   * Get current device id string used by the SDK.
   *
   * Usage -
   *  Blueshift.getCurrentDeviceId((value) => {
   *       console.log("Device id"+value);
   *   });
   *
   * @param {function} callback success callback.
   *
   */
  getCurrentDeviceId: function (callback) {
    NativeModules.BlueshiftBridge.getCurrentDeviceId(callback);
  },

  /**
   * Sync Blueshift Inbox messages on the local cache.
   * This will sync new messges, delete the expired messages, and update the unread status
   * of the message to the locally cached messges.
   *
   * Usage -
   * Blueshift.syncInboxMessages((status) => {
   *    if (status) {
   *        console.log("sync complete");
   *    }
   *   });
   */
  syncInboxMessages: function (callback) {
    NativeModules.BlueshiftBridge.syncInboxMessages(callback);
  },

  /**
   * Get unread messages count to show on the notification badge.
   *
   * Usage -
   * Blueshift.getUnreadInboxMessageCount((count) => {
   *       console.log("unread messages count"+count);
   *   });
   */
  getUnreadInboxMessageCount: function (callback) {
    NativeModules.BlueshiftBridge.getUnreadInboxMessageCount(callback);
  },

  /**
   * Get inbox messages list to show in the list view.
   *
   * Usage -
   * Blueshift.getInboxMessages((messages) => {
   *       console.log("unread messages count"+count);
   *   });
   */
  getInboxMessages: function (callback) {
    NativeModules.BlueshiftBridge.getInboxMessages((messages) => {
      callback(messages);
    });
  },

  /**
   * Show in-app notification for the Inbox message.
   *
   * @param {BlueshiftInboxMessage} message
   *
   * Usage -
   * Blueshift.showInboxMessage();
   */
  showInboxMessage: function (message) {
    NativeModules.BlueshiftBridge.showInboxMessage(message);
  },

  /**
   * Delete inbox message.
   *
   * @param {BlueshiftInboxMessage} message
   *
   * Usage -
   * Blueshift.deleteInboxMessage();
   */
  deleteInboxMessage: function (message) {
    NativeModules.BlueshiftBridge.deleteInboxMessage(message);
  },

  /**
   * Process the Blueshift url and provide the final url to Linking's "url" callback
   *
   * @param {string} url
   *
   */
  processBlueshiftUrl: function (url) {
    if (Platform.OS === "android") {
      NativeModules.BlueshiftBridge.processBlueshiftUrl(url);
    }
  },

  /**
   * Checks if the given Url is of Blueshift's format.
   *
   * @param {string} url
   */
  isBlueshiftUrl: function (url) {
    if (url) {
      let hasBlueshiftPath = url.includes("/track") || url.includes("/z/");
      let hasBlueshiftArgs =
        url.includes("eid=") || (url.includes("mid=") && url.includes("uid="));

      return hasBlueshiftPath && hasBlueshiftArgs;
    } else {
      console.log("Blueshift: The URL is null.");
    }

    return false;
  },
};

module.exports = Blueshift;
