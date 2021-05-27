#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import "BlueshiftPluginManager.h"

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
                                                   moduleName:@"SampleApp"
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
  BlueShiftConfig *config = [[BlueShiftConfig alloc] init];
  config.apiKey = @"YOUR API KEY";
  config.debug = YES;
  if (launchOptions) {
    config.applicationLaunchOptions = launchOptions;
    [[BlueshiftPluginManager sharedInstance] handlePushNotificationFromLaunchOpions:launchOptions];
  }
  config.enableInAppNotification = YES;
  config.enableInAppNotification = YES;
  config.userNotificationDelegate = self;
  config.blueshiftUniversalLinksDelegate = self;
  config.appGroupID = @"group.blueshift.reads";
  [BlueShift initWithConfiguration:config];
}

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
    [[BlueShift sharedInstance].userNotificationDelegate handleUserNotificationCenter:center willPresentNotification:notification withCompletionHandler:^(UNNotificationPresentationOptions options) {
      completionHandler(options);
    }];
  }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  NSDictionary* userInfo = response.notification.request.content.userInfo;
  if([[BlueShift sharedInstance]isBlueshiftPushNotification:userInfo]) {
    [[BlueShift sharedInstance].userNotificationDelegate handleUserNotification:center didReceiveNotificationResponse:response withCompletionHandler:^{
      completionHandler();
    }];
    [[BlueshiftPluginManager sharedInstance] sendPushNotificationDataToRN:userInfo];
  }
}

#pragma mark - open url and user activity methods
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  if ([options[@"source"] isEqualToString:@"Blueshift"]) {
    [[BlueshiftPluginManager sharedInstance] sendDeepLinkURLToRN:url data:options];
  } else {
    [RCTLinkingManager application:app openURL:url options:options];
  }
  
  if (url) {
    return YES;
  } else {
    return NO;
  }
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  if (userActivity.webpageURL != nil && [[BlueShift sharedInstance] isBlueshiftUniversalLinkURL:userActivity.webpageURL]) {
    [[BlueShift sharedInstance].appDelegate handleBlueshiftUniversalLinksForActivity: userActivity];
  } else {
    [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  }
  return YES;
}

- (void)didCompleteLinkProcessing:(NSURL *)url {
  [[BlueshiftPluginManager sharedInstance] sendDeepLinkURLToRN:url data:nil];
}

- (void)didStartLinkProcessing {
//  NSLog(@"didStartLinkProcessing");
}

- (void)didFailLinkProcessingWithError:(NSError *)error url:(NSURL *)url {
  [[BlueshiftPluginManager sharedInstance] sendDeepLinkURLToRN:url data:nil];
}

#pragma mark - Lifecycle methods

- (void)applicationDidEnterBackground:(UIApplication *)application {
  [[BlueShift sharedInstance].appDelegate appDidEnterBackground:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [[BlueShift sharedInstance].appDelegate appDidBecomeActive:application];
}

@end
