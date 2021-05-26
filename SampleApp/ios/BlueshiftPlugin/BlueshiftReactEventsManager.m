//
//  BlueshiftReactEventsManager.m
//  
//
//  Created by Ketan Shikhare on 25/05/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@interface BlueshiftReactEventsManager : RCTEventEmitter<RCTBridgeModule>

@end


@implementation BlueshiftReactEventsManager

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[];
}

- (void)startObserving {
    NSLog(@"start observing");
}

- (void)stopObserving {
//    [[NSNotificationCenter defaultCenter] removeObserver:self];
    NSLog(@"stop observing");
}

- (void)fireEvent:(NSNotification*)notification {
  [self sendEventWithName:notification.name body:notification.userInfo];
}


@end
