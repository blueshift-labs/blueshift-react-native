//
//  NotificationService.m
//  NotificationService
//
//  Created by Ketan Shikhare on 25/07/24.
//

#import "NotificationService.h"
#import <BlueShift-iOS-Extension-SDK/BlueShiftAppExtension.h>

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
    //Check if the notification is from Blueshift
    if([[BlueShiftPushNotification sharedInstance] isBlueShiftPushNotification:request]) {
        //Update the badge count based on pending notifications
        NSNumber* updatedBadgeCount = [[BlueShiftPushNotification sharedInstance] getUpdatedBadgeNumberForRequest:request];
        if (updatedBadgeCount) {
            self.bestAttemptContent.badge = updatedBadgeCount;
        }
        
        //Download media and assign as attachments
        self.bestAttemptContent.attachments = [[BlueShiftPushNotification sharedInstance] integratePushNotificationWithMediaAttachementsForRequest:request andAppGroupID:nil];
    } else {
        //handle notifications if not from Blueshift
    }
    
   self.contentHandler(self.bestAttemptContent);
}

- (void)serviceExtensionTimeWillExpire {
    
    // Called just before the extension will be terminated by the system.
    if([[BlueShiftPushNotification sharedInstance] hasBlueShiftAttachments]) {
        self.bestAttemptContent.attachments = [BlueShiftPushNotification sharedInstance].attachments;
    }
    self.contentHandler(self.bestAttemptContent);
}

@end
