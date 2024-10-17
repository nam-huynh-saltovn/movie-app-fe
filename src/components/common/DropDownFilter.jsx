import React from 'react';
import { IconSort } from '../icon/Icon';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';

export default function DropDownFilter({ curent, sortOptions }) {
    
  return (
    <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="group inline-flex justify-center text-[14px] font-medium text-gray-700 hover:text-gray-900">
                <IconSort />
                <ChevronDownIcon aria-hidden="true" className="-mr-1 w-3 h-3 sm:h-5 sm:w-5 3xl:h-8 3xl:w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
            </MenuButton>

            <MenuItems transition className="absolute left-0 z-10 mt-2 w-[100px] sm:w-[160px] 3xl:w-[200px] origin-top-left rounded-md bg-[#23262D] shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                        <Link href={option.href}
                            className={`${curent==option.value?'bg-gray-600':''} font-medium text-white block px-2 py-1 sm:py-2 sm:px-4 text-[10px] sm:text-[14px] 3xl:text-[20px] data-[focus]:bg-[#8b5cf6]`}>
                            {option.name}
                        </Link>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    </div>
  )
}
