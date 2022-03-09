import React, {Component} from 'react';
import {StyleSheet, Text,Switch, View, TextInput, SafeAreaView, ScrollView, NativeModules, Button, Alert, Platform, Linking} from 'react-native';

import Blueshift from 'blueshift-react-native';


export default class App extends Component {
  componentDidMount() { // B

      Blueshift.addEventListener('DeepLinkEvent', this._handleOpenURL1);
      // Blueshift.addEventListener('BlueshiftDeepLinkEvent', this.handleDeepLink);
      // Blueshift.addEventListener('OnBlueshiftDeepLinkReplayStart', this.deepLinkProcessingStart);
      Blueshift.addEventListener('PushNotificationClickedEvent',this._handleOpenURL );
       const urlEventListner = Linking.addEventListener('url', this.handleDeepLink);
      console.log("componentDidMount");
      this.setValues();
  }
 
 componentWillUnmount() {
      Blueshift.removeEventListener('DeepLinkEvent');
      // Blueshift.removeEventListener('OnBlueshiftDeepLinkReplayStart');
      Blueshift.removeEventListener('PushNotificationClickedEvent');
      // urlEventListner.remove();
      console.log("componentWillUnmount"); 
  }

_handleOpenURL(event) {
  alert("push payload "+JSON.stringify(event.bsft_experiment_uuid));
}

_handleOpenURL1(event) {
  alert("openURL payload "+JSON.stringify(event.channel));
}
  
  handleDeepLink = (event) => { // D
    console.log("Deep Link URL "+ JSON.stringify(event));
    if((event.url.includes("/z/") || event.url.includes("/track")) && (event.url.includes("mid") || event.url.includes("uid") || event.url.includes("mid"))) {
            console.log("process universal link",url);
            NativeModules.BlueshiftBridge.processBlueshiftUniversalLink(url);
            return;
    }
    Alert.alert(
      "Deep Link URL",
      event.url,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  };

  deepLinkProcessingStart = (event) => { 
    console.log("Deep link processing started");
    console.log(event);
  };

  deepLinkProcessingFail = (event) => { 
    console.log("Deep link processing Failed");
    console.log(event);
  };

  setEmailId = () => {
    Blueshift.setUserInfoEmailId(this.state.emailId)
  };
  setCustomerId = () => {
    Blueshift.setUserInfoCustomerId(this.state.customerId)
  };
  setFirstName = () => {
    Blueshift.setUserInfoFirstName(this.state.firstName)
  };
  setLastName = () => {
    Blueshift.setUserInfoLastName(this.state.lastName)
  };
  setExtras = () => {
    Blueshift.setUserInfoExtras({"profession": "software engineer", "usertype":"premium"})
  };
  setIDFA = () => {
    Blueshift.setIDFA("EA7583CD-A667-48BC-B806-42ECB2B48606")
  };
  setLocation = () => {
    Blueshift.setCurrentLocation(18.5245649,73.7228812)
  };
  identify = () => {
    Blueshift.identifyWithDetails({})
  };
  sendCustomEvent = () => {
    Blueshift.trackCustomEvent(this.state.customEvent,{},false)
  };
  sendCustomEvent1 = () => {
    Blueshift.trackCustomEvent(this.state.customEvent1,{},false)
  };
  trackScreenView = () => {
    Blueshift.trackScreenView("ReactNativeTestScreen",{},false)
  };
  removeUserInfo = () => {
    Blueshift.removeUserInfo()
  };
  registerForRemoteNotification = () => {
    Blueshift.registerForRemoteNotification()
  };
  setEnablePush = () => {
    Blueshift.setEnablePush(this.state.enablePushSwitchValue)
  };
  setEnableInApp = () => {
    Blueshift.setEnableInApp(this.state.enableInAppSwitchValue)
  };
  setEnableTracking = () => {
    Blueshift.setEnableTracking(this.state.enableTrackingSwitchValue)
  }
  fetchInAppNotification = () => {
    Blueshift.fetchInAppNotification()
  };
  displayInAppNotification = () => {
    Blueshift.displayInAppNotification()
  };
  registerForInApp = () => {
    Blueshift.registerForInAppMessage("index")
  };
  unRegisterForInApp = () => {
    Blueshift.unregisterForInAppMessage()
  };
  getLiveContentByEmail = () => {
    Blueshift.getLiveContentByEmail("careinappmessagingslot",{},(err,result) => {
      if (result != null) {
        console.log(result);
      } else {
        console.log(err);
      }
    });
  };

 getLiveContentByDeviceID = () => {
    Blueshift.getLiveContentByDeviceId("careinappmessagingslot",{},(err,result) => {
      if (result != null) {
        console.log(result);
      } else {
        console.log(err);
      }
    });
  };

 getLiveContentByCustomerID = () => {
    Blueshift.getLiveContentByCustomerId("careinappmessagingslot",{},(err,result) => {
      if (result != null) {
        console.log(result);
      } else {
        console.log(err);
      }
    });
  };

  state = {  
        enablePushSwitchValue: true,
        enableInAppSwitchValue: true,
        enableTrackingSwitchValue: true,
        emailId: "",
        customEvent: "bsft_send_me_image_push",
        customEvent1: "bsft_send_me_in_app_modal",
        customerId: "",
        firstName: "",
        lastName: "",
        deviceId: ""
      };  

    setValues = () => {
      console.log("setValues");
        Blueshift.getEnablePushStatus((res) => {
            this.setState({enablePushSwitchValue:res});
        });
        Blueshift.getEnableInAppStatus((res) => {
            this.setState({enableInAppSwitchValue:res});
        });
        Blueshift.getUserInfoCustomerId((res) => {
            this.setState({customerId:res});
        });
        Blueshift.getUserInfoEmailId((res) => {
                            console.log("email",res);
          this.setState({emailId:res});
        });
        Blueshift.getEnableTrackingStatus((res) => {
            this.setState({enableTrackingSwitchValue:res});
        });
        Blueshift.getUserInfoFirstName((res) => {
            this.setState({firstName:res});
        });
        Blueshift.getUserInfoLastName((res) => {
          this.setState({lastName:res});
        });
        Blueshift.getCurrentDeviceId((res) => {
          console.log("deviceid",res);
          this.setState({deviceId:res});
        });
    };  

render() {

 return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

<View style={styles.welcome}>
      <TextInput
      style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(emailId)=>this.setState({emailId})}
      value={this.state.emailId} placeholder="Enter email id" />
     <Button
        onPress={this.setEmailId}
       title="Set email Id"
       color="#FF6347" />
    </View>

<View style={styles.welcome}>
          <TextInput
      style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(customerId)=>this.setState({customerId})}
      value={this.state.customerId} placeholder="Enter customer profile Id" />
     <Button
        onPress={this.setCustomerId}
       title="Set customer Id"
       color="#FF6347" />
      </View>

<View style={styles.welcome}>
      <TextInput
      style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(firstName)=>this.setState({firstName})}
      value={this.state.firstName} placeholder="Enter firstName" />
     <Button
        onPress={this.setFirstName}
       title="Set firstName"
       color="#FF6347" />
    </View>

<View style={styles.welcome}>
      <TextInput
      style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(lastName)=>this.setState({lastName})}
      value={this.state.lastName} placeholder="Enter lastName" />
     <Button
        onPress={this.setLastName}
       title="Set lastName"
       color="#FF6347" />
      </View>

<View style={styles.welcome}>
    <Button
        onPress={this.setExtras}
       title="Set extras"
       color="#FF6347" />
    </View>

<View style={styles.welcome}>
    <Button
        onPress={this.setIDFA}
       title="Set IDFA"
       color="#FF6347" />
    </View>

<View style={styles.welcome}>
    <Button
        onPress={this.setLocation}
       title="Set Location"
       color="#FF6347" />
    </View>

<View style={styles.welcome}>
     <Button
        onPress={this.identify}
       title="Identify"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
      <TextInput
      style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(customEvent)=>this.setState({customEvent})}
      value={this.state.customEvent} placeholder="Enter custom event name" />
     <Button
        onPress={this.sendCustomEvent}
       title="Send custom event"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
      <TextInput
      style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(customEvent1)=>this.setState({customEvent1})}
      value={this.state.customEvent1} placeholder="Enter custom event name" />
     <Button
        onPress={this.sendCustomEvent1}
       title="Send custom event"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
     <Button
        onPress={this.trackScreenView}
       title="Track screen view"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
     <Button
        onPress={this.registerForRemoteNotification}
       title="register for remote notifications"
       color="#FF6347" />
    </View>

<View style={styles.welcome}>
    <Switch  
    value={this.state.enablePushSwitchValue}  
    onValueChange ={(enablePushSwitchValue)=>this.setState({enablePushSwitchValue})}/>  
     <Button
        onPress={this.setEnablePush}
       title="Set enablePush"
       color="#FF6347" />
     </View>

<View style={styles.welcome}>
    <Switch  
    value={this.state.enableInAppSwitchValue}  
    onValueChange ={(enableInAppSwitchValue)=>this.setState({enableInAppSwitchValue})}/>  
     <Button
        onPress={this.setEnableInApp}
       title="Set enableInApp"
       color="#FF6347" />
     </View>

<View style={styles.welcome}>
    <Switch  
    value={this.state.enableTrackingSwitchValue}  
    onValueChange ={(enableTrackingSwitchValue)=>this.setState({enableTrackingSwitchValue})}/>  
     <Button
        onPress={this.setEnableTracking}
       title="Set enableTracking"
       color="#FF6347" />
     </View>

<View style={styles.welcome}>
     <Button
        onPress={this.fetchInAppNotification}
       title="fetch InApp Notification notifications"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
     <Button
        onPress={this.displayInAppNotification}
       title="display In App Notification"
       color="#FF6347" />
       </View>


<View style={styles.welcome}>
     <Button
        onPress={this.removeUserInfo}
       title="Remove user info"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
     <Button
        onPress={this.registerForInApp}
       title="Register For in-app notifications"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
     <Button
        onPress={this.unRegisterForInApp}
       title="Un-register for in-app notifications"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
      <Text style={styles.titleText}>
          {"Current Device Id"}
          {"\n"}
        </Text>
      <TextInput
      style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(deviceId)=>this.setState({deviceId})}
      value={this.state.deviceId} />
    </View>

<View style={styles.welcome}>
     <Button
        onPress={this.getLiveContentByEmail}
       title="Live content by Email"
       color="#FF6347" />
       </View>

<View style={styles.welcome}>
     <Button
        onPress={this.getLiveContentByDeviceID}
       title="Live content by Device id"
       color="#FF6347" />
       </View>


<View style={styles.welcome}>
     <Button
        onPress={this.getLiveContentByCustomerID}
       title="Live content by Customer id"
       color="#FF6347" />
       </View>

      </ScrollView>
    </SafeAreaView>
 );
}
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
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10
  },
});
