import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import Dropdowns from "@/components/navbar/Dropdown";
import NavbarSearch from "@/components/fillter/NavbarSearch";
import LogoutButton from "@/components/navbar/LogoutButton";

export default function UserNavbar() {
  const cookieStore = cookies();
  
  const user = cookieStore.get("user")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value;

  const navigation = [
    { name: 'Phim bộ', href: '/movie/type/series', current: false },
    { name: 'Phim lẻ', href: '/movie/type/single', current: false },
    { name: 'TV Show', href: '/movie/type/tvshows', current: false },
    { name: 'Hoạt hình', href: '/movie/type/hoathinh', current: false },
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
          <div className="flex flex-1 items-center justify-between">
            <div className='flex items-center'>
              <a href="/" className="flex flex-shrink-0 items-center">
                <Image alt="logo" src="/images/thumb.png" width={100} height={30} className="h-[25px] sm:h-[35px] 3xl:h-[50px] w-auto"/>
              </a>
              <NavbarSearch />
            </div>

            <div className="xl:ml-6 xl:flex xl:space-x-2">
              <div className="hidden xl:flex">
                {navigation.map((item) => (
                  <Link key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={`${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-[#1496d5]'} 'rounded-md px-3 py-2 text-[14px] 3xl:text-[20px] font-bold`}>
                    {item.name}
                  </Link>
                ))}
                <Dropdowns />
              </div>
              {user
              ?
                <div className="hidden xl:flex border-l-2">
                  {isAdmin
                  ?
                    <Link href="/admin" className="rounded-md px-3 py-2 text-[14px] 3xl:text-[20px] font-bold text-purple-300 hover:text-[#1496d5]">
                      {user}
                    </Link>
                  :
                    <Link href="/"  className="rounded-md px-3 py-2 text-[14px] 3xl:text-[20px] font-bold text-cyan-300 hover:text-[#1496d5]">
                      {user}
                    </Link>
                  }
                  <LogoutButton mode="desktop"/>
                </div>
              :
                <div className="hidden xl:flex border-l-2">
                  <Link href="/auth/login" className="rounded-md px-3 py-2 text-[14px] 3xl:text-[20px] font-bold text-gray-300 hover:text-[#1496d5]">
                    Đăng nhập
                  </Link>
                  <Link href="/auth/register" className="rounded-md px-2 py-2 text-[14px] 3xl:text-[20px] font-bold text-gray-300 hover:text-[#1496d5]">
                    Đăng ký
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="xl:hidden">
        <div className="space-y-1 px-2 pb-2 pt-2 sm:mx-[30px]">
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <DisclosureButton as="a" aria-current={item.current ? 'page' : undefined}
                className={`${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block rounded-md px-3 py-1 sm:py-2 text-[10px] sm:text-[13px] font-medium`}>
                  {item.name}
              </DisclosureButton>
            </Link>
          ))}
          <Dropdowns />
          <hr />
          {user
          ?
            <div className="flex flex-col gap-2">
              {isAdmin
                ?
                  <Link href="/admin" className="rounded-md px-3 py-1 sm:py-2 text-[11px] sm:text-[13px] font-medium text-purple-300 hover:text-[#1496d5]">
                    {user}
                  </Link>
                :
                  <Link href="/" className="rounded-md px-3 py-1 sm:py-2 text-[11px] sm:text-[13px] font-medium text-cyan-300 hover:text-[#1496d5]">
                    {user}
                  </Link>
              }
              <LogoutButton mode="mobile"/>
            </div>
          :
            <>
              <Link href="/auth/login">
                <DisclosureButton as="a"
                    className='block rounded-md mt-2 px-3 py-1 sm:py-2 text-[10px] sm:text-[13px] font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                      Đăng nhập
                  </DisclosureButton>
              </Link>
              <Link href="/auth/register">
                <DisclosureButton as="a"
                    className='block rounded-md px-3 py-1 sm:py-2 text-[10px] sm:text-[13px] font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                      Đăng ký
                  </DisclosureButton>
              </Link>
            </>
          }
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
