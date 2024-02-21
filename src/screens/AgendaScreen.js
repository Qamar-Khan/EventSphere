import React, { useState, useEffect, useCallback, useRef } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,SafeAreaView,} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import { formattedDate, formattedTime } from '../utils/dataUtils';
import CreateEvent from './CreateEvent';
import EditDeleteEventScreen from './EditDeleteEventScreen';

const AgendaScreen = ({ navigation }) => {
  const [items, setItems] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const sheetRef = useRef(null);

  const loadData = async () => {
    try {
      const existingEventsString = await AsyncStorage.getItem('events');
      const existingEvents = existingEventsString
        ? JSON.parse(existingEventsString)
        : [];

      const itemsObject = existingEvents.reduce((acc, event) => {
        const strTime = timeToString(new Date(event.date).getTime());
        acc[strTime] = [
          ...(acc[strTime] || []),
          {
            id: event.id,
            title: event.title,
            summary: event.summary,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: strTime,
            time: event.time,
          },
        ];
        return acc;
      }, {});

      setItems(itemsObject);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const timeToString = (time) => {
    try {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Error converting time to string:', error);
      return '';
    }
  };

  const handleOpenEditDeleteEvent = (event) => {
    navigation.navigate('EditDeleteEventScreen', { event, });
  };
  const getInitials = (text) => {
    const words = text.split(' ');
    const initials = words.map((word) => word[0]).join('');
    return initials;
  };

  const renderItem = useCallback(
    (reservation, isFirst) => {
      return (
        <TouchableOpacity
          style={[
            styles.item,
            { height: reservation.height, backgroundColor: COLORS.white },
          ]}
          onPress={() => handleOpenEditDeleteEvent(reservation)}
        >
          <View style={styles.titleContainer}>
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Title:{reservation.title}
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.secondary }}>
              Discription:{reservation.summary}
            </Text>
            <Text style={styles.datePickerButtonText}>
              Date: {formattedDate(reservation)}
            </Text>
            <Text style={styles.selectedDateText}>
              Time: {formattedTime(reservation)}
            </Text>
          </View>
          <View style={styles.avatarContainer}>
            <Avatar.Text label={getInitials(reservation.title)} size={45} />
          </View>
        </TouchableOpacity>
      );
    },
    [handleOpenEditDeleteEvent]
  );

  const handleOpenBottomSheet = () => {
    sheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Agenda
          items={items}
          renderItem={renderItem}
          showClosingKnob={true}
          theme={{
            agendaKnobColor: COLORS.primary,
            selectedDayBackgroundColor: COLORS.primary,
            dotColor:
              items &&
                items[timeToString(selectedDate.getTime())]?.length < 10
                ? COLORS.secondary
                : undefined,
            textSectionTitleColor: COLORS.primary,
          }}
          onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
        />
        <TouchableOpacity
          onPress={handleOpenBottomSheet}
          style={styles.addButton}
        >
          <Icon name="add" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <BottomSheet //issue is here 
        ref={sheetRef}
        index={-1}
        snapPoints={['14%','40%','70%' ,'100%']}
        style={{
          backgroundColor: '#FFFFFF',
        }}
        handleIndicatorStyle={{
          backgroundColor: COLORS.primary,
        }}
      >
        <CreateEvent
          selectedDate={selectedDate}
          loadData={loadData}
          sheetRef={sheetRef}
        />
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
    //paddingBottom:15 , 
    marginRight: 10,
    marginTop: 17,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

});

export default AgendaScreen;
