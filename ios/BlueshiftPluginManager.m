//
//  BlueshiftPluginManager.m
//  SampleApp
//
//  Created by Ketan Shikhare on 27/05/21.
//

#import <React/RCTLinkingManager.h>
#import <React/RCTBridge.h>
#import <React/RCTRootView.h>

#import "BlueshiftPluginManager.h"
#import "BlueshiftReactAutoIntegration.h"

#define kBlueshiftMessageUUID   @"bsft_message_uuid"
    
static BlueshiftPluginManager *_sharedInstance = nil;

@implementation BlueshiftPluginManager {
    BOOL isContentLoaded;
    NSMutableArray *cachedDeepLinks;
    NSString* lastPushNotificationUUID;
}

+ (instancetype) sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedInstance = [[self alloc] init];
    });
    return _sharedInstance;
}

- (void)intialisePluginWithConfig:(BlueShiftConfig*)config autoIntegrate:(BOOL)autoIntegrate {
    if (autoIntegrate == YES) {
        Class appDelegateClass = [[UIApplication sharedApplication].delegate class];
        [appDelegateClass swizzleMainAppDelegate];
    }
    cachedDeepLinks = [[NSMutableArray alloc] init];
    // Fire event for sending push notification click
    if (config.applicationLaunchOptions) {
        NSDictionary *userInfo = [config.applicationLaunchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
        if (userInfo) {
            [[BlueshiftPluginManager sharedInstance] fireEventWithEventName:BlueshiftPushNotificationClickedEvent data:userInfo];
        }
    }
    [self setupObservers];
    [BlueShift initWithConfiguration:config];
}

- (void)setupObservers {
    [[NSNotificationCenter defaultCenter] addObserverForName:RCTContentDidAppearNotification object:nil queue:nil usingBlock:^(NSNotification * _Nonnull note) {
        self->isContentLoaded = YES;
        NSMutableArray *deepLinksCopy = [self->cachedDeepLinks mutableCopy];
        for (BlueshiftRNDeepLinkData *deepLinkData in deepLinksCopy) {
            if ([deepLinkData.eventName isEqualToString: BlueshiftURLEvent] && deepLinkData.deepLinkURL) {
                [self application:UIApplication.sharedApplication openURL:deepLinkData.deepLinkURL options:@{}];
                [self->cachedDeepLinks removeObject:deepLinkData];
            }
        }
    }];
}

- (void)fireCachedEventWithEventName:(NSString*)eventName {
    NSMutableArray *deepLinksCopy = [cachedDeepLinks copy];
    for (BlueshiftRNDeepLinkData *deepLinkData in deepLinksCopy) {
        if ([deepLinkData.eventName isEqualToString: eventName] && deepLinkData.deepLinkURL) {
            [self sendDeepLinkURLToRN:deepLinkData.deepLinkURL data:deepLinkData.data];
            [cachedDeepLinks removeObject:deepLinkData];
        } else if ([deepLinkData.eventName isEqualToString: eventName] && deepLinkData.data) {
            [self fireEventWithEventName:deepLinkData.eventName data:deepLinkData.data];
            [cachedDeepLinks removeObject:deepLinkData];
        }
    }
}

- (void)sendDeepLinkURLToRN:(NSURL*)deepLinkURL data:(NSDictionary*)data {
    if (deepLinkURL) {
        if (self.blueshiftEventsManagerDelegate) {
            NSMutableDictionary* options = [data mutableCopy];
            if (!options) {
                options = [NSMutableDictionary new];
            }
            [options setValue:deepLinkURL.absoluteString forKey:BlueshiftURLEvent];
            [self.blueshiftEventsManagerDelegate fireEventWithEventName:BlueshiftDeepLinkEvent data:options];
        } else {
            BlueshiftRNDeepLinkData *deepLinkEvent = [BlueshiftRNDeepLinkData new];
            deepLinkEvent.data = data;
            deepLinkEvent.deepLinkURL = deepLinkURL;
            deepLinkEvent.eventName = BlueshiftDeepLinkEvent;
            [cachedDeepLinks addObject:deepLinkEvent];
        }
    }
}

- (void)sendPushNotificationDataToRN:(NSDictionary*)userInfo {
    [self fireEventWithEventName:BlueshiftPushNotificationClickedEvent data:userInfo];
}

-(void)fireEventWithEventName:(NSString*)eventName data:(NSDictionary*)data {
    if (self.blueshiftEventsManagerDelegate) {
        if ([self isDuplicatePushNotificationEvent:eventName data:data] == NO) {
            [self.blueshiftEventsManagerDelegate fireEventWithEventName:eventName data:data];
        }
    } else {
        BlueshiftRNDeepLinkData *deepLinkEvent = [BlueshiftRNDeepLinkData new];
        deepLinkEvent.data = data;
        deepLinkEvent.eventName = eventName;
        [cachedDeepLinks addObject:deepLinkEvent];
    }
}

-(BOOL)isDuplicatePushNotificationEvent:(NSString*)eventName data:(NSDictionary*)data {
    if (data && [eventName isEqualToString:BlueshiftPushNotificationClickedEvent]) {
        NSString* messageUUID = [data valueForKey:kBlueshiftMessageUUID];
        if (messageUUID && [messageUUID isEqualToString:lastPushNotificationUUID]) {
            return YES;
        } else {
            lastPushNotificationUUID = [data valueForKey:kBlueshiftMessageUUID];
            return NO;
        }
    } else {
        return NO;
    }
}

- (BOOL)isBlueshiftOpenURLLink:(NSURL*)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    if (url && options && [options[openURLOptionsSource] isEqual:openURLOptionsBlueshift]) {
        return YES;
    }
    return NO;
}

- (BOOL)isBlueshiftUniversalLink:(nonnull NSUserActivity *)userActivity {
    if (userActivity && [BlueShift.sharedInstance isBlueshiftUniversalLinkURL:userActivity.webpageURL]) {
        return YES;
    }
    return NO;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    if (url) {
        if (isContentLoaded) {
            return [RCTLinkingManager application:application openURL:url options:options];
        } else {
            BlueshiftRNDeepLinkData *deepLinkEvent = [BlueshiftRNDeepLinkData new];
            deepLinkEvent.deepLinkURL = url;
            deepLinkEvent.eventName = BlueshiftURLEvent;
            [cachedDeepLinks addObject:deepLinkEvent];
        }
    }
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
    [[BlueShift sharedInstance].appDelegate handleBlueshiftUniversalLinksForActivity:userActivity];
    return YES;
}

@end
