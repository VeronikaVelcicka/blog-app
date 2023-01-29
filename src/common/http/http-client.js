import axios from "axios";
import config from "@/config";

export class HttpClient {
  static URL = config.apiEndpoint;

  /**
   * Send GET request.
   *
   * @param {string} url
   */
  static get(url) {
    return axios.get(this.URL + url);
  }

  /**
   * Send POST request.
   *
   * @param {string} url
   * @param {object=} data
   */
  static post(url, data) {
    return axios.post(this.URL + url, data);
  }

  /**
   * Send PUT request.
   *
   * @param {string} url
   * @param {object=} data
   */
  static put(url, data) {
    return axios.put(this.URL + url, data);
  }
}
