"use client"

import React, { createContext, useReducer, ReactNode, Dispatch, FC } from "react";
import { Property } from "../types/property";

// Define the state and action types
interface State {
  properites: Property[] | null;
}

interface Action {
  type: "SET_PROPERTY" | "CREATE_PROPERTY" | "DELETE_PROPERTY" | "EMPTY_PROPERTY" | "UPDATE_PROPERTY";
  payload?: Property | Property[];
}

// Create the context with default values
export const propertyContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// Define the reducer function
export const propertyReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PROPERTY":
      return { properites: action.payload as Property[] };
    case "CREATE_PROPERTY":
      return { properites: [action.payload as Property, ...(state.properites || [])] };
    case "DELETE_PROPERTY":
      return { properites: state.properites?.filter((property: Property) => property._id !== (action.payload as Property)._id) || null };
    case "EMPTY_PROPERTY":
      return { properites: [] };
      
      case "UPDATE_PROPERTY":
        return { 
          properites: state.properites?.map((property: Property) => 
            property._id === (action.payload as Property)._id ? (action.payload as Property) : property
          ) || null 
        };
    default:
      return state;
  }
};

// Define the context provider component
interface PropertyContextProviderProps {
  children: ReactNode;
}

const PropertyContextProvider: FC<PropertyContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, {
    properites: null,
  });

  return (
    <propertyContext.Provider value={{ state, dispatch }}>
      {children}
    </propertyContext.Provider>
  );
};

export default PropertyContextProvider;
