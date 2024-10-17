"use client";
import React from 'react';

// movie card for MovieDetailAdmin page
export default function MovieCardDetail({ movie }) {
    return(
        <>
            <div className="flex">
                <div style={{ flex: '0 0 20%' }}>
                    <img className="h-[340px] rounded-md" src={movie.poster_url} alt="" />
                </div>
                <div  style={{ flex: '0 0 75%' }}>
                    <div className="flex flex-col gap-2">
                        <div><strong className="text-[#1496d5]">Tình trạng:</strong> {movie.episode_current}</div>
                        <div><strong className="text-[#1496d5]">Số tập:</strong> {movie.episode_total}</div>
                        <div><strong className="text-[#1496d5]">Thời lượng:</strong> {movie.time}</div>
                        <div><strong className="text-[#1496d5]">Năm phát hành:</strong> {movie.Year.year_name}</div>
                        <div><strong className="text-[#1496d5]">Chất lượng:</strong> {movie.quality}</div>
                        <div><strong className="text-[#1496d5]">Ngôn ngữ:</strong> {movie.lang}</div>
                        <div><strong className="text-[#1496d5]">Thể loại:</strong> {movie.Type.type_name}</div>
                        <div><strong className="text-[#1496d5]">Quốc gia:</strong>{" "}
                            {movie.Countries.length > 0
                            ? movie.Countries.map((ctr) => ctr.ctr_name).join(", ")
                            : "Đang cập nhật"}
                        </div>
                        <div><strong className="text-[#1496d5]">Danh mục:</strong>{" "}
                            {movie.Categories.length > 0
                            ? movie.Categories.map((cat) => cat.cat_name).join(", ")
                            : "Đang cập nhật"}
                        </div>
                        <div><strong className="text-[#1496d5]">Đạo diễn:</strong>{" "}
                            {movie.Directors.length > 0
                            ? movie.Directors.map((director) => director.dir_name).join(", ")
                            : "Đang cập nhật"}
                        </div>
                        <div><strong className="text-[#1496d5]">Diễn viên:</strong>{" "}
                            {movie.Actors.length > 0
                            ? movie.Actors.map((actor) => actor.act_name).join(", ")
                            : "Đang cập nhật"}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold mt-2 text-[#1496d5]">Nội dung</h3>
                <strong></strong> {movie.content}
            </div>
        </>
    );
}