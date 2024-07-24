'use client'

import React, { ChangeEvent, useState } from 'react';
import { Lead } from '../types/lead';

interface ChildComponentProps {
    closeModal: () => void;
}

const LeadModal: React.FC<ChildComponentProps> = ({ closeModal }) => {
  const [customerName, setcustomerName] = useState<string>('');


      const createLead = async() =>{
        const lead = {name:customerName}

        console.log(JSON.stringify(lead))

        const response = await fetch('http://localhost:4000/api/lead',{
          method:'POST',
          body:JSON.stringify(lead),
          headers:{
              'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjllY2MyMTBlMTRmYmYzODMwOTYzOTkiLCJpYXQiOjE3MjE3MzYzNDksImV4cCI6MTcyMTk5NTU0OX0.I4m_dWFn37vBAyQJ-CgAascf4_sRn23kiM_aMJlnFCI`,
              'Content-Type': 'application/json',
          }
         }) 
         if (!response.ok) {
          throw new Error('Somthing went wrong');
        }
      const json:Lead = await response.json()
      console.log(json)
      }
  return (
    <div className="flex justify-center items-center fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/4 md:w-2/4  flex flex-col justify-between">
        <div className='flex justify-between'><h2 className="text-xl font-bold mb-4">New Customer</h2> <button className='p-1 bg-red-400 text-white rounded' onClick={closeModal}>close</button></div>
        <label className="text-sm">Customer Name:</label>
        <input type="text" className="w-full bg-slate-200 rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="Enter Customer Name" value={customerName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setcustomerName(e.target.value)}/>
        
        <button onClick={createLead} className=" p-2 bg-blue-800 text-white rounded">
          Add New Lead
        </button>
      </div>
    </div>
  );
};

export default LeadModal;