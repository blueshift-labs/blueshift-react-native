//
//  BlueshiftReactEventsManager.h
//  SampleApp
//
//  Created by Ketan Shikhare on 26/05/21.
//


#import <React/RCTEventEmitter.h>

static NSString *const BlueshiftPushNotificationClickedNotification = @"PushNotificationClickedEvent";
static NSString *const BlueshiftDeepLinkNotification = @"DeepLinkEvent";

@interface BlueshiftReactEventsManager : RCTEventEmitter<RCTBridgeModule>

@end

