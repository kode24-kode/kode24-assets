// get day string in norwegian from date string
export function getPrettyFormatDateString() {
  const days = [
    'søndag',
    'mandag',
    'tirsdag',
    'onsdag',
    'torsdag',
    'fredag',
    'lørdag',
  ];
  // norwegian month names array
  const months = [
    'januar',
    'februar',
    'nars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
  ];

  const date = new Date();
  const dateOfMonth = date.getDate();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${days[day]} ${dateOfMonth}. ${months[month]} ${year}`;
}
