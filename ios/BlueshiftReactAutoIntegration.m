//
//  BlueshiftReactAutoIntegration.m
//  Blueshift
//
//  Created by Ketan Shikhare on 26/03/21.
//  Copyright Blueshift 2021. All rights reserved.

#import <objc/runtime.h>
#import <React/RCTLinkingManager.h>
#import <UserNotifications/UserNotifications.h>

#import "BlueShift.h"

#import "BlueshiftReactAutoIntegration.h"
#import "BlueshiftPluginManager.h"
#import "BlueshiftReactEventsManager.h"

@implementation NSObject (BlueshiftReactAutoIntegration)

+ (void)swizzleMainAppDelegate {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = [self class];
        id uiApplicationDelegate = [UIApplication sharedApplication].delegate;
        
        if ([uiApplicationDelegate respondsToSelector:@selector(application:didRegisterForRemoteNotificationsWithDeviceToken:)]) {
            SEL originalSelector = @selector(application:didRegisterForRemoteNotificationsWithDeviceToken:);
            SEL swizzledSelector = @selector(blueshift_swizzled_application:didRegisterForRemoteNotificationsWithDeviceToken:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        } else {
            SEL originalSelector = @selector(application:didRegisterForRemoteNotificationsWithDeviceToken:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_application:didRegisterForRemoteNotificationsWithDeviceToken:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if ([uiApplicationDelegate respondsToSelector:@selector(application:didFailToRegisterForRemoteNotificationsWithError:)]) {
            SEL originalSelector = @selector(application:didFailToRegisterForRemoteNotificationsWithError:);
            SEL swizzledSelector = @selector(blueshift_swizzled_application:didFailToRegisterForRemoteNotificationsWithError:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        } else {
            SEL originalSelector = @selector(application:didFailToRegisterForRemoteNotificationsWithError:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_application:didFailToRegisterForRemoteNotificationsWithError:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if ([uiApplicationDelegate respondsToSelector:@selector(application:didReceiveRemoteNotification:fetchCompletionHandler:)]) {
            SEL originalSelector = @selector(application:didReceiveRemoteNotification:fetchCompletionHandler:);
            SEL swizzledSelector = @selector(blueshift_swizzled_application:didReceiveRemoteNotification:fetchCompletionHandler:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        } else {
            SEL originalSelector = @selector(application:didReceiveRemoteNotification:fetchCompletionHandler:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_application:didReceiveRemoteNotification:fetchCompletionHandler:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if ([uiApplicationDelegate respondsToSelector:@selector(application:didReceiveRemoteNotification:)]) {
            SEL originalSelector = @selector(application:didReceiveRemoteNotification:);
            SEL swizzledSelector = @selector(blueshift_swizzled_application:didReceiveRemoteNotification:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        } else {
            SEL originalSelector = @selector(application:didReceiveRemoteNotification:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_application:didReceiveRemoteNotification:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if ([uiApplicationDelegate respondsToSelector:@selector(userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:)]) {
            SEL originalSelector = @selector(userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:);
            SEL swizzledSelector = @selector(blueshift_swizzled_userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        } else {
            SEL originalSelector = @selector(userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if ([uiApplicationDelegate respondsToSelector:@selector(userNotificationCenter:willPresentNotification:withCompletionHandler:)]) {
            SEL originalSelector = @selector(userNotificationCenter:willPresentNotification:withCompletionHandler:);
            SEL swizzledSelector = @selector(blueshift_swizzled_userNotificationCenter:willPresentNotification:withCompletionHandler:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        } else {
            SEL originalSelector = @selector(userNotificationCenter:willPresentNotification:withCompletionHandler:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_userNotificationCenter:willPresentNotification:withCompletionHandler:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        
        if ([uiApplicationDelegate respondsToSelector:@selector(applicationWillEnterForeground:)]) {
            SEL originalSelector = @selector(applicationWillEnterForeground:);
            SEL swizzledSelector = @selector(blueshift_swizzled_applicationWillEnterForeground:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        } else {
            SEL originalSelector = @selector(applicationWillEnterForeground:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_applicationWillEnterForeground:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if ([uiApplicationDelegate respondsToSelector:@selector(applicationDidEnterBackground:)]) {
            SEL originalSelector = @selector(applicationDidEnterBackground:);
            SEL swizzledSelector = @selector(blueshift_swizzled_applicationDidEnterBackground:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        } else {
            SEL originalSelector = @selector(applicationDidEnterBackground:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_applicationDidEnterBackground:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if (![uiApplicationDelegate respondsToSelector:@selector(didCompleteLinkProcessing:)]) {
            SEL originalSelector = @selector(didCompleteLinkProcessing:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_didCompleteLinkProcessing:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if (![uiApplicationDelegate respondsToSelector:@selector(didFailLinkProcessingWithError:url:)]) {
            SEL originalSelector = @selector(didFailLinkProcessingWithError:url:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_didFailLinkProcessingWithError:url:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if (![uiApplicationDelegate respondsToSelector:@selector(application:openURL:options:)]) {
            SEL originalSelector = @selector(application:openURL:options:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_application:openURL:options:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
        
        if (![uiApplicationDelegate respondsToSelector:@selector(application:continueUserActivity:restorationHandler:)]) {
            SEL originalSelector = @selector(application:continueUserActivity:restorationHandler:);
            SEL swizzledSelector = @selector(blueshift_swizzled_no_application:continueUserActivity:restorationHandler:);
            [self swizzleMethodWithClass:class originalSelector:originalSelector andSwizzledSelector:swizzledSelector];
        }
    });
}

+ (void)swizzleMethodWithClass:(Class)class originalSelector:(SEL)originalSelector andSwizzledSelector:(SEL)swizzledSelector {
    Method originalMethod = class_getInstanceMethod(class, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
    
    BOOL isSuccess = class_addMethod(class, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
    if (isSuccess) {
        class_replaceMethod(class, swizzledSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
    } else {
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
}

#pragma mark - Remote Notification methods
- (void)blueshift_swizzled_application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSData* cachedDeviceToken = [deviceToken copy];
    [self blueshift_swizzled_application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
    
    [[BlueShift sharedInstance].appDelegate registerForRemoteNotification:cachedDeviceToken];
}

- (void)blueshift_swizzled_no_application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[BlueShift sharedInstance].appDelegate registerForRemoteNotification:deviceToken];
}

- (void)blueshift_swizzled_application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(nonnull NSError *)error{
    [self blueshift_swizzled_application:application didFailToRegisterForRemoteNotificationsWithError:error];
    
    [[BlueShift sharedInstance].appDelegate failedToRegisterForRemoteNotificationWithError:error];
}

- (void)blueshift_swizzled_no_application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(nonnull NSError *)error {
    [[BlueShift sharedInstance].appDelegate failedToRegisterForRemoteNotificationWithError:error];
}

- (void)blueshift_swizzled_application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    NSDictionary *cachedUserInfo = [userInfo copy];
    [self blueshift_swizzled_application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
    
    if([[BlueShift sharedInstance]isBlueshiftPushNotification:cachedUserInfo] == YES) {
        [[BlueShift sharedInstance].appDelegate application:application didReceiveRemoteNotification:cachedUserInfo fetchCompletionHandler:^(UIBackgroundFetchResult result) {}];
    }
}

- (void)blueshift_swizzled_no_application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    if([[BlueShift sharedInstance]isBlueshiftPushNotification:userInfo] == YES) {
        [[BlueShift sharedInstance].appDelegate application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
    }
}

- (void)blueshift_swizzled_application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    NSDictionary *cachedUserInfo = [userInfo copy];
    [self blueshift_swizzled_application:application didReceiveRemoteNotification:userInfo];
    
    if([[BlueShift sharedInstance]isBlueshiftPushNotification:cachedUserInfo] == YES) {
        [[BlueShift sharedInstance].appDelegate application:application didReceiveRemoteNotification:cachedUserInfo];
    }
}

- (void)blueshift_swizzled_no_application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [[BlueShift sharedInstance].appDelegate application:application didReceiveRemoteNotification:userInfo];
}

#pragma mark - User Notification methods
- (void)blueshift_swizzled_userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
    UNNotificationResponse * cachedResponse = [response copy];
    [self blueshift_swizzled_userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
    
    if([[BlueShift sharedInstance]isBlueshiftPushNotification:cachedResponse.notification.request.content.userInfo] == YES) {
        [[BlueShift sharedInstance].userNotificationDelegate userNotificationCenter:center didReceiveNotificationResponse:cachedResponse withCompletionHandler:^{}];
        [[BlueshiftPluginManager sharedInstance] fireEventWithEventName:BlueshiftPushNotificationClickedEvent data:cachedResponse.notification.request.content.userInfo];
    }
}

- (void)blueshift_swizzled_no_userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
    if([[BlueShift sharedInstance]isBlueshiftPushNotification:response.notification.request.content.userInfo] == YES) {
        [[BlueShift sharedInstance].userNotificationDelegate userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
        [[BlueshiftPluginManager sharedInstance] fireEventWithEventName:BlueshiftPushNotificationClickedEvent data:response.notification.request.content.userInfo];
    }
}

- (void)blueshift_swizzled_userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
    UNNotification * cachedNotification = [notification copy];
    [self blueshift_swizzled_userNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
    
    if([[BlueShift sharedInstance]isBlueshiftPushNotification:cachedNotification.request.content.userInfo] == YES) {
        [[BlueShift sharedInstance].userNotificationDelegate userNotificationCenter:center willPresentNotification:cachedNotification withCompletionHandler:^(UNNotificationPresentationOptions options) {}];
    }
}

- (void)blueshift_swizzled_no_userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
    if([[BlueShift sharedInstance]isBlueshiftPushNotification:notification.request.content.userInfo] == YES) {
        [[BlueShift sharedInstance].userNotificationDelegate userNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
    }
}

#pragma mark - Application lifecycle methods
- (void)blueshift_swizzled_applicationWillEnterForeground:(UIApplication *)application {
}

- (void)blueshift_swizzled_no_applicationWillEnterForeground:(UIApplication *)application {
}

- (void)blueshift_swizzled_applicationDidEnterBackground:(UIApplication *)application {
}

- (void)blueshift_swizzled_no_applicationDidEnterBackground:(UIApplication *)application {
}

#pragma mark - Universal links method
- (void)blueshift_swizzled_no_application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
    if(userActivity && userActivity.webpageURL) {
        if ([BlueShift.sharedInstance isBlueshiftUniversalLinkURL:userActivity.webpageURL]) {
            [[BlueshiftPluginManager sharedInstance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
        } else {
            [[BlueshiftPluginManager sharedInstance] application:application openURL:userActivity.webpageURL options:@{}];
        }
    }
}

#pragma mark - Push & in-app deep linking method
- (void)blueshift_swizzled_no_application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary *)options {
    if (url) {
        [[BlueshiftPluginManager sharedInstance] application:app openURL:url options:options];
    }
}

#pragma mark - BlueshiftUniversalDelegate links delegate methods

- (void)blueshift_swizzled_no_didCompleteLinkProcessing:(NSURL *)url {
    if (url) {
        [[BlueshiftPluginManager sharedInstance] application:UIApplication.sharedApplication openURL:url options:@{}];
    }
}

- (void)blueshift_swizzled_no_didFailLinkProcessingWithError: (NSError *_Nullable)error url:(NSURL *_Nullable)url {
    if (url) {
        [[BlueshiftPluginManager sharedInstance] application:UIApplication.sharedApplication openURL:url options:@{}];
    }
}

@end
