import axios from "axios";

const baseUrl = "http://localhost:8000/";
    const instance = axios.create({
      baseURL : baseUrl,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      // .. other options
    });


export default instance;