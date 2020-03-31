import { SQL_SERVER_PATH, SQL_SERVER_PORT } from "./Constants";

export async function getData() {
  const fetchData = {
    method: "GET",
    headers: new Headers()
  };

  const response = await fetch(
    SQL_SERVER_PATH + ":" + SQL_SERVER_PORT + "/time-zones",
    fetchData
  );
  const json = await response.json();
  return json;
}
