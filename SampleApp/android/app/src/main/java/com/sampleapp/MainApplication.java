package com.sampleapp;

import android.app.Application;
import android.content.Context;

import com.blueshift.Blueshift;
import com.blueshift.BlueshiftLogger;
import com.blueshift.BlueshiftPushListener;
import com.blueshift.model.Configuration;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new MyReactNativePackage());
                    packages.add(new BlueshiftPackage());
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        initBlueshift();
    }

    private void initBlueshift() {
        /*
        Helps to decide the level of logs from Blueshift Android SDK
         */
        BlueshiftLogger.setLogLevel(BlueshiftLogger.VERBOSE);

        /*
        Following is the initialization part
         */
        Configuration configuration = getBlueshiftConfiguration();
        configuration.setApiKey(BuildConfig.API_KEY); // Blueshift Event API Key
        Blueshift.getInstance(this).initialize(configuration);

        Blueshift.setBlueshiftPushListener(new BlueshiftPushListener() {
            @Override
            public void onPushDelivered(Map<String, Object> attributes) {
                // push received, emit event to JS layer
            }

            @Override
            public void onPushClicked(Map<String, Object> attributes) {
                // push click received, emit events to JS layer

                // accessing the extra data we send along with push payload
                if (attributes != null && attributes.containsKey("data")) {
                    HashMap data = (HashMap) attributes.get("data");
                    if (data != null) {
                        // read values from data
                        String plan = (String) data.get("plan");
                        BlueshiftLogger.d("demo", "Plan name: " + plan);
                    }
                }
            }
        });
    }

    private Configuration getBlueshiftConfiguration() {
        Configuration configuration = new Configuration();

        // This icon will be used in Notification as icons & placeholder image,
        // if notification icons are not provided explicitly
        configuration.setAppIcon(R.mipmap.ic_launcher);

        // Following methods will let you set the large & small icons for Notification
        configuration.setLargeIconResId(R.mipmap.ic_launcher);

        // This method tells the sdk to fire an app_open event automatically when
        // user starts the application
        configuration.setEnableAutoAppOpenFiring(true);

        // Following methods will help you set-up in-app messages
        configuration.setInAppEnabled(true);
        configuration.setJavaScriptForInAppWebViewEnabled(true);

        return configuration;
    }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private static void initializeFlipper(
            Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
                Class<?> aClass = Class.forName("com.sampleapp.ReactNativeFlipper");
                aClass
                        .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}
