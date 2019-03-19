import axios from "axios";
const BASE_URL = "https://tranquil-ravine-67605.herokuapp.com";

const createNewUser = async user => {
  const respData = await axios.post(`${BASE_URL}/users/register`, user);
  console.log("this is create user: resp", respData);
  return respData.data;
};

const loginUser = async user => {
  const respData = await axios.post(`${BASE_URL}/users/login`, user);
  console.log("this is login user: resp", respData);
  return respData.data;
};

const fetchStations = async () => {
  const respData = await axios.get(`${BASE_URL}/stations`);
  console.log("fetchStations RESPDATA", respData);
  return respData.data;
};

const fetchStationData = async station => {
  console.log("this is fetchStationData station", station);
  const respData = await axios.post(`${BASE_URL}/users/`, station);
  return respData.data;
};

export { fetchStations, fetchStationData, createNewUser, loginUser };
