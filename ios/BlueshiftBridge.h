//
//  BlueshiftBridge.h
//  ComeBlueshiftReactnative
//
//  Created by Ketan Shikhare on 30/12/21.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN
#define kScreenViewed @"screen_viewed"

#define kBlueshiftReactSDKVersion @"1.2.3"

@interface BlueshiftBridge : NSObject <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
