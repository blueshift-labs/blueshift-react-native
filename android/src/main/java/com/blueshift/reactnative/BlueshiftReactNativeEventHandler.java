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

    public static BlueshiftReactNativeEventHandler getInstance() {
        if (sInstance == null) sInstance = new BlueshiftReactNativeEventHandler();

        return sInstance;
    }

    public void initEventEmitter(ReactContext context) {
        if (mEventEmitter == null && context != null) {
            mEventEmitter = context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
    }

    public void enqueueEvent(String eventName, Map<String, Object> params, ReactContext context) {
        synchronized (mEventQueue) {
            mEventQueue.put(eventName, params);
        }

        fireEvent(eventName, context);
    }

    public void fireEvent(String eventName, ReactContext context) {
        initEventEmitter(context);

        if (mEventEmitter == null) {
            int SYNC_DELAY = 500;
            BlueshiftLogger.d(TAG, "mEventEmitter not ready. Retrying in " + SYNC_DELAY + " ms.");
            new Handler().postDelayed(() -> fireEvent(eventName, context), SYNC_DELAY);
        } else if (eventName != null) {
            synchronized (mEventQueue) {
                if (mEventQueue.containsKey(eventName)) {
                    Object data = mEventQueue.get(eventName);
                    if (data instanceof Map) {
                        mEventEmitter.emit(eventName, mapToWritableMap((Map<String, Object>) data));
                        mEventQueue.remove(eventName);
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
