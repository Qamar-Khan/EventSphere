import axios from 'axios';

import * as AuthSession from 'expo-auth-session';
import { getGoogleConfig, GOOGLE_CALENDAR_API_KEY } from './CalendarDataUtils';

export const fetchCalendarData = async () => {
  try {
    const googleConfig = getGoogleConfig();
    const { params } = await AuthSession.startAsync({
      authUrl: AuthSession.getAuthUrlAsync(googleConfig),
    });

    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${GOOGLE_CALENDAR_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${params.access_token}`,
        },
      }
    );

    return response.data.items; 
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    throw error;
  }
};
