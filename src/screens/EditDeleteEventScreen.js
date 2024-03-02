import React, { useRef,useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/theme';
import { formattedDate,formattedTime } from '../utils/dataUtils';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CreateEvent from './CreateEvent';


const EditDeleteEventScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const sheetRef = useRef(null); 
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Error: Event not found</Text>
      </View>
    );
  }

  const handleDeleteEvent = async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this event?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve(false),
            },
            {
              text: 'Delete',
              onPress: () => resolve(true),
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      });

      if (result) {
        if (route.params?.onDelete) {
          route.params.onDelete(event.id);
        }
      

        const eventsString = await AsyncStorage.getItem('events');
        if (eventsString) {
          const events = JSON.parse(eventsString);
          const updatedEvents = events.filter((e) => e.id !== event.id);
          await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
        }
      
  
       navigation.goBack();
      }
    } catch (error) {
      console.error('Error handling delete confirmation:', error);
    }
  };


  const handleEditEvent = () => {
    sheetRef.current.expand();
  };

  const loadData = async () => {

  };
  const handleEditSave = async (eventId, editedEvent) => {
    try {
      const eventsString = await AsyncStorage.getItem('events');
      if (eventsString) {
        const events = JSON.parse(eventsString);
        const updatedEvents = events.map((e) => (e.id === eventId ? editedEvent : e));
        await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
      }

      loadData();
      sheetRef.current?.close();
      
      if (dataLoaded) {
        navigation.goBack();
      } else {
        // If data is not loaded, set a timeout to navigate back after a short delay
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
    } catch (error) {
      console.error('Error saving edited event:', error);
    }
  };

  const handleBottomSheetDismiss = () => {
    setDataLoaded(true);
  };

  return (
    
    <View style={styles.container}>
     
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.EditDelete}>
          <TouchableOpacity onPress={handleEditEvent}>
            <Icon name="edit" size={24} color={COLORS.primary} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteEvent}>
            <Icon name="delete" size={24} color={COLORS.secondary} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.eventInfoContainer}>
        <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 16,marginRight:30 }}>
          <MaterialCommunityIcons name="checkbox-blank" size={24} color={COLORS.primary} style={{ marginTop: 8, marginRight: 16 }} />
          <View >
            <Text style={styles.header}> {event?.title}</Text>
            <Text style={{ color: 'black', fontSize: 16 }}>Date: {formattedDate(new Date(event.time))} </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <MaterialCommunityIcons name="bell-outline" size={24} color='black' style={{ marginRight: 16 }} />
          <Text style={{ color: 'black', fontSize: 16 }}>Time: {formattedTime(new Date(event.time))}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <MaterialCommunityIcons name="text" size={24} color='black' style={{ marginRight: 16 }} />
          <Text style={{ color: 'black', fontSize: 16,marginRight:50 }}>{event?.summary}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <MaterialCommunityIcons name="calendar-today" size={24} color='black' style={{ marginRight: 16 }} />
          <View style={{ flexDirection: 'column', }} >
            <Text style={{ color: 'black', fontSize: 16 }}>Events</Text>
            <Text style={{ color: 'black', fontSize: 14 }}>mq6674679@gmail.com</Text>
          </View>
        </View>

      </View>
      <BottomSheetModalProvider>
            <CreateEvent
        sheetRef={sheetRef}
        selectedDate={new Date(event.time)}
        loadData={loadData} 
        editMode={true} 
        eventData={event} 
        onEditSave={handleEditSave}
        onDismiss={handleBottomSheetDismiss}
      />
      </BottomSheetModalProvider>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:COLORS.gray
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    
  },
  EditDelete: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 16,
  },
  header: {
    fontSize: 26,
    marginBottom: 10,
    color: 'black',
  },
  eventInfoContainer: {
    marginBottom: 16,
    
  },
  bottomSheetContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
  },

});

export default EditDeleteEventScreen;