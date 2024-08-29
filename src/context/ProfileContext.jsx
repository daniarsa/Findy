import { createContext, useContext, useReducer } from "react";

//Create the context
const ProfileContext = createContext();

//Define the actions of the reducer
const UPDATE_PROFILE = 'UPDATE_PROFILE';

//Reducer to handle profile related actions
const profileReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {...state,...action.payload};
        default:
            return state;
    }
};

//Context provider that will wrap the application or the relevant part of it.
export const ProfileProvider = ({children, initialProfileData}) => {
    const [state, dispatch] = useReducer(profileReducer, initialProfileData);

    return (
        <ProfileContext.Provider value={{ profileData: state, dispatch}}>
            {children}
        </ProfileContext.Provider>
    )
};

// Custom hook to access the context.
export const useProfile = () => {
    return useContext(ProfileContext);
};