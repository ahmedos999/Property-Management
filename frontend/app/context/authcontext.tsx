"use client"

import React, { createContext, useReducer, ReactNode, Dispatch, FC, useEffect } from "react";
import { user } from "../types/user";

// Define the state and action types
interface State {
user: user | null;
}

interface Action {
  type: "LOGIN" | "LOGOUT"
  payload?:user;
}

// Create the context with default values
export const userContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// Define the reducer function
export const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { user:action.payload as user };
    case "LOGOUT":
      return { user:null };
    default:
      return state;
  }
};

// Define the context provider component
interface PropertyContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: FC<PropertyContextProviderProps> = ({ children }) => {

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            dispatch({type:'LOGIN',payload:JSON.parse(user)})
        }
    },[])
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default AuthContextProvider;
