//
//  BlueshiftPluginManager.h
//  SampleApp
//
//  Created by Ketan Shikhare on 27/05/21.
//

#import <Foundation/Foundation.h>

#import "BlueshiftReactEventsManager.h"

#import "BlueShift.h"
#import "BlueshiftUniversalLinksDelegate.h"
#import "BlueshiftConstants.h"

NS_ASSUME_NONNULL_BEGIN

@interface BlueshiftPluginManager : NSObject

@property (weak) BlueshiftReactEventsManager* _Nullable blueshiftEventsManagerDelegate;

+ (_Nullable instancetype) sharedInstance;

/// Initialise the Blueshift SDK using Automatic integration. Pass `autoIntegrate` attribute as true to enable the Automatic SDK  integration.
/// Pass `autoIntegrate` attribute as false to integrate the SDK manually.
/// @param config config object for SDK intialisation.
/// @param autoIntegrate defines the autoIntegration or manualIntegration
- (void)intialisePluginWithConfig:(BlueShiftConfig*)config autoIntegrate:(BOOL)autoIntegrate;

/// Use this method to send the event `DeepLinkEvent` manually from the AppDelegate. This method is to support the legacy bridge events.
/// @param deepLinkURL url object
/// @param deepLinkData additional data as NSDictionary
- (void)sendDeepLinkURLToRN:(NSURL* _Nonnull)deepLinkURL data:(NSDictionary*_Nullable)deepLinkData;

- (void)fireCachedEventWithEventName:(NSString*)eventName;

/// Check if URL received inside the AppDelegate's OpenURL method is from Blueshift or not.
/// @param url URL from the AppDelegate's OpenURL method
/// @param options options from the AppDelegate's OpenURL method
- (BOOL)isBlueshiftOpenURLLink:(NSURL*)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options;

/// Check if the received Universal link activity/url is of Blueshift or not.
/// @param userActivity userActivity object
- (BOOL)isBlueshiftUniversalLink:(nonnull NSUserActivity *)userActivity;

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options;

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler;

-(void)fireEventWithEventName:(NSString*)eventName data:(NSDictionary*)data;

@end


NS_ASSUME_NONNULL_END
