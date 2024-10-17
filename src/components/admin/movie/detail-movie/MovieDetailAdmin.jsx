"use client";
import React, { useEffect, useState } from "react";
import { deleteMovie, getMovieBySlug, updateMovie } from "@/services/movieService";
import { DeleteAlert } from "@/components/alert/Alert";
import { setDataMovie } from "@/services/dataService";
import { Button } from "@material-tailwind/react";
import { IconBack, IconHome, IconTrash } from "@/components/icon/Icon";
import { ErrorAlert, SuccessAlert } from "@/components/alert/FlashAlert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/loading/Loading";
import FormUpdateMovie from "./FormUpdateMovie";
import EpisodeDetail from "../../episode/EpisodeDetail";
import { useAppSelector } from "@/lib/hooks";

export default function MovieDetailAdmin({ slug }) {
  const router = useRouter();

  const [movie, setMovie] = useState(); // Check if the movie data is passed via state

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  
  const categories = useAppSelector((state) => state.data.category);
  const countries = useAppSelector((state) => state.data.country);
  const years = useAppSelector((state) => state.data.year);
  const types = useAppSelector((state) => state.data.type);
  const actors = useAppSelector((state) => state.data.actor);
  const directors = useAppSelector((state) => state.data.director);

  // Utility function to format options
  const formatOptions = (data, valueField, labelField, slugField = null) =>
    data.map(item => ({
        ...item,
        // add field value and label to use in <Select /> library
        value: item[valueField], 
        label: item[labelField],
        ...(slugField && { slug: item[slugField] }),
  }));

  // state options for select inputs (type, year, category, etc.)
  const optionState= { 
    yearOptions: formatOptions(years, 'year_id', 'year_name'),
    typeOptions: formatOptions(types, 'type_slug', 'type_name'), 
    categoryOptions: formatOptions(categories, 'cat_id', 'cat_name'), 
    countryOptions: formatOptions(countries, 'ctr_id', 'ctr_name', 'cat_slug'),
    actorOptions: formatOptions(actors, 'act_id', 'act_name'), 
    directorOptions: formatOptions(directors, 'dir_id', 'dir_name')
  };
  
  // state of movie data
  const [state, setState] = useState([]);
  const [initialState, setInitialState] = useState([]);

  // function to update option state (for select inputs like type, category, etc.)
  const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));
  const updateInitialState = (key, value) => setInitialState(prev => ({ ...prev, [key]: value }));

  const fetchMovie = async () => {
    setIsLoading(true);
    try {
      const fetchedMovie = await getMovieBySlug(slug); // Fetch movie by ID from API
      setMovie(fetchedMovie);
      setDataMovie(optionState, fetchedMovie, updateState);
      setDataMovie(optionState, fetchedMovie, updateInitialState);
    } catch (error) {
      console.error("Error fetching movie data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchMovie();
  }, []);

  useEffect(() => {
    if(isUpdated){
      fetchMovie();
    }
  }, [isUpdated]);

  // handle update movie
  const handleSave = async () => {
    // call API to update movie with current movie state
    setIsUpdating(true);
    setIsUpdated(false);
    try {
      const result = await updateMovie({ movie: {...state, id: movie.mov_id, old_slug: slug}});
      // if movie creation is successful ? reset the form : show an error alert
      if (result&&(result.status === 200 || result.status === 201)) {
          setIsUpdated(true);
          SuccessAlert(result.data.message||"Cập nhật phim thành công", 1500, "top-right");
      }else{
        ErrorAlert(result.data.message||'Cập nhật phim phim thất bại', 2000, "top-right");
      }
    } catch (error) {
      ErrorAlert(error.message||'Không thể cập nhật phim', 2000, "top-right");
    }finally{
      setIsUpdating(false);
    }
  };

  // handle delete movie
  const handleDelete = async () => {
    // call API to update movie with current movie state
    const result = await deleteMovie(movie.mov_id);
    // if movie creation is successful ? reset the form : show an error alert
    if (result&&(result.status === 200 || result.status === 201)) {
      router.push('/admin');
      router.refresh();
      SuccessAlert(result.data.message||"Xóa phim thành công", 1500, "top-right");
    } else {
        setIsUpdated(false);
        ErrorAlert(result.data.message||'Không thể xóa phim', 2000, "top-right");
    }
  }

  if (isLoading) {
    return( 
      <div className="flex justify-center items-center bg-[rgb(16,20,44)] h-screen text-white">
        <Loading />
      </div>
  )}
  
  if (!movie || !state || !optionState) {
    return (
      <div className="flex flex-col justify-center items-center bg-[rgb(16,20,44)] h-screen text-white">
        <div className="flex gap-2 mb-4">
          <IconHome />
          <Link href="/admin/movie">Trang chủ</Link>
        </div>
        <p>Không tìm thấy movie này</p>
      </div>
  )}

  return (
      <div className=" bg-[rgb(16,20,44)] h-full min-h-screen">
        <Breadcrumbs movie={movie}/>
        <div className="px-[24px] py-[16px] 3xl:px-[40px] 3xl:py-[24px] bg-[#202c3c] text-white rounded-md">
          {/* HEADER */}
          <div className='flex justify-between items-start mb-3'>
            <Button onClick={()=>{router.push(`/admin`);router.refresh()}} variant="gradient" color='purple' className="rounded-full flex items-center gap-1 font-md text-[8px] lg:text-[12px] 3xl:text-[20px] px-2 lg:px-3 py-1">
              <IconBack />Quay lại
            </Button>

            {/* BUTTON EDIT & DELETE MOVIE */}
            <Button onClick={() => DeleteAlert(handleDelete)} variant="gradient" color='red' 
            className="rounded-full flex items-center gap-1 font-md text-[8px] lg:text-[12px] 3xl:text-[20px] px-2 lg:px-3 py-1">
              <IconTrash />Xóa
            </Button>
          </div>

          {/* NAME */}
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-[#8b5cf6] text-[16px] lg:text-[20px] 3xl:text-[25px] text-center">{movie.mov_name.toUpperCase()}</h2>
            <span className="line-clamp-1 font-normal mb-4 text-[#1496d5] text-[12px] lg:text-[18px] 3xl:text-[23px]">{movie.ori_name}</span>
          </div>

          <FormUpdateMovie state={state} initialState={initialState} updateState={updateState} handleSave={handleSave} optionState={optionState} isUpdating={isUpdating}/>
      </div>
      
      {/* LIST EPISODE */}
      <EpisodeDetail movId={movie.mov_id}/>
    </div>
  );
}

const Breadcrumbs = ({ movie }) => (
  <div className="flex gap-2 items-center text-gray-300 mb-4">
    <Link href="/admin"><IconHome /></Link>
    <Link className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] line-clamp-1 min-w-[55px]" href="/admin">Danh sách phim</Link>
    <span className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] line-clamp-1">{movie?'>':''}</span>
    <span className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] line-clamp-1">{movie?movie.mov_slug:''}</span>
  </div>
);