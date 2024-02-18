import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { COLORS } from '../../constants/theme';

const EventCreationScreen = React.forwardRef((props, ref) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventSummary, setEventSummary] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sheetRef = useRef(null);

  const handleSaveEvent = async () => {
    if (!eventTitle || !eventSummary) {
      Alert.alert('Error', 'Please enter event title and summary.');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      summary: eventSummary,
      date: selectedDate.toISOString(),
    };

    try {
      const existingEventsString = await AsyncStorage.getItem('events');
      const existingEvents = existingEventsString ? JSON.parse(existingEventsString) : [];
      existingEvents.push(newEvent);
      
      await AsyncStorage.setItem('events', JSON.stringify(existingEvents));
      sheetRef.current?.close();

      console.log('Event saved:', newEvent);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleOpenBottomSheet = () => {
    sheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    sheetRef.current?.close();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };

  React.useImperativeHandle(ref, () => ({
    handleOpenBottomSheet,
  }));

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={[,'20%', '100%']}
        backgroundComponent={({ style }) => <View style={[style, styles.bottomSheetBackground]} />}
      >
        <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={handleCloseBottomSheet} style={styles.iconContainer}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={handleSaveEvent} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Event</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>Event Creation Screen</Text>
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={eventTitle}
            onChangeText={(text) => setEventTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Summary"
            value={eventSummary}
            onChangeText={(text) => setEventSummary(text)}
            multiline
          />
          <View style={styles.datePickerContainer}>
            <Text>Date & Time:</Text>
            <Button title="Pick Date" onPress={showDatePicker} />
            <Text>{selectedDate.toISOString()}</Text>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  bottomSheetBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheetContent: {
    backgroundColor: COLORS.white,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  iconContainer: {
    padding: 8,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    marginLeft: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    marginLeft: 16,
    width: '90%',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 16,
  },
});

export default EventCreationScreen;
