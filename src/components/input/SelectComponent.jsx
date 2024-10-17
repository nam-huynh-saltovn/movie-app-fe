import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided) => ({
      ...provided,
      backgroundColor: '#374151',
      '&:hover': {
        borderColor: '#374151',
      },
  }),
  input: (provided) => ({
    ...provided,
    color: '#ffffff', // Màu chữ của input khi đang nhập
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#374151' : state.isFocused ? '#374151' : '#374151',
    color: 'white',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black'
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151',
    color: 'white',
    '@media (max-width: 550px)': {
        padding: '0px 2px', // Padding cho màn hình nhỏ
    },
  }),
};

export function SelectComponent({title, placeholder, id, options, value, onChange, zIndex}) {
  return(
      <div className={`relative mb-2 z-[${zIndex}]`}>
          <label for={id} className="block mb-2 text-[10px] lg:text-[14px] 3xl:text-[20px] font-bold text-[#1496d5]">{title}</label>
          <Select className={`text-[10px] lg:text-[14px] 3xl:text-[20px] cursor-pointer`}
              styles={customStyles}
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={options}
              value={value}
              onChange={onChange}
              isMulti={true}
              placeholder={placeholder}
          />
      </div>
  )
}

export function SingleSelectComponent({value, title, id, options, onChange}) {
  return(
    <div className='mb-2'>
        <label for={id} className="block mb-2 text-[10px] lg:text-[14px] 3xl:text-[20px] font-bold text-[#1496d5]">{title}</label>
        <select value={value} onChange={onChange} id="quality" className="w-full py-2 lg:py-[10px] px-2 bg-[#374151] placeholder-slate-300 text-white text-[10px] lg:text-[14px] 3xl:text-[20px] rounded-md block cursor-pointer">
          {options.map((op, index)=> {
              return <option className='cursor-pointer' key={index} value={op.value}>{op.label}</option>
          })}
        </select>
    </div>
  )
}


export function FiterSelect({ name, title, value, options, onChange }) {
  return(
    <select name={name} value={value?value:''} onChange={onChange} className="p-[3px] lg:p-[6px] 3xl:px-[20px] 3xl:py-[8px] bg-[#374151] placeholder-slate-300 text-white text-[10px] lg:text-[14px] 3xl:text-[20px] rounded-full block cursor-pointer">
      <option value='' defaultValue>{title?title:'Chọn'}</option>
      {options.map((op, index)=> {
          return <option className='cursor-pointer' key={index} value={op.value}>{op.label}</option>
      })}
    </select>
  )
}
