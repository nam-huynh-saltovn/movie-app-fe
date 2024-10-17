"use client"
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

export default function ListEpisode({ slug, episodes, currentEpId }) {
    const episodeRefs = useRef([]);

    useEffect(() => {
        // Kiểm tra nếu currentEpId có giá trị hợp lệ
        const currentEpisode = episodes.find(ep => ep.ep_id === parseInt(currentEpId));

        // Kiểm tra nếu currentEpisode không phải undefined
        if (currentEpisode) {
            const currentRef = episodeRefs.current[currentEpisode.ep_id];
            if (currentRef) {
                currentRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentEpId, episodes]);

    return (
        <div className="w-full xl:w-[30%] bg-[#23262D] p-2 rounded-lg overflow-auto lg:max-h-[310px] xl:max-h-[510px] 3xl:max-h-[750px]">
            <h3 className="text-white mb-2 text-[15px] xl:text-[17px] 3xl:text-[23px] font-semibold">Tập</h3>
            <ul className="flex flex-wrap gap-2 text-[14px] sm:text-[16px] lg:grid">
                {episodes.map((ep) => (
                    <Link key={ep.ep_id} href={`/movie/${slug}/ep/${ep.ep_id}`} scroll>
                        <li 
                            ref={el => episodeRefs.current[ep.ep_id] = el}
                            className={`py-1 px-5 lg:py-2 lg:px-4 mb-1 cursor-pointer rounded-lg ${
                                ep.ep_id === parseInt(currentEpId)
                                    ? "bg-blue-500 text-white"
                                    : "text-white bg-gray-300 hover:bg-gray-600 bg-opacity-30 backdrop-blur"
                            }`}
                        >
                            {ep.ep_name}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
