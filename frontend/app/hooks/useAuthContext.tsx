"use client"

import { useContext } from "react";
import { userContext } from "../context/authcontext";


export const useAuthContext = () => {
    const context = useContext(userContext)
    if(!context){
        throw Error('useContext must be used inside userContectProvider')
    }
    return context;
}