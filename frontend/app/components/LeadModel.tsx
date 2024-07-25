'use client'

import React, { ChangeEvent, useState } from 'react';
import { Lead } from '../types/lead';
import { useLeadContext } from '../hooks/useLeadContext';
import { useAuthContext } from '../hooks/useAuthContext';


interface ChildComponentProps {
    closeModal: () => void;
}

const LeadModal: React.FC<ChildComponentProps> = ({ closeModal }) => {
  const [customerName, setcustomerName] = useState<string>('');
  const {state,dispatch} = useLeadContext()
  const {state:userState} = useAuthContext()
  const [error,setError] = useState<string>()
  


      const createLead = async() =>{
        if(customerName == '') {
          setError('please enter customer name')
          return
        }
        const lead = {name:customerName}

        const response = await fetch('http://localhost:4000/api/lead',{
          method:'POST',
          body:JSON.stringify(lead),
          headers:{
              'Authorization':`Bearer ${userState.user?.token}`,
              'Content-Type': 'application/json',
          }
         }) 
         if (!response.ok) {
          setError('something went wrong')
          return
        }
      const json:Lead = await response.json()
      dispatch({type:'CREATE_LEAD',payload:json})
      closeModal()
      }
  return (
    <div className="flex justify-center items-center fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/4 md:w-2/4  flex flex-col justify-between">
        <div className='flex justify-between'><h2 className="text-xl font-bold mb-4">New Customer</h2> <button className='p-1 bg-red-400 text-white rounded' onClick={closeModal}>close</button></div>
        <label className="text-sm">Customer Name:</label>
        <input type="text" className="w-full bg-slate-200 rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="Enter Customer Name" value={customerName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setcustomerName(e.target.value)}/>
        {error && <div className='text-red-500 my-2 text-sm'>{error}</div> }
        <button onClick={createLead} className=" p-2 bg-blue-800 text-white rounded">
          Add New Lead
        </button>
      </div>
    </div>
  );
};

export default LeadModal;