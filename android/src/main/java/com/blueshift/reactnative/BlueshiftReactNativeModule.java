package com.blueshift.reactnative;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.blueshift.Blueshift;
import com.blueshift.BlueshiftAppPreferences;
import com.blueshift.BlueshiftConstants;
import com.blueshift.BlueshiftLinksHandler;
import com.blueshift.BlueshiftLogger;
import com.blueshift.model.UserInfo;
import com.blueshift.util.DeviceUtils;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.module.annotations.ReactModule;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unused")
@ReactModule(name = BlueshiftReactNativeModule.NAME)
public class BlueshiftReactNativeModule extends ReactContextBaseJavaModule {
    public static final String TAG = "BlueshiftReactNative";
    public static final String NAME = "BlueshiftBridge";
    private static final String VERSION = BuildConfig.SDK_VERSION + "-RN-" + BuildConfig.PLUGIN_VERSION;
    private static final String DEEP_LINK_URL = "deep_link_url";

    private static BlueshiftReactNativeModule sInstance = null;

    public static BlueshiftReactNativeModule getInstance(ReactApplicationContext context) {
        if (sInstance == null) sInstance = new BlueshiftReactNativeModule(context);
        return sInstance;
    }

    public BlueshiftReactNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // USERINFO

    @ReactMethod
    void setUserInfoCustomerId(String customerId) {
        UserInfo.getInstance(getReactApplicationContext()).setRetailerCustomerId(customerId);
        UserInfo.getInstance(getReactApplicationContext()).save(getReactApplicationContext());
    }

    @ReactMethod
    void getUserInfoCustomerId(Callback callback) {
        if (callback != null) {
            String value = UserInfo.getInstance(getReactApplicationContext()).getRetailerCustomerId();
            callback.invoke(value != null ? value : "");
        }
    }

    @ReactMethod
    void setUserInfoEmailId(String email) {
        UserInfo.getInstance(getReactApplicationContext()).setEmail(email);
        UserInfo.getInstance(getReactApplicationContext()).save(getReactApplicationContext());
    }

    @ReactMethod
    void getUserInfoEmailId(Callback callback) {
        if (callback != null) {
            String value = UserInfo.getInstance(getReactApplicationContext()).getEmail();
            callback.invoke(value != null ? value : "");
        }
    }

    @ReactMethod
    void setUserInfoFirstName(String firstName) {
        UserInfo.getInstance(getReactApplicationContext()).setFirstname(firstName);
        UserInfo.getInstance(getReactApplicationContext()).save(getReactApplicationContext());
    }

    @ReactMethod
    void getUserInfoFirstName(Callback callback) {
        if (callback != null) {
            String value = UserInfo.getInstance(getReactApplicationContext()).getFirstname();
            callback.invoke(value != null ? value : "");
        }
    }

    @ReactMethod
    void setUserInfoLastName(String lastName) {
        UserInfo.getInstance(getReactApplicationContext()).setLastname(lastName);
        UserInfo.getInstance(getReactApplicationContext()).save(getReactApplicationContext());
    }

    @ReactMethod
    void getUserInfoLastName(Callback callback) {
        if (callback != null) {
            String value = UserInfo.getInstance(getReactApplicationContext()).getLastname();
            callback.invoke(value != null ? value : "");
        }
    }

    @ReactMethod
    void setUserInfoExtras(ReadableMap map) {
        UserInfo.getInstance(getReactApplicationContext()).setDetails(toHashMap(map));
        UserInfo.getInstance(getReactApplicationContext()).save(getReactApplicationContext());
    }

    @ReactMethod
    void getUserInfoExtras(Callback callback) {
        if (callback != null) {
            HashMap<String, Object> value = UserInfo.getInstance(getReactApplicationContext()).getDetails();
            callback.invoke(value != null ? value : "{}");
        }
    }

    @ReactMethod
    void removeUserInfo() {
        UserInfo.getInstance(getReactApplicationContext()).clear(getReactApplicationContext());
    }

    // CONFIGURATION

    // APP PREFERENCES

    @ReactMethod
    void setEnablePush(boolean enablePush) {
        Blueshift.optInForPushNotifications(getReactApplicationContext(), enablePush);
    }

    @ReactMethod
    void setEnableInApp(boolean enableInApp) {
        Blueshift.optInForInAppNotifications(getReactApplicationContext(), enableInApp);
    }

    @ReactMethod
    void setEnableTracking(boolean enableTracking) {
        Blueshift.setTrackingEnabled(getReactApplicationContext(), enableTracking);
    }

    @ReactMethod
    void getEnablePushStatus(Callback callback) {
        if (callback != null) {
            boolean status = BlueshiftAppPreferences.getInstance(getReactApplicationContext()).getEnablePush();
            callback.invoke(status);
        }
    }

    @ReactMethod
    void getEnableInAppStatus(Callback callback) {
        if (callback != null) {
            boolean status = BlueshiftAppPreferences.getInstance(getReactApplicationContext()).getEnableInApp();
            callback.invoke(status);
        }
    }

    @ReactMethod
    void getEnableTrackingStatus(Callback callback) {
        if (callback != null) {
            boolean status = Blueshift.isTrackingEnabled(getReactApplicationContext());
            callback.invoke(status);
        }
    }

    // IN APP

    @ReactMethod
    void fetchInAppNotification() {
        Blueshift.getInstance(getReactApplicationContext())
                .fetchInAppMessages(null);
    }

    @ReactMethod
    void displayInAppNotification() {
        Blueshift.getInstance(getReactApplicationContext())
                .displayInAppMessages();
    }

    @ReactMethod
    void registerForInAppMessage() {
        Blueshift.getInstance(getReactApplicationContext())
                .registerForInAppMessages(getCurrentActivity());
    }

    @ReactMethod
    void registerForInAppMessage(String screenName) {
        Blueshift.getInstance(getReactApplicationContext())
                .registerForInAppMessages(getCurrentActivity(), screenName);
    }

    @ReactMethod
    void unregisterForInAppMessage() {
        Blueshift.getInstance(getReactApplicationContext())
                .unregisterForInAppMessages(getCurrentActivity());
    }

    // EVENTS

    HashMap<String, Object> mapWithVersion() {
        HashMap<String, Object> map = new HashMap<>();
        map.put(BlueshiftConstants.KEY_SDK_VERSION, VERSION);
        return map;
    }

    @ReactMethod
    void identifyWithDetails(ReadableMap map) {
        HashMap<String, Object> params = toHashMap(map);
        if (params == null) {
            params = mapWithVersion();
        } else {
            params.putAll(mapWithVersion());
        }
        Blueshift.getInstance(getReactApplicationContext()).identifyUser(params, false);
    }

    @ReactMethod
    void trackCustomEvent(String eventName, ReadableMap map, boolean canBatch) {
        HashMap<String, Object> params = toHashMap(map);
        if (params == null) {
            params = mapWithVersion();
        } else {
            params.putAll(mapWithVersion());
        }
        Blueshift.getInstance(getReactApplicationContext()).trackEvent(eventName, params, canBatch);
    }

    @ReactMethod
    void trackScreenView(String screenName, boolean canBatch) {
        Blueshift.getInstance(getReactApplicationContext()).trackScreenView(screenName, canBatch);
    }

    // iOS ONLY METHODS

    @ReactMethod
    void registerForRemoteNotification() {
        BlueshiftLogger.d(TAG, "Method not available in Android");
    }

    @ReactMethod
    void setCurrentLocation(double latitude, double longitude) {
        BlueshiftLogger.d(TAG, "Method not available in Android");
    }

    @ReactMethod
    void getCurrentDeviceId(Callback callback) {
        if (callback != null) {
            new Thread(() -> {
                String value = DeviceUtils.getDeviceId(getReactApplicationContext());
                callback.invoke(value != null ? value : "");
            }).start();
        }
    }

    // LIVE CONTENT

    @ReactMethod
    void getLiveContentByEmail(String slotName, ReadableMap params, Callback callback) {
        Blueshift.getInstance(getReactApplicationContext()).getLiveContentByEmail(
                slotName,
                toHashMap(params),
                response -> {
                    if (callback != null) callback.invoke(null, response);
                });
    }

    @ReactMethod
    void getLiveContentByDeviceId(String slotName, ReadableMap params, Callback callback) {
        Blueshift.getInstance(getReactApplicationContext()).getLiveContentByDeviceId(
                slotName,
                toHashMap(params),
                response -> {
                    if (callback != null) callback.invoke(null, response);
                });
    }

    @ReactMethod
    void getLiveContentByCustomerId(String slotName, ReadableMap params, Callback callback) {
        Blueshift.getInstance(getReactApplicationContext()).getLiveContentByCustomerId(
                slotName,
                toHashMap(params),
                response -> {
                    if (callback != null) callback.invoke(null, response);
                });
    }

    // DEEP LINKS

    @ReactMethod
    void onAddEventListener(String eventName) {
        BlueshiftReactNativeEventHandler.getInstance().initEventEmitter(getReactApplicationContext());
        BlueshiftReactNativeEventHandler.getInstance().fireEvent(eventName);

        // This is to fire any pending "url" event in the queue so that RN can receive it.
        // For this to work, we should make sure that the Linking.addEventListener code is
        // written before calling the Blueshift.addEventListener method.
        if (!"url".equals(eventName)) {
            BlueshiftReactNativeEventHandler.getInstance().fireEvent("url");
        }
    }

    @ReactMethod
    void processBlueshiftUrl(String url) {
        try {
            Uri data = Uri.parse(url);
            new BlueshiftLinksHandler(getCurrentActivity())
                    .handleBlueshiftUniversalLinks(data, null, null);
        } catch (Exception e) {
            Log.w(TAG, "Invalid Url.");
        }
    }

    public static void processBlueshiftPushUrl(Intent intent) {
        if (intent != null && intent.hasExtra(DEEP_LINK_URL)) {
            String url = intent.getStringExtra(DEEP_LINK_URL);
            Map<String, Object> params = new HashMap<>();
            params.put("url", url);
            BlueshiftReactNativeEventHandler.getInstance().enqueueEvent("url", params);
        }
    }

    // HELPER METHODS

    /**
     * Converts a ReadableMap to HashMap
     *
     * @param readableMap ReadableMap object
     * @return HashMap object
     */
    HashMap<String, Object> toHashMap(ReadableMap readableMap) {
        if (readableMap != null) {
            HashMap<String, Object> hashMap = new HashMap<>();
            ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                switch (readableMap.getType(key)) {
                    case Null:
                        hashMap.put(key, null);
                        break;
                    case Boolean:
                        hashMap.put(key, readableMap.getBoolean(key));
                        break;
                    case Number:
                        hashMap.put(key, readableMap.getDouble(key));
                        break;
                    case String:
                        hashMap.put(key, readableMap.getString(key));
                        break;
                    case Map:
                        hashMap.put(key, toHashMap(readableMap.getMap(key)));
                        break;
                    case Array:
                        hashMap.put(key, toArrayList(readableMap.getArray(key)));
                        break;
                    default:
                        Log.w(TAG, "Unknown type: " + readableMap.getType(key));
                }
            }

            return hashMap;
        }

        return null;
    }

    /**
     * Converts a ReadableArray to ArrayList
     *
     * @param readableArray ReadableArray object
     * @return ArrayList object
     */
    ArrayList<Object> toArrayList(ReadableArray readableArray) {
        ArrayList<Object> arrayList = null;
        if (readableArray != null) {
            arrayList = new ArrayList<>();
            for (int index = 0; index < readableArray.size(); index++) {
                switch (readableArray.getType(index)) {
                    case Null:
                        arrayList.add(null);
                        break;
                    case Boolean:
                        arrayList.add(readableArray.getBoolean(index));
                        break;
                    case Number:
                        arrayList.add(readableArray.getInt(index));
                        break;
                    case String:
                        arrayList.add(readableArray.getString(index));
                        break;
                    case Map:
                        arrayList.add(toHashMap(readableArray.getMap(index)));
                        break;
                    case Array:
                        arrayList.add(toArrayList(readableArray.getArray(index)));
                        break;
                    default:
                        Log.w(TAG, "Unknown type: " + readableArray.getType(index));
                }
            }
        }

        return arrayList;
    }
}
