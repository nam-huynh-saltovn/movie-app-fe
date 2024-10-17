"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Pagination({ currentPage, totalDatas, totalPages }) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Logic to show only 5 pages at a time
  const getPageRange = () => {
    const range = [];

    // Start by calculating the startPage and endPage
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Adjust startPage if we're near the end to always show 5 pages
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange();

  // Handle page changes for both search and fetch
  const onPageChange = (page) => {
    if (page !== currentPage) {
      params.set("page", page);
      // Tạo URL mới với query params đã được cập nhật
      const newQueryString = params.toString();
      router.replace(`${path==='/'?'/movie':''}?${newQueryString}`);
    }
  };

  // Handle pagination navigation (next/previous page)
  const handlePagination = (direction) => {
    let newPage = currentPage;
    if (direction === "next" && currentPage < totalPages) {
      newPage = currentPage + 1;
    } else if (direction === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    }
    onPageChange(newPage);  // Update to the new page
  };


  return (
    <div className="flex sm:items-center sm:justify-between justify-center">
      <p className="hidden sm:block text-[14px] 3xl:text-[20px] text-white">
        Trang <span className="font-medium">{currentPage}</span> | Tổng{" "}
        <span className="font-medium">{totalDatas}</span> Kết quả
      </p>
      <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        {/* Previous */}
        <button onClick={() => handlePagination("prev")} disabled={currentPage == 1} className="relative inline-flex items-center rounded-l-md p-1 sm:p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 3xl:w-8 3xl:h-8 text-white hover:text-black dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
            </svg>
          </span>
        </button>

        {pageRange.map((page) => {
          return (
            <a key={page} href="#" aria-current={page == currentPage ? "page" : undefined}
              className={`relative z-10 inline-flex items-center px-[10px] py-[2px] sm:px-[14px] sm:py-[4px] 3xl:px-[20px] 3xl:py-[8px] text-[14px] 3xl:text-[20px] font-semibold 
                ${page == currentPage
                  ? "bg-indigo-600 text-white border focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  : "text-white border hover:bg-gray-200 hover:text-black"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}>
              {page}
            </a>
          );
        })}
        {/* Next */}
        <button onClick={() => handlePagination("next")} disabled={currentPage == totalPages} className="relative inline-flex items-center rounded-r-md p-1 sm:p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 3xl:w-8 3xl:h-8 text-white hover:text-black dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
            </svg>
          </span>
        </button>
      </nav>
    </div>
  );
}
