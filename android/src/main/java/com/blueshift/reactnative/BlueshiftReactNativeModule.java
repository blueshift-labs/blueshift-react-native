package com.blueshift.reactnative;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.blueshift.Blueshift;
import com.blueshift.BlueshiftAppPreferences;
import com.blueshift.BlueshiftConstants;
import com.blueshift.BlueshiftLinksHandler;
import com.blueshift.BlueshiftLogger;
import com.blueshift.inappmessage.InAppManager;
import com.blueshift.inbox.BlueshiftInboxManager;
import com.blueshift.inbox.BlueshiftInboxMessage;
import com.blueshift.model.UserInfo;
import com.blueshift.util.DeviceUtils;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import android.Manifest;

@SuppressWarnings("unused")
@ReactModule(name = BlueshiftReactNativeModule.NAME)
public class BlueshiftReactNativeModule extends ReactContextBaseJavaModule {
    public static final String TAG = "BlueshiftReactNative";
    public static final String NAME = "BlueshiftBridge";
    private static final String VERSION = BuildConfig.SDK_VERSION + "-RN-" + BuildConfig.PLUGIN_VERSION;
    private static final String DEEP_LINK_URL = "deep_link_url";
    private static final String INBOX_DATA_CHANGE_EVENT = "InboxDataChangeEvent";
    private static final BroadcastReceiver inboxChangeListener = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            BlueshiftReactNativeEventHandler.getInstance().enqueueEvent(INBOX_DATA_CHANGE_EVENT, new HashMap<>());
        }
    };
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

    // INITIALIZE

    @ReactMethod
    void init() {
        BlueshiftReactNativeEventHandler.getInstance().initEventEmitter(getReactApplicationContext());
        BlueshiftReactNativeEventHandler.getInstance().fireEvent("url");
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
            if (value != null) {
                WritableNativeMap map = hashMapToWritableMap(value);
                if (map != null) {
                    callback.invoke(map);
                } else {
                    callback.invoke(new WritableNativeMap());
                }
            } else {
                callback.invoke(new WritableNativeMap());
            }
        }
    }

    @ReactMethod
    void removeUserInfo() {
        UserInfo.getInstance(getReactApplicationContext()).clear(getReactApplicationContext());
    }

    // CONFIGURATION

    @ReactMethod
    void isPushPermissionGranted(Callback callback) {
        if(callback != null) {
            boolean isGranted = Blueshift.hasPermission(
                getReactApplicationContext(),
                Manifest.permission.POST_NOTIFICATIONS
            );
            callback.invoke(isGranted);
        }
    }

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

    // React Native no longer supports method overloading for methods exported from Java to JavaScript.
    // The overloaded registerForInAppMessage() method without parameters has been removed.
    // Use registerForInAppMessage(String screenName) instead.

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
    void trackScreenView(String screenName, ReadableMap map, boolean canBatch) {
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

    @ReactMethod
    void resetDeviceId() {
        Blueshift.resetDeviceId(getReactApplicationContext());
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
        BlueshiftReactNativeEventHandler.getInstance().fireEvent(eventName);
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
            if (url == null || url.isEmpty()) {
                BlueshiftLogger.w(TAG, "Null/Empty value found for deep_link_url.");
            } else {
                Map<String, Object> params = new HashMap<>();
                params.put("url", url);
                BlueshiftReactNativeEventHandler.getInstance().enqueueEvent("url", params);
            }

            // remove the push deep link from intent to avoid
            // duplicate deep linking when onNewIntent is called
            intent.removeExtra(DEEP_LINK_URL);
        }
    }

    // MOBILE INBOX
    @ReactMethod
    void getInboxMessages(Callback callback) {
        if (callback != null) {
            BlueshiftInboxManager.getMessages(getReactApplicationContext(), blueshiftInboxMessages -> {
                if (blueshiftInboxMessages == null || blueshiftInboxMessages.isEmpty()) {
                    BlueshiftLogger.d(TAG, "No messages found inside Mobile Inbox.");

                    // return empty list
                    HashMap<String, Object> messages = new HashMap<>();
                    messages.put("messages", new ArrayList<>());
                    callback.invoke(hashMapToWritableMap(messages));
                } else {
                    ArrayList<HashMap<String, Object>> messageList = new ArrayList<>();

                    for (BlueshiftInboxMessage message : blueshiftInboxMessages) {
                        messageList.add(message.toHashMap());
                    }

                    HashMap<String, Object> messages = new HashMap<>();
                    messages.put("messages", messageList);
                    callback.invoke(hashMapToWritableMap(messages));
                }
            });
        }

    }

    /**
     * The value of "id" (the database id of inbox message) is being read as {@link Double} instead
     * of {@link Long} when the toHashMap() function is executed with the {@link ReadableMap} of
     * inbox message. This happens because {@link com.facebook.react.bridge.ReadableType} won't
     * let us differentiate between Double and Long as it only has one type called Number.
     * <p>
     * This method checks for {@link Double} "id" and converts it into {@link Long} and adds back
     * into the HashMap variable passed-in.
     *
     * @param map HashMap with inbox message params.
     */
    void fixMessageIdType(HashMap<String, Object> map) {
        Object oid = map.get("id");
        if (oid instanceof Double) {
            Long lid = ((Double) oid).longValue();
            map.put("id", lid);
        }
    }

    @ReactMethod
    void showInboxMessage(ReadableMap readableMap) {
        HashMap<String, Object> map = toHashMap(readableMap);
        if (map != null) {
            fixMessageIdType(map);
            BlueshiftInboxMessage message = BlueshiftInboxMessage.fromHashMap(map);
            BlueshiftInboxManager.displayInboxMessage(message);
        } else {
            Log.d(TAG, "showInboxMessage: No message found to display.");
        }
    }

    @ReactMethod
    void deleteInboxMessage(ReadableMap readableMap, Callback callback) {
        HashMap<String, Object> map = toHashMap(readableMap);
        if (map != null) {
            fixMessageIdType(map);
            BlueshiftInboxMessage message = BlueshiftInboxMessage.fromHashMap(map);
            BlueshiftInboxManager.deleteMessage(getReactApplicationContext(), message, status -> {
                if (status) {
                    callback.invoke(true, "");
                } else {
                    String errorMessage = getReactApplicationContext().getString(
                            R.string.bsft_inbox_delete_failure_message_react_native
                    );
                    callback.invoke(false, errorMessage);
                }
            });
        } else {
            Log.d(TAG, "deleteInboxMessage: No message found to delete.");
        }
    }

    @ReactMethod
    void syncInboxMessages(Callback callback) {
        BlueshiftInboxManager.syncMessages(getReactApplicationContext(), callback::invoke);
    }

    @ReactMethod
    void sendInboxDataChangeEvent() {
        BlueshiftReactNativeEventHandler.getInstance().enqueueEvent(INBOX_DATA_CHANGE_EVENT, new HashMap<>());
    }

    @ReactMethod
    void getUnreadInboxMessageCount(Callback callback) {
        BlueshiftInboxManager.getUnreadMessagesCount(getReactApplicationContext(), callback::invoke);
    }

    @ReactMethod
    void getRegisteredForInAppScreenName(Callback callback) {
        String screenName = InAppManager.getRegisteredScreenName();
        if (callback != null) callback.invoke(screenName);
    }


    /**
     * Method to register a {@link BroadcastReceiver} for listening inbox's data change events.
     *
     * @param context valid context on which broadcast should be registered.
     */
    public static void registerForInboxDataChangeEvents(Context context) {
        if (context != null) {
            BlueshiftInboxManager.registerForInboxBroadcasts(context, inboxChangeListener);
        }
    }

    /**
     * Method to unregister the {@link BroadcastReceiver} that listen for inbox's data change events.
     *
     * @param context valid context from which broadcast should be unregistered.
     */
    public static void unregisterForInboxDataChangeEvents(Context context) {
        if (context != null) {
            context.unregisterReceiver(inboxChangeListener);
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

    WritableNativeMap hashMapToWritableMap(HashMap<String, Object> value) {
        if (value != null) {
            try {
                String json = new Gson().toJson(value);
                JSONObject inputMap = new JSONObject(json);
                return jsonObjectToWritableMap(inputMap);
            } catch (Exception e) {
                BlueshiftLogger.e(TAG, e);
            }
        }

        return null;
    }

    WritableNativeMap jsonObjectToWritableMap(JSONObject jsonObject) {
        WritableNativeMap map = null;
        if (jsonObject != null) {
            map = new WritableNativeMap();
            Iterator<String> keys = jsonObject.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                Object val = jsonObject.opt(key);

                if (val != null) {
                    if (val instanceof JSONObject) {
                        map.putMap(key, jsonObjectToWritableMap((JSONObject) val));
                    } else if (val instanceof JSONArray) {
                        map.putArray(key, jsonObjectToWritableArray((JSONArray) val));
                    } else if (val instanceof Boolean) {
                        map.putBoolean(key, (Boolean) val);
                    } else if (val instanceof String) {
                        map.putString(key, (String) val);
                    } else if (val instanceof Integer) {
                        map.putInt(key, (Integer) val);
                    } else if (val instanceof Double) {
                        map.putDouble(key, (Double) val);
                    }
                } else {
                    map.putNull(key);
                }
            }
        }

        return map;
    }

    WritableArray jsonObjectToWritableArray(JSONArray jsonArray) {
        WritableNativeArray array = null;
        if (jsonArray != null) {
            array = new WritableNativeArray();
            int length = jsonArray.length();
            for (int index = 0; index < length; index++) {
                Object val = jsonArray.opt(index);

                if (val != null) {
                    if (val instanceof JSONObject) {
                        array.pushMap(jsonObjectToWritableMap((JSONObject) val));
                    } else if (val instanceof JSONArray) {
                        array.pushArray(jsonObjectToWritableArray((JSONArray) val));
                    } else if (val instanceof Boolean) {
                        array.pushBoolean((Boolean) val);
                    } else if (val instanceof String) {
                        array.pushString((String) val);
                    } else if (val instanceof Integer) {
                        array.pushInt((Integer) val);
                    } else if (val instanceof Double) {
                        array.pushDouble((Double) val);
                    }
                } else {
                    array.pushNull();
                }
            }
        }

        return array;
    }
}
