//
//  BlueshiftReactEventsManager.m
//  
//
//  Created by Ketan Shikhare on 25/05/21.
//
#import "BlueshiftReactEventsManager.h"
#import <React/RCTBridgeModule.h>

@implementation BlueshiftReactEventsManager

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[PushNotificationClickedNotification];
}

- (void)startObserving {
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(fireEvent:) name:PushNotificationClickedNotification object:nil];
}

- (void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)fireEvent:(NSNotification*)notification {
  if (notification && notification.name) {
    [self sendEventWithName:notification.name body:notification.userInfo];
  }
}

@end
