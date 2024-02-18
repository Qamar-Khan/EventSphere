import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './src/navigation/AppNavigator';
import BottomTabNav from './src/navigation/BottomTabNav';
import EditProfile from './src/screens/EditProfile';



const Stack= createStackNavigator();

const App = () => {
  return (
    
      <NavigationContainer >
        <Stack.Navigator  >
        <Stack.Screen name='DrawerStack' component={AppNavigator} options={{headerShown:false}} />
        <Stack.Screen name='BottomTabNavigator' component={BottomTabNav} options={{headerShown:false}} />
        <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown:false}}/>
        
        </Stack.Navigator>
        
      </NavigationContainer>
    
  );
};

export default App;
