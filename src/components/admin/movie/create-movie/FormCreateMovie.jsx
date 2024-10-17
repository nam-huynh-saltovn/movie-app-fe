"use client";
import React, { useEffect, useState } from 'react';
import { SelectComponent, SingleSelectComponent} from '@/components/input/SelectComponent';
import Loading from '@/components/loading/Loading';
import InputComponent from '@/components/input/InputComponent';
import { useAppSelector } from '@/lib/hooks';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import debounce from 'lodash.debounce';

export default function FormCreateMovie({ state, updateState, optionState ,updateOptionState }) {
    const categories = useAppSelector((state) => state.data.category);
    const countries = useAppSelector((state) => state.data.country);
    const years = useAppSelector((state) => state.data.year);
    const types = useAppSelector((state) => state.data.type);
    const actors = useAppSelector((state) => state.data.actor);
    const directors = useAppSelector((state) => state.data.director);

    useEffect(() => {
        updateOptionState('typeOptions', formatOptions(types, 'type_slug', 'type_name'));
        updateOptionState('yearOptions', formatOptions(years, 'year_name', 'year_name'));
        updateOptionState('categoryOptions', formatOptions(categories, 'cat_id', 'cat_name'));
        updateOptionState('countryOptions', formatOptions(countries, 'ctr_id', 'ctr_name', 'cat_slug'));
        updateOptionState('actorOptions', formatOptions(actors, 'act_id', 'act_name'));
        updateOptionState('directorOptions', formatOptions(directors, 'dir_id', 'dir_name'));
    }, [categories, countries, years, types, actors, directors]);

    // Utility function to format options
    const formatOptions = (data, valueField, labelField, slugField = null) =>
        (data || []).map(item => ({
            ...item,
            value: item[valueField], 
            label: item[labelField],
            ...(slugField && { slug: item[slugField] }),
    }));
   

    // Function for select changes
    const handleSelectChange = (field, selected) => {
        updateState(field , selected);
    };

    const handleChangeContent = (content) => {
        updateState("content", content);
    }

    if(!optionState.typeOptions ||!optionState.yearOptions ||!optionState.categoryOptions ||
        !optionState.countryOptions ||!optionState.actorOptions ||!optionState.directorOptions){
        return(
            <div className="flex justify-center items-center h-screen text-white">
                <Loading />
            </div>
        )
    }
    
    return (
        <div className='bg-[#202c3c] px-[16px] xl:px-[40px] 3xl:px-[60px] rounded-md'>
            <h1 className='text-[16px] xl:text-[20px] 3xl:text-[30px] my-4 font-bold text-center text-white'>MOVIE</h1>

            {/* Inputs for movie details */}
            {/* name - slug */}
            <div className="grid gap-2 md:grid-cols-2 mb-4">
                <InputComponent title="Name" id="name" type="text" placeholder="Thanh Xuân Đón Gió" value={state.name} onChange={e => updateState("name", e.target.value)} />
                <InputComponent title="Slug" id="slug" type="text" placeholder="thanh-xuan-don-gio" value={state.slug} onChange={e => updateState("slug", e.target.value)} />
                <InputComponent title="Origin Name" id="ori_name" type="text" placeholder="Wind Direction" value={state.originName} onChange={e => updateState("originName", e.target.value)} />
                <InputComponent title="Time" id="time" type="text" placeholder="24 phút/tập" value={state.time} onChange={e => updateState("time", e.target.value)} />
            </div>

            {/* Poster & thumbnail */}
            <Images state={state} updateState={updateState} />

            {/* EpTotal -  EpCurrent - Lang - Type -  Quality - Status */}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-6 my-2 xl:my-2">
                <InputComponent title="Episode Total" id="ep_total" type="text" placeholder="24 tập" value={state.epTotal} onChange={e => updateState("epTotal", e.target.value)} />
                <InputComponent title="Episode Current" id="ep_current" type="text" placeholder="24/24" value={state.epCurrent} onChange={e => updateState("epCurrent", e.target.value)} />
                <SingleSelectComponent value={state.lang} title="Language" id="lang" options={[{ value: 'Vietsub', label: 'Vietsub' }, { value: 'Lồng Tiếng', label: 'lồng tiếng' }]} onChange={(e)=>updateState("lang", e.target.value)} />
                <SingleSelectComponent value={state.type||''} title="Type" id="type" options={optionState.typeOptions} onChange={e => handleSelectChange('type', e.target.value)} />
                <SingleSelectComponent value={state.quality||''} title="Quality" id="quality" options={[{ value: 'HD', label: 'HD' }, { value: 'FHD', label: 'FHD' }, { value: 'SD', label: 'SD' }]} onChange={(e)=>updateState("quality", e.target.value)} />
                <SingleSelectComponent value={state.status||''} title="Status" id="status" options={[{ value: '1', label: 'Completed' }, { value: '0', label: 'Ongoing' }]} onChange={(e)=>updateState("status", e.target.value)} />
            </div>

            {/* Category -  Country - Year - Actor - Director */}
            <SingleSelectComponent title="Year" id="year" options={optionState.yearOptions} value={state.year||''} onChange={(e)=>updateState("year", e.target.value)} />
            <SelectComponent title="Category" id="category" options={optionState.categoryOptions} value={state.category||''} onChange={value => handleSelectChange('category', value)} zIndex="40"/>
            <SelectComponent title="Country" id="country" options={optionState.countryOptions} value={state.country||''} onChange={value => handleSelectChange('country', value)} zIndex="30"/>
            <SelectComponent title="Actor" id="actor" options={optionState.actorOptions} value={state.actor||''} onChange={value => handleSelectChange('actor', value)} zIndex="20"/>
            <SelectComponent title="Director" id="director" options={optionState.directorOptions} value={state.director||''} onChange={value => handleSelectChange('director', value)} zIndex="10"/>

            {/* Content */}
            <div className="mb-4 relative z-[0]">
                <label htmlFor="content" className="block mb-2 text-[10px] lg:text-[14px] 3xl:text-[20px] font-bold text-[#1496d5]">Content</label>
                <SunEditor 
                    className="custom-dark-mode"
                    setContents={state.content || ''}
                    setOptions={{
                    minHeight: '300px',
                    autoHeight: true,
                    buttonList: [
                        ['undo', 'redo'],
                        ['bold', 'italic', 'underline'],
                        ['list', 'align', 'fontSize', 'fontColor'],
                        ['table', 'link', 'image'],
                        ['fullScreen', 'codeView']
                    ],
                    }}
                    onChange={handleChangeContent}
                />
            </div>
        </div>
    );
}

// ImageUpload Component to handle poster and thumbnail
const Images = ({ state, updateState }) => {
    const [posterUrl, setPosterUrl] = useState();
    const [thumbUrl, setThumbUrl] = useState();

    // Hàm kiểm tra URL ảnh, có debounce
    const checkPosterUrl = debounce((url) => {
        if (url) {
            const img = new Image();
            img.src = url;
            img.onload = () => setPosterUrl(url); // Sử dụng URL người dùng nhập nếu hợp lệ
            img.onerror = () => setPosterUrl('/images/poster-default.png'); // Sử dụng ảnh mặc định nếu không hợp lệ
        }else {
            setPosterUrl(); // Sử dụng ảnh mặc định nếu không có URL
        }
    }, 500);

    // Hàm kiểm tra URL ảnh, có debounce
    const checkThumbUrl = debounce((url) => {
        if (url) {
            const img = new Image();
            img.src = url;
            img.onload = () => setThumbUrl(url); // Sử dụng URL người dùng nhập nếu hợp lệ
            img.onerror = () => setThumbUrl('/images/thumbnail-default.png'); // Sử dụng ảnh mặc định nếu không hợp lệ
        }else {
            setThumbUrl(); // Sử dụng ảnh mặc định nếu không có URL
        }
    }, 500);

    useEffect(() => {
        // Kiểm tra URL của poster với debounce
        checkPosterUrl(state.posterUrl);

        // Cleanup debounce khi component unmount
        return () => {
            checkPosterUrl.cancel();
        };
    }, [state.posterUrl]);

    useEffect(() => {
        // Kiểm tra URL của thumbnail với debounce
        checkThumbUrl(state.thumbUrl);

        // Cleanup debounce khi component unmount
        return () => {
            checkThumbUrl.cancel();
        };
    }, [state.thumbUrl]);

    return(
        <div className='pr-2'>
        <div className={`flex gap-4 items-center mr-2`}>
            <div className="flex-none w-[80%] sm:w-[85%]">
                <InputComponent title="Poster URL" id="poster" type="text" placeholder="https://phimimg.com/upload/.jpg" value={state.posterUrl} onChange={e => updateState("posterUrl", e.target.value)} />
            </div> 
                {posterUrl 
                ? 
                    <div className="flex-none w-[20%] sm:w-[15%] flex items-center justify-end">
                        <img src={posterUrl} className="w-full h-auto border rounded shadow object-cover" />
                    </div>
                    :
                    <div className="flex-none w-[20%] sm:w-[15%] border h-[105px] md:h-[125px] lg:h-[180px] xl:h-[270px] 3xl:h-[420px] rounded-md flex items-center justify-center">
                        <p className='text-gray-500 text-[8px] md:text-[12px] xl:text-[14px] 3xl:text-[20px] font-medium'>Poster Image</p>
                    </div>
                }
        </div>

        <div className={`flex gap-4 items-center mt-2 mr-2`}>
            <div className="flex-none w-[80%] sm:w-[85%]">
                <InputComponent title="Thumbnail URL" id="thumb" type="text" placeholder="https://phimimg.com/upload/.jpg" value={state.thumbUrl} onChange={e => updateState("thumbUrl", e.target.value)} />
            </div>
                {thumbUrl
                    ? 
                    <div className="flex-none w-[20%] sm:w-[15%] flex items-center justify-center">
                        <img src={thumbUrl} className="w-full h-auto border rounded shadow object-cover" />
                    </div>
                    :
                    <div className="flex-none w-[20%] sm:w-[15%] border h-[40px] md:h-[50px] lg:h-[75px] xl:h-[110px] 3xl:h-[170px] p-1 rounded-md flex items-center justify-center text-center">
                        <p className='text-gray-500 text-[8px] md:text-[12px] xl:text-[14px] 3xl:text-[20px] font-medium'>Thumbnail Image</p>
                    </div>
                }
        </div>
    </div>
    )
};