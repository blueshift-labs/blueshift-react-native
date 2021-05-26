//
//  BlueshiftBridge.swift
//  SampleApp
//
//  Created by Ketan Shikhare on 20/11/20.
//

import UIKit
import Foundation

@objc(BlueshiftBridge)
class BlueshiftBridge: NSObject {
    @objc static func requiresMainQueueSetup() -> Bool {return true}
    let screenViewed = "screen_viewed"
    
    // MARK: Track Events
    @objc func identifyWithDetails(_ details: Dictionary<AnyHashable, Any>) {
        BlueShift.sharedInstance()?.identifyUser(withDetails: details, canBatchThisEvent: false)
    }
    
    @objc func trackCustomEvent(_ eventName: String, details: Dictionary<AnyHashable, Any> ,canBatchThisEvent: Bool) {
        BlueShift.sharedInstance()?.trackEvent(forEventName: eventName, andParameters: details, canBatchThisEvent: canBatchThisEvent)
    }
    
    @objc func trackScreenView(_ screenName: String, details: Dictionary<AnyHashable, Any> ,canBatchThisEvent: Bool) {
        var params = details
        params[screenViewed] = screenName
        BlueShift.sharedInstance()?.trackEvent(forEventName: kEventPageLoad, andParameters: params, canBatchThisEvent: canBatchThisEvent)
    }
    
    // MARK: Set user info
    @objc func setUserInfoEmailId(_ emailId: String) {
        BlueShiftUserInfo.sharedInstance()?.email = emailId
        BlueShiftUserInfo.sharedInstance()?.save()
    }
    
    @objc func setUserInfoCustomerId(_ customerId: String) {
        BlueShiftUserInfo.sharedInstance()?.retailerCustomerID = customerId
        BlueShiftUserInfo.sharedInstance()?.save()
    }
    
    @objc func removeUserInfo() {
        BlueShiftUserInfo.removeCurrentUserInfo()
    }
    
    // MARK: Push notifications
    @objc func registerForRemoteNotification() {
        BlueShift.sharedInstance()?.appDelegate?.registerForNotification()
    }
    
    @objc func setEnablePush(_ isEnabled: Bool) {
        BlueShiftAppData.current()?.enablePush = isEnabled
    }
    
    @objc func setEnableInApp(_ isEnabled: Bool) {
        BlueShiftAppData.current()?.enableInApp = isEnabled
    }
    
    // MARK: Set location for tracking
    @objc func setCurrentLocation(_ lat: Double, long:Double) {
        let location = CLLocation(latitude: lat, longitude: long)
        BlueShiftDeviceData.current()?.currentLocation = location
    }
    
    //MARK: In-app notificatins
    @objc func fetchInAppNotification() {
      BlueShift.sharedInstance()?.fetchInAppNotification(fromAPI: {
        
      }, failure: { err in
        
      })
    }
    
    @objc func displayInAppNotification() {
        DispatchQueue.main.async {
            BlueShift.sharedInstance()?.displayInAppNotification()
        }
    }
    
    @objc func registerForInAppNotification(_ screenName:String) {
        BlueShift.sharedInstance()?.registerFor(inAppMessage: screenName)
    }
    
    @objc func unregisterForInAppMessage() {
        BlueShift.sharedInstance()?.unregisterForInAppMessage()
    }
}
