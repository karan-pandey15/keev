import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.mamtahardware.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
