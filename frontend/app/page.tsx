"use client"

import LeadCard from "./components/leadCard";
import { useEffect, useState } from "react";
import PropertyCard from "./components/PropertyCard";
import Modal from "./components/Model";
import { Property } from "./types/property";
import { Lead } from "./types/lead";
import UpdateModal from "./components/UpdateModel";
import LeadModal from "./components/LeadModel";
import { usePropertyContext } from "./hooks/usePropertyContext";


export default function Home() {
  const [showModal,setShowModal] = useState<boolean>(false)
  const [showLeadModal,setShowLeadModal] = useState<boolean>(false)
  const [leads,setLeads] = useState<Lead[]>([])
  const [currentProperty,setCurrentProperty] = useState<Property | null>()

  const {state,dispatch} = usePropertyContext()

  useEffect(()=>{
    const fetchProperty = async()=>{

      const response = await fetch('http://localhost:4000/api/property/getPropertiesWithLeads',{
        headers:{
            'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjllY2MyMTBlMTRmYmYzODMwOTYzOTkiLCJpYXQiOjE3MjE3MzYzNDksImV4cCI6MTcyMTk5NTU0OX0.I4m_dWFn37vBAyQJ-CgAascf4_sRn23kiM_aMJlnFCI`
        }
       })

       if (!response.ok) {
        throw new Error('Somthing went wrong');
      }

    const json:Property[] = await response.json()
    dispatch({type:'SET_PROPERTY',payload:json})
    }

    const fetchLeads = async()=>{
      const response = await fetch('http://localhost:4000/api/lead',{
        headers:{
            'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjllY2MyMTBlMTRmYmYzODMwOTYzOTkiLCJpYXQiOjE3MjE3MzYzNDksImV4cCI6MTcyMTk5NTU0OX0.I4m_dWFn37vBAyQJ-CgAascf4_sRn23kiM_aMJlnFCI`
        }
       })
       if (!response.ok) {
        throw new Error('Somthing went wrong');
      }
    const json:Lead[] = await response.json()
    setLeads(json)
    }
    
    fetchProperty()
    fetchLeads()

    
  },[])
  const closeModal = ()=>{
    setShowModal(false)
    setShowLeadModal(false)
    setCurrentProperty(null)
  }


  return (
    <main className=" mx-44 grid grid-cols-7">
      <div className=" col-span-4 "> 
        <div className="flex justify-between mb-4 mx-2"><h2>Create a new property</h2> <button onClick={()=>setShowModal(true)} className="px-2 py-1 border bg-blue-800 text-white rounded">New</button></div>

      <h2 className="text-black font-bold">List of Properites</h2>  
      {state.properites && state.properites.map((prop)=>(<div key={prop._id} onClick={()=>setCurrentProperty({_id:prop._id,community:prop.community,building:prop.building,leads:prop.leads,unitNo:prop.unitNo})}><PropertyCard _id={prop._id} unitNo={prop.unitNo} community={prop.community} Building={prop.building} leads={prop.leads}></PropertyCard></div>))}
      
      </div>
      <div className="col-span-1 w-1 bg-slate-300 mx-auto">
      </div>

      <div className=" col-span-2 ">
      <div className="flex justify-between mb-4 mx-2"><h2>Add new Customer</h2> <button onClick={()=>setShowLeadModal(true)} className="px-2 py-1 border bg-blue-800 text-white rounded">New</button></div>
      <h2 className="text-black font-bold">List of Customers</h2>   
        {leads && leads.map((lead)=>(<LeadCard key={lead._id} name={lead.name} user={lead.user} propertyCard={lead.propertyCard}></LeadCard>))}
      </div>
      {showModal && <Modal closeModal={closeModal}></Modal>}
      {currentProperty && leads && <UpdateModal closeModal={closeModal} property={currentProperty} leads={leads} ></UpdateModal>}
      {showLeadModal && <LeadModal closeModal={closeModal}></LeadModal>}
    </main>
  );
}
