"use client"

import React, { createContext, useReducer, ReactNode, Dispatch, FC } from "react";
import { Lead } from "../types/lead";

// Define the state and action types
interface State {
leads: Lead[] | null;
}

interface Action {
  type: "SET_LEAD" | "CREATE_LEAD" | "EMPTY_LEAD" 
  payload?: Lead | Lead[];
}

// Create the context with default values
export const leadContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// Define the reducer function
export const propertyReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LEAD":
      return { leads: action.payload as Lead[] };
    case "CREATE_LEAD":
      return { leads: [action.payload as Lead, ...(state.leads || [])] };
    case "EMPTY_LEAD":
      return { leads: [] };
    default:
      return state;
  }
};

// Define the context provider component
interface PropertyContextProviderProps {
  children: ReactNode;
}

const LeadContextProvider: FC<PropertyContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, {
    leads: null,
  });

  return (
    <leadContext.Provider value={{ state, dispatch }}>
      {children}
    </leadContext.Provider>
  );
};

export default LeadContextProvider;
