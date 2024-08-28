import endpoints from "../config";
import axios from "axios";

export const getFeed = async () => {
    try {
        const response = await axios.get(endpoints.feed);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getProfile = async () => {
    try {
        const response = await axios.get(endpoints.profile);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getImageDetail = async () => {
    try {
        const response = await axios.get(`${endpoints.imageDetail}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
