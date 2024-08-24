import endpoints from "../config";
import axios from "axios";

export const getUsers = async () => {
    try {
        const response = await axios.get(endpoints.users);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getPost = async () => {
    try {
        const response = await axios.get(endpoints.posts);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}