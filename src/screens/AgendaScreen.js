import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Button } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MemoizedItem = React.memo(({ reservation, isFirst }) => {
  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? COLORS.black : COLORS.secondary;

  return (
    <TouchableOpacity
      style={[styles.item, { height: reservation.height, backgroundColor: COLORS.white }]}
      onPress={() => Alert.alert(reservation.name)}
    >
      <Text style={{ fontSize, color }}>{reservation.name}</Text>
      <Text style={{ fontSize: 16, color: COLORS.primary }}>{reservation.title}</Text>
      <Text style={{ fontSize: 14, color: COLORS.secondary }}>{reservation.summary}</Text>
    </TouchableOpacity>
  );
});

const AgendaScreen = () => {
  const [items, setItems] = useState(undefined);
  const [eventTitle, setEventTitle] = useState('');
  const [eventSummary, setEventSummary] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sheetRef = useRef(null);

  const loadItems = useCallback((day) => {
    const existingItems = items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!existingItems[strTime]) {
          existingItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            existingItems[strTime].push({
              name: `Item for ${strTime} #${j}`,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      setItems({ ...existingItems });
    }, 1000);
  }, [items]);

  useEffect(() => {
    if (!items) {
      loadItems({ timestamp: new Date().getTime() }); // Initial load
    }

    return () => {
    };
  }, [items, loadItems]);

  const renderItem = useCallback((reservation, isFirst) => {
    return <MemoizedItem key={reservation.name} reservation={reservation} isFirst={isFirst} />;
  }, []);

  const renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text style={{ color: COLORS.gray }}>This is an empty date!</Text>
    </View>
  );

  const rowHasChanged = (r1, r2) => r1.name !== r2.name;

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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

  const formattedDate = () => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(selectedDate);
  };

  const formattedTime = () => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(selectedDate);
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
    };

    try {
      const existingEventsString = await AsyncStorage.getItem('events');
      const existingEvents = existingEventsString ? JSON.parse(existingEventsString) : [];

      existingEvents.push(newEvent);

      await AsyncStorage.setItem('events', JSON.stringify(existingEvents));

      sheetRef.current?.close();

      loadItems({ timestamp: new Date().getTime() });

      console.log('Event saved:', newEvent);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Agenda
          items={items}
          loadItemsForMonth={(day) => loadItems(day)}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          theme={{
            agendaKnobColor: COLORS.primary,
            selectedDayBackgroundColor: COLORS.primary,
            dotColor: COLORS.secondary,
           // dayTextColor: COLORS.primary,
            textSectionTitleColor:COLORS.primary,
          
          //textDisabledColor: COLORS.gray

          }}
        />
        <TouchableOpacity onPress={handleOpenBottomSheet} style={styles.addButton}>
          <Icon name="add" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={['14%','40%','70%' ,'100%']}
      >
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
              <Text style={styles.datePickerButtonText}>{formattedDate()}</Text>
              <Text style={styles.selectedDateText}>{formattedTime()}</Text>
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
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 16,
    bottom: 0,
    right: 0,
    //top: 20,
    //left: 20,
    position: 'absolute',
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
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    marginHorizontal:20,
    
  },
  datePickerButtonText: {
    color: COLORS.black,
    fontSize:16
  },
  selectedDateText: {
    color: COLORS.primary,
    fontSize:16

  },
  dateTimePickerModal: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
});

export default AgendaScreen;
