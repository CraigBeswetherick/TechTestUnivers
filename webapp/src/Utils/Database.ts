import { SERVER_PATH, SERVER_PORT } from "./Constants";

export async function getData() {
  const fetchData = {
    method: "GET",
    headers: new Headers()
  };

  const response = await fetch(
    SERVER_PATH + ":" + SERVER_PORT + "/time-zones",
    fetchData
  );
  const json = await response.json();
  console.log(json);
  return json;
}
