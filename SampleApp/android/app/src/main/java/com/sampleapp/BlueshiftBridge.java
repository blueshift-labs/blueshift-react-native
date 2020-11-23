package com.sampleapp;

import androidx.annotation.NonNull;

import com.blueshift.Blueshift;
import com.blueshift.BlueshiftAppPreferences;
import com.blueshift.BlueshiftLogger;
import com.blueshift.model.UserInfo;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class BlueshiftBridge extends ReactContextBaseJavaModule {
    private static final String TAG = "BlueshiftBridge";
    private ReactApplicationContext applicationContext;

    public BlueshiftBridge(ReactApplicationContext reactContext) {
        super(reactContext);
        this.applicationContext = reactContext;
        BlueshiftLogger.setLogLevel(BlueshiftLogger.VERBOSE);
    }

    @NonNull
    @Override
    public String getName() {
        return "BlueshiftBridge";
    }


    @ReactMethod
    void setUserEmailId(String email) {
        UserInfo.getInstance(applicationContext).setEmail(email);
        UserInfo.getInstance(applicationContext).save(applicationContext);
    }

    @ReactMethod
    void setUserCustomerId(String customerId) {
        UserInfo.getInstance(applicationContext).setRetailerCustomerId(customerId);
        UserInfo.getInstance(applicationContext).save(applicationContext);
    }

    @ReactMethod
    void identifyWithDetails(ReadableMap map) {
        String email = UserInfo.getInstance(applicationContext).getEmail();
        Blueshift.getInstance(applicationContext).identifyUserByEmail(email, map.toHashMap(), false);
    }

    @ReactMethod
    void trackCustomEvent(String eventName, ReadableMap map, boolean canBatch) {
        Blueshift.getInstance(applicationContext).trackEvent(eventName, map.toHashMap(), canBatch);
    }

    @ReactMethod
    void trackScreenView(String screenName, ReadableMap map, boolean canBatch) {
        Blueshift.getInstance(applicationContext).trackScreenView(screenName, canBatch);
    }

    @ReactMethod
    void removeUserInfo() {
        BlueshiftLogger.d(TAG, "Method not available");
    }

    @ReactMethod
    void registerForRemoteNotification() {
        BlueshiftLogger.d(TAG, "Method not available");
    }

    @ReactMethod
    void setEnablePush(boolean enablePush) {
        BlueshiftAppPreferences.getInstance(applicationContext).setEnablePush(enablePush);
        BlueshiftAppPreferences.getInstance(applicationContext).save(applicationContext);
    }

    @ReactMethod
    void registerForInApp(String screenName) {
        BlueshiftLogger.d(TAG, "Method not available");
    }

    @ReactMethod
    void unregisterForInApp() {
        BlueshiftLogger.d(TAG, "Method not available");
    }

    @ReactMethod
    void fetchInAppNotification() {
        Blueshift.getInstance(applicationContext).fetchInAppMessages(null);
    }

    @ReactMethod
    void displayInAppNotification() {
        Blueshift.getInstance(applicationContext).displayInAppMessages();
    }
}
