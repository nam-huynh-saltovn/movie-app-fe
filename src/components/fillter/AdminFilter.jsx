"use client";
import React, { useState } from 'react';
import { FiterSelect } from '../input/SelectComponent';
import { FilterInput } from '../input/InputComponent';
import { useRouter } from 'next/navigation';
import { IconReFresh, IconSearch } from '../icon/Icon';
import ButtonCustom from '../button/ButtonCustom';

const AdminFilter = ({ optionState, paramState }) => {
    const router = useRouter();

    const filterStateDefault = {
        year: paramState&&paramState.year||'',
        type: paramState&&paramState.type||'',
        category: paramState&&paramState.category||'',
        country: paramState&&paramState.country||'',
        query: paramState&&paramState.query||'',
        lang: paramState&&paramState.lang||'',
        quality: paramState&&paramState.quality||'',
        actor: paramState&&paramState.actor||'',
        director: paramState&&paramState.director||''
    }

    // Initial state for filters
    const [filters, setFilters] = useState(filterStateDefault);

    const updateState = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value })); // Update filters
    };

    const clearState = () => {
        setFilters(prevFilters => {
            const clearedFilters = {};
            Object.keys(prevFilters).forEach(key => clearedFilters[key] = '');
            return clearedFilters;
        });
    };

    const buildQueryString = () => {
        const params = {};
        if (filters.query) params.query = filters.query;
        if (filters.year) params.year = filters.year;
        if (filters.type) params.type = filters.type;
        if (filters.category) params.cat = filters.category;
        if (filters.country) params.ctr = filters.country;
        if (filters.lang) params.lang = filters.lang;
        if (filters.quality) params.qua = filters.quality;
        if (filters.actor) params.act = filters.actor;
        if (filters.director) params.dir = filters.director;
        return new URLSearchParams(params).toString();
    };

    const handleSearch = () => {
        const queryString = buildQueryString();
        router.push(`/admin?${queryString}`)
    };

    const handleClear = () => {
        router.push(`/admin`);
        clearState();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 text-slate-400"> <IconSearch /> </span>   
                <input type="text" name="query" 
                className="w-full px-[25px] py-[3px] lg:px-[30px] lg:py-[6px] 3xl:px-[45px] bg-[#374151] placeholder-slate-300 text-white text-[10px] lg:text-[14px] 3xl:text-[20px] rounded-full block" // Adjust padding-left to make space for the icon
                placeholder="Tìm kiếm phim..."
                value={filters.query}
                onChange={(e) => updateState('query', e.target.value)}
                onKeyDown={handleKeyDown}
                />
            </div>
            
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
            <div className='flex lg:justify-end gap-2 sm:gap-4 my-2'>
                <ButtonCustom onClick={()=>{handleClear()}} icon={<IconReFresh />} label="Bỏ lọc" />
                <ButtonCustom onClick={()=>{handleSearch()}} icon={<IconSearch />} label="Lọc" />
            </div>
        </>
    );
};

export default AdminFilter;