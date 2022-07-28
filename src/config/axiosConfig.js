import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Accept-Language": "en-GB,en;q=0.9",
  },
});
