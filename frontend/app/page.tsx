"use client"

import LeadCard from "./components/leadCard";
import { useEffect, useState } from "react";
import PropertyCard from "./components/PropertyCard";
import Modal from "./components/Model";
import { Property } from "./types/property";
import { Lead } from "./types/lead";



export default function Home() {
  const [showModal,setShowModal] = useState<boolean>(false)
  const [properites,setProperites] = useState<Property[]>([])
  const [leads,setLeads] = useState<Lead[]>([])

  useEffect(()=>{
    const fetchProperty = async()=>{

      const response = await fetch('http://localhost:4000/api/property',{
        headers:{
            'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjllY2MyMTBlMTRmYmYzODMwOTYzOTkiLCJpYXQiOjE3MjE3MzYzNDksImV4cCI6MTcyMTk5NTU0OX0.I4m_dWFn37vBAyQJ-CgAascf4_sRn23kiM_aMJlnFCI`
        }
       })

       if (!response.ok) {
        throw new Error('Somthing went wrong');
      }

    const json:Property[] = await response.json()
    console.log(json)
    setProperites(json)
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
    console.log(json)
    setLeads(json)
    }
    
    fetchProperty()
    fetchLeads()

    
  },[])
  const closeModal = ()=>{
    setShowModal(false)
  }

  return (
    <main className=" mx-44 grid grid-cols-7">
      <div className=" col-span-4 "> 
        <div className="flex justify-between mb-4 mx-2"><h2>Create a new property</h2> <button onClick={()=>setShowModal(true)} className="px-2 py-1 border bg-blue-800 text-white rounded">New</button></div>

      <h2 className="text-black font-bold">List of Properites</h2>  
      {properites && properites.map((prop)=>(<PropertyCard key={prop._id} unitNo={prop.unitNo} community={prop.community} Building={prop.building} leads={prop.leads}></PropertyCard>))}
      
      </div>
      <div className="col-span-1 w-1 bg-slate-300 mx-auto">
      </div>

      <div className=" col-span-2 ">
      <div className="flex justify-between mb-4 mx-2"><h2>Add new Customer</h2> <button onClick={()=>setShowModal(true)} className="px-2 py-1 border bg-blue-800 text-white rounded">New</button></div>
      <h2 className="text-black font-bold">List of Customers</h2>   
        {leads && leads.map((lead)=>(<LeadCard key={lead._id} name={lead.name} user={lead.user} propertyCard={lead.propertyCard}></LeadCard>))}
      </div>
      {showModal && <Modal closeModal={closeModal}></Modal>}
    </main>
  );
}
