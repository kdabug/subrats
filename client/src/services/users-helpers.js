import axios from "axios";
const BASE_URL = "https://tranquil-ravine-67605.herokuapp.com";

const api = axios.create({
  baseURL: "https://tranquil-ravine-67605.herokuapp.com",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`
  }
});

const createNewUser = async user => {
  const respData = await axios.post(`${BASE_URL}/users/register`, user);
  console.log("this is create user: resp", respData);
  return respData;
};

const editUser = async (id, edits) => {
  console.log("making an edit request with this data", edits);
  const respData = await api.put(`/users/${id}/edit`, edits);
  console.log("this is edit user: resp", respData);
  return respData;
};

const loginUser = async user => {
  const respData = await axios.post(`${BASE_URL}/users/login`, user);
  console.log("this is login user: resp", respData);
  return respData;
};

const fetchStations = async () => {
  const respData = await api.get(`/stations`);
  return respData;
};
const fetchStationData = async station => {
  console.log("this is fetchStationData station", station);
  const respData = await api.get(`/stations/${station}`);
  return respData.data;
};
const fetchStationComments = async station => {
  console.log("this is fetchStationData station", station);
  const respData = await api.get(`/stations/${station}/comments`);
  return respData.data;
};
const createNewComment = async (id, Comment) => {
  const respData = await api.post(`/stations/${id}/comments/new`, Comment);
  return respData;
};

const favoriteStation = async (id, user_id) => {
  console.log(id, user_id);
  const resp = await api.post(`/stations/${id}/user/${user_id}/add`);
  return resp.data;
};

const deleteFavoriteStation = async (id, user_id) => {
  console.log(id, user_id);
  const resp = await api.delete(`/stations/${id}/user/${user_id}/delete`);
  return resp.data;
};

const getUserFavorites = async () => {
  const resp = await api.get(`/users/favorite`);
  return resp.data;
}

export {
  fetchStationComments,
  editUser,
  fetchStations,
  fetchStationData,
  createNewUser,
  loginUser,
  createNewComment,
  favoriteStation,
  deleteFavoriteStation,
  getUserFavorites,
};
