import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { COLORS } from '../../constants/theme';
import { formattedDate, formattedTime } from '../utils/dataUtils';

const EventItem = ({ reservation, onPress }) => {

  
  const getInitials = (text) => {
    const words = text.split(' ');
    const initials = words.map((word) => word[0]).join('');
    return initials;
  };

  return (
    <TouchableOpacity
    style={[
      styles.item,
      {
        // height: reservation.height, 
        backgroundColor: COLORS.white},
    ]}
    onPress={() => onPress(reservation)}
  >
    <View style={styles.titleContainer}>
    <Text style={styles.selectedDateText}>
        {formattedTime(new Date(reservation.time))}
      </Text>
    
      <Text style={{ fontSize: 16, color: COLORS.black }}>
        {reservation.title}
      </Text>
      <Text style={{ fontSize: 14, color: COLORS.secondary }}>
        {reservation.summary}
      </Text>
      <Text style={styles.datePickerButtonText}>
        {formattedDate(new Date(reservation.time))}
      </Text>
      
    </View>
    <View style={styles.avatarContainer}>
      <Avatar.Text label={getInitials(reservation.title)} size={50} />
    </View>
  </TouchableOpacity>
  );
};

const styles = {
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
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
  datePickerButtonText: {
    fontSize: 14,
    color: COLORS.black,
  },
  selectedDateText: {
    fontSize: 14,
    color: COLORS.black,
  },
};

export default EventItem;
