declare namespace Blueshift{
		
	/**
	 * Add event listener for a event name to listen to events fired by Blueshift SDK
	 * 
	 * @param {string} eventName    Name of event to listen to.
	 * @param {function} callback    callback function to handle the event
	 * 
	 * Usage -
	 * Blueshift.addEventListener("PushNotificationClickedEvent", this.handlePush);
	 * @param eventName 
	 * @param callback 
	 */
	function addEventListener(eventName : string, callback : any): void;
		
	/**
	 * Remove the event listener.
	 * 
	 * @param {string} eventName    Name of event remove the listener.
	 * 
	 * Usage -
	 * Blueshift.removeEventListener("PushNotificationClickedEvent");
	 * @param eventName 
	 */
	function removeEventListener(eventName : string): void;
		
	/**
	 * Registers a page for showing in-app message.
	 * 
	 * @param {String} screenName    Name of the screen.
	 * 
	 * Usage -
	 * Blueshift.registerForInAppMessage("IndexScreen");
	 * @param screenName 
	 */
	function registerForInAppMessage(screenName : string): void;
		
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
	 * @param {Object} details   Additional params (if any)
	 * 
	 * Usage -
	 * Blueshift.Blueshift.identifyWithDetails({})
	 * @param details 
	 */
	function identifyWithDetails(details : any): void;
		
	/**
	 * Send any custom event to Blueshift.
	 * 
	 * @param {String} eventName    Name of the custom event.
	 * @param {Object} details       Additional params (if any).
	 * @param {Boolean} isBatch    Tells if this event can be batched or not.
	 * 
	 * Usage -
	 * Blueshift.trackCustomEvent("CustomEvent",{},false);
	 * @param eventName 
	 * @param details 
	 * @param isBatch 
	 */
	function trackCustomEvent(eventName : string, details : any, isBatch : boolean): void;
		
	/**
	 * Track screen view using Blueshift.
	 * 
	 * @param {String} screenName   Name of the screen to track.
	 * @param {Object} details       Additional params (if any).
	 * @param {Boolean} isBatch    Tells if this event can be batched or not.
	 * 
	 * Usage -
	 * Blueshift.trackScreenView("IndexScreen",{},false);
	 * @param screenName 
	 * @param details 
	 * @param isBatch 
	 */
	function trackScreenView(screenName : string, details : any, isBatch : boolean): void;
		
	/**
	 * Save email in the SDK.
	 * 
	 * @param {String} emailId email of the customer.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoEmailId("test@test.com");
	 * @param emailId 
	 */
	function setUserInfoEmailId(emailId : string): void;
		
	/**
	 * Save customerId in the SDK.
	 * 
	 * @param {String} customerId customerId of the customer.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoCustomerId("cust123456");
	 * @param customerId 
	 */
	function setUserInfoCustomerId(customerId : string): void;
		
	/**
	 * Save firstname in the SDK.
	 * 
	 * @param {String} firstname firstname of the customer.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoFirstName("John");
	 * @param firstname 
	 */
	function setUserInfoFirstName(firstname : string): void;
		
	/**
	 * Save lastname in the SDK.
	 * 
	 * @param {String} lastname lastname of the customer.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoLastName("Cartor");
	 * @param lastname 
	 */
	function setUserInfoLastName(lastname : string): void;
		
	/**
	 * Save additional user info in the SDK.
	 * 
	 * @param {Object} extras additional user info.
	 * 
	 * Usage -
	 * Blueshift.setUserInfoExtras({"profession":"software engineer", "usertype":"premium"});
	 * @param extras 
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
	 * @param {Boolean} enabled When true, tracking is enabled. When false, disabled.
	 * 
	 * Usage -
	 * Blueshift.setEnableTracking(true);
	 * @param enabled 
	 */
	function setEnableTracking(enabled : boolean): void;
		
	/**
	 * Opt-in or opt-out of push notifications sent from Blueshift.
	 * 
	 * @param {Boolean} isEnabled When true, opt-in else opt-out.
	 * 
	 * Usage -
	 * Blueshift.setEnablePush(true);
	 * @param isEnabled 
	 */
	function setEnablePush(isEnabled : boolean): void;
		
	/**
	 * Opt-in or opt-out of in-app notifications sent from Blueshift.
	 * 
	 * @param {Boolean} isEnabled When true, opt-in else opt-out.
	 * 
	 * Usage -
	 * Blueshift.setEnableInApp(true);
	 * @param isEnabled 
	 */
	function setEnableInApp(isEnabled : boolean): void;
		
	/**
	 * Set IDFA of the device in the Blueshift SDK.
	 * Note - This is only applicable for the iOS devices.
	 * 
	 * @param {String} IDFAString IDFA value.
	 * 
	 * Usage -
	 * Blueshift.setIDFA("EA7583CD-A667-48BC-B806-42ECB2B48606");
	 * @param IDFAString 
	 */
	function setIDFA(IDFAString : string): void;
		
	/**
	 * Register for remote notifications using SDK. Calling this method will show push permission dialogue to the user.
	 * Note - This is only applicable for the iOS devices.
	 * 
	 * Usage -
	 * Blueshift.registerForRemoteNotification();
	 */
	function registerForRemoteNotification(): void;
		
	/**
	 * Set current location of the device in the Blueshift SDK.
	 * Note - This is only applicable for the iOS devices.
	 * 
	 * @param {Number} latitude location latitude value.
	 * @param {Number} longitude location longitude value.
	 * 
	 * Usage -
	 * Blueshift.setCurrentLocation(18.5245649,73.7228812);
	 * @param latitude 
	 * @param longitude 
	 */
	function setCurrentLocation(latitude : number, longitude : number): void;
		
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
	 * @param slot 
	 * @param lcContext 
	 * @param callback 
	 */
	function getLiveContentByEmail(slot : string, lcContext : any, callback : any): void;
		
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
	 * @param slot 
	 * @param lcContext 
	 * @param callback 
	 */
	function getLiveContentByCustomerId(slot : string, lcContext : any, callback : any): void;
		
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
	 * @param slot 
	 * @param lcContext 
	 * @param callback 
	 */
	function getLiveContentByDeviceId(slot : string, lcContext : any, callback : any): void;
		
	/**
	 * Get opt-in or opt-out status of in-app notifications set in the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getEnableInAppStatus((value) => {
	 *       console.log("status"+value);
	 *   });
	 * @param callback 
	 */
	function getEnableInAppStatus(callback : any): void;
		
	/**
	 * Get opt-in or opt-out status of push notifications set in the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getEnablePushStatus((value) => {
	 *       console.log("status"+value);
	 *   });
	 * @param callback 
	 */
	function getEnablePushStatus(callback : any): void;
		
	/**
	 * Get status of event tracking set in the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getEnableTrackingStatus((value) => {
	 *       console.log("status"+value);
	 *   });
	 * @param callback 
	 */
	function getEnableTrackingStatus(callback : any): void;
		
	/**
	 * Get email id string set in the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoEmailId((value) => {
	 *       console.log("Email id"+value);
	 *   });
	 * @param callback 
	 */
	function getUserInfoEmailId(callback : any): void;
		
	/**
	 * Get customer id string set in the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoCustomerId((value) => {
	 *       console.log("Customer id"+value);
	 *   });
	 * @param callback 
	 */
	function getUserInfoCustomerId(callback : any): void;
		
	/**
	 * Get first name string set in the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoFirstName((value) => {
	 *       console.log("First name"+value);
	 *   });
	 * @param callback 
	 */
	function getUserInfoFirstName(callback : any): void;
		
	/**
	 * Get last name string set in the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoLastName((value) => {
	 *       console.log("Last name"+value);
	 *   });
	 * @param callback 
	 */
	function getUserInfoLastName(callback : any): void;
		
	/**
	 * Get extras JSON data set in the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getUserInfoExtras((value) => {
	 *       console.log("Extras"+value);
	 *   });
	 * @param callback 
	 */
	function getUserInfoExtras(callback : any): void;
		
	/**
	 * Get current device id string used by the SDK.
	 * 
	 * @param {function} callback success callback.
	 * 
	 * Usage -
	 *  Blueshift.getCurrentDeviceId((value) => {
	 *       console.log("Device id"+value);
	 *   });
	 * @param callback 
	 */
	function getCurrentDeviceId(callback : any): void;
		
	/**
	 * Process the Blueshift url and provide the final url to Linking's "url" callback
	 * 
	 * @param {String} url
	 * @param url 
	 */
	function processBlueshiftUrl(url : string): void;
		
	/**
	 * Checks if the given Url is of Blueshift's format.
	 * 
	 * @param {String} url
	 * @param url 
	 * @return  
	 */
	function isBlueshiftUrl(url : string): boolean;
}
