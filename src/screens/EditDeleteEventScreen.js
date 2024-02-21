import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/theme';
import { formattedDate,formattedTime } from '../utils/dataUtils';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';


const EditDeleteEventScreen = ({ route, navigation }) => {
  const [event, setEvent] = useState({});

  if (!event) {
//continue
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
          await confirmDelete();
        }
      } catch (error) {
        console.error('Error handling delete confirmation:', error);
      }
    };
  
    const confirmDelete = async () => {
      try {
        const eventsString = await AsyncStorage.getItem('events');
        if (eventsString) {
          const events = JSON.parse(eventsString);
          const updatedEvents = events.filter((e) => e.id !== event.id);
          await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
        }
  
        navigation.goBack();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    };

  const handleEditEvent = () => {
    bottomSheetRef.current.present();
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
        <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 16 }}>
          <MaterialCommunityIcons name="checkbox-blank" size={24} color={COLORS.primary} style={{ marginTop: 8, marginRight: 16 }} />
          <View>
            <Text style={styles.header}>Title: {event?.title}</Text>
            <Text style={{ color: 'black', fontSize: 16 }}>Date: {formattedDate(event)} </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <MaterialCommunityIcons name="bell-outline" size={24} color='black' style={{ marginRight: 16 }} />
          <Text style={{ color: 'black', fontSize: 16 }}>Time: {formattedTime(event)}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <MaterialCommunityIcons name="text" size={24} color='black' style={{ marginRight: 16 }} />
          <Text style={{ color: 'black', fontSize: 16 }}>Summary: {event?.summary}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <MaterialCommunityIcons name="calendar-today" size={24} color='black' style={{ marginRight: 16 }} />
          <View style={{ flexDirection: 'column', }} >
            <Text style={{ color: 'black', fontSize: 16 }}>Events</Text>
            <Text style={{ color: 'black', fontSize: 14 }}>mq6674679@gmail.com</Text>
          </View>
        </View>

      </View>
      
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
