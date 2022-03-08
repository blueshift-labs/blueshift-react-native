//
//  BlueshiftReactEventsManager.h
//  SampleApp
//
//  Created by Ketan Shikhare on 26/05/21.
//


#import <React/RCTEventEmitter.h>

static NSString *const BlueshiftPushNotificationClickedEvent = @"PushNotificationClickedEvent";
static NSString *const BlueshiftDeepLinkEvent = @"DeepLinkEvent";
static NSString *const BlueshiftURLEvent = @"url";

@interface BlueshiftReactEventsManager : RCTEventEmitter<RCTBridgeModule>

- (void)fireEventWithEventName:(NSString*)eventName data:(NSDictionary*)data;

@end

@interface BlueshiftRNDeepLinkData : NSObject

@property (strong, nonatomic) NSDictionary* data;
@property (strong, nonatomic) NSURL* deepLinkURL;
@property (strong, nonatomic) NSString* eventName;

@end