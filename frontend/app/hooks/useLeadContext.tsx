"use client"

import { useContext } from "react";
import { leadContext } from "../context/leadcontext";

export const useLeadContext = () => {
    const context = useContext(leadContext)
    if(!context){
        throw Error('useLead must be used inside LeadContectProvider')
    }
    return context;
}