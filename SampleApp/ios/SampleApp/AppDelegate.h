#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <BlueShift-iOS-SDK/BlueShift.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, BlueshiftUniversalLinksDelegate, UNUserNotificationCenterDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
