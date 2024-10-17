import React from 'react';
import TableMovie from '@/components/movie/TableMovie';
import Pagination from '@/components/pagination/Pagination';

export default async function MovieComponent({ dataPromise, currentPage }) {
    const data = await dataPromise;

    const colDefs = [
      {headerName: "Tên"},
      {headerName: "Năm"},
      {headerName: "Tình trạng"},
      {headerName: "Thể loại"},
      {headerName: "Quốc gia"},
      {headerName: "Ngày cập nhật"},
    ];
    
    if(!data){
      return <div className='text-2xl text-white'>Không tìm thấy phim</div>
    }
  
    return (
      <div>
        <div className="overflow-x-auto mb-2">
          <p className='text-white text-[10px] xl:text-[14px] 3xl:text-[18px] mb-[8px]'><strong>{data.totalMovies} </strong> kết quả</p>
          <TableMovie colDefs={colDefs} movies={data.movies}/>
        </div>
  
        {/* pagination */}
        {data.totalMovies!==0&&<Pagination currentPage={currentPage} totalDatas={data.totalMovies} totalPages={data.totalPages} />}
      </div>
    );
}
