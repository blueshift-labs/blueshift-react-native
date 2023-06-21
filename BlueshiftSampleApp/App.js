import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Homescreen';
import InboxScreen from './Inboxscreen';
import DeeplinkScreen from './Deeplinkscreen';

import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="Deeplink" component={DeeplinkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
