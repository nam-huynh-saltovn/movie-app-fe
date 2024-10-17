"use client";
import React, { useState } from 'react';
import InputComponent from '../../input/InputComponent';
import { Button } from '@material-tailwind/react';
import { useAppSelector } from '@/lib/hooks';
import { createEpisode } from '@/services/episodeService';
import { IconAdd, IconClose } from '@/components/icon/Icon';
import { validateEpisodeFormInputs } from '@/services/validator';
import { Alert } from '@/components/alert/Alert';

const EpisodeForm = ({ movId, setIsUpdated, listEp, setListEp, handleCloseForm }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const [filename, setFileName] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [link_embed, setLinkEmbed] = useState('');
  const [link_m3u8, setLinkM3u8] = useState('');

  const handleAddEp = async() => {
    if(validateEpisodeFormInputs({filename,name,slug,link_embed,link_m3u8}, setErrorMessage)){
      if(movId){
        setIsCreating(true);
        try {
          const result = await createEpisode({ 
            ep_title: filename, 
            ep_name: name, 
            ep_slug: slug, 
            link_embed: link_embed, 
            link_m3u8: link_m3u8, 
            mov_id: movId,
            user_id: user?.user_id
          })
          if (result&&(result.status === 200 || result.status === 201)) {
            Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
            setIsUpdated(true);
            handleCloseForm();
        } else {
            Alert(2000, 'Thông báo', result.data.message||'Không thể tạo phim!', 'error', 'OK');
        }
        } catch (error) {
          Alert(2000, 'Thông báo', "Không thể tạo tập phim. Vui lòng thử lại", 'error', 'OK');
        }finally{
          setIsCreating(false);
        }
      }else{
        const newEp = {filename, name, slug, link_embed, link_m3u8, id: listEp.length + 1, sort_order: listEp.length + 1};
        
        setListEp(prevList => [...prevList, newEp]); // add episode to list
        
        // Reset all field
        setFileName("");
        setName("");
        setSlug("");
        setLinkEmbed("");
        setLinkM3u8("");

        setErrorMessage(); // clear error message
      }
    }
  };

  return (
    <div className='px-[20px] py[12px] shadow-md border rounded-md mb-2 bg-gray-200 bg-opacity-20 backdrop-blur'>
      {/* HEADER AREA */}
      <div className='p-2 flex justify-between'>
        <span></span>
        <h2 className='text-[14px] sm:text-[16px] 3xl:text-[25px] font-medium text-white'>THÊM TẬP PHIM</h2>
        <span onClick={handleCloseForm} className='font-bold cursor-pointer'>
          <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
          </svg>
        </span>
      </div>

      <hr />

      {/* ERROR MESSAGE AREA */}
      {errorMessage&&
          <div className="bg-red-600 w-full p-[6px] flex items-center gap-[10px] rounded-md text-center mt-2">
              <IconClose />
              <p id="errorMessage" class="font-medium text-[10px] sm:text-[14px] 3xl:text-[20px] text-white">{errorMessage}</p>
          </div>
      }
      {/* BODY AREA */}
      <div className='py-[12px]'>
        <InputComponent title="Title" id="title" type="text" placeholder="Thanh Xuân Đón Gió - Wind Direction - 2024 - 1080p - Vietsub - Tập 01" value={filename} onChange={e => {setFileName(e.target.value);setErrorMessage('')}} />
        <InputComponent title="Name" id="name" type="text" placeholder="Tập" value={name} onChange={e => {setName(e.target.value);setErrorMessage('')}} />
        <InputComponent title="Slug" id="slug" type="text" placeholder="tap" value={slug} onChange={e => {setSlug(e.target.value);setErrorMessage('')}} />
        <InputComponent title="Link embed" id="link_embed" type="text" placeholder="https://player.phimapi.com/player/" value={link_embed} onChange={e => {setLinkEmbed(e.target.value);setErrorMessage('')}} />
        <InputComponent title="Link m3u8" id="link_m3u8" type="text" placeholder="https://player.phimapi.com/player/" value={link_m3u8} onChange={e => {setLinkM3u8(e.target.value);setErrorMessage('')}} />
      </div>
      
      
      {/* FOOTER AREA */}
      <div className='flex justify-end my-[12px] 3xl:my-[20px]'>
        <Button disabled={isCreating?true:false} onClick={handleAddEp} variant="gradient" color='teal' className='rounded-full flex items-center gap-1 font-md text-[10px] lg:text-[14px] 3xl:text-[20px] px-[10px] py-[6px] lg:px-[12px] lg:py-[6px]'>
          <IconAdd /> Tạo
        </Button>
      </div>
    </div>
  );
};

export default EpisodeForm;