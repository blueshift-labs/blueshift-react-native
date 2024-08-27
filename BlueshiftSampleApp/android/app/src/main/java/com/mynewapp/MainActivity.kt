package com.mynewapp

import android.content.Intent
import android.os.Bundle
import com.blueshift.reactnative.BlueshiftReactNativeModule
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "MyNewApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    BlueshiftReactNativeModule.processBlueshiftPushUrl(intent)
  }

  override fun onStart() {
    super.onStart()
    BlueshiftReactNativeModule.registerForInboxDataChangeEvents(this)
  }

  override fun onStop() {
    BlueshiftReactNativeModule.unregisterForInboxDataChangeEvents(this)
    super.onStop()
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    BlueshiftReactNativeModule.processBlueshiftPushUrl(intent)
  }
}
