//
//  BlueshiftPluginManager.h
//  SampleApp
//
//  Created by Ketan Shikhare on 27/05/21.
//

#import <Foundation/Foundation.h>

@interface BlueshiftPluginManager : NSObject

@property (nonatomic) BOOL isAppStartedObserving;

+ (instancetype) sharedInstance;
- (void)handlePushNotificationFromLaunchOpions:(NSDictionary*)launchOptions;
- (void)sendPushNotificationDataToRN:(NSDictionary*)userInfo;

- (void)sendDeepLinkURLToRN:(NSURL*)deepLinkURL data:(NSDictionary*)deepLinkData;
- (void)setAppStartedObserving:(BOOL)isStartedObserving;
@end
