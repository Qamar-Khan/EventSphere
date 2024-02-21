// CalendarScreen.js
import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS } from '../../constants/theme';
import { RFValue } from 'react-native-responsive-fontsize';

const CalendarScreen = ({ calendarData }) => {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: COLORS.white,
          calendarBackground: COLORS.white,
          selectedDayBackgroundColor: COLORS.primary,
          arrowColor: COLORS.primary,
          todayTextColor: COLORS.primary,
          textSectionTitleColor: COLORS.primary,
          selectedDotColor: COLORS.white,
          markedDotColor: COLORS.primary,
          dotColor: COLORS.primary,
          dayTextColor:COLORS.primary,
          //textDayHeaderFontSize:'bold',
          //textDayFontSize:'bold'

        }}
        markedDates={{
          [formattedCurrentDate]: { marked: true, dotColor: COLORS.primary },
          '2024-02-14': { marked: true, dotColor: COLORS.primary },
          '2024-02-18': { marked: true, dotColor: COLORS.primary },
        }}
      />
      {/* Remove FlatList to hide events */}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  calendar: {
    borderRadius: 5,
    elevation: 4,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
  },
};

export default CalendarScreen;
