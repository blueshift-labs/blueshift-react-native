//
//  BlueshiftBridge.m
//  ComeBlueshiftReactnative
//
//  Created by Ketan Shikhare on 30/12/21.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import <React/RCTLog.h>
#import <CoreLocation/CoreLocation.h>

#import "BlueshiftBridge.h"
#import "BlueshiftPluginManager.h"
#import "BlueShift.h"
#import "BlueshiftVersion.h"
#import "BlueshiftNotificationConstants.h"
#import "BlueShiftInAppNotificationHelper.h"

@implementation BlueshiftBridge

RCT_EXPORT_MODULE();

+(BOOL)requiresMainQueueSetup {
    return NO;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

#pragma mark Events
RCT_EXPORT_METHOD(identifyWithDetails:(NSDictionary *)details) {
    [[BlueShift sharedInstance] identifyUserWithDetails:[self addRNSDKVersionString:details] canBatchThisEvent:NO];
}

RCT_EXPORT_METHOD(trackCustomEvent:(NSString *)eventName details:(NSDictionary *) details canBatchThisEvent:(BOOL)canBatchThisEvent) {
    if ([eventName isKindOfClass:[NSString class]]) {
        [[BlueShift sharedInstance] trackEventForEventName:eventName andParameters:[self addRNSDKVersionString:details] canBatchThisEvent:canBatchThisEvent];
    }
}

RCT_EXPORT_METHOD(trackScreenView:(NSString *)screenName details:(NSDictionary *)details canBatchThisEvent:(BOOL)canBatchThisEvent) {
    if ([screenName isKindOfClass:[NSString class]]) {
        NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
        if ([details isKindOfClass:[NSDictionary class]]) {
            [params addEntriesFromDictionary:details];
        }
        params[kScreenViewed] = screenName;
        [[BlueShift sharedInstance] trackEventForEventName:kEventPageLoad andParameters:[self addRNSDKVersionString:params] canBatchThisEvent:canBatchThisEvent];
    }
}

#pragma mark Push Notifications
RCT_EXPORT_METHOD(registerForRemoteNotification) {
    [[[BlueShift sharedInstance] appDelegate] registerForNotification];
}

#pragma mark InApp Notifications
RCT_EXPORT_METHOD(registerForInAppMessage:(NSString *)screenName) {
    if ([screenName isKindOfClass:[NSString class]]) {
        [[BlueShift sharedInstance] registerForInAppMessage:screenName];
    }
}

RCT_EXPORT_METHOD(getRegisteredForInAppScreenName:(RCTResponseSenderBlock)callback) {
    if (callback) {
        NSString* screenName = [[BlueShift sharedInstance] getRegisteredForInAppScreenName];
        if (screenName) {
            callback(@[screenName]);
        } else {
            callback(@[@""]);
        }
    }
}

// Legacy bridge method for backward compatability
RCT_EXPORT_METHOD(registerForInAppNotification:(NSString *)screenName) {
    [self registerForInAppMessage:screenName];
}

RCT_EXPORT_METHOD(unregisterForInAppMessage) {
    [[BlueShift sharedInstance] unregisterForInAppMessage];
}

RCT_EXPORT_METHOD(fetchInAppNotification) {
    [[BlueShift sharedInstance] fetchInAppNotificationFromAPI:^{
        
    } failure:^(NSError * _Nonnull error) {
        
    }];
}

RCT_EXPORT_METHOD(displayInAppNotification) {
    [[BlueShift sharedInstance] displayInAppNotification];
}

#pragma mark Setters
RCT_EXPORT_METHOD(setUserInfoEmailId:(NSString *)emailId) {
    if ([emailId isKindOfClass:[NSString class]]) {
        [[BlueShiftUserInfo sharedInstance] setEmail:emailId];
        [[BlueShiftUserInfo sharedInstance] save];
    }
}

RCT_EXPORT_METHOD(setUserInfoCustomerId:(NSString *)customerId) {
    if ([customerId isKindOfClass:[NSString class]]) {
        [[BlueShiftUserInfo sharedInstance] setRetailerCustomerID:customerId];
        [[BlueShiftUserInfo sharedInstance] save];
    }
}

RCT_EXPORT_METHOD(setUserInfoExtras:(NSDictionary*)extras) {
    if ([extras isKindOfClass:[NSDictionary class]]) {
        [[BlueShiftUserInfo sharedInstance] setExtras:[extras mutableCopy]];
        [[BlueShiftUserInfo sharedInstance] save];
    }
}

RCT_EXPORT_METHOD(setUserInfoFirstName:(NSString *)firstName) {
    if ([firstName isKindOfClass:[NSString class]]) {
        [[BlueShiftUserInfo sharedInstance] setFirstName:firstName];
        [[BlueShiftUserInfo sharedInstance] save];
    }
}

RCT_EXPORT_METHOD(setUserInfoLastName:(NSString *)lastName) {
    if ([lastName isKindOfClass:[NSString class]]) {
        [[BlueShiftUserInfo sharedInstance] setLastName:lastName];
        [[BlueShiftUserInfo sharedInstance] save];
    }
}

RCT_EXPORT_METHOD(removeUserInfo) {
    [BlueShiftUserInfo removeCurrentUserInfo];
}

RCT_EXPORT_METHOD(setEnablePush:(BOOL)isEnabled) {
    [[BlueShiftAppData currentAppData] setEnablePush:isEnabled];
}

RCT_EXPORT_METHOD(setEnableInApp:(BOOL)isEnabled) {
    [[BlueShiftAppData currentAppData] setEnableInApp:isEnabled];
}

RCT_EXPORT_METHOD(setIDFA:(NSString*)idfaString) {
    if ([idfaString isKindOfClass:[NSString class]]) {
        [[BlueShiftDeviceData currentDeviceData] setDeviceIDFA:idfaString];
    }
}

RCT_EXPORT_METHOD(setEnableTracking:(BOOL)isEnabled) {
    [[BlueShift sharedInstance] enableTracking:isEnabled];
}

RCT_EXPORT_METHOD(setCurrentLocation:(double)latitude Longitude:(double)longitude) {
    CLLocation *location = [[CLLocation alloc] initWithLatitude:latitude longitude:longitude];
    [[BlueShiftDeviceData currentDeviceData] setCurrentLocation:location];
}

#pragma mark Getters
RCT_EXPORT_METHOD(getEnableInAppStatus:(RCTResponseSenderBlock)callback) {
    if (callback) {
        BOOL isEnabled = [BlueShiftAppData currentAppData].enableInApp;
        callback(@[@(isEnabled)]);
    }
}

RCT_EXPORT_METHOD(getEnablePushStatus:(RCTResponseSenderBlock)callback) {
    if (callback) {
        BOOL isEnabled = [BlueShiftAppData currentAppData].enablePush;
        callback(@[@(isEnabled)]);
    }
}

RCT_EXPORT_METHOD(getEnableTrackingStatus:(RCTResponseSenderBlock)callback) {
    if (callback) {
        BOOL isEnabled = [[BlueShift sharedInstance] isTrackingEnabled];
        callback(@[@(isEnabled)]);
    }
}

RCT_EXPORT_METHOD(getUserInfoFirstName:(RCTResponseSenderBlock)callback) {
    if (callback) {
        NSString* firstName = [BlueShiftUserInfo sharedInstance].firstName;
        callback(@[firstName ? firstName : @""]);
    }
}

RCT_EXPORT_METHOD(getUserInfoLastName:(RCTResponseSenderBlock)callback) {
    if (callback) {
        NSString* lastName = [BlueShiftUserInfo sharedInstance].lastName;
        callback(@[lastName ? lastName : @""]);
    }
}

RCT_EXPORT_METHOD(getUserInfoEmailId:(RCTResponseSenderBlock)callback) {
    if (callback) {
        NSString* emailId = [BlueShiftUserInfo sharedInstance].email;
        callback(@[emailId ? emailId : @""]);
    }
}

RCT_EXPORT_METHOD(getUserInfoCustomerId:(RCTResponseSenderBlock)callback) {
    if (callback) {
        NSString* customerId = [BlueShiftUserInfo sharedInstance].retailerCustomerID;
        callback(@[customerId ? customerId : @""]);
    }
}

RCT_EXPORT_METHOD(getUserInfoExtras:(RCTResponseSenderBlock)callback) {
    if (callback) {
        NSMutableDictionary* extras = [BlueShiftUserInfo sharedInstance].extras;
        callback(@[extras ? extras : @{}]);
    }
}

RCT_EXPORT_METHOD(getCurrentDeviceId:(RCTResponseSenderBlock)callback)  {
    if (callback) {
        NSString* deviceId = [BlueShiftDeviceData currentDeviceData].deviceUUID;
        callback(@[deviceId ? deviceId : @""]);
    }
}

#pragma mark Live content
RCT_EXPORT_METHOD(getLiveContentByEmail:(NSString*)slot context:(NSDictionary*)context callback:(RCTResponseSenderBlock)callback) {
    [BlueShiftLiveContent fetchLiveContentByEmail:slot withContext:context success:^(NSDictionary *result) {
        if (callback) {
            callback(@[result,[NSNull null]]);
        }
    } failure:^(NSError *error) {
        if (callback) {
            if (error.debugDescription) {
                callback(@[[NSNull null],error.debugDescription]);
            } else {
                callback(@[[NSNull null],@"Failed to fetch live content."]);
            }
        }
    }];
}

RCT_EXPORT_METHOD(getLiveContentByCustomerId:(NSString*)slot context:(NSDictionary*)context callback:(RCTResponseSenderBlock)callback) {
    [BlueShiftLiveContent fetchLiveContentByCustomerID:slot withContext:context success:^(NSDictionary *result) {
        if (callback) {
            callback(@[result,[NSNull null]]);
        }
    } failure:^(NSError *error) {
        if (callback) {
            if (error.debugDescription) {
                callback(@[[NSNull null],error.debugDescription]);
            } else {
                callback(@[[NSNull null],@"Failed to fetch live content."]);
            }
        }
    }];
}

RCT_EXPORT_METHOD(getLiveContentByDeviceId:(NSString*)slot context:(NSDictionary*)context callback:(RCTResponseSenderBlock)callback) {
    [BlueShiftLiveContent fetchLiveContentByDeviceID:slot withContext:context success:^(NSDictionary *result) {
        if (callback) {
            callback(@[result,[NSNull null]]);
        }
    } failure:^(NSError *error) {
        if (callback) {
            if (error.debugDescription) {
                callback(@[[NSNull null],error.debugDescription]);
            } else {
                callback(@[[NSNull null],@"Failed to fetch live content."]);
            }
        }
    }];
}

#pragma mark Inbox
RCT_EXPORT_METHOD(syncInboxMessages:(RCTResponseSenderBlock)callback) {
    [BlueshiftInboxManager syncInboxMessages:^{
        if (callback) {
            callback(@[@YES]);
        }
    }];
}

RCT_EXPORT_METHOD(getInboxMessages:(RCTResponseSenderBlock)callback) {
    [BlueshiftInboxManager getCachedInboxMessagesWithHandler:^(BOOL status, NSMutableArray<BlueshiftInboxMessage *> * _Nullable messages) {
        if (status && messages.count > 0) {
            NSMutableArray* convertedMessages = [[NSMutableArray alloc] init];
            [messages enumerateObjectsUsingBlock:^(BlueshiftInboxMessage * _Nonnull msg, NSUInteger idx, BOOL * _Nonnull stop) {
                if (msg) {
                    [convertedMessages addObject:[msg toDictionary]];
                }
            }];
            callback(@[@{@"messages": [convertedMessages copy]}]);
        } else {
            callback(@[@{@"messages":@[]}]);
        }
    }];
}

RCT_EXPORT_METHOD(getUnreadInboxMessageCount:(RCTResponseSenderBlock)callback) {
    if (callback) {
        [BlueshiftInboxManager getInboxUnreadMessagesCount:^(BOOL status, NSUInteger count) {
            if (status) {
                callback(@[[NSNumber numberWithUnsignedInteger:count]]);
            } else {
                callback(@[[NSNumber numberWithUnsignedInteger:0]]);
            }
        }];
    }
}

RCT_EXPORT_METHOD(deleteInboxMessage:(NSDictionary*)message callback:(RCTResponseSenderBlock)callback) {
    if ([message isKindOfClass:[NSDictionary class]]) {
        [BlueshiftInboxManager deleteInboxMessage:[[BlueshiftInboxMessage alloc] initWithDictionary:message] completionHandler:^(BOOL status, NSString * _Nullable errMsg) {
            if (status) {
                callback(@[@YES, @""]);
            } else {
                callback(@[@NO, errMsg]);
            }
        }];
    }
}

RCT_EXPORT_METHOD(showInboxMessage:(NSDictionary*)message) {
    if ([message isKindOfClass:[NSDictionary class]]) {
        [BlueshiftInboxManager showNotificationForInboxMessage:[[BlueshiftInboxMessage alloc] initWithDictionary:message] inboxInAppDelegate:nil];
    }
}

RCT_EXPORT_METHOD(processBlueshiftUrl:(NSString*)url) {
    // Android Placeholder method
}

- (NSDictionary *)addRNSDKVersionString: (NSDictionary*) details {
    NSString *sdkVersion = [NSString stringWithFormat:@"%@-RN-%@",kBlueshiftSDKVersion,kBlueshiftReactSDKVersion];
    if ([details isKindOfClass:[NSDictionary class]]) {
        NSMutableDictionary *dict = [details mutableCopy];
        dict[kInAppNotificationModalSDKVersionKey] = sdkVersion;
        return dict;
    } else {
        NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
        dict[kInAppNotificationModalSDKVersionKey] = sdkVersion;
        return dict;
    }
}
@end
