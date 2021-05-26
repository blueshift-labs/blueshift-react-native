#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <BlueShift-iOS-SDK/BlueShift.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, BlueshiftUniversalLinksDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
