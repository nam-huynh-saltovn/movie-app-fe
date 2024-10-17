"use client";
import React, { useState } from 'react';

export default function ToggleSection({ title, isEpisode, children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="mb-4">
        <div onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center text-[14px] xl:text-[16px] 3xl:text-[23px] rounded-md text-[#1496d5] font-medium bg-[#0c4a6e] p-2 py-1 cursor-pointer">
          <p>{title}</p>
          <ToggleIcon isOpen={isOpen} />
        </div>
        <div className={`transition-all duration-500 ease-in-out ${isOpen?'max-h-96 opacity-100 p-3 overflow-auto scrollbar-hidden': 'max-h-0 opacity-0'} overflow-hidden text-white text-sm`}>
          {children}
        </div>
      </div>
    );
}

const ToggleIcon = ({ isOpen }) => (
    isOpen ? (
      <svg className="w-5 h-5 text-[#1496d5]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
      </svg>
    ) : (
      <svg className="w-5 h-5 text-[#1496d5]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
      </svg>
    )
  );
