import React, {Component} from 'react';
import {StyleSheet, Text,Switch, View, TextInput, SafeAreaView, ScrollView, NativeModules, Button, Alert, Platform, Linking, NativeEventEmitter} from 'react-native';
const emitter = Platform.OS === 'ios' ? new NativeEventEmitter(NativeModules.BlueshiftReactEventsManager) : DeviceEventEmitter

export default class App extends Component{

  componentDidMount() { // B
  if (Platform.OS === 'android') {
    Linking.getInitialURL().then(url => {
      this.navigate(url);
    });
  } else {
      emitter.addListener("PushNotificationClickedNotification", this.handlePush);
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }
  
  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  
  handleOpenURL = (event) => { // D
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
  }

  handlePush = (event) => { 
    console.log("PushNotificationClickedNotification event received");
    console.log(event);
    Alert.alert(
      "Push notification click event received",
      "",
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


  setEmailId = () => {
    NativeModules.BlueshiftBridge.setUserInfoEmailId(this.state.emailId)
  };
  setCustomerId = () => {
    NativeModules.BlueshiftBridge.setUserInfoCustomerId(this.state.customerId)
  };
  identify = () => {
    NativeModules.BlueshiftBridge.identifyWithDetails({})
  };
  sendCustomEvent = () => {
    NativeModules.BlueshiftBridge.trackCustomEvent(this.state.customEvent,{},false)
  };
  trackScreenView = () => {
    NativeModules.BlueshiftBridge.trackScreenView("ReactNativeTestScreen",{},false)
  };
  removeUserInfo = () => {
    NativeModules.BlueshiftBridge.removeUserInfo()
  };
  registerForRemoteNotification = () => {
    NativeModules.BlueshiftBridge.registerForRemoteNotification()
  };
  setEnablePush = () => {
    NativeModules.BlueshiftBridge.setEnablePush(this.state.enablePushSwitchValue)
  };
  setEnableInApp = () => {
    NativeModules.BlueshiftBridge.setEnableInApp(this.state.enableInAppSwitchValue)
  };
  fetchInAppNotification = () => {
    NativeModules.BlueshiftBridge.fetchInAppNotification()
  };
  displayInAppNotification = () => {
    NativeModules.BlueshiftBridge.displayInAppNotification()
  };
  registerForInApp = () => {
    NativeModules.BlueshiftBridge.registerForInAppNotification("index")
  };
  unRegisterForInApp = () => {
    NativeModules.BlueshiftBridge.unregisterForInAppMessage()
  };
  state = {  
        enablePushSwitchValue: false,
        enableInAppSwitchValue: false,
        emailId: "",
        customEvent: "bsft_send_me_image_push",
        customerId: ""  
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


