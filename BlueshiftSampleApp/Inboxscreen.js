import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import BlueshiftInbox from './BlueshiftInbox';

export default function InboxScreen() {
  return BlueshiftInbox(
    'red',
    'red',
    customStyle,
    'No items to show. Come again later!',
    date => {
      return date.toISOString();
    },
  );
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
