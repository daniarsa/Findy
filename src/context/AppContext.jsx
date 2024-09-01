import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import userReducer from "../reducers/userReducer";
import postsReducer from "../reducers/postsReducer";
import storiesReducer from "../reducers/storiesReducer";
import { getPosts } from "../services/findyServices";
import { getStories } from "../services/findyServices";
import likesReducer from "../reducers/likesReducer";

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
    isAuth: true,
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
  });
  const [likes, likesDispatch] = useReducer(likesReducer, {});

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts();
      postsDispatch({ type: 'UPDATE_POSTS', payload: postsData });
    };
  
    fetchPosts();
  }, []);
  

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
