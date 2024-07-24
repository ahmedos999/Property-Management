"use client"

import { useContext } from "react";
import { propertyContext } from "../context/propertycontext";

export const usePropertyContext = () => {
    const context = useContext(propertyContext)
    if(!context){
        throw Error('useProperty must be used inside PropertyContectProvider')
    }
    return context;
}