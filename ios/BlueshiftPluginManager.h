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

/// Initialise the Blueshift SDK using Automatic integration. Pass `autoIntegrate` as true to enable the Automatic SDK  integration.
/// Pass `autoIntegrate` as false to integrate the SDK manually.
/// @param config BlueShiftConfig object for SDK intialisation.
/// @param autoIntegrate defines the autoIntegration or manual integration
- (void)initialisePluginWithConfig:(BlueShiftConfig*)config autoIntegrate:(BOOL)autoIntegrate;

/// Check if URL received inside the AppDelegate's OpenURL method is from Blueshift or not.
/// @param url URL from the AppDelegate's OpenURL method
/// @param options options from the AppDelegate's OpenURL method
- (BOOL)isBlueshiftOpenURLLink:(NSURL*)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options;

/// Send the deep link url to React native by calling this method. The Plugin will deliver the url to react native using event 'url'.
/// @param application application object
/// @param url url
/// @param options additional params
/// @note Add an observer in react native as below to listen to `url` event.
/// @code
/// Linking.addEventListener('url', this.handleDeepLink);
/// @endcode
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options;

/// Check if the received Universal link activity/url is of Blueshift or not.
/// @param userActivity userActivity object
- (BOOL)isBlueshiftUniversalLink:(nonnull NSUserActivity *)userActivity;

/// Call this method to handle Universal links. SDK processes the universal link and delivers the original link in the `didCompleteLinkProcessing` delegate method. In case of automatic integration, Plugin will deliver the universal link to react native using event 'url'. For manual integration, refer to Plugin documentation.
/// @param application application object
/// @param userActivity userActivity object
/// @param restorationHandler handler
/// @note Add an observer in react native as below to listen to `url` event.
/// @code
/// Linking.addEventListener('url', this.handleDeepLink);
/// @endcode
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler;

/// Use this method to send push notification payload manually to React native using event `PushNotificationClickedEvent`.
/// @param userInfo Push notification payload as NSDictionary
/// @note Add an observer in react as below to listen to `PushNotificationClickedEvent` event.
/// @code
/// Blueshift.addEventListener("PushNotificationClickedEvent", this.handlePush);
/// @endcode
- (void)sendPushNotificationDataToRN:(NSDictionary*)userInfo;

#pragma mark - Legacy react native bridge methods

/// Use this method to send the deep link data manually using event `DeepLinkEvent` to React native. This method is to support the legacy bridge events.
/// @param deepLinkURL url object
/// @param deepLinkData additional data as NSDictionary
/// @note Add observer in react as below to listen to `DeepLinkEvent` event.
/// @code
/// Blueshift.addEventListener('DeepLinkEvent', this.handleDeepLink);
/// @endcode
- (void)sendDeepLinkURLToRN:(NSURL* _Nonnull)deepLinkURL data:(NSDictionary*_Nullable)deepLinkData;

#pragma mark - Plugin internal methods

- (void)fireEventWithEventName:(NSString*)eventName data:(NSDictionary*)data;

- (void)fireCachedEventWithEventName:(NSString*)eventName;

@end

NS_ASSUME_NONNULL_END
