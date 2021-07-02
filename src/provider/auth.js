import React, { useContext, createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API } from "../utils/api";
import { CONFIG } from "../constants/config";

const authContext = createContext({});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
ProvideAuth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object and update when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [authenticated, setAuthenticated] = useState(
    Boolean(window.localStorage.getItem(CONFIG.AUTHEN_KEY))
  );

  const signin = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      API.login(username, password)
        .then((res) => {
          const { authenticated } = res.data || {};
          if (authenticated) {
            window.localStorage.setItem(CONFIG.AUTHEN_KEY, authenticated);
            setAuthenticated(authenticated);
            return resolve();
          }
        })
        .catch((e) => {
          return reject({
            error: true,
            message: e?.error?.message ?? "Something wrong!",
          });
        });
    });
  };

  const signOut = () => {
    window.localStorage.removeItem(CONFIG.AUTHEN_KEY);
    setAuthenticated(null);
  };

  // Get user on mount
  useEffect(() => {
    const token = window.localStorage.getItem(CONFIG.AUTHEN_KEY);
    if (token) {
      setAuthenticated(Boolean(token));
    }
  }, []);

  return {
    authenticated,
    signin,
    signOut,
  };
}
