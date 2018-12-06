import axios from "axios";
axios.defaults.baseURL = `https://api-facturationx.herokuapp.com/`;

function requestGET(route, params) {
  return axios.get(route, params);
}

function requestPOST(route, params) {
  return axios.post(route, params);
}

function requestDELETE(route, params) {
  return axios.delete(route, params);
}

function requestPUT(route, params) {
  return axios.put(route, params);
}

export default {
  requestGET,
  requestPOST,
  requestDELETE,
  requestPUT
};
