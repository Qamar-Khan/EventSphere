import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MonthView from '../screens/MonthViewScreen';
import Create from '../screens/EventCreationScreen';
import EditDeleteEventScreen from '../screens/EditDeleteEventScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Materialcomunityicons from 'react-native-vector-icons/MaterialCommunityIcons'
import SompleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Home from '../screens/Home';
import Messages from '../screens/Messages';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import BottomTabNav from './BottomTabNav';
import AgendaScreen from '../screens/AgendaScreen';


const Drawer = createDrawerNavigator();
const MonthIcon=({focused,color,size})=><MaterialIcons name='calendar-view-month' size={size} color={color}/>
const HomeIcon=({focused,color,size})=><SompleLineIcons name='home' size={size} color={color}/>
const MessagesIcon=({focused,color,size})=><Materialcomunityicons name='android-messages' size={size} color={color}/>
const SettingsIcon=({focused,color,size})=><Ionicons name='settings-outline' size={size} color={color}/>
const ProfileIcon=({focused,color,size})=><MaterialIcons name='person-outline' size={size} color={color}/>
const AppNavigator =()=> {
    return (<>
        <NavigationContainer independent={true}>
            
            <Drawer.Navigator 
            //initialRouteName='schedule'
            screenOptions={
                {
                    sceneContainerStyle:'round',
                    //overlayColor: 'transparent',
                    //title: 'Your Dashboard',
                    //drawerLabel: 'ok Good',
                    drawerActiveTintColor: 'black',
                    drawerActiveBackgroundColor: '#62beff',
                    drawerStyle:{
                        
                    },
                    drawerContentStyle: {
                        backgroundColor: '#ffeeea',
                        
                        
                    },
                }
            }>
                <Drawer.Screen name='Agenda' component={AgendaScreen}  />
                <Drawer.Screen name='MonthView' component={MonthView} options={{drawerIcon:MonthIcon}} />
                <Drawer.Screen name='CreateEvent' component={Create} />
                <Drawer.Screen name='EditDeleteEventScreen' component={EditDeleteEventScreen} />
                <Drawer.Screen name='Account' component={BottomTabNav} options={{headerShown:false}} />
                
                
            </Drawer.Navigator>
           
        </NavigationContainer>
         
         </>
    )

};
export default AppNavigator;

                //<Drawer.Screen name='Home' component={Home} options={{drawerIcon:HomeIcon}}/>
                //<Drawer.Screen name='Messages' component={Messages} options={{drawerIcon:MessagesIcon}}/>
                //<Drawer.Screen name='Settings' component={Settings} options={{drawerIcon:SettingsIcon , headerShown:false}}/>
                //<Drawer.Screen name='Profile' component={Profile} options={{drawerIcon:ProfileIcon}}/>
                //<Drawer.Screen name='EditProfile' component={EditProfile} options={{drawerIcon:ProfileIcon,headerShown:false}}/>

