import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { COLORS } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheetScrollView from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formattedDate, formattedTime } from '../utils/dataUtils';


const CreateEvent = ({ selectedDate, loadData, sheetRef }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventSummary, setEventSummary] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);




  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();

    if (!isNaN(date.getTime())) {
      // Check if date is valid
      selectedDate = date;
    } else {
      console.error('Invalid date selected:', date);
    }
  };

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
      time: selectedDate.toISOString(),
    };

    try {
      const existingEventsString = await AsyncStorage.getItem('events');
      const existingEvents = existingEventsString ? JSON.parse(existingEventsString) : [];

      existingEvents.push(newEvent);

      await AsyncStorage.setItem('events', JSON.stringify(existingEvents));


      setEventTitle('');
      setEventSummary('');

      loadData();
      sheetRef.current?.close();

      console.log('Event saved:', newEvent);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };
  const handleCloseBottomSheet = () => {
    sheetRef.current?.close();
  };



  return (

    <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={handleCloseBottomSheet} style={styles.iconContainer}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={handleSaveEvent} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Set Your Event</Text>
      <TextInput

        style={styles.input}
        placeholder="Add Title"
        value={eventTitle}
        onChangeText={(text) => setEventTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Add Description"
        value={eventSummary}
        onChangeText={(text) => setEventSummary(text)}
        multiline
      />
      <View>
        <TouchableOpacity style={styles.datePickerContainer} onPress={showDatePicker}>
          <Text>Date & Time:</Text>
          <Text style={styles.datePickerButtonText}>Date:</Text>
          <Text style={styles.selectedDateText}>Time:</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          customStyles={{
            dateInput: styles.dateTimePickerModal,
          }}
        />
      </View>
    </BottomSheetScrollView>


  );
};


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
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
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
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16
  },
  datePickerButtonText: {
    color: COLORS.black,
    fontSize: 16,
  },
  selectedDateText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  dateTimePickerModal: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
});

export default CreateEvent;
