"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

export default function MovieHot({ movies, movieHot }) {
  const [listMovie, setListMovie] = useState(movies);
  const [isShow, setIsShow] = useState(false);

  // Function to handle show more new movie
  const handleShow = () => {
    setIsShow(!isShow); 
    setListMovie(movieHot);
};

  return (
    <>
      <div className="py-[2px] px-4 border-l-4 mb-2">
        <h2 className="font-bold text-white">PHIM MỚI NHẤT</h2>
      </div>
      <div className="grid gap-1">
        {listMovie.map(mov => {
          return(
            <Link key={mov.mov_id} href={`/movie/${mov.mov_slug}`} className="flex gap-2 h-[90px] 3xl:h-[110px] cursor-pointer p-1 rounded-md bg-[#3d4046]">
              <img className="w-[50px] 3xl:w-[70px] h-full rounded-md object-cover" src={mov.poster_url} alt="" />
              <div className="flex flex-col justify-evenly">
                <h3 className="text-white text-[15px] tablet-m:text-[16px] font-medium line-clamp-1">{mov.mov_name}</h3>
                <p className="text-red-600 text-[13px] tablet-m:text-[14px] font-medium line-clamp-1">{mov.Year?mov.Year.year_name:'Đang cập nhật'}</p>
                <p className="text-white text-[13px] tablet-m:text-[14px] line-clamp-1">{mov.time}</p>
              </div>
            </Link>
          )
        })}
        {!isShow&&
          <div className="flex justify-center">
            <Button onClick={handleShow} className="line-clamp-1 py-2 px-4 bg-green-800 text-white rounded-md">
              Xem thêm
            </Button>
          </div>
        }
      </div>
    </>
  )
}