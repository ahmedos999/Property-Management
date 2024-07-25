'use client'

import React, { ChangeEvent, useState } from 'react';
import { Property } from '../types/property';
import { usePropertyContext } from '../hooks/usePropertyContext';
import { useAuthContext } from '../hooks/useAuthContext';

interface ChildComponentProps {
  closeModal: () => void;
}

const Modal: React.FC<ChildComponentProps> = ({ closeModal }) => {
  const [unitNo, setunitNo] = useState<string>('');
    const [selectedCommunity, setCommunity] = useState<string>('CommunityA');
    const [selectedBuilding, setSelectedBuilding] = useState<string>('BuildingA');
    const {state:userState} = useAuthContext()
    const {state,dispatch} = usePropertyContext()
    const [error,setError] = useState<string>()

    const handleCommunityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCommunity(event.target.value);
      };
      const handleBuildingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedBuilding(event.target.value);
      };

      const createProperty = async() =>{
        if(unitNo == ''){
          setError('Plese enter unit No')
          return
        }
        const property = {unitNo,community:selectedCommunity,building:selectedBuilding}

        console.log(JSON.stringify(property))

        const response = await fetch('http://localhost:4000/api/property',{
          method:'POST',
          body:JSON.stringify(property),
          headers:{
              'Authorization':`Bearer ${userState.user?.token}`,
              'Content-Type': 'application/json',
          }
         }) 
         if (!response.ok) {
          setError('something went wrong')
          return
        }
      const json:Property = await response.json()
      dispatch({type:'CREATE_PROPERTY',payload:json})
      closeModal()
      }
  return (
    <div className="flex justify-center items-center fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/4 md:w-2/4  flex flex-col justify-between">
        <div className='flex justify-between'><h2 className="text-xl font-bold mb-4">New Property</h2> <button className='p-1 bg-red-400 text-white rounded' onClick={closeModal}>close</button></div>
        <label className="text-sm">Unit No:</label>
        <input type="text" className="w-full bg-slate-200 rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="Enter Unit No" value={unitNo} onChange={(e:ChangeEvent<HTMLInputElement>)=>setunitNo(e.target.value)}/>
        <label htmlFor="" className='text-black font-bold'>Community</label>
        <div className='mb-2'>
      <label className='mr-2'>
        <input
          type="radio"
          value="CommunityA"
          checked={selectedCommunity === 'CommunityA'}
          onChange={handleCommunityChange}
        />
        CommunityA
      </label>
      <label>
        <input
          type="radio"
          value="CommunityB"
          checked={selectedCommunity === 'CommunityB'}
          onChange={handleCommunityChange}
        />
        CommunityB
      </label>
    </div>
    <label htmlFor="" className='text-black font-bold'>Building</label>
    <div className='mb-2'>
      <label className='mr-2'>
        <input
          type="radio"
          value="BuildingA"
          checked={selectedBuilding === 'BuildingA'}
          onChange={handleBuildingChange}
        />
        BuildingA
      </label>
      <label>
        <input
          type="radio"
          value="BuildingB"
          checked={selectedBuilding === 'BuildingB'}
          onChange={handleBuildingChange}
        />
        BuildingB
      </label>
    </div>
    {error && <div className='text-red-500 my-2 text-sm'>{error}</div>}
        <button onClick={createProperty} className=" p-2 bg-blue-800 text-white rounded">
          Add New Property
        </button>
      </div>
    </div>
  );
};

export default Modal;