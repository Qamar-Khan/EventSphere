import React from 'react';
import { View, Text } from 'react-native';

const EventDetailsScreen = () => {
  const eventData = {
    eventName: 'My Birthday',
    date: '2024-01-30',
    time: '14:00',
    location: 'PC Lahore',
    description: 'Happy Birthday to me ,Event will held at PC',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{eventData.eventName}</Text>
      <Text style={styles.detailText}>Date: {eventData.date}</Text>
      <Text style={styles.detailText}>Time: {eventData.time}</Text>
      <Text style={styles.detailText}>Location: {eventData.location}</Text>
      <Text style={styles.detailText}>{eventData.description}</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
};

export default EventDetailsScreen;
