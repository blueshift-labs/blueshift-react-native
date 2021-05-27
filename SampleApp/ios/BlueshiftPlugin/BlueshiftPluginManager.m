//
//  BlueshiftPluginManager.m
//  SampleApp
//
//  Created by Ketan Shikhare on 27/05/21.
//

#import "BlueshiftPluginManager.h"
#import "BlueshiftReactEventsManager.h"
#import <React/RCTLinkingManager.h>

static BlueshiftPluginManager *_sharedInstance = nil;
@implementation BlueshiftPluginManager {
  NSDictionary* deepLinkData;
  NSURL* deepLinkURL;
  NSDictionary* pushNotificationData;
}

@synthesize isAppStartedObserving;

+ (instancetype) sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      _sharedInstance = [[self alloc] init];
    });
    return _sharedInstance;
}

- (void)setAppStartedObserving:(BOOL)isStartedObserving {
  NSLog(@"[Blueshift]-Set started observing");

  self.isAppStartedObserving = isStartedObserving;
  if(self.isAppStartedObserving == YES) {
    if(pushNotificationData) {
      NSLog(@"[Blueshift]-process cached notification");
      [self sendPushNotificationDataToRN:[pushNotificationData copy]];
      pushNotificationData = nil;
    }
    if (deepLinkURL) {
      NSLog(@"[Blueshift]-process cached deep link");
      [self sendDeepLinkURLToRN:deepLinkURL  data:[deepLinkData copy]];
      deepLinkData = nil;
      deepLinkURL = nil;
    }
  }
}

- (void)handlePushNotificationFromLaunchOpions:(NSDictionary*)launchOptions {
  NSDictionary *userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
  NSLog(@"[Blueshift]-Received push launch notification");

  if (userInfo) {
    NSLog(@"[Blueshift]-sending it to push click notification");
      [self sendPushNotificationDataToRN:userInfo];
  }
}

- (void)sendPushNotificationDataToRN:(NSDictionary*)userInfo {
  if (userInfo) {
    if (isAppStartedObserving) {
      [[NSNotificationCenter defaultCenter] postNotificationName:BlueshiftPushNotificationClickedNotification object:nil userInfo:userInfo];
      NSLog(@"[Blueshift]-sent push click notification");
    } else {
      pushNotificationData = userInfo;
      NSLog(@"[Blueshift]-cached push click notification");
    }
  }
}

- (void)sendDeepLinkURLToRN:(NSURL*)deepLinkURL data:(NSDictionary*)data {
  if (deepLinkURL) {
    if (isAppStartedObserving) {
      NSMutableDictionary* options = [data mutableCopy];
      if (!options) {
        options = [NSMutableDictionary new];
      }
      [options setValue:deepLinkURL.absoluteString forKey:@"url"];
      NSLog(@"[Blueshift]-sent deep link notification");
      [[NSNotificationCenter defaultCenter] postNotificationName:BlueshiftDeepLinkNotification object:nil userInfo:options];
    } else {
      NSLog(@"[Blueshift]-cached deep link notification");
      self->deepLinkURL = deepLinkURL;
      self->deepLinkData = data;
    }
  }
}

@end
