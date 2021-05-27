//
//  BlueshiftReactEventsManager.h
//  SampleApp
//
//  Created by Ketan Shikhare on 26/05/21.
//


#import <React/RCTEventEmitter.h>

static NSString *const BlueshiftPushNotificationClickedNotification = @"PushNotificationClickedNotification";
static NSString *const BlueshiftDeepLinkNotification = @"DeepLinkNotification";

@interface BlueshiftReactEventsManager : RCTEventEmitter<RCTBridgeModule>

@end

