import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditDeleteEventScreen = ({ route, navigation }) => {
  const [event, setEvent] = useState({});
  const [editedEvent, setEditedEvent] = useState({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventId = route.params.eventId;
        const eventsString = await AsyncStorage.getItem('events');
        if (eventsString) {
          const events = JSON.parse(eventsString);
          const selectedEvent = events.find((event) => event.id === eventId);
          setEvent(selectedEvent);
          setEditedEvent(selectedEvent); 
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [route.params.eventId]);

  const handleEditEvent = async () => {
    try {
      const eventsString = await AsyncStorage.getItem('events');
      if (eventsString) {
        const events = JSON.parse(eventsString);
        const eventIndex = events.findIndex((e) => e.id === event.id);
        events[eventIndex] = editedEvent;
        await AsyncStorage.setItem('events', JSON.stringify(events));
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const eventsString = await AsyncStorage.getItem('events');
      if (eventsString) {
        const events = JSON.parse(eventsString);

        const updatedEvents = events.filter((e) => e.id !== event.id);

        await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <View>
      <Text>Edit/Delete Event</Text>
      <TextInput
        placeholder="Event Title"
        value={editedEvent.title}
        onChangeText={(text) => setEditedEvent({ ...editedEvent, title: text })}
      />
      <TextInput
        placeholder="Event Summary"
        value={editedEvent.summary}
        onChangeText={(text) => setEditedEvent({ ...editedEvent, summary: text })}
      />
      <Button title="Save Changes" onPress={handleEditEvent} />
      <TouchableOpacity onPress={handleDeleteEvent}>
        <Text>Delete Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditDeleteEventScreen;
