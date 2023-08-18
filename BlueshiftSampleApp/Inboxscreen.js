import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BlueshiftInbox from 'blueshift-react-native/components/BlueshiftInbox';

export default function InboxScreen() {
  // default inbox
  return <BlueshiftInbox />;

  // customisation example
  // return (
  // <BlueshiftInbox
  //   unreadIndicatorColor="#ff0000"
  //   pullToRefreshColor="#00ff00"
  //   titleStyle={{color: 'green', fontSize: 18, fontWeight: 'bold'}}
  //   detailsStyle={{color: 'blue', fontSize: 16, fontWeight: 'normal'}}
  //   timestampStyle={{color: 'red', fontSize: 14, fontWeight: 'normal'}}
  //   dateFormatterFn={date => date.toLocaleTimeString()}
  //   sortMessagesFn={(m1, m2) => (m1.createdAt > m2.createdAt ? 1 : -1)}
  //   deleteComponent={<Text style={{color: 'white'}}>Clear</Text>}
  //   placeholderComponent={<Text>This is an empty place.</Text>}
  //   loadingIndicatorComponent={
  //     <View style={{height: 20, width: 20, backgroundColor: 'yellow'}} />
  //   }
  //   listItemSeparatorComponent={
  //     <View style={{backgroundColor: 'blue', height: 2}} />
  //   }
  // listItemComponent={message => (
  //   <Text>
  //     {message.title} {message.details}
  //   </Text>
  // )}
  // />
  // );
}
