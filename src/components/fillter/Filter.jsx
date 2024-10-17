"use client";
import React from 'react';
import { FiterSelect } from '../input/SelectComponent';
import { FilterInput } from '../input/InputComponent';
import { useAppSelector } from '@/lib/hooks';

const Filter = ({ filters, updateState, handleKeyDown }) => {
  const categories = useAppSelector((state) => state.data.category);
  const countries = useAppSelector((state) => state.data.country);
  const years = useAppSelector((state) => state.data.year);
  const types = useAppSelector((state) => state.data.type);

  // Utility function to format options for select inputs
  const formatOptions = (data, valueField, labelField, slugField = null) =>
    data.map(item => ({
      ...item,
      // Add fields for value and label to use in <Select /> library
      value: item[valueField], 
      label: item[labelField],
      ...(slugField && { slug: item[slugField] }), // Add slug if provided
    }));

  // State options for select inputs (type, year, category, etc.)
  const optionState = { 
    yearOptions: formatOptions(years, 'year_name', 'year_name'),
    typeOptions: formatOptions(types, 'type_slug', 'type_name'), 
    categoryOptions: formatOptions(categories, 'cat_slug', 'cat_name'), 
    countryOptions: formatOptions(countries, 'ctr_slug', 'ctr_name')
  };

  return (
    <div className='w-full'>
      <div className="grid lg:grid-cols-2 gap-1 3xl:pt-2 pt-1">
        <FilterInput onKeyDown={handleKeyDown} name="act" type='text' placeholder='Diễn viên' value={filters.actor} onChange={(e)=>{updateState('actor', e.target.value)}} />
        <FilterInput onKeyDown={handleKeyDown} name="dir" type='text' placeholder='Đạo diễn' value={filters.director} onChange={(e)=>{updateState('director', e.target.value)}} />
      </div>
      <div className="grid lg:grid-cols-6 grid-cols-3 gap-1 3xl:mt-2 mb-3 mt-1">
        <FiterSelect  name="cat" title="Danh mục" value={filters.category} options={optionState.categoryOptions} onChange={(e)=>{updateState('category', e.target.value)}}/>
        <FiterSelect  name="ctr" title="Quốc gia" value={filters.country} options={optionState.countryOptions} onChange={(e)=>{updateState('country', e.target.value)}}/>
        <FiterSelect  name="year" title="Năm" value={filters.year} options={optionState.yearOptions} onChange={(e)=>{updateState('year', e.target.value)}}/>
        <FiterSelect  name="type" title="Thể loại" value={filters.type} options={optionState.typeOptions} onChange={(e)=>{updateState('type', e.target.value)}}/>
        <FiterSelect  name="lang" title="Ngôn ngữ" value={filters.lang} options={[{value: 'Vietsub', label:'Vietsub'},{value: 'Lồng tiếng', label:'Lồng tiếng'},{value: 'Thuyết minh', label:'Thuyết minh'}]} onChange={(e)=>{updateState('lang', e.target.value)}}/>
        <FiterSelect  name="quality" title="Chất lượng" value={filters.quality} options={[{value: 'HD', label:'HD'},{value: 'FHD', label:'FHD'},{value: 'SD', label:'SD'}]} onChange={(e)=>{updateState('quality', e.target.value)}}/>
      </div>
    </div>
  );
};

export default Filter;
