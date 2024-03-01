export const formattedDate = (selectedDate) => {
  if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
    return '';
  }
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(selectedDate);
};

export const formattedTime = (selectedDate) => {
  if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
    return '';
  }
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return new Intl.DateTimeFormat('en-US', options).format(selectedDate);
};
