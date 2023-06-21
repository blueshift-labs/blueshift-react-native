import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Switch,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  NativeModules,
  Button,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Blueshift from 'blueshift-react-native';

export default function HomeScreen({navigation}) {
  useEffect(() => {
    // Get the email deep link when app launched from killed state
    Linking.getInitialURL().then(url => {
      if (url) {
        // Check if the email deep link is from Blueshift
        if (Blueshift.isBlueshiftUrl(url)) {
          Blueshift.processBlueshiftUrl(url);
        } else {
          this.handleDeeplinkUrl(url);
        }
      }
    });

    // Add event listner for `url` event
    global.urlListener = Linking.addEventListener('url', event => {
      var url = event.url;
      if (url) {
        // Check if the URL is a rewritten/shortened URL from Blueshift
        if (Blueshift.isBlueshiftUrl(url)) {
          Blueshift.processBlueshiftUrl(url);
        } else {
          this.handleDeeplinkUrl(url);
        }
      }
    });

    Blueshift.init();

    // Add custom event listener using Blueshift method
    Blueshift.addEventListener(
      'PushNotificationClickedEvent',
      this.handlePushClick,
    );

    this.setValues();

    // Register screen for receiving in-app notifications
    this.registerForInApp();

    return () => {
      // You must unregister these callbacks
      if (global) {
        global.urlListener.remove();
      }

      // Remove custom event listner using Blueshift method
      Blueshift.removeEventListener('PushNotificationClickedEvent');

      // Unregister screen
      this.unRegisterForInApp();
    };
  }, []);

  handlePushClick = event => {
    alert('push payload ' + JSON.stringify(event.bsft_experiment_uuid));
  };

  handleDeeplinkUrl = url => {
    console.log('deeplink: ' + url);
    navigation.navigate('Deeplink', {deeplink: url});
    // Alert.alert(
    //   "Deep Link URL",
    //   url,
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "OK", onPress: () => console.log("OK Pressed") }
    //   ]
    // );
  };

  navigateToInboxScreen = () => {
    navigation.navigate('Inbox');
  };

  saveEmailId = () => {
    Blueshift.setUserInfoEmailId(emailId);
  };

  saveCustomerId = () => {
    Blueshift.setUserInfoCustomerId(customerId);
  };

  saveFirstName = () => {
    Blueshift.setUserInfoFirstName(firstName);
  };

  saveLastName = () => {
    Blueshift.setUserInfoLastName(lastName);
  };

  setExtras = () => {
    Blueshift.setUserInfoExtras({
      profession: 'software engineer',
      usertype: 'premium',
    });
  };

  setIDFA = () => {
    Blueshift.setIDFA('EA7583CD-A667-48BC-B806-42ECB2B48606');
  };

  setLocation = () => {
    Blueshift.setCurrentLocation(18.5245649, 73.7228812);
  };

  identify = () => {
    Blueshift.identifyWithDetails({});
  };

  sendCustomEvent = () => {
    Blueshift.trackCustomEvent(customEvent, {}, false);
  };

  sendCustomEvent1 = () => {
    Blueshift.trackCustomEvent(customEvent1, {}, false);
  };

  trackScreenView = () => {
    Blueshift.trackScreenView('ReactNativeTestScreen', {}, false);
  };

  removeUserInfo = () => {
    Blueshift.removeUserInfo();
  };

  registerForRemoteNotification = () => {
    Blueshift.registerForRemoteNotification();
  };

  setEnablePush = () => {
    Blueshift.setEnablePush(enablePushSwitchValue);
  };

  setEnableInApp = () => {
    Blueshift.setEnableInApp(enableInAppSwitchValue);
  };

  setEnableTracking = () => {
    Blueshift.setEnableTracking(enableTrackingSwitchValue);
  };

  fetchInAppNotification = () => {
    Blueshift.fetchInAppNotification();
  };

  displayInAppNotification = () => {
    Blueshift.displayInAppNotification();
  };

  registerForInApp = () => {
    Blueshift.registerForInAppMessage('index');
  };

  unRegisterForInApp = () => {
    Blueshift.unregisterForInAppMessage();
  };

  getLiveContentByEmail = () => {
    Blueshift.getLiveContentByEmail(
      'careinappmessagingslot',
      {},
      (err, result) => {
        if (result != null) {
          console.log(result);
        } else {
          console.log(err);
        }
      },
    );
  };

  getLiveContentByDeviceID = () => {
    Blueshift.getLiveContentByDeviceId(
      'careinappmessagingslot',
      {},
      (err, result) => {
        if (result != null) {
          console.log(result);
        } else {
          console.log(err);
        }
      },
    );
  };

  getLiveContentByCustomerID = () => {
    Blueshift.getLiveContentByCustomerId(
      'careinappmessagingslot',
      {},
      (err, result) => {
        if (result != null) {
          console.log(result);
        } else {
          console.log(err);
        }
      },
    );
  };
  const [enablePushSwitchValue, setEnablePushSwitchValue] = useState(true);
  const [enableInAppSwitchValue, setEnableInAppSwitchValue] = useState(true);
  const [enableTrackingSwitchValue, setEnableTrackingSwitchValue] =
    useState(true);
  const [emailId, setEmailId] = useState('');
  const [customEvent, setCustomEvent] = useState('bsft_send_me_image_push');
  const [customEvent1, setCustomEvent1] = useState('bsft_send_me_in_app_modal');
  const [customerId, setCustomerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deviceId, setDeviceId] = useState('');

  setValues = () => {
    console.log('setValues');
    Blueshift.getEnablePushStatus(res => {
      setEnablePushSwitchValue(res);
    });
    Blueshift.getEnableInAppStatus(res => {
      setEnableInAppSwitchValue(res);
    });
    Blueshift.getUserInfoCustomerId(res => {
      setCustomerId(res);
    });
    Blueshift.getUserInfoEmailId(res => {
      console.log('email', res);
      setEmailId(res);
    });
    Blueshift.getEnableTrackingStatus(res => {
      setEnableTrackingSwitchValue(res);
    });
    Blueshift.getUserInfoFirstName(res => {
      setFirstName(res);
    });
    Blueshift.getUserInfoLastName(res => {
      setLastName(res);
    });
    Blueshift.getCurrentDeviceId(res => {
      console.log('deviceid', res);
      setDeviceId(res);
    });
  };

  let w = Dimensions.get('window').width;
  let btnClr = '#2160D4';
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      flex: 1,
      borderColor: '#cccccc',
      borderBottomWidth: 1,
      marginBottom: 10,
    },
    txtH1Style: {
      flex: 1,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 4,
      marginBottom: 4,
      padding: 8,
    },
    txtStyle: {
      flex: 1,
      height: 48,
      borderColor: '#2160D4',
      borderWidth: 1,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 4,
      marginBottom: 4,
      padding: 8,
    },
    btnStyle: {
      flex: 1,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 4,
      marginBottom: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: w}}>
        <TextInput
          style={styles.txtStyle}
          onChangeText={emailId => setEmailId(emailId)}
          value={emailId}
          placeholder="Enter email id"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={this.saveEmailId}
            title="Set email Id"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={customerId => setCustomerId(customerId)}
          value={customerId}
          placeholder="Enter customer profile Id"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={this.saveCustomerId}
            title="Set customer Id"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={firstName => setFirstName(firstName)}
          value={firstName}
          placeholder="Enter firstName"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={this.saveFirstName}
            title="Set firstName"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={lastName => setLastName(lastName)}
          value={lastName}
          placeholder="Enter lastName"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={this.saveLastName}
            title="Set lastName"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button onPress={this.setExtras} title="Set extras" color={btnClr} />
        </View>

        <View style={styles.btnStyle}>
          <Button onPress={this.setIDFA} title="Set IDFA" color={btnClr} />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.setLocation}
            title="Set Location"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button onPress={this.identify} title="Identify" color={btnClr} />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={customEvent => setCustomEvent(customEvent)}
          value={customEvent}
          placeholder="Enter custom event name"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={this.sendCustomEvent}
            title="Send custom event"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={customEvent1 => setCustomEvent1(customEvent1)}
          value={customEvent1}
          placeholder="Enter custom event name"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={this.sendCustomEvent1}
            title="Send custom event"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.trackScreenView}
            title="Track screen view"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.registerForRemoteNotification}
            title="register for remote notifications"
            color={btnClr}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Switch
            style={{flex: 1}}
            value={enablePushSwitchValue}
            onValueChange={enablePushSwitchValue =>
              setEnablePushSwitchValue(enablePushSwitchValue)
            }
          />
          <View style={[styles.btnStyle, {flex: 2}]}>
            <Button
              onPress={this.setEnablePush}
              title="Set enablePush"
              color={btnClr}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Switch
            style={{flex: 1}}
            value={enableInAppSwitchValue}
            onValueChange={enableInAppSwitchValue =>
              setEnableInAppSwitchValue(enableInAppSwitchValue)
            }
          />
          <View style={[styles.btnStyle, {flex: 2}]}>
            <Button
              onPress={this.setEnableInApp}
              title="Set enableInApp"
              color={btnClr}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Switch
            style={{flex: 1}}
            value={enableTrackingSwitchValue}
            onValueChange={enableTrackingSwitchValue =>
              setEnableTrackingSwitchValue(enableTrackingSwitchValue)
            }
          />
          <View style={[styles.btnStyle, {flex: 2}]}>
            <Button
              onPress={this.setEnableTracking}
              title="Set enableTracking"
              color={btnClr}
            />
          </View>
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.fetchInAppNotification}
            title="fetch InApp Notification notifications"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.navigateToInboxScreen}
            title="Show Inbox"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.displayInAppNotification}
            title="display In App Notification"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.removeUserInfo}
            title="Remove user info"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.registerForInApp}
            title="Register For in-app notifications"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.unRegisterForInApp}
            title="Un-register for in-app notifications"
            color={btnClr}
          />
        </View>

        <Text style={styles.txtH1Style}>{'Current Device ID'}</Text>
        <TextInput
          style={styles.txtStyle}
          onChangeText={deviceId => setDeviceId(deviceId)}
          value={deviceId}
        />

        <View style={styles.btnStyle}>
          <Button
            onPress={this.getLiveContentByEmail}
            title="Live content by Email"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.getLiveContentByDeviceID}
            title="Live content by Device id"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={this.getLiveContentByCustomerID}
            title="Live content by Customer id"
            color={btnClr}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// import React, { useEffect } from 'react';

// const Root = () => {

//   Blueshift.identifyWithDetails({});

//   useEffect(() => {

//     console.log('useEffect: START');

//       // Add event listner for `url` event
//   global.urlListener = Linking.addEventListener('url', (event) => {
//     var url = event.url;
//     if(url) {
//       // Check if the URL is a rewritten/shortened URL from Blueshift
//       if (Blueshift.isBlueshiftUrl(url)) {
//         Blueshift.processBlueshiftUrl(url);
//       } else {
//         console.log('handleDeeplink: ' + url);
//         // this.handleDeeplinkUrl(url);
//       }
//     }
//   });

//   Blueshift.addEventListener('PushNotificationClickedEvent', () =>{});

//     return () => {
//       console.log('useEffect: return');
//       global.urlListener.remove();
//     }
//   }, [])

//   return (
//     <View style={{ flex: 1 }}>
//       <Text>Hello</Text>
//     </View>
//   );
// }

// export default Root;
