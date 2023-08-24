import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';

export default function DeeplinkScreen() {
  const route = useRoute();
  const {deeplink} = route.params;

  return (
    <View>
      <Text>Deep link : {deeplink}</Text>
    </View>
  );
}
