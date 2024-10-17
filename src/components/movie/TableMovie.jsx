import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function TableMovie({ colDefs, movies }) {
  return (
    <table className="w-full mb-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
        <thead className="text-xs text-white uppercase bg-[#202c3c] dark:bg-gray-700 dark:text-gray-400">
            <tr className='border-b border-gray-700'>{colDefs.map((col,index) => {
                return (
                    <th key={index} scope="col" className="px-6 py-3 text-nowrap text-[9px] sm:text-[11px] lg:text-[13px] 3xl:text-[15px]">{col.headerName}</th>
                )
            })}
            </tr>
        </thead>
        <tbody className='w-full'>
            {!movies.length>0
            ?
            <tr><td colSpan="6" className='py-4 text-[9px] sm:text-[11px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[15px] text-white font-medium'>Không có phim nào để hiển thị</td></tr>
            :
                movies.map((movie) => {
                    return (
                        <tr key={movie.mov_id} className="bg-[#202c3c] border-b border-gray-700">
                            <td className="min-w-[220px] sm:min-w-[400px] px-3 sm:px-6 py-1">
                                <Link href={`/movie/${movie.mov_slug}`} className='flex items-center gap-2 py-1'>
                                    <Image src={movie.poster_url} alt="poster" width={40} height={55} className="w-[40px] h-[55px] sm:w-[50px] sm:h-[70px] border rounded shadow object-cover" />
                                    <div className='cursor-pointer'>
                                        <p className='text-[10px] sm:text-[12px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[16px] text-[#8b5cf6] font-bold hover:text-blue-700 line-clamp-1'>{movie.mov_name}</p>
                                        <p className='text-white text-[9px] sm:text-[11px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[15px] line-clamp-1'>{movie.ori_name}</p>
                                    </div>
                                </Link>
                            </td>
                            <td className="px-6 py-1 text-white text-[9px] sm:text-[11px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[17px]">{movie.Year?movie.Year.year_name:"Đang cập nhật"}</td>
                            <td className="min-w-[140px] sm:min-w-[160px] px-6 py-1">
                                {movie.episode_current&&<p className='text-green-400 bg-[#131b24] rounded-full px-3 py-[3px]'>
                                    <span className='line-clamp-1 text-[9px] sm:text-[11px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[17px]'>{movie.episode_current}</span>
                                </p>}
                                
                            </td>
                            <td className="min-w-[100px] sm:min-w-[110px] px-6 py-1 text-white"><span className='line-clamp-1 text-[9px] sm:text-[11px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[17px]'>{movie.Type?movie.Type.type_name:"Đang cập nhật"}</span></td>
                            <td className="min-w-[110px] sm:min-w-[120px] lg:min-w-[140px] px-6 py-1 text-white"><span className='line-clamp-1 text-[9px] sm:text-[11px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[17px]'>{movie.Countries.length>0?movie.Countries[0].ctr_name:"Đang cập nhật"}</span></td>
                            <td className="min-w-[130px] sm:min-w-[150px] lg:min-w-[170px] px-6 py-1 text-red-600"><span className='line-clamp-1 text-[9px] sm:text-[11px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[17px]'>{movie.updatedAt}</span></td>
                    </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}