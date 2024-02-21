import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import BottomTabNav from './src/navigation/BottomTabNav';


const Stack = createStackNavigator();

const App = () => {
  return (

    <NavigationContainer >
        <Stack.Navigator  >
          <Stack.Screen name='DrawerStack' component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name='BottomTabNavigator' component={BottomTabNav} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>


  );
};

export default App;
