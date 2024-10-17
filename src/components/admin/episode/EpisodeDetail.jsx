"use client";
import React, { useEffect, useRef, useState } from 'react';
import { deleteEpisode, getEpisodeByMovieId, updateEpisode } from '../../../services/episodeService';
import { DeleteAlert } from '../../alert/Alert';
import InputComponent, { FilterInput } from '../../input/InputComponent';
import { Button } from '@material-tailwind/react';
import Loading from '../../loading/Loading';
import { IconClose, IconMaxize, IconMinimize, IconSave, IconSearch, IconTrash } from '../../icon/Icon';
import Pagination from '../../pagination/Pagination';
import DropDownFilter from '../../common/DropDownFilter';
import EpisodeForm from './EpisodeForm';
import SettingEpisodeMenu from '../../navbar/SettingEpisodeMenu';
import EpisodeReOrder from './EpisodeReOrder';
import { ErrorAlert, SuccessAlert, WarningAlert } from '../../alert/FlashAlert';
import { compareObjects, validateEpisodeFormUpdates } from '../../../services/validator';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const EpisodeDetail = ({ movId }) => {
    const router = useRouter();
    const pathName = usePathname();
    const sectionRef = useRef(null);

    const updateSortParameter = (sortValue) => {
        const url = new URL(window.location);
        url.searchParams.set('sort', sortValue); // Cập nhật hoặc thêm giá trị sort
        return url.pathname + url.search; // Trả về URL mới
    };
    
    const sortOptions = [
        { name: 'Số tập tăng', href: updateSortParameter(1), current: false },
        { name: 'Số tập giảm', href: updateSortParameter(2), current: false },
        { name: 'A-Z', href: updateSortParameter(3), current: true },
    ];

    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get("page")) || 1;
    const sort = searchParams.get("sort") || 1;
    const search = searchParams.get("query") || '';

    const [query, setQuery] = useState(search);
    
    const [totalEpisodes, setTotalEpisodes] = useState(0);
    const [totalPages, setTotalPages] = useState(1);    // state total page
    const [episodes, setEpisodes] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [index, setIndex] = useState();

    const [isCreate, setIsCreate] = useState(false);
    const [isReOrder, setIsReOrder] = useState(false);

    const fetchEpisode = async (page) => {
        setIsLoading(true);
        try {
            const fetchedEpisode = await getEpisodeByMovieId(movId, query, sort, page); // Fetch episode by movieID
            setEpisodes(fetchedEpisode.episodes);
            setTotalPages(fetchedEpisode.totalPages);
            setTotalEpisodes(fetchedEpisode.totalEpisodes);
            setIsUpdated(true);
        } catch (error) {
            console.error("Error fetching episode data", error);
        } finally {
            setIsUpdated(false);
            setIsLoading(false);
            if(searchParams.get("query")||searchParams.get("sort")||searchParams.get("page")){
                sectionRef.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    };

    useEffect(() => {
        fetchEpisode(currentPage);
    }, [currentPage, isUpdated, search, sort]);

    // Handle page changes for both search and fetch
    const onPageChange = (page) => {
        if(page !== currentPage){   // Check if the new page is different from the current page
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);
        router.push(`?${params.toString()}`);
        fetchEpisode(page);     // Fetch all movies otherwise
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

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`?query=${encodeURIComponent(query)}`);
        }else{
            router.push(pathName.toString());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();  // Gọi hàm tìm kiếm khi nhấn Enter
        }
    };

    const handleOpenFormCreate = () => {
        isReOrder&&setIsReOrder(false);
        setIndex(0);
        setIsCreate(!isCreate);
    }

    const handleReOrderOpen = () => {
        isCreate&&setIsCreate(false);
        setIndex(1);
        setIsReOrder(!isReOrder);
    }

    const handleClose = () => {
        isCreate&&setIsCreate(false);
        isReOrder&&setIsReOrder(false);
        setIndex();
    }
    
    return(
        <div ref={sectionRef} className="px-6 py-4 bg-[#202c3c] text-white rounded-md mt-6">
            <SettingEpisodeMenu handleCreateOpen={handleOpenFormCreate} handleReOrderOpen={handleReOrderOpen} index={index}/>
            
            {isCreate ?
                <div className='mt-2'>
                    <EpisodeForm movId={movId} setIsUpdated={setIsUpdated} handleCloseForm={handleClose}/>
                </div>
            :isReOrder ?
                <div className='bg-[#202c3c] rounded-md px-2 mt-2'>
                    <EpisodeReOrder movId={movId} handleCancel={handleClose} setIsUpdated={setIsUpdated}/>
                </div>
            :
            <>
                <div className='grid sm:flex sm:flex-row sm:justify-between items-center py-1 sm:py-4'>
                    <div className='flex justify-end mb-1 w-full'>
                        <div className='flex gap-2 w-full'>
                            <FilterInput name="query" type="text" placeholder="Nhập tên hoặc số tập(1, 2, 3)..." value={query} onKeyDown={handleKeyDown} onChange={(e) => {setQuery(e.target.value)}}/>
                            
                            {/* BUTTON EDIT & DELETE EPISODE */}
                            <Button onClick={handleSearch} variant="gradient" color='teal' className="flex rounded-full items-center gap-1 font-md text-[10px] lg:text-[14px] 3xl:text-[20px] p-[6px] lg:px-[12px] 3xl:px-[20px]">
                                <IconSearch /><span className='hidden sm:block'>Tìm</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <DropDownFilter sortOptions={sortOptions}/>

                {isLoading
                ?
                    <Loading />
                :episodes.length<=0
                ?
                    <div>Không tìm thấy tập nào</div>
                :
                    <div className='flex flex-col gap-3'>
                        {episodes.map((episode)=>{
                            return (
                                <EpisodeCard key={episode.ep_id} episode={episode} setIsUpdated={setIsUpdated} />
                            )
                        })}
                    </div>
                }

                {/* pagination */}
                <div className='mt-3'>
                    {(!isLoading&&totalEpisodes!==0)&&<Pagination currentPage={currentPage} totalDatas={totalEpisodes} totalPages={totalPages} onPageChange={onPageChange} handlePagination={handlePagination}/>}
                </div>
            </>
            }
        </div>
    )
};
  
const EpisodeCard = ({ episode, setIsUpdated }) => {
    const [isDisplay, setIsDisplay] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // default state episode data
    const defaultState = {
        title: episode.ep_title, 
        name: episode.ep_name, 
        slug: episode.ep_slug, 
        link_embed: episode.link_embed,
        link_m3u8: episode.link_m3u8,
    };
    
    // state of episode data
    const [state, setState] = useState(defaultState);
    const [errorMessage, setErrorMessage] = useState();

    // function to update option state (for select inputs like type, category, etc.)
    const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

    // handle update episode
    const handleSave = async () => {
        if(compareObjects(state,defaultState)){
            return WarningAlert("Chưa có sự thay đổi.", 1500, "top-right");
        }
        
        if(validateEpisodeFormUpdates(state, setErrorMessage)){
            setIsUpdated(false);
            setIsUpdating(true);
            try {
                // call API to update episode with current episode state
                const result = await updateEpisode({...state, id: episode.ep_id});
                // if episode creation is successful ? reset the form : show an error alert
                if (result&&(result.status === 200 || result.status === 201)) {
                    setIsUpdated(true);
                    SuccessAlert(result.data.message||"Cập nhật thành công", 1500, "top-right");
                } else {
                    setErrorMessage(result.data.message||'Cập nhật thất bại');
                }
            } catch (error) {
                ErrorAlert('Không thể cập nhật', 2000, "top-right");
            }finally{
                setIsDisplay(true);
                setIsUpdating(false);
                setErrorMessage();
            }
        }
    };

    // handle delete episode
    const handleDelete = async () => {
        setIsUpdated(false);
        // call API to update episode with current episode state
        const result = await deleteEpisode(episode.ep_id);
        // if episode creation is successful ? reset the form : show an error alert
        if (result&&(result.status === 200 || result.status === 201)) {
            setIsUpdated(true);
            SuccessAlert(result.data.message||"Xóa thành công", 1500, "top-right");
        } else {
        setIsUpdated(false);
        ErrorAlert(result.data.message||'Không thể xóa tập phim này', 2000, "top-right");
        }
    }

    return(
        <div className="bg-gray-300 bg-opacity-30 backdrop-blur rounded-md p-2 sm:p-4 3xl:p-6">
            {/* header */}
            <div className='flex justify-between items-center'>
                <div onClick={() => setIsDisplay(!isDisplay)} className='flex gap-2 cursor-pointer'>
                    {/* BUTTON EDIT & DELETE EPISODE */}
                    {isDisplay?
                    <IconMinimize onClick={() => setIsDisplay(!isDisplay)} />
                    :
                    <IconMaxize onClick={() => setIsDisplay(!isDisplay)} />
                    }
                </div>

                <div className="flex justify-center items-center">
                    <h2 onClick={() => setIsDisplay(!isDisplay)} className="text-[14px] sm:text-[18px] 3xl:text-[25px] font-bold text-[#8b5cf6] cursor-pointer">{episode.ep_name?episode.ep_name.toUpperCase():"Đang cập nhật"}</h2>
                </div>

                <div className='flex justify-end gap-2'>
                    {/* BUTTON EDIT & DELETE EPISODE */}
                    <Button onClick={() => DeleteAlert(handleDelete)} variant="gradient" color='red' className="rounded-full flex items-center gap-1 font-md text-[8px] sm:text-[12px] 3xl:text-[16px] px-2 sm:px-3 py-1">
                        <IconTrash />Xóa
                    </Button>
                </div>
            </div>
            {/* body */}
            <FormUpdateEpisode isDisplay={isDisplay} errorMessage={errorMessage} setErrorMessage={setErrorMessage} isUpdating={isUpdating} handleSave={handleSave} state={state} updateState={updateState}/>
        </div>
    )
}
  
const FormUpdateEpisode = ({ isDisplay, errorMessage, setErrorMessage, isUpdating, handleSave, state, updateState }) => {
    const handleKeyDown = (e) =>{
        if(e.key==="Enter"){
            handleSave();
        }
    };

    return(
      <div className={`transition-all duration-500 ease-in-out ${isDisplay ? 'max-h-100 mt-[10px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <hr />
        {/* Example of editable inputs for movie details */}
        <div className='py-[12px] px-[10px] lg:px-[14px] 3xl:px-[20px]'>
            {errorMessage&&
                <div className="bg-red-700 w-full p-[6px] flex items-center gap-[10px] rounded-md text-center">
                    <IconClose />
                    <p id="errorMessage" class="font-medium text-[10px] sm:text-[14px] 3xl:text-[20px] text-white">{errorMessage}</p>
                </div>
            }
            <InputComponent onKeyDown={handleKeyDown} title="Title" value={state.title} onChange={(e)=>{updateState('title', e.target.value);setErrorMessage()}} />
            <InputComponent onKeyDown={handleKeyDown} title="Name" value={state.name} onChange={(e)=>{updateState('name', e.target.value);setErrorMessage()}} />
            <InputComponent onKeyDown={handleKeyDown} title="Slug" value={state.slug} onChange={(e)=>{updateState('slug', e.target.value);setErrorMessage()}} />
            <InputComponent onKeyDown={handleKeyDown} title="Link embed" value={state.link_embed} onChange={(e)=>{updateState('link_embed', e.target.value);setErrorMessage()}} />
            <InputComponent onKeyDown={handleKeyDown} title="Link m3u8" value={state.link_m3u8} onChange={(e)=>{updateState('link_m3u8', e.target.value);setErrorMessage()}} />
        </div>
  
        {/* More fields can be added here for editing other movie details */}
        <div className="flex justify-end gap-4">
            <Button disabled={isUpdating?true:false} onClick={handleSave} variant="gradient" color='teal' className="rounded-full flex items-center gap-2 font-md text-[10px] lg:text-[14px] 3xl:text-[20px] px-[10px] py-[6px] lg:px-[12px] lg:py-[6px]">
                <IconSave />Lưu
            </Button>
        </div>
      </div>
    )
}

export default EpisodeDetail;