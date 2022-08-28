import * as React from 'react';

// Libs
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Store

// Components

// Styles

// Images

// Screens
import Home from '~/screens/Home';

import {navigationRef} from './RootNavigation';

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
