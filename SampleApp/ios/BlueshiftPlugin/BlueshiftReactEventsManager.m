//
//  BlueshiftReactEventsManager.m
//  
//
//  Created by Ketan Shikhare on 25/05/21.
//
#import "BlueshiftReactEventsManager.h"
#import <React/RCTBridgeModule.h>
#import "BlueshiftPluginManager.h"

@implementation BlueshiftReactEventsManager

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[BlueshiftPushNotificationClickedNotification,BlueshiftDeepLinkNotification];
}

- (void)startObserving {
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(fireEvent:) name:BlueshiftPushNotificationClickedNotification object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(fireEvent:) name:BlueshiftDeepLinkNotification object:nil];

  [[BlueshiftPluginManager sharedInstance] setAppStartedObserving:YES];
}

- (void)stopObserving {
  [[BlueshiftPluginManager sharedInstance] setIsAppStartedObserving:NO];
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)fireEvent:(NSNotification*)notification {
  if (notification && notification.name) {
    [self sendEventWithName:notification.name body:notification.userInfo];
  }
}

@end
