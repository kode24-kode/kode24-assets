/**
 * Gives the url of the kode24 api based in local dev or not
 * @returns string with api host
 */
export const getAPIHost = () => {
  const url = window.location.hostname;
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    return "http://localhost:5000/api/";
  }
  return "https://functions.kode24.no/api/";
};
