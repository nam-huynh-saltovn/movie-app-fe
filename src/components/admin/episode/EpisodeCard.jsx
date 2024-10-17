"use client";
import React, { useState } from 'react';
import InputComponent from '../../input/InputComponent';
import { Reorder } from "framer-motion";
import { validateEpisodeFormInputs } from '../../../services/validator';

export default function EpisodeCard({ episode, handleDeleteEp, handleUpdateEp }) {
    const [isDisplayElement, setIsDisplayElement] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    
    // States for update episode
    const [formData, setFormData] = useState({
      filename: episode.filename,
      name: episode.name,
      slug: episode.slug,
      link_embed: episode.link_embed,
      link_m3u8: episode.link_m3u8
    });

    // function update state
    const updateFormState = (key, value) => {
      setFormData(prev => ({...prev, [key]: value}));
    };
  
    const handleSaveEdit = () => {
      if(validateEpisodeFormInputs(formData, setErrorMessage)){
        handleUpdateEp(episode.id, formData); // Update by ID\
        setIsEditing(false);
        setIsDisplayElement(true);
        setErrorMessage();
      }
    };

    const handleCancelEdit = () => {
      updateFormState('filename', episode.filename);
      updateFormState('name', episode.name);
      updateFormState('slug', episode.slug);
      updateFormState('link_embed', episode.link_embed);
      updateFormState('link_m3u8', episode.link_m3u8);
      setIsEditing(false);
      setIsDisplayElement(true);
    };
  
    return (
      <Reorder.Item value={episode} as="div" className="mb-2">
        <div className='p-3 shadow-lg border rounded-md mb-2 bg-gray-300 bg-opacity-30 backdrop-blur'>
          {/* HEADER */}
          <div className='flex justify-between items-center'>
            <span onClick={()=>setIsDisplayElement(!isDisplayElement)} className='cursor-pointer'>
              {isDisplayElement ?
                <svg className="w-6 h-6 3xl:w-8 3xl:h-8 text-white" aria-hidden="true" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill='none' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 17-4-4-4 4m8-6-4-4-4 4" />
                </svg> :
                <svg className="w-6 h-6 3xl:w-8 3xl:h-8 text-white" aria-hidden="true" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill='none' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 7 4 4 4-4m-8 6 4 4 4-4" />
                </svg>
              }
            </span>

            <span onClick={()=>setIsDisplayElement(!isDisplayElement)} className='font-bold text-[12px] xl:text-[16px] 3xl:text-[23px] text-center text-white cursor-pointer'>{episode.filename}</span>

            <div className='flex gap-2'>
              <span onClick={() => setIsEditing(!isEditing)} className='cursor-pointer'>
                <svg className="w-6 h-6 3xl:w-8 3xl:h-8 t text-white" aria-hidden="true" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill='none' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
              </span>

              <span onClick={() => handleDeleteEp(episode.id)} className='cursor-pointer'>
                <svg className="w-6 h-6 3xl:w-8 3xl:h-8  text-white" aria-hidden="true" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill='none' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                </svg>
              </span>
            </div>
          </div>

          {/* BODY */}
          {isEditing ? (
            <div className="mt-3">
              <InputComponent title="Title" id="title" type="text" value={formData.filename} onChange={(e) => updateFormState('filename', e.target.value)} />
              <InputComponent title="Name" id="name" type="text" value={formData.name} onChange={(e) => updateFormState('name', e.target.value)} />
              <InputComponent title="Slug" id="slug" type="text" value={formData.slug} onChange={(e) => updateFormState('slug', e.target.value)} />
              <InputComponent title="Link_embed" id="link_embed" type="text" value={formData.link_embed} onChange={(e) => updateFormState('link_embed', e.target.value)} />
              <InputComponent title="Link_m3u8" id="link_m3u8" type="text" value={formData.link_m3u8} onChange={(e) => updateFormState('link_m3u8', e.target.value)} />
              {errorMessage&&<div className='flex justify-center mt-3'><span className='text-white bg-red-500 p-1 rounded-md'>{errorMessage}</span></div>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleSaveEdit()} className="bg-green-500 text-white text-[12px] xl:text-[14px] 3xl:text-[20px] p-[6px] xl:px-[12x] 3xl:px-[16px] rounded-md">Save</button>
                <button onClick={() => handleCancelEdit()} className="bg-red-500 text-white text-[12px] xl:text-[14px] 3xl:text-[20px] p-[6px] xl:px-[12x] 3xl:px-[16px] rounded-md">Cancel</button>
              </div>
            </div>
          ) : (
            <div className={`transition-all duration-500 ease-in-out ${isDisplayElement ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <hr className='mt-2' />
              <div className='p-2'>
                <label className='block text-[12px] xl:text-[14px] 3xl:text-[20px] font-bold text-[#1496d5] pt-3'>Title</label>
                <p className='pb-1 text-[12px] xl:text-[14px] 3xl:text-[20px] text-white'>{episode.filename}</p>
                <hr />
                <label className='block text-[12px] xl:text-[14px] 3xl:text-[20px] font-bold text-[#1496d5] pt-3'>Name</label>
                <p className='line-clamp-1 pb-1 text-[12px] xl:text-[14px] 3xl:text-[20px] text-white'>{episode.name}</p>
                <hr />
                <label className='block text-[12px] xl:text-[14px] 3xl:text-[20px] font-bold text-[#1496d5] pt-3'>Slug</label>
                <p className='line-clamp-1 pb-1 text-[12px] xl:text-[14px] 3xl:text-[20px] text-white'>{episode.slug}</p>
                <hr />
                <label className='block text-[12px] xl:text-[14px] 3xl:text-[20px] font-bold text-[#1496d5] pt-3'>Link embed</label>
                <p className='pb-1 text-[12px] xl:text-[14px] 3xl:text-[20px] text-white'>{episode.link_embed}</p>
                <hr />
                <label className='block text-[12px] xl:text-[14px] 3xl:text-[20px] font-bold text-[#1496d5] pt-3'>Link m3u8</label>
                <p className='pb-1 text-[12px] xl:text-[14px] 3xl:text-[20px] text-white'>{episode.link_m3u8}</p>
              </div>
            </div>
          )}
        </div>
      </Reorder.Item>
    );
  };
