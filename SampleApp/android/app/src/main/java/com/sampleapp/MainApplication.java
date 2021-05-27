package com.sampleapp;

import android.app.Application;
import android.content.Context;

import androidx.core.content.ContextCompat;

import com.blueshift.Blueshift;
import com.blueshift.BlueshiftLogger;
import com.blueshift.model.Configuration;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

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
  }

    private Configuration getBlueshiftConfiguration() {
        Configuration configuration = new Configuration();

        // This icon will be used in Notification as icons & placeholder image,
        // if notification icons are not provided explicitly
        configuration.setAppIcon(R.mipmap.ic_launcher);

        // These methods are used for setting traditional deep-links with category
        // heads-up: these methods will be deprecated soon
//        configuration.setProductPage(ProductDetailsActivity.class);
//        configuration.setCartPage(PlaceOrderActivity.class);
        // configuration.setOfferDisplayPage(OfferDisplayActivity.class);
        // configuration.setDialogTheme(R.style.dialog_theme);

        // Following methods will let you set the large & small icons for Notification
        configuration.setLargeIconResId(R.mipmap.ic_launcher);
//        configuration.setSmallIconResId(R.drawable.ic_notification);

        // The following method will let you decide the color to be used in the Notification
//        configuration.setNotificationColor(ContextCompat.getColor(this, R.color.colorPrimary));

        // Following methods will help you setup Notification channel for Android O and above.
        configuration.setDefaultNotificationChannelId("My-Notification-Channel-Id");
        configuration.setDefaultNotificationChannelName("My-Notification-Channel-Name");
        configuration.setDefaultNotificationChannelDescription("My-Notification-Channel-Description");

        // This method tells the sdk to fire an app_open event automatically when
        // user starts the application
        configuration.setEnableAutoAppOpenFiring(true);

        // This method allows you to disable push - default value is true
        configuration.setPushEnabled(true);

        // Following methods will help you set-up in-app messages
        configuration.setInAppEnabled(true);
        configuration.setJavaScriptForInAppWebViewEnabled(true);
        configuration.setInAppBackgroundFetchEnabled(true);
        configuration.setInAppManualTriggerEnabled(true);

        // This method let's you decide the interval of batch event api calls.
        // Default value is 30min
        configuration.setBatchInterval(16 * 60 * 1000); // setting batch time as 16min

        configuration.setAutoAppOpenInterval(5 * 60);

        // This method will let you decide what needs to be collected as device_id
        // The default value is AdvertisingId. You can change it to Firebase Instance Id
        // or a GUID using this method.
        configuration.setDeviceIdSource(Blueshift.DeviceIdSource.INSTANCE_ID);
//        configuration.setDeviceIdSource(Blueshift.DeviceIdSource.INSTANCE_ID_PKG_NAME);
//        configuration.setDeviceIdSource(Blueshift.DeviceIdSource.ADVERTISING_ID_PKG_NAME);
//        configuration.setDeviceIdSource(Blueshift.DeviceIdSource.GUID);

//        configuration.setDeviceIdSource(Blueshift.DeviceIdSource.CUSTOM);
//        String android_id = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);
//        configuration.setCustomDeviceId(android_id);

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
