# iOS Plugin Integration

After adding the Blueshift plugin to your project, run `pod install` inside `iOS` directory. The pod will install the Blueshift plugin along with the Blueshift iOS SDK in your iOS Project.

### Prerequisites

Following permissions needs to be enabled in your Xcode project to send push notifications to the user’s device. 
* To send push notifications, [add **Push Notifications** capability to your app target](https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns). 
* To send silent push notifications, [add **Background modes** capability to your App target and enable **Remote notifications** background mode for your app target](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app).

After adding the **Push Notifications** capability and enabling **Remote notifications** background mode, it should look like the below.

![alt text](https://files.readme.io/6b23055-capability.png)

## 1. SDK integration

You can integrate Blueshift React plugin for your iOS project using Automatic integration, where Blueshift Plugin can take care of handling the device token, push notification, and deep link callbacks. 

Automatic integration is not recommended if you are using Firebase SDK or any other SDK with auto integration along with Blueshift. The push notification and other OS callback methods do conflict with each other, so in this case, you can use the manual way of SDK integration. Please reach out to our support team by sending an email to support@getblueshift.com for any integration-related queries.

Follow below steps for SDK integration:

#### Setup AppDelegate.h 

To get started, include the Plugin’s header file in the `AppDelegate.h` file of the app’s Xcode project.

Include the Plugin’s header `BlueshiftPluginManager.h` in `AppDelegate.h` and also implement the `UNUserNotificationCenterDelegate` protocol on `AppDelegate` class. The `AppDelegate.h` should like:

```objective-c
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import "BlueshiftPluginManager.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
```

#### Setup AppDelegate.m 

Now open `AppDelegate.m` file and add the following function in the `AppDelegate` class. Initialise the Blueshift react native plugin using `BlueshiftPluginManager` class method `initialisePluginWithConfig: autoIntegrate:`. Pass `autoIntegrate` as `YES` to opt in for automatic integration.

```objective-c

- (void)initialiseBlueshiftWithLaunchOptions:(NSDictionary*)launchOptions {
  // Create config object
  BlueShiftConfig *config = [[BlueShiftConfig alloc] init];
  
  // Set Blueshift API key to SDK
  config.apiKey = @"API KEY";
 
  // Set launch options to track the push click from killed app state
  config.applicationLaunchOptions = launchOptions;
    
  // Delay push permission by setting NO, by default push permission is displayed on app launch.
  config.enablePushNotification = NO;
  
  // Set userNotificationDelegate to self to get the push notification callbacks.
  config.userNotificationDelegate = self;
  
  // Initialise the Plugin and SDK using the Automatic integration.
  [[BlueshiftPluginManager sharedInstance] initialisePluginWithConfig:config autoIntegrate:YES];
}

```

Now call above function inside the `application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions` method of the `AppDelegate` class. The `AppDelegate.m` file will look like:

```objective-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  /*
  //   React Native initialisation code.
  //
  */
  
  // Initialise the Plugin & SDK by calling the `initialiseBlueshiftWithLaunchOptions` method before the return statment. 
  [self initialiseBlueshiftWithLaunchOptions:launchOptions];
  
  return YES;
}

```

#### SDK Config values
The other optional SDK config values which can be used to configure the SDK are:

```Objective-c

  // Optional:  Set Blueshift Region US or EU, default region will be the US if not set.
 [config setRegion:BlueshiftRegionEU];

  // Optional: Set AppGroupId only if you are using the Carousel push notifications.
 [config setAppGroupID:@"Your App Group ID here"];

  // Optional: Set custom authorization options
  [config setCustomAuthorizationOptions: UNAuthorizationOptionAlert| UNAuthorizationOptionSound| UNAuthorizationOptionBadge| UNAuthorizationStatusProvisional];

  // Optional: Set App's push notification custom categories, SDK will register them
  [config setCustomCategories: [self getCustomeCategories]];
  
 // Optional: Set Batch upload interval in seconds.
 // If you do not add the below line, SDK by default sets it to 300 seconds.
 [[BlueShiftBatchUploadConfig sharedInstance] setBatchUploadTimer:60.0];

  // Optional: Set device Id type, SDK uses IDFV by default if you do not
  // Add below line of code. For more information, see:
  //https://developer.blueshift.com/docs/include-configure-initialize-the-ios-sdk-in-the-app#specify-the-device-id-source
 [config setBlueshiftDeviceIdSource: BlueshiftDeviceIdSourceIDFVBundleID];

 //Optional: Set debug true to see Blueshift SDK info and API logs, by default it's set as false.
 #ifdef DEBUG
 	[config setDebug:YES];
 #endif

 // Optional: Set the applications launch Options for SDK to track.
 [config setApplicationLaunchOptions:launchOptions];

```

The SDK setup with automatic integration is complete over here. Using this setup you will be able to send events to Blueshift, send basic push notifications (title+content) to the iOS device. And also you will get the deep links in your react app using event `url`.
Refer section to enable Rich push notifications, section to enable in-app notifications and section to enable Blueshift email deep links. 


### Manual Integration
You will need to follow above mentioned steps to create the Blueshift Config and then initialise the Plugin by passing `autoIntegrate` as `NO`. 

```objective-c
  [[BlueshiftPluginManager sharedInstance] initialisePluginWithConfig:config autoIntegrate:NO];
```

Now, as you are doing manual integration, follow below steps to integrate the Blueshift SDK manually to handle push notification and deep link callbacks. 

#### Configure AppDelegate for push notifications
Add the following to the `AppDelegate.m` file of your app’s Xcode project to support the push notifications. Refer [this section](https://developer.blueshift.com/docs/include-configure-initialize-the-ios-sdk-in-the-app#configure-appdelegate-for-push-notifications) for more information.

```objective-c
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
  // Call Blueshift method to handle the push notification click 
    [[BlueShift sharedInstance].userNotificationDelegate handleUserNotification:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
  } else {
    //Handle Notifications other than Blueshift
  }
}
```
#### Configure AppDelegate for Batch uploads
Add the following to the `AppDelegate.m` file of your app’s Xcode project to support batch uploads. Refer [this section](https://developer.blueshift.com/docs/include-configure-initialize-the-ios-sdk-in-the-app#batch-upload-interval) for more information.

```objective-c
#pragma mark - Lifecycle methods

- (void)applicationDidEnterBackground:(UIApplication *)application {
  [[BlueShift sharedInstance].appDelegate appDidEnterBackground:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [[BlueShift sharedInstance].appDelegate appDidBecomeActive:application];
}

```

#### Handle the push and in-app deep links manually
The Blueshift iOS SDK supports deep links on push notifications and in-app messages. If a deep-link URL is present in the push or in-app message payload, the Blueshift SDK triggers `AppDelegate` class `application:openURL:options:` method on notification click/tap action and delivers the deep link there.

```objective-c
/// Override the open url method for handling deep links
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
 // Check if the received link is from Blueshift, then pass it to Blueshift plugin to handle it.
  if ([[BlueshiftPluginManager sharedInstance] isBlueshiftOpenURLLink:url options:options] == YES) {
    return [[BlueshiftPluginManager sharedInstance] application:application openURL:url options:options];
  } else {// If the link is not from Blueshift, write custom logic to handled it in your own way.
    // Write code to handle the other urls
  }
  return YES;
}
```
In the case of Automatic integration, the deep links for push and in-app are handled by the plugin automatically. You can always override this functionality by manually implementing the method mentioned above.

## 2. Enable Rich push notifications
Blueshift supports Image and Carousel based push notifications.

- **Support Rich image-based push notifications** - you will need to add the `Notification service extension` to your project and integrate the `Blueshift-iOS-Extension-SDK`. Follow [this document](https://developer.blueshift.com/docs/integrate-your-ios-apps-notifications-with-blueshift#set-up-notification-service-extension) for step by step guide to enable Rich image push notifications.  

- **Support Carousel push notifications** - You will need to integrate the `Notification service extension` and then add `Notification content extension`. Follow [this document](https://developer.blueshift.com/docs/integrate-your-ios-apps-notifications-with-blueshift#set-up-notification-content-extension) for step by step guide to enable carousel push notifications. Make sure you set the App group id, `App group id` is mandatory to set when you use carousel push notifications. For [this document](https://developer.blueshift.com/docs/integrate-your-ios-apps-notifications-with-blueshift#add-an-app-group) to create and set up an app group id in your project.

## 3. Enable In-App Messages
By default, In-app messages are disabled in the SDK. You will need to enable it explicitly from the Blueshift config.

#### Enable In-App messages from Blueshift Config
During the SDK initialisation in `AppDelegate.m` file, we have set the values to the config. You need to set `enableInAppNotification` property of config to `YES` to enable in-app messages from Blueshift iOS SDK. 

```objective-c 
[config setEnableInAppNotification:YES];

```

#### Configure time intervals between two in-apps
By default, the time interval between two in-app messages (the interval when a message is dismissed and the next message appears) is one minute. You can use the following method to change this interval during the SDK initialization in the `AppDelegate.m` file:

```objective-c
// Set time interval in seconds
[config setBlueshiftInAppNotificationTimeInterval:30];
```

#### Enable Background Modes
We highly recommend enabling Background fetch and Remote notifications background modes from the Signing & Capabilities. This will enable the app to fetch the in-app messages if the app is in the background state.

![alt_text](https://files.readme.io/31d15b6-Screenshot_2020-07-14_at_7.02.38_PM.png)

#### Register screens for in-app messages
Once you enable the In-app messages, you will need to register the react-native screens for receiving the in-app messages. You can register the screens in two ways.

- **Register all screens** in Xcode project to receive in-app messages.
You need to add `registerForInAppMessage` line in the `AppDelegate.m` file immediately after the SDK initialisation line irrespective of automatic or manual integration. Refer to the below code snippet for reference. 

```objective-c
  [[BlueshiftPluginManager sharedInstance] initialisePluginWithConfig:config autoIntegrate:YES];
  [[BlueShift sharedInstance] registerForInAppMessage:@"ReactNative"];
```

- **Register and unregister each screen** of your react native project for in-app messages. If you don’t register a screen for in-app messages, the in-app messages will stop showing up for screens that are not registered. You will need to add in-app registration and unregistration code on the `componentDidMount` and `componentWillUnmount` respectively inside your react native screens. Refer below code snipper for reference. 

```Javascript
 componentDidMount() { 
    // Register for in-app notification
    Blueshift.registerForInAppMessage("HomeScreen");
  }
  
 componentWillUnmount() {
    // Unregister for in-app notification
    Blueshift.unregisterForInAppMessage();
 }
```
## 3. Enable Blueshift email deep links
Blueshift’s deep links are usual https URLs that take users to a page in the app or launch them in a browser. If an email or text message that we send as a part of your campaign contains a Blueshift deep link and a user clicks on it, iOS will launch the installed app and Blueshift SDK will deliver the deep link to the app so that app can navigate the user to the respective screen.

- Complete the CNAME and AASA configuration as mentioned in the `Prerequisites` section of [this document](https://developer.blueshift.com/docs/integrate-blueshifts-universal-links-ios#prerequisites).

- Add associated domains to your Xcode project as mentioned in the `Integration` section of [this document](https://developer.blueshift.com/docs/integrate-blueshifts-universal-links-ios#integration).

- Follow below steps for to enable Blueshift deep links from the SDK.

Implement protocol `BlueshiftUniversalLinksDelegate` on the AppDelegate class to get the deep links callbacks from the SDK. You `AppDelegate.h` will look like below,

```objective-c
#import "BlueshiftPluginManager.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate,BlueshiftUniversalLinksDelegate, UNUserNotificationCenterDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
```
Now set the `blueshiftUniversalLinksDelegate` config variable to `true` to enable the Blueshift deep links during the Blueshift Plugin initialisation in 
`AppDelegate.m` file. 

```objective-c
  // If you want to use the Blueshift universal links, then set it as below.
  config.blueshiftUniversalLinksDelegate = self;
```

### Automatic Integration 
If you have integrated the Plugin and SDK using the automatic integration, your setup is completed here. You will receive the deep link on the react-native using event `url`.

### Manual Integration
If you have opted for Manual integration, you will need to follow the below steps to integrate the Blueshift Plugin.

#### Configure continueUserActivity method
Pass the URL/activity from the `continueUserActivity` method to the Plugin, so that the Plugin can process the URL and perform the click tracking. After processing the URL, the SDK sends the original URL in the `BlueshiftUniversalLinksDelegate` method.

```objective-c
// Override the `application:continueUserActivity:` method for handling the universal links
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
   // Check if the received URL is Blueshift universal link URL, then pass it to Blueshift plugin to handle it.
  if ([[BlueshiftPluginManager sharedInstance] isBlueshiftUniversalLink:userActivity] == YES) {
    return  [[BlueshiftPluginManager sharedInstance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  } else { // If the link is not from Blueshift, write custom logic to handled it in your own way.
    // Write code to handle the other urls
  }
  return YES;
}
```
In case of Automatic integration, the email deep links are handled by the plugin automatically. You can always override this functionality by manually implementing the method as mentioned above.

#### Implement BlueshiftUniversalLinksDelegate
Now, implement the `BlueshiftUniversalLinksDelegate` delegate methods to get the success and failure callbacks. `BlueshiftPluginManager` will take care of delivering this deep link under event `url` to the react native.

```objective-c
// Deep link processing success callback
- (void)didCompleteLinkProcessing:(NSURL *)url {
  if (url) {
    [[BlueshiftPluginManager sharedInstance] application:UIApplication.sharedApplication openURL:url options:@{}];
  }
}

// Deep link processing failure callback
- (void)didFailLinkProcessingWithError:(NSError *)error url:(NSURL *)url {
  if (url) {
    [[BlueshiftPluginManager sharedInstance] application:UIApplication.sharedApplication openURL:url options:@{}];
  }
}
```

Refer to the Troubleshooting section of [this document](https://developer.blueshift.com/docs/integrate-blueshifts-universal-links-ios#troubleshooting) to 
troubleshoot the integration issues.
