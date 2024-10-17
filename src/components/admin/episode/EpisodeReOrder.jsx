"use client";
import React, { useEffect, useState } from "react";
import { IconClear, IconSave } from "../../icon/Icon";
import { Reorder } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { getAllEpisodeByMovieId, updateEpisodeSortOrder } from "../../../services/episodeService";
import Loading from "../../loading/Loading";
import { ErrorAlert, SuccessAlert, WarningAlert } from "../../alert/FlashAlert";

export default function EpisodeReOrder({ movId, handleCancel, setIsUpdated }) {
    const [isLoading, setIsLoading] = useState(false);
    const [initialEpisodes, setInitialEpisodes] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [episodeToUpdate, setEpisodeToUpdate] = useState([]);

    // get all episodes from API
    useEffect(() => {
        const fetchEpisode = async () => {
            setIsLoading(true);
            try {
                const fetchedEpisode = await getAllEpisodeByMovieId(movId); // Fetch all episode by movieID
                setInitialEpisodes(fetchedEpisode.data.episodes);
                setEpisodes(fetchedEpisode.data.episodes);
            } catch (error) {
                console.error("Error fetching episode data", error);
            } finally {
                setIsLoading(false);
            }
        };
        if(movId){
            fetchEpisode();
        }
    }, [movId]);
    
    // Reorder handler function
    const handleReorder = (newOrder) => {
        // Update sort_order to new order
        const updatedEpisodes = newOrder.map((episode, index) => ({
            ...episode,
            sort_order: index + 1,  // Sort order starts from 1
        }));
        // Update episode list in state
        setEpisodes(updatedEpisodes);

        // Compare based on ep_id and sort_order to find episodes to update
        const episodesUpdates = updatedEpisodes.filter((newEpisode) => {
            const initialEpisode = initialEpisodes.find(
            (initialEp) => initialEp.ep_id === newEpisode.ep_id
            );
            return newEpisode.sort_order !== initialEpisode.sort_order;
        });
        setEpisodeToUpdate(episodesUpdates);
    };

    const handleSave = async() => {
        // Send update requests for episodes with change in sort_order
        if (episodeToUpdate.length > 0) {
            // Check ep_id and sort_order values
            const validEpisodesToUpdate = episodeToUpdate.filter(episode => 
                episode.ep_id != null && episode.ep_id !== '' && 
                episode.sort_order != null && episode.sort_order !== ''
            );
            if (validEpisodesToUpdate.length > 0) {
                try {
                    // Sử dụng Promise.all để thực hiện các request đồng thời
                    await Promise.all(
                        validEpisodesToUpdate.map((episode) => {
                            return updateEpisodeSortOrder(episode.ep_id, episode.sort_order);
                        })
                    );
                    handleCancel();  // Huỷ hoặc reset lại form sau khi thành công
                    setIsUpdated(true);  // Đánh dấu là đã cập nhật
                    SuccessAlert('Cập nhật thứ tự thành công', 1500, "top-right");
                } catch (error) {
                    // Khi có 1 request bị lỗi, thông báo lỗi và dừng lại
                    ErrorAlert(error.data.message||'Cập nhật thứ tự thất bại', 2000, "top-right");
                }
            } else {
                ErrorAlert('Không thể cập nhật thứ tự', 2000, "top-right");
            }
        } else {
            WarningAlert('Chưa có thay đổi. Hãy sắp xếp ít nhất 1 tập', 2000, "top-right");
        }
    }

    return (
        !isLoading&&initialEpisodes?
        <Reorder.Group axis="y" values={episodes} onReorder={handleReorder}>
            <div className="w-full max-h-[750px] overflow-auto mb-3">
                {episodes.map((episode) => (
                    <EpisodeCardReOrder
                        key={episode.ep_id}
                        episode={episode}
                    />
                ))}
            </div>
            <div className="flex justify-end gap-4">
                <Button onClick={handleCancel} variant="outlined" 
                    className="rounded-full text-white border-white flex items-center gap-2 font-md text-[10px] sm:text-[14px] 3xl:text-[20px] px-[10px] py-[4px] sm:px-[12px] 3xl:py-[10px] 3xl:px-[20px]">
                    <IconClear />Hủy
                </Button>
                <Button onClick={handleSave} variant="outlined" 
                    className="rounded-full text-white border-white flex items-center gap-2 font-md text-[10px] sm:text-[14px] 3xl:text-[20px] px-[10px] py-[4px] sm:px-[12px] 3xl:py-[10px] 3xl:px-[20px]">
                    <IconSave />Lưu
                </Button>
            </div>
        </Reorder.Group>
        :
        <Loading />
    );
}

const EpisodeCardReOrder = ({ episode }) => {
    return(
    <Reorder.Item value={episode} as="div" className="mb-2">
        <div className='py-2 sm:py-4 3xl:py-6 px-3 shadow-lg border rounded-md bg-gray-300 bg-opacity-30 backdrop-blur'>
            {/* HEADER */}
            <div className='flex justify-center items-center'>
                <span className='font-bold text-[12px] sm:text-[16px] 3xl:text-[25px] text-center text-white'>{episode.ep_name}</span>
            </div>
        </div>
    </Reorder.Item>
)}
