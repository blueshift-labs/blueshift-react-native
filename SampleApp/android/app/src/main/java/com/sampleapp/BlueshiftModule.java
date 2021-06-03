package com.sampleapp;

import androidx.annotation.NonNull;

import com.blueshift.Blueshift;
import com.blueshift.BlueshiftAppPreferences;
import com.blueshift.BlueshiftLogger;
import com.blueshift.model.UserInfo;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.google.gson.Gson;

import java.util.Map;

public class BlueshiftModule extends ReactContextBaseJavaModule {
    private static final String TAG = "BlueshiftBridge";

    private static Map<String, Object> pushDeliveredAttr = null;
    private static Map<String, Object> pushClickedAttr = null;

    BlueshiftModule(ReactApplicationContext applicationContext) {
        super(applicationContext);
    }

    public static void setPushDeliveredAttr(Map<String, Object> pushDeliveredAttr) {
        BlueshiftModule.pushDeliveredAttr = pushDeliveredAttr;
    }

    public static void setPushClickedAttr(Map<String, Object> pushClickedAttr) {
        BlueshiftModule.pushClickedAttr = pushClickedAttr;
    }

    @NonNull
    @Override
    public String getName() {
        return "BlueshiftBridge";
    }

    @ReactMethod
    void getPushDeliveredAttributes(Callback callback) {
        String json = null;

        if (pushDeliveredAttr != null) {
            json = new Gson().toJson(pushDeliveredAttr);
        }

        callback.invoke(json);
    }

    @ReactMethod
    void getPushClickAttributes(Callback callback) {
        String json = null;

        if (pushClickedAttr != null) {
            json = new Gson().toJson(pushClickedAttr);
        }

        callback.invoke(json);
    }

    @ReactMethod
    void setUserInfoEmailId(String email) {
        UserInfo.getInstance(getReactApplicationContext()).setEmail(email);
        UserInfo.getInstance(getReactApplicationContext()).save(getReactApplicationContext());
    }

    @ReactMethod
    void setUserInfoCustomerId(String customerId) {
        UserInfo.getInstance(getReactApplicationContext()).setRetailerCustomerId(customerId);
        UserInfo.getInstance(getReactApplicationContext()).save(getReactApplicationContext());
    }

    @ReactMethod
    void identifyWithDetails(ReadableMap map) {
        String email = UserInfo.getInstance(getReactApplicationContext()).getEmail();
        Blueshift.getInstance(getReactApplicationContext()).identifyUserByEmail(email, map.toHashMap(), false);
    }

    @ReactMethod
    void trackCustomEvent(String eventName, ReadableMap map, boolean canBatch) {
        Blueshift.getInstance(getReactApplicationContext()).trackEvent(eventName, map.toHashMap(), canBatch);
    }

    @ReactMethod
    void trackScreenView(String screenName, ReadableMap map, boolean canBatch) {
        Blueshift.getInstance(getReactApplicationContext()).trackScreenView(screenName, canBatch);
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
        BlueshiftAppPreferences.getInstance(getReactApplicationContext()).setEnablePush(enablePush);
        BlueshiftAppPreferences.getInstance(getReactApplicationContext()).save(getReactApplicationContext());
    }

    @ReactMethod
    void setCurrentLocation(double latitude, double longitude) {
        BlueshiftLogger.d(TAG, "Method not available");
    }

    @ReactMethod
    void fetchInAppNotification() {
        Blueshift.getInstance(getReactApplicationContext()).fetchInAppMessages(null);
    }

    @ReactMethod
    void displayInAppNotification() {
        Blueshift.getInstance(getReactApplicationContext()).displayInAppMessages();
    }
}