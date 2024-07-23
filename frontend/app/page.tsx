"use client"

import LeadCard from "./components/leadCard";
import { useState } from "react";
import PropertyCard from "./components/PropertyCard";
import Modal from "./components/Model";



export default function Home() {
  const [showModal,setShowModal] = useState<boolean>(false)


  const closeModal = ()=>{
    setShowModal(false)
  }

  return (
    <main className=" mx-44 grid grid-cols-7">
      <div className=" col-span-4 "> 
        <div className="flex justify-between mb-4 mx-2"><h2>Create a new property</h2> <button onClick={()=>setShowModal(true)} className="px-2 py-1 border bg-blue-800 text-white rounded">New</button></div>

      <h2 className="text-black font-bold">List of Properites</h2>  
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>
      <PropertyCard></PropertyCard>
      </div>
      <div className="col-span-1 w-1 bg-slate-300 mx-auto">
      </div>

      <div className=" col-span-2 ">
      <div className="flex justify-between mb-4 mx-2"><h2>Add new Customer</h2> <button onClick={()=>setShowModal(true)} className="px-2 py-1 border bg-blue-800 text-white rounded">New</button></div>
      <h2 className="text-black font-bold">List of Customers</h2>   
        <LeadCard></LeadCard>
        <LeadCard></LeadCard>
        <LeadCard></LeadCard>
      </div>
      {showModal && <Modal closeModal={closeModal}></Modal>}
    </main>
  );
}
