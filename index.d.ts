declare module 'blueshift-react-native' {

	/**
	 * Initialise the plugin components when React Native is ready and loaded.
	 * 
	 * Usage -
	 * Blueshift.init();
	 */
	function init(): void;

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
	function addEventListener(eventName : string, callback : any): void;
		
	/**
	 * Remove the event listener.
	 * 
	 * Usage -
	 * Blueshift.removeEventListener("PushNotificationClickedEvent");
	 * 
	 * @param {string} eventName    Name of event remove the listener.
	 * 
	 */
	function removeEventListener(eventName : string): void;
		
	/**
	 * Registers a page for showing in-app message.
	 * 
	 * Usage -
	 * Blueshift.registerForInAppMessage("IndexScreen");
	 * 
	 * @param {string} screenName    Name of the screen.
	 * 
	 */
	function registerForInAppMessage(screenName : string): void;
		
	/**
	 * Get registered screen name for in-app messages.
	 *
	 * Usage -
	 * Blueshift.getRegisteredForInAppScreenName(screenName = {
	 * 	console.log("registered screen name - " + screenName);
	 * });
	 *
	 */
	function getRegisteredForInAppScreenName(callback : function): void;

	/**
	 * Unregisters a page from showing in-app message.
	 * 
	 * Usage -
	 * Blueshift.unregisterForInAppMessage();
	 */
	function unregisterForInAppMessage(): void;
		
	/**
	 * Fetches in-app messages from the Blueshift API and provides them in the callbacks.
	 * 
	 * 
	 * Usage -
	 * Blueshift.fetchInAppNotification();
	 */
	function fetchInAppNotification(): void;
		
	/**
	 * Display in-app message if the current page is registered for in-app messages.
	 * 
	 * Usage -
	 * Blueshift.displayInAppNotification();
	 */
	function displayInAppNotification(): void;
		
	/**
	 * Sends an identify event with the details available.
	 * 
	 * Usage -
	 * Blueshift.Blueshift.identifyWithDetails({})
	 * 
	 * @param {object} details   Additional params (if any)
	 * 
	 */
	function identifyWithDetails(details : any): void;
		
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
	function trackCustomEvent(eventName : string, details : any, isBatch : boolean): void;
		
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
	function trackScreenView(screenName : string, details : any, isBatch : boolean): void;
		
	/**
	 * Save email in the SDK.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoEmailId("test@test.com");
	 * 
	 * @param {string} emailId email of the customer.
	 * 
	 */
	function setUserInfoEmailId(emailId : string): void;
		
	/**
	 * Save customerId in the SDK.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoCustomerId("cust123456");
	 * 
	 * @param {string} customerId customerId of the customer.
	 * 
	 */
	function setUserInfoCustomerId(customerId : string): void;
		
	/**
	 * Save firstname in the SDK.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoFirstName("John");
	 * 
	 * @param {string} firstname firstname of the customer.
	 * 
	 */
	function setUserInfoFirstName(firstname : string): void;
		
	/**
	 * Save lastname in the SDK.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoLastName("Cartor");
	 * 
	 * @param {string} lastname lastname of the customer.
	 * 
	 */
	function setUserInfoLastName(lastname : string): void;
		
	/**
	 * Save additional user info in the SDK.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoExtras({"profession":"software engineer", "usertype":"premium"});
	 * 
	 * @param {object} extras additional user info.
	 * 
	 */
	function setUserInfoExtras(extras : any): void;
		
	/**
	 * Remove all the saved user info from the SDK.
	 * 
	 * Usage -
	 * Blueshift.removeUserInfo();
	 */
	function removeUserInfo(): void;
		
	/**
	 * Enable/disable SDK's event tracking.
	 * 
	 * Usage -
	 * Blueshift.setEnableTracking(true);
	 * 
	 * @param {boolean} enabled When true, tracking is enabled. When false, disabled.
	 * 
	 */
	function setEnableTracking(enabled : boolean): void;
		
	/**
	 * Opt-in or opt-out of push notifications sent from Blueshift.
	 * 
	 * Usage -
	 * Blueshift.setEnablePush(true);
	 * 
	 * @param {boolean} isEnabled When true, opt-in else opt-out.
	 * 
	 */
	function setEnablePush(isEnabled : boolean): void;
		
	/**
	 * Opt-in or opt-out of in-app notifications sent from Blueshift.
	 * 
	 * Usage -
	 * Blueshift.setEnableInApp(true);
	 * 
	 * @param {boolean} isEnabled When true, opt-in else opt-out.
	 * 
	 */
	function setEnableInApp(isEnabled : boolean): void;
		
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
	function setIDFA(IDFAString : string): void;
		
	/**
	 * Registers the app for remote notifications on iOS and on Android 13 and above.
	 * Usage -
	 * Blueshift.registerForRemoteNotification();
	 */
	function registerForRemoteNotification(): void;
		
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
	function setCurrentLocation(latitude : number, longitude : number): void;
		
	/**
	 * Calls Blueshift's live content API with email and given slot name and live content context.
	 * 
	 * Usage -
	 *    Blueshift.getLiveContentByEmail("testSlot",{},(err:any,result:any) => {
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
	function getLiveContentByEmail(slot : string, lcContext : any, callback : function): void;
		
	/**
	 * Calls Blueshift's live content API with customer id and given slot name and live content context.
	 * 
	 * Usage -
	 *    Blueshift.getLiveContentByCustomerId("testSlot",{},(err:any,result:any) => {
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
	function getLiveContentByCustomerId(slot : string, lcContext : any, callback : function): void;
		
	/**
	 * Calls Blueshift's live content API with device id and given slot name and live content context.
	 * 
	 * Usage -
	 *    Blueshift.getLiveContentByDeviceId("testSlot",{}(err:any,result:any) => {
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
	function getLiveContentByDeviceId(slot : string, lcContext : any, callback : function): void;
		
	/**
	 * Get opt-in or opt-out status of in-app notifications set in the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getEnableInAppStatus((value: boolean) => {
	 *       console.log("status"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getEnableInAppStatus(callback : function): void;
		
	/**
	 * Get opt-in or opt-out status of push notifications set in the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getEnablePushStatus((value: boolean) => {
	 *       console.log("status"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getEnablePushStatus(callback : function): void;
		
	/**
	 * Get status of event tracking set in the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getEnableTrackingStatus((value: boolean) => {
	 *       console.log("status"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getEnableTrackingStatus(callback : function): void;
		
	/**
	 * Get email id string set in the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoEmailId((value: string) => {
	 *       console.log("Email id"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getUserInfoEmailId(callback : function): void;
		
	/**
	 * Get customer id string set in the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoCustomerId((value: string) => {
	 *       console.log("Customer id"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getUserInfoCustomerId(callback : function): void;
		
	/**
	 * Get first name string set in the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoFirstName((value: string) => {
	 *       console.log("First name"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getUserInfoFirstName(callback : function): void;
		
	/**
	 * Get last name string set in the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoLastName((value: string) => {
	 *       console.log("Last name"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getUserInfoLastName(callback : function): void;
		
	/**
	 * Get extras JSON data set in the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoExtras((value: any) => {
	 *       console.log("Extras"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getUserInfoExtras(callback : function): void;
		
	/**
	 * Get current device id string used by the SDK.
	 * 
	 * Usage -
	 *  Blueshift.getCurrentDeviceId((value: string) => {
	 *       console.log("Device id"+value);
	 *   });
	 * 
	 * @param {function} callback success callback.
	 * 
	 */
	function getCurrentDeviceId(callback : function): void;

	/**
	 * Reset the current device id. This is only applicable if the device id
	 * source is set to GUID for Android or UUID for iOS.
	 *
	 * Usage -
	 *  Blueshift.resetDeviceId();
	 */
	function resetDeviceId():void;

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
	function syncInboxMessages(callback: function): void;
	
	/**
     * Get unread messages count to show on the notification badge.
     *
     * Usage -
     * Blueshift.getUnreadInboxMessageCount((count) => {
     *       console.log("unread messages count"+count);
     *   });
     */
	function getUnreadInboxMessageCount(callback: function): void;

	/**
     * Get inbox messages list to show in the list view.
     *
     * Usage -
     * Blueshift.getInboxMessages((messages) => {
     *       console.log("unread messages count"+count);
     *   });
     */
	function getInboxMessages(callback: function): void;

	/**
     * Show in-app notification for the Inbox message.
     *
     * @param {BlueshiftInboxMessage} message
     *
     * Usage -
     * Blueshift.showInboxMessage();
     */
	function showInboxMessage(message: any): void;

	/**
	 * Delete inbox message.
	 *
	 * @param {BlueshiftInboxMessage} message
	 *
	 * Usage -
	 * Blueshift.deleteInboxMessage();
	 */
	function deleteInboxMessage(message: any, callback: function): void;

	/**
	 * Process the Blueshift url and provide the final url to Linking's "url" callback
	 * 
	 * @param {string} url
	 * 
	 */
	function processBlueshiftUrl(url : string): void;
		
	/**
	 * Checks if the given Url is of Blueshift's format.
	 * 
	 * @param {string} url
	 * @return {boolean}
	 */
	function isBlueshiftUrl(url : string): boolean;

}
