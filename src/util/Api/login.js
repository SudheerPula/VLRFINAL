import { axios } from "../../config/config";
import { path } from "../path";
import md5 from 'md5'

export function login({ email, password }) {
  const params = {
    email,
    password: md5(password),
  };
  return axios.post(path.LOGIN, params).then((response) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data;
    localStorage.setItem("token", response.data);
    return getUserData()
  });
}

export function getUserData() {
  return axios.get(path.USER).then((response) => {
    localStorage.setItem('userData', JSON.stringify(response.data));
    return response.data;
  });
}

export function register({ email, password, userName }) {
  const params = {
    email,
    password: md5(password),
    userName
  };
  return axios.post(path.REGISTER, params).then((response) => {
    return response.data
  });
}