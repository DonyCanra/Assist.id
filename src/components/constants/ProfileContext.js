import React, { createContext, useContext, useReducer, useEffect } from "react";
import { fetchProfile } from "../../store/actions/thunks";

// Define action types
const actionTypes = {
  SET_PROFILE: "SET_PROFILE",
};

// Reducer to manage the profile state
const profileReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Initialize Context and Provider
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, dispatch] = useReducer(profileReducer, {});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const fetchedProfile = await fetchProfile(); // Assuming fetchProfile returns a Promise
        dispatch({ type: actionTypes.SET_PROFILE, payload: fetchedProfile });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run the effect only once

  return <ProfileContext.Provider value={{ profile, dispatch }}>{children}</ProfileContext.Provider>;
};

// Custom hook function to use the context value
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
