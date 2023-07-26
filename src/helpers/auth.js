import axios from "axios";
import { setAuthorization } from "./general";
import {URLs} from '../globalurl'
export function login(credentials) {
  return new Promise((res, rej) => {
    axios
      .post(
        `${URLs.backend}/api/auth/login`,
        credentials
      )
      .then(response => {
        setAuthorization(response.data.access_token);
        res(response.data);
      })
      .catch(err => {
        console.log(err);
        rej("Wrong email or password");
      });
  });
}
export function getLocalUser() {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return null;
  }

  return JSON.parse(userStr);
}
