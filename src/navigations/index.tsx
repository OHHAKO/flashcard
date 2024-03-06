import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import CreateScreen from '../screens/CreateScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigations() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="create" component={CreateScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
