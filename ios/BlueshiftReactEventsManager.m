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
    return @[BlueshiftDeepLinkEvent, BlueshiftPushNotificationClickedEvent];
}

- (void)startObserving {    
    [[BlueshiftPluginManager sharedInstance] setBlueshiftEventsManagerDelegate:self];
}

- (void)stopObserving {
    [[BlueshiftPluginManager sharedInstance] setBlueshiftEventsManagerDelegate:nil];
}

- (void)addListener:(NSString *)eventName {
    [super addListener:eventName];
    [[BlueshiftPluginManager sharedInstance] fireCachedEventWithEventName:eventName];
}

- (void)fireEventWithEventName:(NSString*)eventName data:(NSDictionary*)data {
    if (eventName) {
        [self sendEventWithName:eventName body:data];
    }
}

@end

@implementation BlueshiftRNDeepLinkData

@end
