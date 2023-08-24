//
//  BlueshiftReactEventsManager.h
//  SampleApp
//
//  Created by Ketan Shikhare on 26/05/21.
//


#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

static NSString *const BlueshiftPushNotificationClickedEvent = @"PushNotificationClickedEvent";
static NSString *const BlueshiftDeepLinkEvent = @"DeepLinkEvent";
static NSString *const BlueshiftURLEvent = @"url";
static NSString *const InboxDataChangeEvent = @"InboxDataChangeEvent";
static NSString *const InAppLoadEvent = @"InAppLoadEvent";

@interface BlueshiftReactEventsManager : RCTEventEmitter<RCTBridgeModule>

- (void)fireEventWithEventName:(NSString*)eventName data:(NSDictionary*)data;

@end

@interface BlueshiftRNDeepLinkData : NSObject

@property (strong, nonatomic) NSDictionary* data;
@property (strong, nonatomic) NSURL* deepLinkURL;
@property (strong, nonatomic) NSString* eventName;

- (instancetype)initWithEventName:(NSString* _Nullable)eventName data:( NSDictionary* _Nullable )data deepLink:(NSURL* _Nullable)url;

@end

NS_ASSUME_NONNULL_END
