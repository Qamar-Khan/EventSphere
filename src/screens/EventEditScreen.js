import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editEvent } from '../store';

const EventEditScreen = ({ route, events, editEvent }) => {
  const { eventId } = route.params;
  const event = events.find((e) => e.id === eventId);

  const [editedEventName, setEditedEventName] = useState(event.summary);

  const handleEditEvent = () => {
    if (!editedEventName) {
      Alert.alert('Error', 'Please enter the event name.');
      return;
    }

    editEvent(eventId, { ...event, summary: editedEventName });

    navigation.goBack();
  };

  return (
    <View>
      <Text>{event.summary}</Text>
      <TextInput
        placeholder="Edit Event Name"
        value={editedEventName}
        onChangeText={(text) => setEditedEventName(text)}
      />
      <Button title="Save Changes" onPress={handleEditEvent} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  events: state.events,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  editEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventEditScreen);
