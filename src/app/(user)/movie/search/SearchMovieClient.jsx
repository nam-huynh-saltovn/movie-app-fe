"use client";
import React, { useEffect, useState } from 'react';
import { IconHome } from '@/components/icon/Icon';
import Loading from '@/components/loading/Loading';
import TableMovie from '@/components/movie/TableMovie';
import Pagination from '@/components/pagination/Pagination';
import { getMovieByNameOrSlug } from '@/services/movieService';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchMovieClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('query');

  const [movies, setMovies] = useState();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const searchMovie = async(page) => {
    setIsLoading(true);
      try {
          const data = await getMovieByNameOrSlug({query: query}, page);
          setMovies(data.movies);
          setTotalPages(data.totalPages);
          setTotalMovies(data.totalMovies);
      } catch (error) {
        console.error(error);
      }finally{
          setIsLoading(false);
      }
  }

  useEffect(()=>{
    searchMovie(currentPage);
  },[currentPage]);
  

  // Handle page changes for both search and fetch
  const onPageChange = (page) => {
    if(page !== currentPage){   // Check if the new page is different from the current page
      const params = new URLSearchParams(searchParams);
      params.set("page", page); // Cập nhật giá trị page
      router.push(`?${params.toString()}`);
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

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    {headerName: "Tên", field: "mov_name"},
    {headerName: "Năm",valueGetter: (params) => params.data.Year.year_name},
    {headerName: "Tình trạng",field: "episode_current"},
    {headerName: "Thể loại",valueGetter: (params) => params.data.Type.type_name},
    {headerName: "Quốc gia",valueGetter: (params) => params.data.Countries.map(country => country.ctr_name).join(', ')},
    {headerName: "Ngày cập nhật",field: "updatedAt"},
  ];

  return (
    isLoading
    ?
      <div className="flex justify-center items-center h-screen text-white">
        <Loading />
      </div>
    :!movies
    ?
    <div className="flex flex-col justify-center items-center h-full text-white">
        <div className="flex gap-2 mb-4">
          <IconHome />
          <Link href="/">Trang chủ</Link>
        </div>
        <p>Không tìm thấy dữ liệu</p>
    </div>
    :
      <div class="relative mt-2 pb-2">
        <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
          <IconHome />
          <Link href="/" className=" text-[12px] sm:text-[14px] 3xl:text-[18px]">Trang chủ</Link>
          <span className="text-[12px] sm:text-[14px] 3xl:text-[18px]">{">"}</span>
          <span className="font-bold text-[12px] sm:text-[14px] 3xl:text-[18px]">Kết quả tìm kiếm: {query}</span>
        </div>
          
        {/* movie list */}
        <div class="overflow-x-auto mb-2">
          <TableMovie colDefs={colDefs} movies={movies}/>
        </div>

        {/* pagination */}
        {(!isLoading&&totalMovies!==0)&&<Pagination currentPage={currentPage} totalDatas={totalMovies} totalPages={totalPages} onPageChange={onPageChange} handlePagination={handlePagination}/>}
      </div>
  )
}