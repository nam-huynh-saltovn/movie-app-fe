"use client";
import React, { useEffect, useState } from 'react';
import { IconReFresh, IconSearch } from '@/components/icon/Icon';
import ButtonCustom from '@/components/button/ButtonCustom';
import { useRouter, useSearchParams } from "next/navigation";
import { filterMovie } from '@/services/movieService';
import Filter from '@/components/fillter/Filter';
import Pagination from '@/components/pagination/Pagination';
import TableMovie from './TableMovie';
import Loading from '@/components/loading/Loading';
import { useAppSelector } from '@/lib/hooks';

export default function ListMovieUser() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [path , setPath] = useState({});

  const keys = ['query', 'year', 'type', 'cat', 'ctr', 'lang', 'qua', 'act', 'dir'];
  
  const { query, year, type, cat, ctr, lang, qua, act, dir } = keys.reduce((acc, key) => {
    acc[key] = searchParams.get(key) || '';
    return acc;
  }, {});

  // Initial state for filters
  const [filters, setFilters] = useState({
    year: year || '',
    type: type || '',
    category: cat || '',
    country: ctr || '',
    query: query || '',
    lang: lang || '',
    quality: qua || '',
    actor: act || '',
    director: dir || ''
  });

  const categories = useAppSelector(state => state.data.category);
  const countries = useAppSelector((state) => state.data.country);
  const types = useAppSelector((state) => state.data.type);

  const currentPage = parseInt(searchParams.get('page')) || 1;

  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  
  // state -> handle loading status and search
  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  
  // Fetch data from API
  const fetchMovie = async () => {
    setIsLoading(true);
    try {
      const data = await filterMovie({
        year: year || '',
        type: type || '',
        category: cat || '',
        country: ctr || '',
        query: query || '',
        lang: lang || '',
        quality: qua || '',
        actor: act || '',
        director: dir || ''
      }, currentPage);
      
      setMovies(data.movies);
      setTotalPages(data.totalPages);
      setTotalMovies(data.totalMovies);
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  };
  
  // Handle page changes for both search and fetch
  const onPageChange = (page) => {
    if (page !== currentPage) {
      const queryParams = { ...path, page };  // Update page in query
      router.replace(`?${new URLSearchParams(queryParams).toString()}`);
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

  // useEffect to fetch movies
  useEffect(() => {
    fetchMovie(currentPage);
  }, [query, year, type, cat, ctr, lang, qua, act, dir, isFilter, currentPage]);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    {headerName: "Tên", field: "mov_name"},
    {headerName: "Năm",valueGetter: (params) => params.data.Year.year_name},
    {headerName: "Tình trạng",field: "episode_current"},
    {headerName: "Thể loại",valueGetter: (params) => params.data.Type.type_name},
    {headerName: "Quốc gia",valueGetter: (params) => params.data.Countries.map(country => country.ctr_name).join(', ')},
    {headerName: "Ngày cập nhật",field: "updatedAt"},
  ];

  // Function to clear all filters
  const clearFilter = () => {
    setFilters({
      year: '',
      type: '',
      category: '',
      country: '',
      query: '',
      lang: '',
      quality: '',
      actor: '',
      director: ''
    });
    router.push('/');
    setIsFilter(false);
  }

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
    setPath(params);
    return new URLSearchParams(params).toString();
  };

  const handleSearch = () => {
    const queryString = buildQueryString();
    setIsFilter(true);
    router.replace(`?${queryString}`)
  };

  // Function to update filter state for select inputs
  const updateState = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value })); // Update filters
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const validResult = [
    query,
    lang,
    qua,
    year,
    types&&types.length>0?types.filter(t => t.type_slug === type).map(t => t.type_name).join(", "):'',
    categories&&categories.length>0?categories.filter(cate => cate.cat_slug === cat).map(cate => cate.cat_name).join(", "):'',
    countries&&countries.length>0?countries.filter(coun => coun.ctr_slug === ctr).map(coun => coun.ctr_name).join(", "):'',
    act,
    dir
  ];
  
  const validValues = validResult.filter(value => value && value.length > 0).join(', ');

  return (
    <div className="relative mt-2 pb-2">
      {/* filter */}
      <div className='bg-[#202c3c] p-2 rounded-md mb-4'>
        <div className="relative lg:hidden w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 text-slate-400"> <IconSearch /></span>   
          <input type="text" name="query" 
            className="w-full px-[25px] py-[3px] lg:px-[30px] lg:py-[6px] bg-[#374151] placeholder-slate-300 text-white text-[10px] lg:text-[14px] 3xl:text-[20px] rounded-full block" // Adjust padding-left to make space for the icon
            placeholder="Tìm kiếm phim..."
            value={filters.query}
            onChange={(e) => updateState('query', e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Filter filters={filters} updateState={updateState} setIsFilter={setIsFilter} handleKeyDown={handleKeyDown}/>

        <div className='flex lg:justify-end gap-2 sm:gap-4 my-2'>
          <ButtonCustom onClick={clearFilter} icon={<IconReFresh />} label="Bỏ lọc" />
          <ButtonCustom onClick={()=>{handleSearch()}} icon={<IconSearch />} label="Lọc" />
        </div>
      </div>
      
      {isLoading 
        ?
          <div className="flex justify-center items-center text-white">
              <Loading />
          </div>
        :
          <div className="overflow-x-auto mb-2">
            <p className='text-white text-[10px] xl:text-[14px] 3xl:text-[18px] mb-[8px]'>{validValues&&`Kết quả lọc: `}{validValues&&<strong>{validValues}</strong>}</p>
            <TableMovie colDefs={colDefs} movies={movies}/>
          </div>
        }

      {/* pagination */}
      {(!isLoading&&totalMovies!==0)&&<Pagination currentPage={currentPage} totalDatas={totalMovies} totalPages={totalPages} onPageChange={onPageChange} handlePagination={handlePagination}/>}
    </div>
  )
}