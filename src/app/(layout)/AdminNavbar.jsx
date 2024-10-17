import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import LogoutButton from "@/components/navbar/LogoutButton";

export default function AdminNavbar({ page=1 }) {
  const cookieStore = cookies();
  
  const user = cookieStore.get("user")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value;

  const navigation = [
    { name: 'Danh sách phim', href: '/admin' },
    { name: 'Tạo phim', href: '/admin/movie/create' },
  ];

  return (
    <Disclosure as="nav" className="fixed top-0 z-50 backdrop-blur-lg w-full bg-transparent border-gray-400 border-b-[1px]">
      <div className="mx-auto px-6">
        <div className="relative flex h-[46px] sm:h-[56px] 3xl:h-[76px] items-center">
          <div className="absolute inset-y-0 right-0 flex items-center xl:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-300 hover:bg-opacity-30 hover:backdrop-blur text-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-4 w-4 sm:h-6 sm:w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-4 w-4 sm:h-6 sm:w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-1 items-center justify-center sm:justify-start">
              <div className='px-4'>
                <Link href="/admin" div className="flex flex-shrink-0 items-center justify-center">
                  <Image alt="logo" src="/images/thumb.png" width={100} height={30} className="h-[30px] sm:h-[40px] 3xl:h-[50px] w-auto"/>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item, index) => (
                    <Link key={item.name} href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={`${index === page ? 'bg-gray-500 text-white' : 'hover:bg-[#8b5cf6]'} rounded-md px-3 py-2 3xl:px-6 3xl:py-4 text-sm 3xl:text-[20px] text-white font-medium cursor-pointer`}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center px-[10px]">
              {user&&isAdmin&&
                <>
                  <Link href="/" className="rounded-md px-2 py-2 text-[14px] 3xl:text-[20px] font-bold text-gray-300 hover:text-[#1496d5]">User Home</Link>
                  <LogoutButton mode="desktop"/>
                </>
              }
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="xl:hidden">
        <div className="space-y-1 px-2 py-2">
          {navigation.map((item, index) => (
            <Link key={item.name} href={item.href}>
              <DisclosureButton
                as="a"
                aria-current={item.current ? 'page' : undefined}
                className={`${index === page ? 'bg-gray-500 text-white' : 'hover:bg-[#8b5cf6]'} block rounded-md px-3 py-1 sm:py-2 text-[10px] text-white font-medium hover:cursor-pointer`}>
                {item.name}
              </DisclosureButton>
            </Link>
          ))}
          <hr />
          {user&&
          <div className="flex flex-col gap-1">
            <Link href="/" className="rounded-md px-3 py-1 text-[10px] font-medium text-gray-300 hover:text-[#1496d5]">User Home</Link>
            <LogoutButton mode="mobile"/>
          </div>}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
