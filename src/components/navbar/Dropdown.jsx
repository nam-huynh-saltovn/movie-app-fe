'use client';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Dropdowns() {
  const categories = useAppSelector((state) => state.data.category);
  const countries = useAppSelector((state) => state.data.country);
  const years = useAppSelector((state) => state.data.year);
  const status = useAppSelector((state) => state.data.status);

  // Handle dropdown open/close state
  const [dropdownState, setDropdownState] = useState({
    isCategoryOpen: false,
    isCountryOpen: false,
    isYearOpen: false
  });
    
  const toggleDropdown = (type) => {
    setDropdownState((prevState) => ({
      isCategoryOpen: type === 'category' ? !prevState.isCategoryOpen : false,
      isCountryOpen: type === 'country' ? !prevState.isCountryOpen : false,
      isYearOpen: type === 'year' ? !prevState.isYearOpen : false
    }));
  };
  
  return (
    <div className='flex flex-col xl:items-center gap-2 xl:gap-0 xl:flex-row xl:m-0'>
      <span className='w-full border-t-[1px] block xl:hidden'></span>
      <Dropdown
          label="Thể Loại"
          isOpen={dropdownState.isCategoryOpen}
          items={categories?categories.map(cat => ({ id: cat.cat_id, name: cat.cat_name, value: cat.cat_slug, type:"category"})):{}}
          toggleDropdown={() => toggleDropdown('category')}
          status={status}
      />
      <span className='w-full border-t-[1px] block xl:hidden'></span>
      <Dropdown
          label="Quốc Gia"
          isOpen={dropdownState.isCountryOpen}
          items={countries?countries.map(ctr => ({ id: ctr.ctr_id, name: ctr.ctr_name, value: ctr.ctr_slug, type: "country"})):{}}
          toggleDropdown={() => toggleDropdown('country')}
          status={status}
      />
      <span className='w-full border-t-[1px] block xl:hidden'></span>
      <Dropdown
          label="Năm"
          isOpen={dropdownState.isYearOpen}
          items={years?years.map(year => ({ id: year.year_id, name: year.year_name, value: year.year_name, type:"year"})):{}}
          toggleDropdown={() => toggleDropdown('year')}
          status={status}
      />
    </div>
  );
}

const Dropdown = ({ label, isOpen, items, toggleDropdown, status }) => {
    const defaultItems = []

    const displayItems = items.length > 0 ? items : defaultItems;

    return (
      <div className='relative px-1 sm:px-0'>
        <button onClick={toggleDropdown} className="flex items-center font-bold justify-between text-[10px] sm:text-[13px] xl:text-[14px] 3xl:text-[20px] w-full px-2 sm:px-3 xl:px-2 xl:py-2 text-gray-300 rounded hover:text-[#1496d5]">
          {label}
          <svg className="w-2.5 h-2.5 3xl:w-4.5 3xl:h-4.5 ms-1.5 sm:ms-2.5 3xl:ms:4.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        {isOpen && (status==="idle"||status==="succeeded") && (
          <div className="absolute w-[96vw] max-h-[250px] sm:w-[90vw] sm:max-h-[350px] lg:w-[93vw] xl:w-[35vw] xl:max-h-[600px] 3xl:w-[700px] right-0 mt-2 xl:mt-7 z-10 font-normal bg-[#23262D] divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 overflow-auto scrollbar-hidden">
            <div className="grid grid-cols-4 p-2 text-white dark:text-gray-400">
              {displayItems.map((item) => (
                <Link href={`/movie/${item.type}/${item.value}`} key={item.id || item.name} className="block px-4 py-2 text-[10px] sm:text-[14px] 3xl:text-[20px] rounded-md hover:bg-[#8b5cf6] dark:hover:bg-gray-600 dark:hover:text-white">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
)};