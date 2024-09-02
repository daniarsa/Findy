import axios from "axios";
import endpoints from "../config";

export const getPosts = async () => {
    const { data } = await axios.get(endpoints.posts)
    return data;
};

export const createPost = async (posts) => {
    const { data } = await axios.post(endpoints.posts, posts);
    return data;
};