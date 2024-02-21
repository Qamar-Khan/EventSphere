import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../constants/theme";
import Home from "../screens/Home";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Messages from "../screens/Messages";
import MaterialcommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Create from "../screens/Create";
import Octicons from 'react-native-vector-icons/Octicons';
import Settings from "../screens/Settings";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from "../screens/Profile";







const Tab = createBottomTabNavigator();
const screenOptions = {
    
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboeard: true,
    tabBarStyle: {
        positon: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        backgroundColor: COLORS.white,
    }
}

const BottomTabNav = () => {
    return (
       
        <Tab.Navigator screenOptions={screenOptions} >
            <Tab.Screen name='home' component={Home} options={{
                tabBarIcon: ({ focused }) => {
                    return (<SimpleLineIcons name='home' size={24} color={focused ? COLORS.primary : COLORS.black} />)
                }
            }} />
            <Tab.Screen name='Messages' component={Messages} options={{
                tabBarIcon: ({ focused }) => {
                    return (<MaterialcommunityIcons name='message-text-outline' size={24} color={focused ? COLORS.primary : COLORS.black} />)
                }
            }} />
            <Tab.Screen name='Create' component={Create} options={{
                tabBarIcon: ({ focused }) => {
                    return (<View style={styles.create}> 
                    <Octicons name='plus' size={24} color={COLORS.white} /></View>)
                }
            }} />
            <Tab.Screen name='Settings' component={Settings} options={{
                tabBarIcon: ({ focused }) => {
                    return (<MaterialIcons name='settings' size={24} color={focused ? COLORS.primary : COLORS.black} />)
                }
            }} />
            <Tab.Screen name='Profile' component={Profile} options={{
                tabBarIcon: ({ focused }) => {
                    return (<MaterialIcons name='person-outline' size={24} color={focused ? COLORS.primary : COLORS.black} />)
                }
            }} />
        </Tab.Navigator>
      
       
    )
};
const styles = StyleSheet.create({
    create: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        height: Platform.OS == 'ios' ? 50 : 60,
        width: Platform.OS == 'ios' ? 50 : 60,
        top: Platform.OS == 'ios' ? -10 : -20,
        borderRadius: Platform.os == 'ios' ? 25 : 30,
        borderWidth: 2,
        borderColor: COLORS.white,
    }
})

export default BottomTabNav;

