package com.mynewapp

import android.app.Application
import com.blueshift.Blueshift
import com.blueshift.BlueshiftLogger
import com.blueshift.model.Configuration
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        }

      override fun getJSMainModuleName(): String = "index"

      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    // Enable logging to view SDK logs in logcat window.
    if (BuildConfig.DEBUG) {
      // You must disable logging in production.
      BlueshiftLogger.setLogLevel(BlueshiftLogger.VERBOSE);
    }

    initBlueshift()
  }

  private fun initBlueshift() {
    val configuration = Configuration();
    // Set Blueshift event API key
    configuration.apiKey = BuildConfig.API_KEY;
    // Enable in-app messages
    configuration.isInAppEnabled = true;
    configuration.isJavaScriptForInAppWebViewEnabled = true;
    configuration.setEnableAutoAppOpenFiring(true)
    // Set device-id source to Instance Id and package name combo (highly recommended)
    configuration.deviceIdSource = Blueshift.DeviceIdSource.INSTANCE_ID_PKG_NAME;
    // Enable mobile inbox
    configuration.isInboxEnabled = true;
    Blueshift.getInstance(this).initialize(configuration);
  }
}
