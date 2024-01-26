import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Platform } from 'react-native';
import { fetchCalendarData } from '../utils/CalendarDataUtil';
import { RFValue } from 'react-native-responsive-fontsize';

const CalendarScreen = () => {
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchAndSetCalendarData = async () => {
      try {
        const data = await fetchCalendarData();
        setCalendarData(data);
      } catch (error) {
        console.error('Error setting calendar data:', error);
        
      }
    };

    fetchAndSetCalendarData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Event Calendar</Text>
      <FlatList
        data={calendarData}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventName}>{item.summary}</Text>
            <Text></Text>
            <Text></Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    ...Platform.select({
      ios: {
        backgroundColor: 'lightblue',
      },

      android: {
        backgroundColor: 'lightgreen',
      },

    }),
  },

  headerText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventContainer: {
    marginBottom: 8,
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
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
};


export default CalendarScreen;
