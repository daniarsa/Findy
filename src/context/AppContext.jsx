import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import userReducer from "../reducers/userReducer";
import postsReducer from "../reducers/postsReducer";
import storiesReducer from "../reducers/storiesReducer";
import { getPosts, getStories } from "../services/findyServices";
import likesReducer from "../reducers/likesReducer";
import { createPost } from "../services/postServices";

// Crear el contexto
export const AppContext = createContext(null);

// Definir las acciones del reducer de Profile
const UPDATE_PROFILE = 'UPDATE_PROFILE';

// Reducer para manejar acciones relacionadas con el perfil
const profileReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Proveedor de contexto combinado
export const AppContextProvider = ({ children, initialProfileData }) => {
  const [user, userDispatch] = useReducer(userReducer, {
    user: null,
    isAuth: false,
  });

  const [profileData, profileDispatch] = useReducer(profileReducer, initialProfileData);

  const [stories, storiesDispatch] = useReducer(storiesReducer, {
    stories: [],
  });

  useEffect(() => {
    const fetchStories = async () => {
        const storiesData = await getStories();
        storiesDispatch({ type: 'UPDATE_STORIES', payload: storiesData });
    };

    fetchStories();
}, []);

  const [posts, postsDispatch] = useReducer(postsReducer, {
    posts: [],
    loading: false,
    error: null,
  });
  const [likes, likesDispatch] = useReducer(likesReducer, {});

  
  const addPosts = async (newPost) => {
    postsDispatch({ type: "FETCH_POSTS_REQUEST" });
    try {
      const postPosts = await createPost(newPost);
      postsDispatch({ type: "ADD_POSTS", payload: postPosts });
    } catch (error) {
      console.error(error);
      postsDispatch({ type: "FETCH_POSTS_FAILURE", payload: error.message });
    }
  };

  const globalState = {
    user,
    userDispatch,
    profileData,
    profileDispatch,
    posts,
    postsDispatch,
    stories,
    storiesDispatch,
    likes,
    likesDispatch,
    addPosts,
  };

  return (
    <AppContext.Provider value={globalState}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialProfileData: PropTypes.object,
};

// Custom hooks para acceder a los contextos
export const useProfile = () => {
  const { profileData, profileDispatch } = useContext(AppContext);
  return { profileData, profileDispatch };
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useLikes = () => {
  const { likes, likesDispatch } = useContext(AppContext);
  return { likes, likesDispatch };
};

export default AppContextProvider;
