'use client'

import React, { ChangeEvent, useState } from 'react';
import { Property } from '../types/property';
import { Lead } from '../types/lead';
import { usePropertyContext } from '../hooks/usePropertyContext';

interface ChildComponentProps {
  closeModal: () => void;
  property:Property;
  leads:Lead[]
}

const UpdateModal: React.FC<ChildComponentProps> = ({ closeModal,property,leads }) => {
  const [unitNo, setunitNo] = useState<string>(property.unitNo);
    const [selectedCommunity, setCommunity] = useState<string>(property.community);
    const [selectedBuilding, setSelectedBuilding] = useState<string>(property.building);
    const [selectedLead, setSelectedLead] = useState<Lead>();
    const [addedLeads, setaddedLeads] = useState<Lead[]>([]);
    const id = property._id
    const {state,dispatch} = usePropertyContext()
    

    const handleCommunityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCommunity(event.target.value);
      };
      const handleBuildingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedBuilding(event.target.value);
      };
      const handleSelectChange = (event: ChangeEvent<HTMLInputElement>)=>{
        if(event.target.value === '') return
        setSelectedLead(JSON.parse(event.target.value))
      }

      const updateProperty = async() =>{
        const property = {unitNo,community:selectedCommunity,building:selectedBuilding}

        console.log(JSON.stringify(property))

        const response = await fetch(`http://localhost:4000/api/property/` + id,{
          method:'PATCH',
          body:JSON.stringify(property),
          headers:{
              'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjllY2MyMTBlMTRmYmYzODMwOTYzOTkiLCJpYXQiOjE3MjE3MzYzNDksImV4cCI6MTcyMTk5NTU0OX0.I4m_dWFn37vBAyQJ-CgAascf4_sRn23kiM_aMJlnFCI`,
              'Content-Type': 'application/json',
          }
         }) 
         if (!response.ok) {
          throw new Error('Somthing went wrong');
        }
      const json:Property = await response.json()
      json.unitNo = property.unitNo
      json.building = property.building
      json.community = property.community
      console.log(json)
      dispatch({type:'UPDATE_PROPERTY',payload:json})
      closeModal()
      }

      const linkPropertytoLead = async() =>{
        if(!selectedLead || !property) return
        let found = false
        property.leads.forEach((prop)=>{
          if(prop._id === selectedLead._id){
            found = true
          }
        })
        if(addedLeads.includes(selectedLead)||found) return

        const ids = {leadId:selectedLead._id,propertyCardId:property._id}

        console.log(JSON.stringify(ids))

        const response = await fetch(`http://localhost:4000/api/lead/linkLeadToProperty`,{
          method:'POST',
          body:JSON.stringify(ids),
          headers:{
              'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjllY2MyMTBlMTRmYmYzODMwOTYzOTkiLCJpYXQiOjE3MjE3MzYzNDksImV4cCI6MTcyMTk5NTU0OX0.I4m_dWFn37vBAyQJ-CgAascf4_sRn23kiM_aMJlnFCI`,
              'Content-Type': 'application/json',
          }
         }) 
         if (!response.ok) {
          throw new Error('Somthing went wrong');
        }
        const leadtoProperty:Property = {unitNo:property.unitNo,community:property.community,building:property.building,_id:property._id ,leads:[...property.leads,selectedLead]}
        dispatch({type:'UPDATE_PROPERTY',payload:leadtoProperty})
        setaddedLeads([...addedLeads,selectedLead])
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
    <label htmlFor="" className='font-bold text-black'>Leads</label>
    {property.leads.length == 0?<div>There is no Customers linked to this property </div>:<div className='flex gap-1 flex-wrap'>
      {property.leads.map((lead)=>(<div className='p-1 rounded bg-slate-500 text-white'>{lead.name}</div>))}
      {addedLeads && addedLeads.map((lead)=>(<div className='p-1 rounded bg-green-500 text-white'>{lead.name}</div>))}
    </div>}
    <div className='my-2'>
    <label className="text-sm block">Link Customers to property</label>
        <div className="flex gap-2"><select name="allusers" id="users" className="w-full bg-slate-200 p-1 rounded" onChange={(event:any)=>handleSelectChange(event)}>
          <option value=''>Select Customer here</option>
            {leads.map((lead)=>(
                <option key={lead._id} value={JSON.stringify(lead)}>{lead.name}</option>
            ))}
        </select>
        <button className=" p-1 bg-blue-800 text-white rounded" onClick={linkPropertytoLead}>
          Link
        </button>
        </div>
    </div>
        <button onClick={updateProperty} className=" p-2 bg-blue-800 text-white rounded">
          Update Property information
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;