import React from 'react';
import "./Loading.css";

export default function Loading() {
  return (
    <div className='h-screen flex justify-center items-center bg-[rgb(16,20,44)] overflow-hidden'>
      <div className='loading w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]  3xl:w-[45px] 3xl:h-[45px]'></div>
    </div>
  )
}
  