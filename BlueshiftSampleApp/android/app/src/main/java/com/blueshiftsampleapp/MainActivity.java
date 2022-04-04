package com.blueshiftsampleapp;

import android.content.Intent;
import android.os.Bundle;
import com.blueshift.reactnative.BlueshiftReactNativeModule;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "BlueshiftSampleApp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    BlueshiftReactNativeModule.processBlueshiftPushUrl(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    BlueshiftReactNativeModule.processBlueshiftPushUrl(getIntent());
  }
}
