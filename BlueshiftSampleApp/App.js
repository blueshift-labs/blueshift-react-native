import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Homescreen';
import InboxScreen from './Inboxscreen';
import DeeplinkScreen from './Deeplinkscreen';
import {Button} from 'react-native';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation, route}) => ({
            title: 'Blueshift Sample App',
            // Add a placeholder button without the `onPress` to avoid flicker
            headerRight: () => <Button title="Inbox(0)" />,
          })}
        />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="Deeplink" component={DeeplinkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
