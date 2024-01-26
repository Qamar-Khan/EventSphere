import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import CalendarScreen from '../screens/CalendarScreen.js';
import EventDetailsScreen from '../screens/EventDetailsScreen.js';
import EventCreationScreen from '../screens/EventCreationScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="EventCreation" component={EventCreationScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        
      />
      <Tab.Screen name="EventDetails" component={EventDetailsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
