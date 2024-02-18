import React from "react";
import{View,Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS,FONTS } from "../../constants/theme";



const Settings=({navigation})=>{
    const navigateToEditProfile=()=>{
        navigation.navigate('EditProfile')
    };
    const navigateToSecurity =()=>{
        console.log('Security function')
    };
    const navigateToNotifications=()=>{
        console.log('Notification function')
    };
    const navigateToPrivacy=()=>{
        console.log('Provacy function')
    };
    const navigateToSubscription=()=>{
        console.log('Subscription function')
    };
    const navigateToSupport=()=>{
        console.log('Support function')
    };
    const navigateToTermsAndPolicies =()=>{
        console.log('Terms and Policies function')
    };
    const navigateToFreeSpace=()=>{
        console.log('Free Space function')
    };
    const navigateTodateSaver =()=>{
        console.log('Date Saver')
    };
    const navigateToReportProblem=()=>{
        console.log('Report a problem')
    };
    const addAccount=()=>{
        console.log('Add Account')
    };
    const logout =()=>{
        console.log('Logout')
    }


    const accountItems=[
        {icon:'person-outline',text:'Edit Profile',action:navigateToEditProfile},
        {icon: 'security',text:'Security',action:navigateToSecurity},
        {icon: 'notifications-none',text:'Notifications',action:navigateToNotifications},
        {icon: 'lock-outline',text:'Privacy',action:navigateToPrivacy}
    ];
    const supportItems=[
        {icon:'credit-card', text:'My Subscription',action:navigateToSubscription },
        {icon:'help-outline', text:'Help & Support',action:navigateToSupport },
        {icon:'info-outline', text:'Terms and Policies',action:navigateToTermsAndPolicies },
    ];
    const cacheAndCellularItems=[
        {icon:'delete-outline',text:'Free up Space',action:navigateToFreeSpace},
        {icon:'save-alt',text:'Date Saver',actoin:navigateTodateSaver},
    ];
    const actionsItems =[
        {icon:'outlined-flag',text:'Report a Problem',action:navigateToReportProblem},
        {icon:'people-outline',text:'Add Account',action:addAccount},
        {icon:'logout',text:'Log Out',action:logout},
    ];

    const renderSettingsItem =({icon,text,action})=>(
        <TouchableOpacity onPress={action} style={{
            flexDirection:'row',alignItems:'center',
            paddingVertical:8,paddingLeft:12}}>
        <MaterialIcons name={icon} size={24} color='black'/>
            <Text style={{marginLeft:36,...FONTS.semiBold,fontWeight:600,fontSize:16}}>
                {text}
            </Text>

        </TouchableOpacity>
    )



    return(
        <SafeAreaView style={Styles.ContentContainer}>
            <View style={Styles.Container}>
                <TouchableOpacity style={Styles.Back} onPress={()=>navigation.goBack()}>
                    <Ionicons name='chevron-back' size={24} color='blue' />
                </TouchableOpacity>
                <Text style={Styles.Header}>Settings</Text>
            </View>
            <ScrollView style={{marginHorizontal:12}}>
            <View style={{marginBottom:12}}>
                <Text style={Styles.textAccount}>Account</Text>
                <View style={Styles.account}>
                    {accountItems.map((item,index)=>(
                        <React.Fragment key={index}>
                            {renderSettingsItem(item)}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            <View style={{marginBottom:12}}>
                <Text style={Styles.textAccount}>Support & About</Text>
                <View style={Styles.account}>
                    {supportItems.map((item,index)=>(
                        <React.Fragment key={index}>
                            {renderSettingsItem(item)}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            <View style={{marginBottom:12}}>
                <Text style={Styles.textAccount}>Cache & Cellular</Text>
                <View style={Styles.account}>
                    {cacheAndCellularItems.map((item,index)=>(
                        <React.Fragment key={index}>
                            {renderSettingsItem(item)}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            <View style={{marginBottom:12}}>
                <Text style={Styles.textAccount}>Actions</Text>
                <View style={Styles.account}>
                    {actionsItems.map((item,index)=>(
                        <React.Fragment key={index}>
                            {renderSettingsItem(item)}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default Settings;

const Styles=StyleSheet.create({
    ContentContainer:{
        flex:1,
            backgroundColor:COLORS.white,
    },
    Container:{
        
        marginHorizontal:12,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
    },
    Back:{
        position:'absolute',
        left:0
    },
    Header:{
        color:COLORS.black,
        ...FONTS.h2,
        fontWeight:'bold',
    },
    textAccount:{
        color:COLORS.black,
        ...FONTS.h4,
        fontWeight:'bold',
        marginVertical:10,
    },
    account:{
        borderRadius:12,
        backgroundColor:COLORS.gray,
    }

});