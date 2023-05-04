import TimeAgo from 'javascript-time-ago';
import no from 'javascript-time-ago/locale/no';

export function getTimeAgo(timestampString) {
  TimeAgo.addLocale(no);
  // Create formatter (English).
  const timeAgo = new TimeAgo('no-NO');
  return timeAgo.format(new Date(timestampString));
}
