import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import userReducer from "../reducers/userReducer";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, {
    user: null,
    isAuth: true,
  });

  const globalState = {
    user,
    userDispatch,
  };

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;