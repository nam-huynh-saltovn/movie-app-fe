import React from "react";
import { IconHome } from "@/components/icon/Icon";
import ToggleSection from "@/components/movie/ToggleSection";
import Link from "next/link";

export default function MovieDetail({ movie }) {
  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-[580px] text-white text-lg">
        <div className="flex gap-2 mb-4">
          <IconHome />
          <Link href="/">Trang chủ</Link>
        </div>
        <p>Không tìm thấy movie này</p>
      </div>
  )}

  const dataTable = [
    { title: "Tình trạng", value: movie.episode_current },
    { title: "Số tập", value: movie.episode_total },
    { title: "Thời lượng", value: movie.time },
    { title: "Năm phát hành", value: movie?movie.Year.year_name:'' },
    { title: "Chất lượng", value: movie.quality },
    { title: "Ngôn ngữ", value: movie.lang },
    { title: "Đạo diễn", value: movie.Directors.map(d => d.dir_name).join(", ") || "Đang cập nhật" },
    { title: "Diễn viên", value: movie.Actors.map(a => a.act_name).join(", ") || "Đang cập nhật" },
    { title: "Thể loại", value: movie.Type.type_name },
    { title: "Quốc gia", value: movie.Countries[0].ctr_name }
  ];

  return(
    <div className="py-2">
      {/* Breadcrumb navigation */}
      <Breadcrumbs movie={movie} />

      <hr />

      {/* Movie thumb */}
      <div className="w-full h-[200px] pt-4 sm:hidden">
        <img src={movie.thumb_url} alt="poster" className="rounded-md w-full h-full object-cover" />
      </div>

      {/* Movie details section */}
      <div className="h-full bg-[#202c3c] p-2 rounded-xl my-4 sm:flex gap-2">
        <MoviePoster movie={movie} />
        <MovieInfo movie={movie} dataTable={dataTable} />
      </div>

      {/* Content and Episodes */}
      <div className="h-full bg-[#202c3c] p-2 rounded-xl my-4">
        <ToggleSection title="Nội dung phim">
          <div dangerouslySetInnerHTML={{ __html: movie.content }} className="text-white text-[12px] xl:text-[14px] 3xl:text-[23px] break-words whitespace-normal" />
        </ToggleSection>

        <ToggleSection title="Danh sách tập">
          <div className="flex flex-wrap justify-items-center gap-3">
          {movie.Episodes&&movie.Episodes.length>0
          ?
          movie.Episodes.map((episode) => (
              <Link key={episode.ep_id} href={`/movie/${movie.mov_slug}/ep/${episode.ep_id}`} className="py-1 3xl:py-[10px] bg-gray-400 text-center text-[12px] xl:text-[14px] 3xl:text-[20px] rounded-md w-[60px] lg:w-[80px] 3xl:w-[110px]">
              {episode.ep_name}
              </Link>
          ))
          :
          <p className="text-gray-600">Chưa có tập phim nào</p>
          }
          </div>
        </ToggleSection>
      </div>
    </div>
  )
}

const Breadcrumbs = ({ movie }) => (
    <div className="flex gap-2 items-center text-gray-300 mb-4">
        <IconHome />
        <Link href="/" className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] text-nowrap">Trang chủ</Link>
        {movie&&
            <>
                <span className="sm:block hidden text-[12px] sm:text-[14px] 3xl:text-[18px]">{'>'}</span>
                <Link className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] text-nowrap sm:block hidden" href={`/movie/type/${movie.Type.type_slug}`}>{movie.Type.type_name}</Link>
                <span className="sm:block hidden text-[12px] sm:text-[14px] 3xl:text-[18px]">{'>'}</span>
                <Link className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] text-nowrap sm:block hidden" href={`/movie/country/${movie.Countries[0].ctr_slug}`}>{movie.Countries[0].ctr_name}</Link>
                <span className="text-[12px] sm:text-[14px] 3xl:text-[18px]">{'>'}</span>
                <span className="font-bold line-clamp-1 text-[12px] sm:text-[14px] 3xl:text-[18px]">{movie.mov_name} - {movie.ori_name} ({movie.Year.year_name})</span>
            </>
        }
    </div>
);
  
const MoviePoster = ({ movie }) => {
  return(
    <div className="relative w-[300px] h-[350px] xl:w-[350px] xl:h-[400px] 3xl:h-[440px] sm:block hidden">
      <img src={movie.poster_url} alt="poster" className="rounded-md w-full h-full object-cover" />
      {movie.Episodes&&movie.Episodes.length>0&&
        <div className="absolute bottom-0 w-full px-2 py-1 bg-transparent backdrop-blur-lg rounded-md">
          <div className="flex justify-center">
            <Link href={`${movie.Episodes&&movie.Episodes.length>0?`/movie/${movie.mov_slug}/ep/${movie.Episodes&&movie.Episodes.length>0&&movie.Episodes[0].ep_id}`:''}`} className="line-clamp-1 py-1 px-4 bg-red-800 text-white text-[15px] 3xl:text-[20px] rounded-md">
                Xem phim
            </Link>
          </div>
        </div>
      }
    </div>
)};
  
const MovieInfo = ({ movie, dataTable }) => (
  <div className="w-full p-2 rounded-md bg-opacity-30 backdrop-blur">
    <div className="text-center border-b border-gray-700 mr-2 pb-2">
        <p className="line-clamp-2 font-bold text-[#8b5cf6] text-[13px] md:text-[14px] xl:text-[16px] 3xl:text-[20px]">{movie.mov_name.toUpperCase()}</p>
        <span className="line-clamp-2 font-normal text-[#1496d5] text-[12px] md:text-[13px] xl:text-[15px] 3xl:text-[19px]">{movie.ori_name}</span>
    </div>
    <div className="flex flex-col gap-1 pr-2">
      {dataTable.map(({ title, value }) => (
        <div key={title}>
          <div className="flex gap-5 py-[2px] border-b border-gray-700">
            <div className="w-[160px] line-clamp-1 text-[#1496d5] font-medium text-[14px] xl:text-[16px] 3xl:text-[19px]">{title}</div>
            <div className="w-full line-clamp-1 text-[#909fdd] text-[14px] xl:text-[16px] 3xl:text-[19px]">{value?value:"Đang cập nhật"}</div>
          </div>
        </div>
      ))}
      <div className="w-full text-center mt-2 bg-transparent backdrop-blur-lg rounded-md sm:hidden">
        <Link href={`${movie.Episodes&&movie.Episodes.length>0?`/movie/${movie.mov_slug}/ep/${movie.Episodes&&movie.Episodes.length>0&&movie.Episodes[0].ep_id}`:''}`} className="line-clamp-1 py-1 px-4 bg-red-800 text-white text-[14px] rounded-md">
          Xem phim
        </Link>
      </div>
    </div>
  </div>
);