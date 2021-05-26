//
//  BlueshiftReactEventsManager.h
//  SampleApp
//
//  Created by Ketan Shikhare on 26/05/21.
//


#import <React/RCTEventEmitter.h>

static NSString *const PushNotificationClickedNotification = @"PushNotificationClickedNotification";

@interface BlueshiftReactEventsManager : RCTEventEmitter<RCTBridgeModule>

@end

