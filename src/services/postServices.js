import axios from "axios";
import endpoints from "../config";

// Obtener los posts
export const getPosts = async () => {
    const { data } = await axios.get(endpoints.posts);
    return data;
};

// Crear un nuevo post
export const createPost = async (post) => {
    const { data } = await axios.post(endpoints.posts, post);
    return data;
};
