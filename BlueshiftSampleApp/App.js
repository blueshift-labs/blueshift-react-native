import {
  Dimensions,
  StyleSheet,
  Text,
  Switch,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Button,
  Alert,
  Linking,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import Blueshift from 'blueshift-react-native';

export default function App() {
  useEffect(() => {
    // To read the deep link URL when app is launched from killed state.
    Linking.getInitialURL().then(url => handleUrlEvent(url));

    // To listen to the url event fired by OS or push Blueshift push notifications
    global.urlListener = Linking.addEventListener('url', event =>
      handleUrlEvent(event.url),
    );

    // To initialize the SDK components such as Event Emitter
    Blueshift.init();

    initState();

    return () => {
      // remove the listener to avoid duplicate url event listeners getting added
      global.urlListener.remove();
    };
  }, []);

  function handleUrlEvent(url) {
    if (url) {
      // Check if the URL is from Blueshift's campaign.
      if (Blueshift.isBlueshiftUrl(url)) {
        Blueshift.processBlueshiftUrl(url);
      } else {
        // Use this block to do the app's deep linking.
        alertUrl(url);
      }
    }
  }

  function alertUrl(url) {
    Alert.alert('URL', url, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [customEventA, setCustomEventA] = useState('bsft_send_me_inapp');
  const [customEventB, setCustomEventB] = useState('bsft_send_me_push');
  const [enablePush, setEnablePush] = useState(true);
  const [enableInApp, setEnableInApp] = useState(true);
  const [enableSdk, setEnableSdk] = useState(true);
  const [deviceId, setDeviceId] = useState('');

  function initState() {
    Blueshift.getEnablePushStatus(res => {
      if (res) {
        console.log('enable_push: ' + res);
        setEnablePush(res);
      }
    });

    Blueshift.getEnableInAppStatus(res => {
      if (res) {
        console.log('enable_inapp: ' + res);
        setEnableInApp(res);
      }
    });

    Blueshift.getEnableTrackingStatus(res => {
      if (res) {
        console.log('enable_tracking: ' + res);
        setEnableSdk(res);
      }
    });

    Blueshift.getUserInfoEmailId(res => {
      if (res) {
        console.log('email: ' + res);
        setEmail(res);
      }
    });

    Blueshift.getUserInfoCustomerId(res => {
      if (res) {
        console.log('customer id: ' + res);
        setCustomerId(res);
      }
    });

    Blueshift.getUserInfoFirstName(res => {
      if (res) {
        console.log('firstname: ' + res);
        setFirstName(res);
      }
    });

    Blueshift.getUserInfoLastName(res => {
      if (res) {
        console.log('lastname: ' + res);
        setLastName(res);
      }
    });

    Blueshift.getCurrentDeviceId(res => {
      if (res) {
        console.log('deviceid: ' + res);
        setDeviceId(res);
      }
    });
  }

  function saveEmail() {
    Blueshift.setUserInfoEmailId(email);
  }

  function saveCustomerId() {
    Blueshift.setUserInfoCustomerId(customerId);
  }

  function saveFirstname() {
    Blueshift.setUserInfoFirstName(firstName);
  }

  function saveLastname() {
    Blueshift.setUserInfoLastName(firstName);
  }

  function saveExtras() {
    Blueshift.setUserInfoExtras({
      profession: 'Software Engineer',
      usertype: 'Premium',
    });
  }

  function saveIDFA() {
    Blueshift.setIDFA('EA7583CD-A667-48BC-B806-42ECB2B48606');
  }

  function saveLocation() {
    Blueshift.setCurrentLocation(18.5245649, 73.7228812);
  }

  function sendEventIdentify() {
    Blueshift.identifyWithDetails({});
  }

  function sendEventCustomA() {
    Blueshift.trackCustomEvent(customEventA, {}, false);
  }

  function sendEventCustomB() {
    Blueshift.trackCustomEvent(customEventB, {}, false);
  }

  function sendEventScreenView() {
    Blueshift.trackScreenView('index', {}, false);
  }

  function registerForRemoteNotification() {
    Blueshift.registerForRemoteNotification();
  }

  function saveEnablePush() {
    Blueshift.setEnablePush(enablePush);
  }

  function saveEnableInApp() {
    Blueshift.setEnableInApp(enableInApp);
  }

  function saveEnableSdk() {
    Blueshift.setEnableTracking(enableSdk);
  }

  function fetchInappMessages() {
    Blueshift.fetchInAppNotification();
  }

  function showInappMessages() {
    Blueshift.displayInAppNotification();
  }

  function removeUserInfo() {
    Blueshift.removeUserInfo();
  }

  function registerForInappMessages() {
    Blueshift.registerForInAppMessage('index');
  }
  function unregisterForInappMessages() {
    Blueshift.unregisterForInAppMessage();
  }

  function getLiveContentByEmail() {
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
  }

  function getLiveContentByDeviceID() {
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
  }

  function getLiveContentByCustomerID() {
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
  }

  let w = Dimensions.get('window').width;
  let btnClr = '#2160D4';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: w}}>
        <TextInput
          style={styles.txtStyle}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Enter email id"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              saveEmail();
            }}
            title="Set email Id"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={text => setCustomerId(text)}
          value={customerId}
          placeholder="Enter customer profile Id"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              saveCustomerId();
            }}
            title="Set customer Id"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={text => setFirstName(text)}
          value={firstName}
          placeholder="Enter firstName"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              saveFirstname();
            }}
            title="Set firstName"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={text => setLastName(text)}
          value={lastName}
          placeholder="Enter lastName"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              saveLastname();
            }}
            title="Set lastName"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              saveExtras();
            }}
            title="Set extras"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              saveIDFA();
            }}
            title="Set IDFA"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              saveLocation();
            }}
            title="Set Location"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              sendEventIdentify();
            }}
            title="Identify"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={text => setCustomEventA(text)}
          value={customEventA}
          placeholder="Enter custom event name"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              sendEventCustomA();
            }}
            title="Send custom event"
            color={btnClr}
          />
        </View>

        <TextInput
          style={styles.txtStyle}
          onChangeText={text => setCustomEventB(text)}
          value={customEventB}
          placeholder="Enter custom event name"
        />
        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              sendEventCustomB();
            }}
            title="Send custom event"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              sendEventScreenView();
            }}
            title="Track screen view"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              registerForRemoteNotification();
            }}
            title="register for remote notifications"
            color={btnClr}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Switch
            style={{flex: 1}}
            value={enablePush}
            onValueChange={status => setEnablePush(status)}
          />
          <View style={[styles.btnStyle, {flex: 2}]}>
            <Button
              onPress={() => {
                saveEnablePush();
              }}
              title="Set enablePush"
              color={btnClr}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Switch
            style={{flex: 1}}
            value={enableInApp}
            onValueChange={status => setEnableInApp(status)}
          />
          <View style={[styles.btnStyle, {flex: 2}]}>
            <Button
              onPress={() => {
                saveEnableInApp();
              }}
              title="Set enableInApp"
              color={btnClr}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Switch
            style={{flex: 1}}
            value={enableSdk}
            onValueChange={status => setEnableSdk(status)}
          />
          <View style={[styles.btnStyle, {flex: 2}]}>
            <Button
              onPress={() => {
                saveEnableSdk();
              }}
              title="Set enableTracking"
              color={btnClr}
            />
          </View>
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              fetchInappMessages();
            }}
            title="fetch InApp Notification notifications"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              showInappMessages();
            }}
            title="display In App Notification"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              removeUserInfo();
            }}
            title="Remove user info"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              registerForInappMessages();
            }}
            title="Register For in-app notifications"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              unregisterForInappMessages();
            }}
            title="Un-register for in-app notifications"
            color={btnClr}
          />
        </View>

        <Text style={styles.txtH1Style}>{'Current Device ID'}</Text>
        <TextInput
          style={styles.txtStyle}
          onChangeText={text => setDeviceId(text)}
          value={deviceId}
        />

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              getLiveContentByEmail();
            }}
            title="Live content by Email"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              getLiveContentByDeviceID();
            }}
            title="Live content by Device id"
            color={btnClr}
          />
        </View>

        <View style={styles.btnStyle}>
          <Button
            onPress={() => {
              getLiveContentByCustomerID();
            }}
            title="Live content by Customer id"
            color={btnClr}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
