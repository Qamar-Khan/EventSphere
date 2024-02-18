import React from 'react';
import { View,Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { COLORS } from '../../constants/theme';
import moment from 'moment';

const {width} =Dimensions.get('screen');

export default function AgendaScreen(){
    const [value,setValue] = React.useState(new Date());
    const [week, setWeek] = React.useState(0);

    const weeks = React.useMemo(()=>{
        const start = moment(start).add(week,'weeks').startOf('week');
        return[-1,0,1].map(adj =>{
            return Array.from({length:7}).map((_,index)=>{
                const date = moment (start).add(adj,'week').add(index,'day');
                return{
                    weekday:date.format('add'),
                    date:date.toDate(),
                };
            });
        });
    },[week]);
    return(
        <SafeAreaView style={{flex:1}}>
                <View style={Styles.container}>
                    <View style={Styles.header}>
                        <Text style={Styles.title}>Your Shedule</Text>
                    </View>
                    <View style={Styles.picker}>
                        {weeks.map((dates,index)=>(
                            <View style={Styles.itemRow} key={index}>
                            {dates.map((item,dateIndex)=>{
                                const isActive =
                                value.toDateString()=== item.date.toDateString();
                                return(
                                    <TouchableWithoutFeedback key={dateIndex} onPress={()=>setValue(item.date)}>
                                        <View style={[Styles.item ,isActive &&{
                                            backgroundColor:COLORS.primary,
                                            borderColor:'#111',},]}>
                                            <Text style={[Styles.itemWeekday,isActive && {color:COLORS.white},]}>{item.weekday}</Text>
                                            <Text style={[Styles.itemDate,isActive && {color:COLORS.white}]}>{item.date.getDate()}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })}
                        </View>
                        ))}
                    </View>
                </View>
        </SafeAreaView>
    )
};
const Styles= StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:24,
    },
    header:{
        paddingHorizontal:16,
    },
    title:{
        fontSize:32,
        fontWeight:'700',
        color:'#1d1d1d',
        marginBottom:12,
    },
    itemRow:{
        width,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        marginHorizontal:-4,
        paddingHorizontal:16
    },
    item:{
        flex:1,
        height:50,
        marginHorizontal:4,
        marginVertical:6,
        paddingHorizontal:4,
        borderWidth:1,
        borderRadius:8,
        borderColor:'#e3e3e3',
        alignItems:'center',
        flexDirection:'column'
    },
    itemWeekday:{
        fonstSize:13,
        fontWeight:'500',
        color:'#737373',
        marginBottom:4,
    },
    itemDate:{
        fontSize:15,
        fontWeight:'600',
        color:'#111',
    },
});