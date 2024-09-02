import { getPosts } from "../services/findyServices";
import useAppContext from "./useAppContext"


const usePosts = () => {

    const { posts, postsDispatch } = useAppContext();

    const fetchPosts = async () => {
        postsDispatch({
            type: "FETCH_POSTS_REQUEST",
        });
        try {
            const data = await getPosts();
            postsDispatch({ type: "UPDATE_POSTS", payload: data, });
        } catch (error) {
            console.error(error);
            postsDispatch({ type: "FETCH_POSTS_FAILURE", payload: error.message })
        }
    }

    const addPosts = async (posts) => {
        postsDispatch({
            type: "FETCH_POSTS_REQUEST",
        });
        try {
            const postPosts = await createposts(posts);
            postsDispatch({ type: "ADD_POSTS", payload: postPosts });
        } catch (error) {
            console.error(error);
            postsDispatch({ type: "FETCH_POSTS_FAILURE", payload: error.message })
        }
    }

    return {
        posts: posts.posts,
        loading: posts.loading,
        error: posts.error,
        fetchPosts,
        addPosts,
    }
}

export default usePosts