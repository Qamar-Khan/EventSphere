import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS } from '../../constants/theme';

const CalendarScreen = () => {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
         // backgroundColor: COLORS.primary,
          calendarBackground: COLORS.white,
          selectedDayBackgroundColor: COLORS.primary,
          arrowColor: COLORS.primary,
          todayTextColor: COLORS.white,
          textSectionTitleColor: COLORS.primary,
          selectedDotColor: COLORS.white,
          markedDotColor: COLORS.primary,
          dotColor: COLORS.primary,
          todayBackgroundColor:COLORS.primary,
          selectedDayTextColor:COLORS.white,
          
          

        }}
        
        markedDates={{
          [formattedCurrentDate]: { customStyles: { container: styles.marked } },
          
          '2024-03-14': { marked: true, dotColor: COLORS.primary },
          '2024-03-18': { marked: true, dotColor: COLORS.primary },
        }}
      />
      
    </View>
  );
};

const styles =StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  calendar: {
    borderRadius: 5,
    elevation: 2,
    margin: 10,
    width: '100%',
    alignSelf: 'center',
    backgroundColor:COLORS.secondaryGray
  },
  marked:{
    backgroundColor:COLORS.primary,
    borderRadius:16,
    elevation:4,
  }
});

export default CalendarScreen;
