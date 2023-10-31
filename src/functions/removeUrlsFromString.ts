export default function removeUrlsFromString(inputString: string) {
  // Define a regular expression to match URLs
  const urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi;

  // Use the replace method to replace all URLs with an empty string
  return inputString.replace(urlRegex, '');
}
