import React from 'react';
import { Button } from '@material-tailwind/react';

export default function ButtonCustom({ onClick, icon, label }) {
  return (
    <Button onClick={onClick} variant="outlined" className="rounded-full text-white border-white flex items-center gap-2 px-[8px] 3xl:px-[18px] py-[2px] lg:py-[4px] 3xl:py-[6px]">
        {icon}
        <p className='text-[9px] lg:text-[12px] 3xl:text-[16px]'>{label}</p>
    </Button>
  )
}
