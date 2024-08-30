import axios from "axios";
import { apiURL } from "./assets/constants";

const axiosApi = axios.create({
  baseURL: apiURL,
});

export default axiosApi;
