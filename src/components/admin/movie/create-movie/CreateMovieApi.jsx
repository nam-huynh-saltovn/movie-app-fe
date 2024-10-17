"use client";
import React, { useEffect, useState } from 'react';
import { createMovie, handleAutoFillEpisodeData, handleAutoFillMovieData, resMovie } from '@/services/movieService';
import FormCreateMovie from './FormCreateMovie';
import { Button } from '@material-tailwind/react';
import { IconAdd, IconDownload } from '@/components/icon/Icon';
import { ErrorAlert, SuccessAlert, WarningAlert } from '@/components/alert/FlashAlert';
import ListEpisode from '../../episode/ListEpisode';
import "@/components/loading/Loading.css";
import { validateLink } from '@/services/validator';
import { useAppSelector } from '@/lib/hooks';

export default function CreateMovieApi() {
    const [data, setData] = useState("");
    const user = useAppSelector(state => state.auth.user);

    const [isCreating, setIsCreating] = useState(false);
    
    // default state movie data
    const defaultState = {
        name: "", slug: "", originName: "", content: "", type: "series", status: false,
        posterUrl: "", thumbUrl: "", time: "", epCurrent: "", epTotal: "",
        quality: "HD", lang: "Vietsub", year: "2024", category: [], country: [], actor: [], director: []
    };
    
    // state of movie data
    const [state, setState] = useState(defaultState);

    // state of list of episodes
    const [listEp, setListEp] = useState([]);

    // state movie API link input
    const [api, setApi] = useState("");
    const [isCallApi, setIsCallApi] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    // state options for select inputs (type, year, category, etc.)
    const [optionState, setOptionState] = useState({
        typeOptions: [], yearOptions: [], categoryOptions: [], countryOptions: [],
        actorOptions: [], directorOptions: []
    });

    // function to handle API call for fetching movie data
    const handleCallMovieApi = async () => {
        // if API link is empty -> show warning alert
        if (!api) return WarningAlert("Vui lòng điền link api!",2000,"top-right");
        // validate API link format
        if (!validateLink(api)) return ErrorAlert("Link api không hợp lệ.",2000,"top-right");

        setIsCallApi(true);

        // call API to fetch movie data
        const movieData = await resMovie(api);
        if(movieData){
            setData(movieData);
            setIsDataUpdated(true);
        }
        setIsCallApi(false);
    };

    // when movie data is updated -> auto-fills data
    useEffect(() => {
        if (isDataUpdated && data) {
            // auto-fill movie-related fields
            handleAutoFillMovieData(data.movie, updateState, optionState);

            // auto-fill episode-related fields
            handleAutoFillEpisodeData(data.episodes, setListEp);
        }
    }, [isDataUpdated, data]);

    // function to update individual fields in movie state
    const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

    // function to update option state (for select inputs like type, category, etc.)
    const updateOptionState = (key, value) => setOptionState(prev => ({ ...prev, [key]: value }));

    // function to handle movie creation
    const handleCreateMovie = async () => {
        setIsCreating(true);
        try {
            // call API to create movie with current movie state and episode list
            const result = await createMovie({ movie: state, episode: listEp, user:user?.user_id });
            // if movie creation is successful ? reset the form : show an error alert
            if (result&&(result.status === 200 || result.status === 201)) {
                setState(defaultState);
                setListEp([]);
                SuccessAlert(result.data.message||"Tạo phim thành công", 1500, "top-right");
            } else {
                ErrorAlert(result.data.message||"Tạo phim thất bại", 2000, "top-right");
            }
        } catch (error) {
            ErrorAlert(error.message||'Có lỗi xảy ra trong quá trình tạo phim!', 2000, "top-right");
        }finally{
            setIsCreating(false);
        }
    };
    
    return (
        <>
            {/* input section to fetch movie data via API */}
            <div className="row-auto h-full">
                <div className="col-8 mb-4">
                    <label htmlFor="api" className="block mb-2 text-[12px] sm:text-[16px] 3xl:text-[23px] font-bold text-white">FETCH API AUTO</label>
                    <input 
                        onChange={(e) => setApi(e.target.value)} 
                        type="text" id="api" 
                        className="bg-gray-300 border border-gray-200 text-gray-700 text-[10px] sm:text-[14px] 3xl:text-[20px] p-[6px] sm:p-[8px] 3xl:p-[12px] rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                        placeholder="https://phimapi.com/phim" required 
                    />
                </div>
                <div className="col-4 mb-4 items-center flex gap-5">
                    <Button disabled={isCallApi?true:false} onClick={handleCallMovieApi} variant="gradient" color='cyan' 
                        className="rounded-lg text-md flex items-center gap-1 font-md text-[8px] lg:text-[12px] 3xl:text-[20px] px-[8px] sm:px-[12px] py-2">
                        <IconDownload />Lấy dữ liệu phim
                    </Button>
                    {/* Show loading spinner during API call */}
                    {isCallApi && 
                        <div className='loading w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]  3xl:w-[45px] 3xl:h-[45px]'></div>
                    }
                </div>
            </div>

            <hr />

            {/* Content section with movie form (left) and episode list (right) */}
            <div className="grid gap-2 my-6">
                {/* Left side: Movie form inputs */}
                <FormCreateMovie state={state} updateState={updateState} optionState={optionState} updateOptionState={updateOptionState} />
                
                {/* Right side: Episode management */}
                <ListEpisode listEp={listEp} setListEp={setListEp} title="EPISODE" />
            </div>

            {/* Button to create a new movie */}
            <div className="col-4 mb-4 flex gap-5">
                <Button disabled={isCreating?true:false} onClick={handleCreateMovie} variant="gradient" color='green' className="rounded-lg text-md flex items-center gap-1 font-md text-[8px] lg:text-[12px] 3xl:text-[20px] px-3 py-2">
                    <IconAdd />Tạo phim
                </Button>
                {isCallApi && 
                    <div className='loading w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]  3xl:w-[45px] 3xl:h-[45px]'></div>
                }
            </div>
        </>
    );
}
