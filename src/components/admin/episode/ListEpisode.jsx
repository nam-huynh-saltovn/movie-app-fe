"use client";
import React, { useState } from 'react';
import EpisodeForm from './EpisodeForm';
import EpisodeCard from './EpisodeCard';
import { Reorder } from 'framer-motion';


export default function ListEpisode ({ listEp, setListEp, title }) {
  const [isOpenForm, setIsOpenForm] = useState(false);

  // function close form create ep
  const handleCloseForm = () => {
    setIsOpenForm(!isOpenForm);
  };

  // function delete ep
  const handleDeleteEp = (id) => {
    // loop in listEp -> delete ep by id + update sort_id of remaining ep
    setListEp(listEp.filter((ep) => ep.id !== id).map((ep, index) => ({
      ...ep,
      sort_order: index + 1, // Set sort_order to 1-based index
    })));
  };

  // function update ep
  const handleUpdateEp = (id, updatedEp) => {
    // loop in listEp -> update ep by id
    setListEp(listEp.map((ep) => (ep.id === id ? { ...ep, ...updatedEp } : ep))); // Update by ID
  };

  // function update sort_order when sort ep
  const handleReorder = (newOrder) => {
    const updatedEpisodes = newOrder.map((episode, index) => ({
      ...episode,
      sort_order: index + 1 // Update sort_order based on the new index
    }));
    
    setListEp(updatedEpisodes);
  };

  return (
    <div className='bg-[#202c3c] rounded-md px-2'>
      {/* HEADER */}
      <div className='flex justify-center items-center'>
        <h1 className='text-[16px] xl:text-[20px] 3xl:text-[30px] my-4 font-bold text-white'>{title}</h1>
      </div>

      {/* LIST EPISODE CARD */}
      {listEp&&
        <Reorder.Group axis="y" values={listEp} onReorder={handleReorder}>
          {listEp.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} handleDeleteEp={handleDeleteEp} handleUpdateEp={handleUpdateEp}/>
          ))}
        </Reorder.Group>
      }

      {/* FORM CREATE - BUTTON OPEN FORM */} 
      {isOpenForm 
      ?
        <EpisodeForm listEp={listEp} setListEp={setListEp} handleCloseForm={handleCloseForm} />
      :
        <div className='flex justify-center my-[10px]'>
            <button onClick={() => setIsOpenForm(true)} className="group cursor-pointer outline-none hover:rotate-90 duration-300" title="Add New">
              <svg className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px] 3xl:w-[60px] 3xl:h-[60px] stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeWidth={1.5} d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
                <path strokeWidth={1.5} d="M8 12H16" />
                <path strokeWidth={1.5} d="M12 16V8" />
              </svg>
            </button>
          </div>
      }
    </div>
  );
};

