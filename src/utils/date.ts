const dateToString = (date: Date): string => {
  const dateCopy = new Date(date.getTime());
  const [dateString] = dateCopy.toISOString().split('T');
  const [y, m, d] = dateString.split('-');
  return `${d}.${m}.${y}`;
};

const timeToString = (date: Date): string => {
  const [timeString] = date.toTimeString().split(' ');
  return timeString.substring(0, timeString.lastIndexOf(':'));
};

export const getDateTime = (dateStr: string): string => {
  const now = new Date();
  const milliseconds = Date.parse(dateStr);
  const date = new Date(milliseconds);
  const diffTime = date.getTime() - now.getTime();
  const diffTimeAbs = Math.abs(diffTime);

  const minutes = Math.floor(diffTimeAbs / (1000 * 60));
  if (minutes < 1) return 'Just now';
  if (minutes >= 1 && minutes < 2) return 'One minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours === 1) return 'Hour ago';
  if (hours <= 6) return `${hours} hours ago`;

  return `${dateToString(date)} at ${timeToString(date)}`;
};
