"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";

export default function Fotter() {
  return (
    <footer className="ms:flex grid w-full bg-[rgb(16,20,44)] ms:flex-wrap sm:justify-between items-center justify-center gap-y-2 gap-x-8 border-t border-[#202c3c] py-4 text-center">
      <div className="sm:ml-3">
        <Typography color="blue-gray" className="font-normal text-[12px] sm:text-[14px] text-gray-500">
          &copy; 2023 Phim Vip
        </Typography>
      </div>
      <ul className="hidden ms:flex ms:flex-wrap justify-center items-center gap-y-2 gap-x-8 ms:mr-4">
        <li>
          <Typography as="a" href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px] text-gray-500 transition-colors hover:text-blue-500 focus:text-blue-500">
            About Us
          </Typography>
        </li>
        <li>
          <Typography as="a" href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px] text-gray-500 transition-colors hover:text-blue-500 focus:text-blue-500">
            License
          </Typography>
        </li>
        <li>
          <Typography as="a" href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px] text-gray-500 transition-colors hover:text-blue-500 focus:text-blue-500">
            Contribute
          </Typography>
        </li>
        <li>
          <Typography as="a" href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px] text-gray-500 transition-colors hover:text-blue-500 focus:text-blue-500">
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
