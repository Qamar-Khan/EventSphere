// CalendarScreen.js
import React from 'react';
import { View, Text, FlatList, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { RFValue } from 'react-native-responsive-fontsize';

const CalendarScreen = ({ calendarData }) => {
  return (
    <View style={styles.container}>
      <Calendar
        style={{ borderRadius: 10, elevation: 4, margin: 10 }}
        markedDates={{}}
      />
      <FlatList
        data={calendarData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventName}>{item.summary}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  eventContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  eventName: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#333333',
  },
};

export default CalendarScreen;
