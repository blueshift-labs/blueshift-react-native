# Android Plugin Integration

## Depend on Blueshift Android SDK

To install the Blueshift Android SDK, add the following line to the app level `build.gradle` file. To know the latest version, check the [releases](https://github.com/blueshift-labs/Blueshift-Android-SDK/releases) page on Github. 

```groovy
implementation "com.blueshift:android-sdk-x:$sdkVersion"
```

## Depend on Firebase Messaging

Blueshift uses Firebase Messaging for sending push messages. If not already done, please integrate Firebase Messaging into the project.

If this is the first time that you are integrating FCM with your application, add the following lines of code into the `AndroidManifest.xml` file. This will enable the Blueshift Android SDK to receive the push notification sent from Blueshift servers via Firebase.

```xml
<service android:name="com.blueshift.fcm.BlueshiftMessagingService">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

If you have an existing FCM integration, let your `FirebaseMessagingService` class to extend `BlueshiftMessagingService` as mentioned below. This will enable the Blueshift Android SDK to receive the push notification sent from Blueshift servers via Firebase.

```java
public class AwesomeAppMessagingService extends BlueshiftMessagingService {

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        if (BlueshiftUtils.isBlueshiftPushMessage(remoteMessage)) {
            super.onMessageReceived(remoteMessage);
        } else {
            /*
             * The push message does not belong to Blueshift. Please handle it here.
             */
        }
    }

    @Override
    public void onNewToken(String newToken) {
        super.onNewToken(newToken);

        /*
         * Use the new token in your app. the super.onNewToken() call is important
         * for the SDK to do the analytical part and notification rendering.
         * Make sure that it is present when you override onNewToken() method.
         */
    }
}
```

## Grant Permissions

Add the following permissions to the `AndroidManifest.xml` file.

```xml
<!-- Internet permission is required to send events, 
get notifications and in-app messages. -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Network state access permission is required to detect changes 
in network connection to schedule sync operations. -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Location access permission is required if you want to track the 
location of the user. You can skip this step if you don't want to 
track the user location. -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## Initialize the Native SDK

Open the `MainApplication` class and add the following lines to its `onCreate()` method.

```java
Configuration configuration = new Configuration();

// == Mandatory Settings ==
configuration.setAppIcon(R.mipmap.ic_launcher);
configuration.setApiKey("BLUESHIFT_EVENT_API_KEY");

Blueshift.getInstance(this).initialize(configuration);
```

To know more about the other optional configurations, please check [this document](https://developer.blueshift.com/docs/get-started-with-the-android-sdk#optional-configurations).

Also, add update the `onCreate()` and `onNewIntent()` methods of your `MainActivity` class as given below to handle push deep links.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 BlueshiftReactNativeModule.processBlueshiftPushUrl(getIntent());
}

@Override
public void onNewIntent(Intent intent) {
 super.onNewIntent(intent);
 BlueshiftReactNativeModule.processBlueshiftPushUrl(getIntent());
}
```
