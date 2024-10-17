"use client";
import React from 'react';
import { Button } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import { IconEdit } from '@/components/icon/Icon';

export default function MovieCardList({ movie }) {
    const router = useRouter();
    
    const handleShowMovieDetail = () => {
        router.push(`/admin/movie/${movie.mov_slug}`);
    };
    
    const title = [
        {title: "Tình trạng", value: movie.episode_current},
        {title: "Số tập", value: movie.episode_total},
        {title: "Thời lượng", value: movie.time},
        {title: "Năm phát hành", value: movie.Year.year_name},
        {title: "Chất lượng", value: movie.quality},
        {title: "Ngôn ngữ", value: movie.lang},
        {title: "Đạo diễn", value: movie.Directors.length>0?movie.Directors.map((director)=>director.dir_name).join(", "):"Đang cập nhật"},
        {title: "Diễn viên", value: movie.Actors.length>0&&movie.Actors.map((actor)=>actor.act_name).join(", ")},
        {title: "Thể loại", value: movie.Type&&movie.Type.type_name},
        {title: "Danh mục", value: movie.Categories.length>0&&movie.Categories.map((cat)=>cat.cat_name).join(", ")},
        {title: "Quốc gia", value: movie.Countries.length>0?movie.Countries.map((ctr)=>ctr.ctr_name).join(", "):"Đang cập nhật"}
    ];

    return (
        <div className={`relative px-[10px] xl:px-[20px] 3xl:px-[30px] py-4 my-3 rounded-md bg-[#202c3c]`}>
            <div className="flex flex-col justify-center items-center mb-2 cursor-pointer" onClick={handleShowMovieDetail}>
                <p className='line-clamp-1 font-bold text-[11px] lg:text-[15px] 3xl:text-[22px] text-[#8b5cf6]'>{movie.mov_name.toUpperCase()}</p>
                <span className='line-clamp-1 font-normal text-[10px] lg:text-[14px] 3xl:text-[20px] text-[#1496d5]'>{movie.ori_name}</span>
            </div>

            <hr />

            <div className='flex mt-2 items-center'>
                <div className="flex justify-center items-start mr-[7px] xl:mr-[10px] 3xl:mr-[15px]">
                    <img src={movie.poster_url} className="w-[95px] h-[145px] lg:w-[170px] lg:h-[220px] 3xl:w-[220px] 3xl:h-[320px] border rounded-md shadow object-cover"
                    />
                </div>
                <div className="w-full">
                    {title.map((item, index) => {
                    return (
                        <Content key={index} title={item.title} value={item.value} />
                    )
                    })}
                </div>
            </div>

            <div className='absolute top-2 3xl:top-4 right-4 mt-2 mr-2'>
                <Button onClick={handleShowMovieDetail} variant="gradient" color='purple' className="hidden sm:flex sm:items-center gap-1 rounded-xl font-md py-1 px-3 cursor-pointer sm:text-[9px] lg:text-[10px] 3xl:text-[18px]">
                    <IconEdit />Sửa
                </Button>
            </div>
        </div>
    ) 
}

const Content = ({ title, value }) => {
    return(
        <div className="flex gap-5">
            <div className='w-[95px] sm:w-[100px] xl:w-[120px] 3xl:w-[180px]'>
                <p className='line-clamp-1 text-[9px] lg:text-[14px] 3xl:text-[20px] font-medium text-[#1496d5]'>{title}</p>
            </div>
            <div className='w-[90%]'>
                <p className='line-clamp-1 text-[9px] lg:text-[14px] 3xl:text-[20px] text-white'>{value}</p>
            </div>
        </div>
    )
}