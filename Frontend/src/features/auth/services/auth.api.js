import axios from "axios";


const api = axios.create({baseURL: import.meta.env.PROD? import.meta.env.VITE_API_BASE_URL: "http://localhost:3000",withCredentials: true})
export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await api.post(
      "/api/auth/register",
      { username, email, password }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const loginUser = async ({  email, password }) => {
  try {
    const response = await api.post(
      "/api/auth/login",
      {  email, password }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const logoutUser = async () => {
  try {
    const response = await api.get(
      "/api/auth/logout",
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getMe = async () => {
  try {
    const response = await api.get(
      "/api/auth/get-me",
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
