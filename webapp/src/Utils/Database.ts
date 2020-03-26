import { SERVER_PATH, SERVER_PORT } from "./Constants";

export function getData() {
  const fetchData = {
    method: "GET",
    headers: new Headers()
  };

  return fetch(SERVER_PATH + ":" + SERVER_PORT + "/time-zones", fetchData) // Call the fetch function passing the url of the API as a parameter
    .then(response => response.json())
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      throw err;
    });
}
