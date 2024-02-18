import React, { useState } from "react";
import {View,Text, SafeAreaView, StyleSheet,TouchableOpacity, ScrollView, Image,TextInput,Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS,FONTS } from "../../constants/theme";
import { imagesDataURL } from "../../constants/data";
import * as ImagePicker from "react-native-image-picker";
import DatePicker, {getFormatedDate } from 'react-native-modern-datepicker';


const EditProfile=({navigation})=>{
    const [selectedImage,setSelectedImage] =useState(imagesDataURL[0]);
    const [name,setName]= useState('Melissa Peters');
    const [email,setEmail] = useState ('melissapeters@gmail.com');
    const [password,setPassword] = useState ('strongpassword');
    const [country,setCountry] = useState ('Singapur');
    
    const[openStartDatePicker,setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate =getFormatedDate(
        today.setDate(today.getDate()+1),
        'YYYY/MM/DD'
   )
    const [selectedStartDate,setSelectedStartDate]= useState('01/01/1990');
    const [startedDate,setStartedDate]= useState('12/12/2023');

    const handelChangeStartDate = (propDate)=>{
        setStartedDate(propDate);
    }
    const handleOnpressStartDate = ()=>{
        setOpenStartDatePicker(!openStartDatePicker)
    }
    const handleImageSelection= async()=>{
        let result = await ImagePicker.launchImageLibrary({
            mediaTypes: ImagePicker.mediaTypeOptions,
            editable: true,
            aspect:[4,4],
            quality:1
        });
        console.log(result);
        if(!result.cancelled){
            setSelectedImage(result.assets[0].uri)
        }else {
            console.log('Image selection canceled');
        }
    };
    function renderDatePicker(){
       return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker} 
        >
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <View style={{
                    margin:20,
                    backgroundColor:COLORS.primary,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:20,
                    padding:35,
                    width:'90%',
                    shadowColor:'#000',
                    shadowOffset:{
                        width:0,
                        height:2
                    },
                    shadowOpacity:0.25,
                    shadowRadius:4,
                    elevation:5
                }}>
                    <DatePicker
                    mode='calendar'
                    minimumDate={startDate}
                    selected={startedDate}
                    onDateChanged={handelChangeStartDate}
                    onSelectedChange={(Date)=>setSelectedStartDate(Date)}
                    options={{
                        backgroundColor:COLORS.primary,
                        textHeaderColor:'#469ab6',
                        textDefaultColor:COLORS.white,
                        selectedTextColor:COLORS.white,
                        mainColor:'#369ab6',
                        textSecondaryColor:COLORS.white,
                        borderColor:'rgb(122,146,165,0.1)'
                    }}
                    />
                    <TouchableOpacity onPress={handleOnpressStartDate}>
                        <Text style={{...FONTS.body3,color:COLORS.white}} >Close</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
       )
    }
    return(
        <SafeAreaView style={Styles.ContentContainer}>
            <View style={Styles.Container}>
                <TouchableOpacity style={Styles.Back} onPress={()=>navigation.goBack()}>
                    <Ionicons name='chevron-back' size={24} color='blue' />
                </TouchableOpacity>
                <Text style={Styles.Header}>Edit Profile</Text>
            </View>
            <ScrollView>
                <View style={{alignItems:'center',marginVertical:22}}>
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                        source={{uri:selectedImage}}
                        style={{
                            height:170,
                            width:170,
                            borderRadius:85,
                            borderWidth:2,
                            borderColor:COLORS.primary,
                        }} />
                        <View style={{
                            position:'absolute',
                            bottom:0,
                            right:10,
                            zIndex:9999
                        }}>
                            <MaterialIcons
                            name='photo-camera'
                            size={32}
                            color={COLORS.primary}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{
                        flexDirection:'column',
                        marginBottom:6,
                        marginHorizontal:12
                    }}>
                        <Text style={{...FONTS.h4,color:COLORS.black,fontWeight:'bold'}}>User Name</Text>
                        <View style={{ 
                            height:44,
                            width:'100%',
                            borderColor:COLORS.secondaryGray,
                            borderWidth:1,
                            borderRadius:4,
                            marginVertical:6,
                            justifyContent:'center',
                            paddingLeft:8,
                        }}>
                            <TextInput 
                            value={name}
                            onChangeText={value=>setName(value)}
                            editable={true} />
                        </View>   
                    </View>
                    <View style={{
                        flexDirection:'column',
                        marginBottom:6,
                        marginHorizontal:12
                    }}>
                        <Text style={{...FONTS.h4,color:COLORS.black,fontWeight:'bold'}}>Email</Text>
                        <View style={{ 
                            height:44,
                            width:'100%',
                            borderColor:COLORS.secondaryGray,
                            borderWidth:1,
                            borderRadius:4,
                            marginVertical:6,
                            justifyContent:'center',
                            paddingLeft:8,
                        }}>
                            <TextInput 
                            value={email}
                            onChangeText={value=>setEmail(value)}
                            editable={true} />
                        </View>   
                    </View>
                    <View style={{
                        flexDirection:'column',
                        marginBottom:6,
                        marginHorizontal:12
                    }}>
                        <Text style={{...FONTS.h4,color:COLORS.black,fontWeight:'bold'}}>Password</Text>
                        <View style={{ 
                            height:44,
                            width:'100%',
                            borderColor:COLORS.secondaryGray,
                            borderWidth:1,
                            borderRadius:4,
                            marginVertical:6,
                            justifyContent:'center',
                            paddingLeft:8,
                        }}>
                            <TextInput 
                            value={password}
                            onChangeText={value=>setPassword(value)}
                            editable={true}
                            secureTextEntry />
                        </View>   
                    </View>

                    <TouchableOpacity onPress={handleOnpressStartDate} style={{
                        flexDirection:'column',
                        marginBottom:6,
                        marginHorizontal:12
                    }}>
                        <Text style={{...FONTS.h4,color:COLORS.black,fontWeight:'bold'}}>Date of Birth</Text>
                        <View style={{ 
                            height:44,
                            width:'100%',
                            borderColor:COLORS.secondaryGray,
                            borderWidth:1,
                            borderRadius:4,
                            marginVertical:6,
                            justifyContent:'center',
                            paddingLeft:8,
                        }}>
                            <Text >{selectedStartDate}</Text>
                        </View>   
                    </TouchableOpacity>


                    <View style={{
                        flexDirection:'column',
                        marginBottom:6,
                        marginHorizontal:12
                    }}>
                        <Text style={{...FONTS.h4,color:COLORS.black,fontWeight:'bold'}}>Country</Text>
                        <View style={{ 
                            height:44,
                            width:'100%',
                            borderColor:COLORS.secondaryGray,
                            borderWidth:1,
                            borderRadius:4,
                            marginVertical:6,
                            justifyContent:'center',
                            paddingLeft:8,
                        }}>
                            <TextInput 
                            value={country}
                            onChangeText={value=>setCountry(value)}
                            editable={true} />
                        </View>   
                    </View>
                </View>
                <TouchableOpacity
                style={{
                    backgroundColor:COLORS.primary,
                    height:44,
                    borderRadius:6,
                    alignItems:'center',
                    justifyContent:'center',
                    margin:12
                }}>
                    <Text style={{...FONTS.body3,color:COLORS.white}}>Save Changes</Text>
                </TouchableOpacity>
                {renderDatePicker()}
            </ScrollView>
        </SafeAreaView>
    )
};

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
});

export default EditProfile;