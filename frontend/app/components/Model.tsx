'use client'

import React, { ChangeEvent, useState } from 'react';

interface ChildComponentProps {
  closeModal: () => void;
}

const Modal: React.FC<ChildComponentProps> = ({ closeModal }) => {
    const [selectedCommunity, setCommunity] = useState<string>('CommunityA');
    const [selectedBuilding, setSelectedBuilding] = useState<string>('BuildingA');

    const handleCommunityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCommunity(event.target.value);
      };
      const handleBuildingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedBuilding(event.target.value);
      };
  return (
    <div className="flex justify-center items-center fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/4 md:w-2/4  flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-4">New Property</h2>
        <label className="text-sm">Unit No:</label>
        <input type="text" className="w-full bg-slate-200 rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="Enter Unit No" />
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
        <button onClick={closeModal} className=" p-2 bg-blue-800 text-white rounded">
          Add New Property
        </button>
      </div>
    </div>
  );
};

export default Modal;