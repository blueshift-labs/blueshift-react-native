import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BlueshiftInbox from 'blueshift-react-native/components/BlueshiftInbox';

export default function InboxScreen() {
  // default inbox
  return (
    <BlueshiftInbox />
  );

  // customisation example
  // return (
  //   <BlueshiftInbox
  //     unreadIndicatorColor="#ff0000"
  //     pullToRefreshColor="#00ff00"
  //     titleStyle={{color: 'green', fontSize: 18, fontWeight: 'bold'}}
  //     detailsStyle={{color: 'blue', fontSize: 16, fontWeight: 'normal'}}
  //     timestampStyle={{color: 'red', fontSize: 14, fontWeight: 'normal'}}
  //     dateFormatterFn={date => date.toLocaleTimeString()}
  //     sortMessagesFn={(m1, m2) => (m1.createdAt > m2.createdAt ? 1 : -1)}
  //     deleteComponent={<Text style={{color: 'white'}}>Clear</Text>}
  //     placeholderComponent={<Text>This is an empty place.</Text>}
  //     loadingIndicatorComponent={
  //       <View style={{height: 20, width: 20, backgroundColor: 'yellow'}} />
  //     }
  //     listItemSeparatorComponent={
  //       <View style={{backgroundColor: 'blue', height: 2}} />
  //     }
  //     listItemComponent={message => <Text>{message.title} {message.details}</Text>}
  //   />
  // );
}

const customStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
  },
  date: {
    fontSize: 14,
    fontWeight: '300',
    color: '#808080',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 1,
    resizeMode: 'cover',
  },
  filled_circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  empty_circle: {
    width: 10,
    height: 10,
    marginRight: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: 'gray',
  },
});
