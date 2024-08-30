import axios from "axios";
import endpoints from "../config";

export const createUser = async (newUser) => {
  try {
    const { data } = await axios.post(endpoints.users, newUser);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserByEmailAndPassword = async ({ email, password }) => {
  try {
    const url = endpoints.userByEmailAndPass(email, password);
    const response = await axios.get(url);
    console.log(response);
    return response.data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(endpoints.users);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async ({ identifier, password }) => {
  try {
    const response = await axios.get(endpoints.users, {
      params: {
        identifier,
        password,
      },
    });
    return response.data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};