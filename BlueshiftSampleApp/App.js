import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text,Switch, View, TextInput, SafeAreaView, ScrollView, NativeModules, Button, Alert, Platform, Linking} from 'react-native';

import Blueshift from 'blueshift-react-native';

export default class App extends Component {

componentDidMount() { 
  // Read deeplinks when brought from killed state
  Linking.getInitialURL().then(url => { 
    if(url) {
      this.handleDeeplinkUrl(url);
    }
  });

  // Read deeplinks when app is alive
  Linking.addEventListener('url', (event) => { 
    this.handleDeeplinkUrl(event.url);
  }); 

  Blueshift.addEventListener('PushNotificationClickedEvent', this.handlePushClick);

  // global.urlEventListner = Linking.addEventListener('url', this.handleDeepLink);

  this.setValues();

  console.log("componentDidMount");

  this.registerForInApp();
}

componentWillUnmount() {
  Blueshift.removeEventListener('PushNotificationClickedEvent');

  // global.urlEventListner.remove();

  console.log("componentDidUnMount");

  this.unRegisterForInApp();
}

handlePushClick = (event) => {
  alert("push payload "+JSON.stringify(event.bsft_experiment_uuid));
};

handleDeeplinkUrl(url) { 
  console.log("deeplink: " + url);

  if (Blueshift.isBlueshiftUrl(url)) {
    Blueshift.processBlueshiftUrl(url);
  } else {
    Alert.alert(
      "Deep Link URL",
      url,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
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
  let w = Dimensions.get('window').width;
  let btnClr = "#2160D4"

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={{ width:w }} >
    
    <TextInput
      style={styles.txtStyle}
      onChangeText={(emailId)=>this.setState({emailId})}
      value={this.state.emailId} placeholder="Enter email id" />
    <View style={styles.btnStyle}>
      <Button
        onPress={this.setEmailId}
        title="Set email Id"
        color={btnClr} />
    </View>
    
    <TextInput
      style={styles.txtStyle}
      onChangeText={(customerId)=>this.setState({customerId})}
      value={this.state.customerId} placeholder="Enter customer profile Id" />
    <View style={styles.btnStyle}>
      <Button
        onPress={this.setCustomerId}
        title="Set customer Id"
        color={btnClr} />
    </View>
    
    <TextInput
      style={styles.txtStyle}
      onChangeText={(firstName)=>this.setState({firstName})}
      value={this.state.firstName} placeholder="Enter firstName" />
    <View style={styles.btnStyle}>
      <Button
        onPress={this.setFirstName}
        title="Set firstName"
        color={btnClr} />
    </View>
    
    <TextInput
      style={styles.txtStyle}
      onChangeText={(lastName)=>this.setState({lastName})}
      value={this.state.lastName} placeholder="Enter lastName" />
    <View style={styles.btnStyle}>
      <Button
        onPress={this.setLastName}
        title="Set lastName"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.setExtras}
        title="Set extras"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.setIDFA}
        title="Set IDFA"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.setLocation}
        title="Set Location"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.identify}
        title="Identify"
        color={btnClr} />
    </View>
    
    <TextInput
      style={styles.txtStyle}
      onChangeText={(customEvent)=>this.setState({customEvent})}
      value={this.state.customEvent} placeholder="Enter custom event name" />
    <View style={styles.btnStyle}>
      <Button
        onPress={this.sendCustomEvent}
        title="Send custom event"
        color={btnClr} />
    </View>
    
    <TextInput
      style={styles.txtStyle}
      onChangeText={(customEvent1)=>this.setState({customEvent1})}
      value={this.state.customEvent1} placeholder="Enter custom event name" />
    <View style={styles.btnStyle}>
      <Button
        onPress={this.sendCustomEvent1}
        title="Send custom event"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.trackScreenView}
        title="Track screen view"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.registerForRemoteNotification}
        title="register for remote notifications"
        color={btnClr} />
    </View>

    <View style={{ flexDirection: 'row'}}>
      <Switch  
        style={{flex:1}}
        value={this.state.enablePushSwitchValue}  
        onValueChange ={(enablePushSwitchValue)=>this.setState({enablePushSwitchValue})}/>  
      <View style={[styles.btnStyle, {flex: 2}]}>
        <Button
          onPress={this.setEnablePush}
          title="Set enablePush"
          color={btnClr} />
      </View>
    </View>
      
    <View style={{ flexDirection: 'row'}}>
      <Switch  
        style={{flex:1}}
        value={this.state.enableInAppSwitchValue}  
        onValueChange ={(enableInAppSwitchValue)=>this.setState({enableInAppSwitchValue})}/>  
      <View style={[styles.btnStyle, {flex: 2}]}>
        <Button
          onPress={this.setEnableInApp}
          title="Set enableInApp"
          color={btnClr} />
      </View>
    </View>
    
    <View style={{ flexDirection: 'row'}}>
      <Switch  
        style={{flex:1}}
        value={this.state.enableTrackingSwitchValue}  
        onValueChange ={(enableTrackingSwitchValue)=>this.setState({enableTrackingSwitchValue})}/>  
      <View style={[styles.btnStyle, {flex: 2}]}>
        <Button
          onPress={this.setEnableTracking}
          title="Set enableTracking"
          color={btnClr} />
      </View>
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.fetchInAppNotification}
        title="fetch InApp Notification notifications"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.displayInAppNotification}
        title="display In App Notification"
        color={btnClr} />
    </View>
    
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.removeUserInfo}
        title="Remove user info"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.registerForInApp}
        title="Register For in-app notifications"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.unRegisterForInApp}
        title="Un-register for in-app notifications"
        color={btnClr} />
    </View>    

    <Text style={styles.txtH1Style}>{"Current Device ID"}</Text>
    <TextInput
      style={styles.txtStyle}
      onChangeText={(deviceId)=>this.setState({deviceId})}
      value={this.state.deviceId} />

    <View style={styles.btnStyle}>
      <Button
        onPress={this.getLiveContentByEmail}
        title="Live content by Email"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.getLiveContentByDeviceID}
        title="Live content by Device id"
        color={btnClr} />
    </View>
    
    <View style={styles.btnStyle}>
      <Button
        onPress={this.getLiveContentByCustomerID}
        title="Live content by Customer id"
        color={btnClr} />
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
  txtH1Style: {
    flex:1,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,
    marginBottom: 4,
    padding: 8,
  },
  txtStyle: {
    flex:1,
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
    flex:1,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,
    marginBottom: 4,
  }
});
