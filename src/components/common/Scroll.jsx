"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { IconArrowDown, IconArrowUp } from "../icon/Icon";

export default function Scroll() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When scrolled down, the element will appear
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // function to scroll to start page
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0, // end of page
      behavior: "smooth",
    });
  };

  // function to scroll to end page
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  
  return (
    <motion.div className={`fixed bottom-0 right-1`} animate={{ x: 1, y: isVisible?0:140, scale: 1, rotate: 0 }} >
        <div className='fixed right-1 bottom-[28px] sm:bottom-[35px] lg:bottom-[45px] 3xl:bottom-[60px] z-50 rounded-full p-[3px] sm:p-[6px] 3xl:p-[12px] bg-gray-200 hover:bg-gay-500 border-gray-500'>
            <IconArrowUp onClick={handleScrollToTop}/>
        </div>

        <div className='fixed right-1 bottom-[3px] z-50 rounded-full p-[3px] sm:p-[6px] 3xl:p-[12px] bg-gray-200 hover:bg-gay-500 border-gray-500'>
            <IconArrowDown onClick={handleScrollToBottom}/>
        </div>
    </motion.div>
    )
}
