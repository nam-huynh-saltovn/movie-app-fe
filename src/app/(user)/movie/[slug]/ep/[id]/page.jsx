import React from 'react';
import { IconHome } from '@/components/icon/Icon';
import Link from 'next/link';
import { getLatestMovie, getMovieBySlug } from '@/services/movieService';
import VideoPlayer from './VideoPlayer';
import ListEpisode from './ListEpisode';
import MovieHot from './MovieHot';
import UserLayout from '@/app/(layout)/UserLayout';
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata({ params }) {
    const movie = await getMovieBySlug(params.slug);
    const currentEp = movie?.Episodes.find((ep) => ep.ep_id === parseInt(params.id))

    const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.slug + '/ep/' + params.id;
  
    return {
      title: currentEp?currentEp.ep_title:'',
      description: movie?movie.content:'',
      openGraph: {
        ...baseOpenGraph,
        title: movie?`${movie.mov_name} - ${movie.ori_name} (${movie.Year.year_name}) - ${currentEp&&currentEp.ep_name}`:'',
        description: movie?movie.content:'',
        url,
        images: [
          {
            url: movie?movie.poster_url:''
          }
        ]
      },
      alternates: {
        canonical: url
      }
    };
}

export default async function ViewMovie({params}) {
    const movie = await getMovieBySlug(params.slug);
    const dataMovieHot = await getLatestMovie(1, 10);

    const movieHot = dataMovieHot?.movies;
    const listMovie = dataMovieHot?.movies.slice(0,5);
    const episodes = movie?.Episodes;
    const currentEp = movie?.Episodes.find((ep) => ep.ep_id === parseInt(params.id))

    return (
        <UserLayout>
            {!movie || !currentEp
            ?
                <div className="flex flex-col items-center justify-center h-[580px] text-white text-lg">
                    <div className="flex gap-2 mb-4">
                        <IconHome />
                        <Link href="/">Trang chủ</Link>
                    </div>
                    <p>Không tìm thấy movie này</p>
                </div>
            :
                <div className="py-2 px-1 sm:px-10">
                    {/* Breadcrumb navigation */}
                    <Breadcrumbs movie={movie} currentEp={currentEp} />

                    {/* Video and Episode list */}
                    <div className="h-full bg-[#202c3c] p-2 rounded-xl my-4">
                        <div className="grid xl:flex gap-2 h-full">
                            {/* view to watch movie */}
                            <div className="w-full h-full xl:w-[70%]">
                                <VideoPlayer videoUrl={currentEp.link_m3u8} />
                            </div>

                            {/* Show list episode */}
                            <ListEpisode slug={params.slug} episodes={episodes} currentEpId={params.id}/>
                        </div>
                    </div>
                    
                    <div className="grid lg:flex gap-2 h-full bg-[#202c3c] p-2 rounded-xl my-4">
                        <div className="w-full bg-[#23262D] p-2 rounded-lg" style={{flex:'0 0 70%'}}>
                            <div className="py-[2px] px-4 border-l-4 mb-2">
                            <h2 className="font-bold text-white text-[15px] 3xl:text-[23px]">THÔNG TIN PHIM</h2>
                            </div>
                            <img className="block md:hidden rounded-md h-[170px] w-full object-cover" src={movie.thumb_url} alt="" />
                            <div className="flex gap-3">
                                <img className="hidden md:block sm:h-[200px] sm:w-[150px] 3xl:h-[300px] 3xl:w-[200px] rounded-md" src={movie.poster_url} alt="" />
                                
                                <div>
                                <h2 className="font-medium text-[15px] xl:text-[17px] 3xl:text-[23px] text-white">{movie?movie.mov_name:'Đang cập nhật'}</h2>
                                <p className="text-gray-400 text-[13px] xl:text-[15px] 3xl:text-[20px]">Trạng thái: {movie?movie.lang:'Đang cập nhật'}</p>
                                <p className="text-gray-400 text-[13px] xl:text-[15px] 3xl:text-[20px]">Quốc gia: {movie&&movie.Countries.length>0?movie.Countries[0].ctr_name:'Đang cập nhật'}</p>
                                <p className="text-gray-400 text-[13px] xl:text-[15px] 3xl:text-[20px]">Thời gian: {movie?movie.time:'Đang cập nhật'}</p>
                                <p className="text-gray-400 text-[13px] xl:text-[15px] 3xl:text-[20px]">Năm: {movie&&movie.Year?movie.Year.year_name:'Đang cập nhật'}</p>
                                <p className="text-gray-400 text-[13px] xl:text-[15px] 3xl:text-[20px]">Thể loại: {movie&&movie.Categories.length>0?movie.Categories.map(cat=>cat.cat_name).join(" - "):'Đang cập nhật'}</p>
                                <p className="text-gray-400 text-[13px] xl:text-[15px] 3xl:text-[20px]">Diễn viên: {movie&&movie.Actors.length>0?movie.Actors.map(act=>act.act_name).join(" - "):'Đang cập nhật'}</p>
                                </div>
                            </div>
                            <div className="mt-2">
                            <h2 className="text-white font-medium text-[15px] 3xl:text-[23px]">Nội dung phim</h2>
                            <p dangerouslySetInnerHTML={{ __html: movie.content }} className="text-white text-[13px] xl:text-[15px] 3xl:text-[20px] break-words whitespace-normal"/>
                            </div>
                        </div>

                        <div className="w-full bg-[#23262D] p-2 rounded-lg" style={{flex:'0 0 29%'}}>
                            <MovieHot movies={listMovie} movieHot={movieHot}/>
                        </div>
                    </div>
                </div>
            }
        </UserLayout>
    )
}

const Breadcrumbs = ({ movie, currentEp }) => (
    <div className="flex gap-2 items-center text-gray-300 mb-4">
        <IconHome />
        <Link className="hover:text-gray-600 line-clamp-1 text-[12px] sm:text-[14px] 3xl:text-[18px]" href="/">Trang chủ</Link>
        {(movie&&currentEp)&&
            <>
                <span className="sm:block hidden text-[12px] sm:text-[14px] 3xl:text-[18px]">{'>'}</span>
                <Link className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] line-clamp-1 min-w-[55px] sm:block hidden" href={`/movie/type/${movie.Type.type_slug}`}>{movie.Type.type_name}</Link>
                <span className="sm:block hidden text-[12px] sm:text-[14px] 3xl:text-[18px]">{'>'}</span>
                <Link className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] line-clamp-1 min-w-[55px] sm:block hidden" href={`/movie/country/${movie.Countries[0].ctr_slug}`}>{movie.Countries[0].ctr_name}</Link>
                <span className="text-[12px] sm:text-[14px] 3xl:text-[18px]">{'>'}</span>
                <Link className="hover:text-white text-[12px] sm:text-[14px] 3xl:text-[18px] line-clamp-1 min-w-[55px]" href={`/movie/detail/${movie.mov_slug}`}>{movie.mov_name}</Link>
                <span className="text-[12px] sm:text-[14px] 3xl:text-[18px]">{'>'}</span>
                <span className="text-[12px] sm:text-[14px] 3xl:text-[18px]">{currentEp.ep_name}</span>
            </>
        }
    </div>
);