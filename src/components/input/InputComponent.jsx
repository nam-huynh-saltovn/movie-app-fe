import React from 'react';

export default function InputComponent({title, id, type, placeholder, value, onChange, onKeyDown}) {
  return (
    <div className="flex flex-col mb-[4px] lg:mb-[8px]">
        <label for={id} className="block mb-[4px] lg:mb-[8px] font-bold text-[10px] lg:text-[14px] 3xl:text-[20px] text-[#1496d5]">{title}</label>
        <input type={type} id={id} className="bg-[#374151] placeholder-slate-300 text-white text-[10px] lg:text-[14px] 3xl:text-[20px] rounded-md block w-full p-2 " placeholder={placeholder}
            value={value} 
            onChange={onChange}
            onKeyDown={onKeyDown} 
        />
    </div>
  )
}

export function FilterInput({ name, type, placeholder, value, onKeyDown, onChange }) {
  return (
    <input name={name} type={type} className="w-full px-[7px] py-[3px] lg:px-[10px] lg:py-[6px] 3xl:px-[20px] 3xl:py-[8px] bg-[#374151] text-white text-[10px] lg:text-[14px] 3xl:text-[20px] rounded-full block" placeholder={placeholder}
        value={value} 
        onChange={onChange}
        onKeyDown={onKeyDown} 
    />
  )
}

