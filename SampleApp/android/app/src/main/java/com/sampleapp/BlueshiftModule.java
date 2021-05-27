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

public class BlueshiftModule extends ReactContextBaseJavaModule {
    private static final String TAG = "BlueshiftBridge";
    private ReactApplicationContext applicationContext;

    BlueshiftModule(ReactApplicationContext applicationContext) {
        super(applicationContext);
        this.applicationContext = applicationContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "BlueshiftBridge";
    }

    @ReactMethod
    void setUserInfoEmailId(String email) {
        UserInfo.getInstance(applicationContext).setEmail(email);
        UserInfo.getInstance(applicationContext).save(applicationContext);
    }

    @ReactMethod
    void setUserInfoCustomerId(String customerId) {
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
    void setCurrentLocation(double latitude, double longitude) {
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