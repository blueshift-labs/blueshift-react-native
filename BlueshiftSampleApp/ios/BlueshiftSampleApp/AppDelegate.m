#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"BlueshiftSampleApp"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [self initialiseBlueshiftWithLaunchOptions:launchOptions];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)initialiseBlueshiftWithLaunchOptions:(NSDictionary*)launchOptions {
  // Create config object
  BlueShiftConfig *config = [[BlueShiftConfig alloc] init];
  
  // Set Blueshift API key to SDK
  config.apiKey = @"API KEY";
 
  // Set launch options to track the push click from killed app state
  config.applicationLaunchOptions = launchOptions;
    
  // Delay push permission by setting NO, by default push permission is displayed on app launch.
  config.enablePushNotification = YES;
  
  config.debug = YES;
  
  // Set userNotificationDelegate to self to get the push notification callbacks.
  config.userNotificationDelegate = self;
  
  // Initialise the Plugin and SDK using the Automatic integration.
  [[BlueshiftPluginManager sharedInstance] initialisePluginWithConfig:config autoIntegrate:YES];
}


#pragma mark - Implement below methods for manual integration
/*
#pragma mark - remote notification delegate methods
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(nonnull NSData *)deviceToken {
    [[BlueShift sharedInstance].appDelegate registerForRemoteNotification:deviceToken];
}

- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError*)error {
    [[BlueShift sharedInstance].appDelegate failedToRegisterForRemoteNotificationWithError:error];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))handler {
    [[BlueShift sharedInstance].appDelegate handleRemoteNotification:userInfo forApplication:application fetchCompletionHandler:handler];
}

#pragma mark - UserNotificationCenter delegate methods
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{
  NSDictionary* userInfo = notification.request.content.userInfo;
  if([[BlueShift sharedInstance]isBlueshiftPushNotification:userInfo]) {
    [[BlueShift sharedInstance].userNotificationDelegate handleUserNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
  } else {
    //Handle Notifications other than Blueshift
  }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  NSDictionary* userInfo = response.notification.request.content.userInfo;

 // Optional : Call Plugin method to send the push notification payload to react native under event `PushNotificationClickedEvent`.
 [[BlueshiftPluginManager sharedInstance] sendPushNotificationDataToRN:userInfo];
  
  if([[BlueShift sharedInstance]isBlueshiftPushNotification:userInfo]) {
    [[BlueShift sharedInstance].userNotificationDelegate handleUserNotification:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
  } else {
    //Handle Notifications other than Blueshift
  }
}

#pragma mark - Manual Blueshift integration
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  if ([[BlueshiftPluginManager sharedInstance] isBlueshiftOpenURLLink:url options:options] == YES) {
    return [[BlueshiftPluginManager sharedInstance] application:application openURL:url options:options];
  } else {
    // Write code to handle the other urls
  }
  return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  if ([[BlueshiftPluginManager sharedInstance] isBlueshiftUniversalLink:userActivity] == YES) {
    return  [[BlueshiftPluginManager sharedInstance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  } else {
    // Write code to handle the other urls
  }
  return YES;
}

#pragma mark - Blueshift Universal links delgate methods
- (void)didCompleteLinkProcessing:(NSURL *)url {
  if (url) {
    [[BlueshiftPluginManager sharedInstance] application:UIApplication.sharedApplication openURL:url options:@{}];
  }
}

- (void)didFailLinkProcessingWithError:(NSError *)error url:(NSURL *)url {
  if (url) {
    [[BlueshiftPluginManager sharedInstance] application:UIApplication.sharedApplication openURL:url options:@{}];
  }
}

#pragma mark - Lifecycle methods

- (void)applicationDidEnterBackground:(UIApplication *)application {
  [[BlueShift sharedInstance].appDelegate appDidEnterBackground:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [[BlueShift sharedInstance].appDelegate appDidBecomeActive:application];
  
}
*/
@end
