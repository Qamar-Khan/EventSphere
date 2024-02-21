import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MonthView from '../screens/MonthViewScreen';
import Create from '../screens/CreateEvent';
import EditDeleteEventScreen from '../screens/EditDeleteEventScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Materialcomunityicons from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfile from '../screens/EditProfile';
import BottomTabNav from './BottomTabNav';
import AgendaScreen from '../screens/AgendaScreen';
import { COLORS } from '../../constants/theme';
import Settings from '../screens/Settings';
import HelpAndFeedBackScreen from '../screens/HelpAndFeedBackScreen';



const Drawer = createDrawerNavigator();
const AgendaIcon = ({ focused, color, size }) => <Materialcomunityicons name='view-agenda-outline' size={size} color={color} />
const MonthIcon = ({ focused, color, size }) => <MaterialIcons name='calendar-view-month' size={size} color={color} />
const weekIcon = ({ focused, color, size }) => <MaterialIcons name='calendar-view-week' size={size} color={color} />
const EditIcon = ({ focused, color, size }) => <MaterialIcons name='edit-calendar' size={size} color={color} />
const AddIcon = ({ focused, color, size }) => <MaterialIcons name='add' size={size} color={color} />
const AccountIcon = ({ focused, color, size }) => <Materialcomunityicons name='account-circle-outline' size={size} color={color} />
const EditProfileIcon = ({ focused, color, size }) => <Materialcomunityicons name='account-edit-outline' size={size} color={color} />
const HelpAndFeedBackIcon = ({ focused, color, size }) => <Materialcomunityicons name='help-circle-outline' size={size} color={color} />
const SettingsIcon = ({ focused, color, size }) => <Ionicons name='settings-outline' size={size} color={color} />


const DrawerNavigator = () => {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                //initialRouteName='schedule'
                screenOptions={
                    {
                        sceneContainerStyle: 'round',
                        //overlayColor: 'transparent',
                        //title: 'Your Dashboard',
                        //drawerLabel: 'ok Good',
                        drawerActiveTintColor: 'black',
                        drawerActiveBackgroundColor: '#62beff',
                        drawerStyle: {

                        },
                        drawerContentStyle: {
                            backgroundColor: COLORS.gray,


                        },
                    }
                }>
                 <Drawer.Screen name='Agenda' component={AgendaScreen} options={{ drawerIcon: AgendaIcon }} />   
                <Drawer.Screen name='Month' component={MonthView} options={{ drawerIcon: MonthIcon }} />
                <Drawer.Screen name='Week' component={MonthView} options={{ drawerIcon: weekIcon }} />
                <Drawer.Screen name='CreateEvent' component={Create} options={{ drawerIcon: AddIcon }} />
                <Drawer.Screen name='EditEvents' component={EditDeleteEventScreen} options={{ headerShown: false, drawerIcon: EditIcon }} />
                <Drawer.Screen name='Accounts' component={BottomTabNav} options={{ headerShown: false, drawerIcon: AccountIcon }} />
                <Drawer.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false, drawerIcon: EditProfileIcon }} />
                <Drawer.Screen name='Settings' component={Settings} options={{ headerShown: false, drawerIcon: SettingsIcon }} />
                <Drawer.Screen name='Help & feedback' component={HelpAndFeedBackScreen} options={{ headerShown: false, drawerIcon: HelpAndFeedBackIcon }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
};

export default DrawerNavigator;

