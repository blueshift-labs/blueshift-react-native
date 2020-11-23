import React, {Component} from 'react';
import {StyleSheet, Text,Switch, View, TextInput, SafeAreaView, ScrollView, NativeModules, Button} from 'react-native';
export default class App extends Component{
  setEmailId = () => {
    NativeModules.BlueshiftBridge.setUserEmailId(this.state.emailId)
  };
  setCustomerId = () => {
    NativeModules.BlueshiftBridge.setUserCustomerId(this.state.customerId)
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
    NativeModules.BlueshiftBridge.setEnablePush(this.state.switchValue)
  };
  registerForInApp = () => {
    NativeModules.BlueshiftBridge.registerForInApp("ReactNativeTestScreen")
  };
  unregisterForInApp = () => {
    NativeModules.BlueshiftBridge.unregisterForInApp()
  };
  fetchInAppNotification = () => {
    NativeModules.BlueshiftBridge.fetchInAppNotification()
  };
  displayInAppNotification = () => {
    NativeModules.BlueshiftBridge.displayInAppNotification()
  };
  state = {  
        switchValue: false,
        emailId: "",
        customEvent: "",
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
        onPress={this.registerForInApp}
       title="Register for in-app"
       color="#FF6347" />
       </View>

    <View style={styles.welcome}>
     <Button
        onPress={this.unregisterForInApp}
       title="Unregister for in-app"
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
    value={this.state.switchValue}  
    onValueChange ={(switchValue)=>this.setState({switchValue})}/>  
     <Button
        onPress={this.setEnablePush}
       title="Set enablePush"
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


