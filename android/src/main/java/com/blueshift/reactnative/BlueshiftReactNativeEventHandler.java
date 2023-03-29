package com.blueshift.reactnative;

import static com.blueshift.reactnative.BlueshiftReactNativeModule.TAG;

import android.os.Handler;
import android.util.Log;

import com.blueshift.BlueshiftLogger;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

public class BlueshiftReactNativeEventHandler {
    private static BlueshiftReactNativeEventHandler sInstance = null;
    private final LinkedHashMap<String, Object> mEventQueue = new LinkedHashMap<>();
    private DeviceEventManagerModule.RCTDeviceEventEmitter mEventEmitter = null;
    private int retryAttemptCount = 0;

    public static BlueshiftReactNativeEventHandler getInstance() {
        if (sInstance == null) sInstance = new BlueshiftReactNativeEventHandler();

        return sInstance;
    }

    public void initEventEmitter(ReactContext context) {
        if (mEventEmitter == null && context != null) {
            mEventEmitter = context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
    }

    public void enqueueEvent(String eventName, Map<String, Object> params) {
        synchronized (mEventQueue) {
            mEventQueue.put(eventName, params);
        }

        fireEvent(eventName);
    }

    public void fireEvent(String eventName) {
        int oneSecond = 1000;

        if (mEventEmitter == null) {
            BlueshiftLogger.w(TAG, "EventEmitter is not ready! Please make sure that you are calling Blueshift.init() when the React Native app is ready.");

            int retryAttemptCap = 5;
            if (retryAttemptCount < retryAttemptCap) {
                BlueshiftLogger.d(TAG, "Retrying fireEvent( " + eventName + " ) in " + oneSecond + " ms. Attempt " + ++retryAttemptCount);
                new Handler().postDelayed(() -> fireEvent(eventName), oneSecond);
            } else {
                retryAttemptCount = 0;
            }
        } else {
            retryAttemptCount = 0;

            if (eventName != null) {
                synchronized (mEventQueue) {
                    if (mEventQueue.containsKey(eventName)) {
                        new Handler().postDelayed(() -> {
                            Object data = mEventQueue.get(eventName);
                            if (data instanceof Map) {
                                BlueshiftLogger.d(TAG, "Emitting event : " + eventName);

                                mEventEmitter.emit(eventName, mapToWritableMap((Map<String, Object>) data));
                                mEventQueue.remove(eventName);
                            }
                        }, oneSecond); // Adding one second delay to make sure receivers are ready
                    }
                }
            }
        }
    }

    private WritableMap mapToWritableMap(Map<String, Object> map) {
        WritableMap writableMap = Arguments.createMap();

        if (map != null) {
            for (Map.Entry<String, Object> item : map.entrySet()) {
                if (item != null && item.getValue() != null) {
                    Object value = item.getValue();
                    if (value instanceof String) {
                        writableMap.putString(item.getKey(), (String) item.getValue());
                    } else if (value instanceof Integer) {
                        writableMap.putInt(item.getKey(), (Integer) item.getValue());
                    } else if (value instanceof Boolean) {
                        writableMap.putBoolean(item.getKey(), (Boolean) item.getValue());
                    } else if (value instanceof Double) {
                        writableMap.putDouble(item.getKey(), (Double) item.getValue());
                    }
                }
            }
        }

        return writableMap;
    }
}
