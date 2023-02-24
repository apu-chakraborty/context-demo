import React, { createContext, useEffect, useReducer } from "react";

// Create the initial state
const initialState = {
  loading: false,
  users: [],
  error: null
};

// Define the reducer function
function reducer(state, action) {
  switch (action.type) {
    case "fetch":
      return { ...state, loading: true };
    case "fetchSuccess":
      return { ...state, loading: false, users: action.payload };
    case "fetchError":
      return { ...state, loading: false, error: action.payload };
    case "add":
      return { ...state, loading: true };
    case "addSuccess":
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload]
      };
    case "addError":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error();
  }
}

// Create the context
export const UserContext = createContext();

// Create the provider component
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Define the async fetch function to get users
  const getUsers = async () => {
    dispatch({ type: "fetch" });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      dispatch({ type: "fetchSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "fetchError", payload: error.message });
    }
  };

  // Define the async function to add a user
  const addUser = async (user) => {
    dispatch({ type: "add" });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      );
      const data = await response.json();
      dispatch({ type: "addSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "addError", payload: error.message });
    }
  };

  // Call the getUsers function when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  // Return the context provider with the state, dispatch, and async functions as the context value
  return (
    <UserContext.Provider value={{ state, dispatch, getUsers, addUser }}>
      {children}
    </UserContext.Provider>
  );
}
