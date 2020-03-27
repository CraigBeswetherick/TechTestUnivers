import { SERVER_PATH, SERVER_PORT } from "./Constants";

export async function getData() {
  const fetchData = {
    method: "GET",
    headers: new Headers()
  };

  const response = await fetch(
    SERVER_PATH + ":" + SERVER_PORT + "/time-zones",
    fetchData
  ); // Call the fetch function passing the url of the API as a parameter
  const json = await response.json();
  console.log(json);
  return json;
}
