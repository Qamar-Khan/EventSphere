import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { useDispatch } from 'react-redux';

const EventCreationScreen = ({ navigation }) => {
    const dispatch = useDispatch();

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleCreateEvent = () => {
   


        dispatch({
            type: 'ADD_EVENT',
            payload: {
              eventName,
              eventDate,
              eventTime,
              eventLocation,
              eventDescription,
            },
          });
      

    // After creating the event, navigate back to the Calendar screen
    navigation.navigate('Calendar');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create New Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={(text) => setEventName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={eventDate}
        onChangeText={(text) => setEventDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={eventTime}
        onChangeText={(text) => setEventTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={eventLocation}
        onChangeText={(text) => setEventLocation(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={eventDescription}
        onChangeText={(text) => setEventDescription(text)}
      />
      <Button title="Create Event" onPress={handleCreateEvent} />
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
};

export default EventCreationScreen;
