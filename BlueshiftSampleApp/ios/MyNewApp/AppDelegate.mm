#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"MyNewApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [self initialiseBlueshiftWithLaunchOptions:launchOptions];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)initialiseBlueshiftWithLaunchOptions:(NSDictionary*)launchOptions {
  // Create config object
  BlueShiftConfig *config = [[BlueShiftConfig alloc] init];
  
  // Set Blueshift API key to SDK
  config.apiKey = @"5dfe3c9aee8b375bcc616079b08156d9";
 
  // Set launch options to track the push click from killed app state
  config.applicationLaunchOptions = launchOptions;
    
  // Delay push permission dialog by setting NO, by default push permission dialog is displayed on app launch.
  config.enablePushNotification = YES;
  
  // Set userNotificationDelegate to self to get the push notification callbacks.
  config.userNotificationDelegate = self;
  
  config.blueshiftUniversalLinksDelegate = self;
  
  config.debug = YES;
  
  config.enableInAppNotification = YES;
  
  config.enableMobileInbox = YES;
  
  // Initialise the Plugin and SDK using the Automatic integration.
  [[BlueshiftPluginManager sharedInstance] initialisePluginWithConfig:config autoIntegrate:YES];
  [[BlueShift sharedInstance] registerForInAppMessage:@"ReactNative"];
}

@end
