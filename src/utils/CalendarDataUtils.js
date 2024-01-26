import { Platform } from 'react-native';

export const GOOGLE_CALENDAR_API_KEY = 'AIzaSyC5wOzDb092wxwZaO2KmE9GzqCsM0Mz4lE';

export const GOOGLE_CALENDAR_WEB_CLIENT_CONFIG = {
  clientId: '431617363323-snn14o17ge2lurpncunuu8v28aalojbi.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
};

export const GOOGLE_CALENDAR_INSTALLED_CLIENT_CONFIG = {
  clientId: '431617363323-nm1kat1k1ittk0cqot47j7441qo5n78c.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
};

export const getGoogleConfig = () => {
  return Platform.OS === 'ios' ? GOOGLE_CALENDAR_INSTALLED_CLIENT_CONFIG : GOOGLE_CALENDAR_WEB_CLIENT_CONFIG;
};
