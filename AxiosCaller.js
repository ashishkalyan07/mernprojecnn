import axios from "axios";

const baseUrl = "http://localhost:8000/";

// Declaring Api Caller
const AxiosCaller = (endpoint, method, body) =>
  axios({
    url: `${baseUrl}${endpoint}`,
    method: method || "GET",
    data: body,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
  })
    .then((response) => {
      let data = response.data;
      return data;
    })
    .catch((error) => {
      throw error.response;
    });
    

export default AxiosCaller;