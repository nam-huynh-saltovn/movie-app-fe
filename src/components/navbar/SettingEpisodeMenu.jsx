"use client";
import React from "react";
import { Button } from '@material-tailwind/react';
import { IconAdd, IconReOrder } from "../icon/Icon";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SettingEpisodeMenu({ handleCreateOpen, handleReOrderOpen, index }) {
  const navigation = [
        { label: "Thêm tập mới", icon: <IconAdd />, onClick: handleCreateOpen, index: 0 },
        { label: "Sắp xếp", icon: <IconReOrder />, onClick: handleReOrderOpen, index: 1 }
    ];

  return(
    <Disclosure as="nav" className="z-50 w-full 3xl:my-[16px]">
      <div className="mx-auto">
        <div className="relative flex h-10 items-center">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-4 w-4 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-4 w-4 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="hidden sm:flex items-center justify-end w-full">
            <div className="flex gap-2">
              {navigation.map((item) => (
                <Button onClick={item.onClick} key={item.label} variant="gradient" color='teal' 
                className="flex rounded-full items-center gap-1 text-[10px] lg:text-[12px] 3xl:text-[20px] sm:px-[12px] py-[4px]">
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden mb-2">
        <div className="grid mb-[4px]">
          {navigation.map((item) => (
            <div key={item.index} onClick={item.onClick}>
              <DisclosureButton
                as="a"
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.index === index ? 'bg-gray-500 text-white' : 'hover:bg-[#8b5cf6]',
                  'block rounded-md px-3 py-1 text-[10px] font-medium',
                )}>
                {item.label}
              </DisclosureButton>
            </div>
          ))}
        </div>
        <hr />
      </DisclosurePanel>
    </Disclosure>
)}
