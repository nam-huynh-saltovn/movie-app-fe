import HomeFilter from "@/components/fillter/HomeFilter";
import Loading from "@/components/loading/Loading";
import TableMovie from "@/components/movie/TableMovie";
import Pagination from "@/components/pagination/Pagination";
import { fetchDataFromAPI } from "@/lib/features/data/dataAPI";
import { getLatestMovie } from "@/services/movieService";
import { Suspense } from "react";
import UserLayout from "./(layout)/UserLayout";

export default async function Home() {
  const dataPromise = await getLatestMovie(1);
  const DataFilterPromise = await fetchData();
  
  return(
    <UserLayout>
      <Suspense fallback={<Loading />}>
        <div className="relative mt-2 pb-2">
            <DataFilterComponent DataFilterPromise={DataFilterPromise} />
            
            <DataMovieComponent dataPromise={dataPromise}/>
        </div>
      </Suspense>
    </UserLayout>
  );
}

// Component để hiển thị dữ liệu
async function DataMovieComponent({ dataPromise }) {
  const data = await dataPromise;

  const colDefs = [
    {headerName: "Tên"},
    {headerName: "Năm"},
    {headerName: "Tình trạng"},
    {headerName: "Thể loại"},
    {headerName: "Quốc gia"},
    {headerName: "Ngày cập nhật"},
  ];

  return (
    !data
    ?
      <Loading />
    :
      <div>
        <div className="overflow-x-auto mb-2">
          <p className='text-white text-[10px] xl:text-[14px] 3xl:text-[18px] mb-[8px]'><strong>{data?.totalMovies} </strong> kết quả</p>
          <TableMovie colDefs={colDefs} movies={data?.movies}/>
        </div>

        {/* pagination */}
        {data?.totalMovies!==0&&<Pagination currentPage={1} totalDatas={data?.totalMovies} totalPages={data?.totalPages} />}
      </div>
  );
}

// Component để hiển thị dữ liệu
async function DataFilterComponent({ DataFilterPromise }) {
  const { categoryData, yearData, countryData, typeData } = await DataFilterPromise;

  // Utility function to format options for select inputs
  const formatOptions = (data, valueField, labelField, slugField = null) =>
      data?.map(item => ({
      ...item,
      // Add fields for value and label to use in <Select /> library
      value: item[valueField], 
      label: item[labelField],
      ...(slugField && { slug: item[slugField] }), // Add slug if provided
  }));

  // State options for select inputs (type, year, category, etc.)
  const optionState = { 
      yearOptions: formatOptions(yearData, 'year_name', 'year_name'),
      typeOptions: formatOptions(typeData, 'type_slug', 'type_name'), 
      categoryOptions: formatOptions(categoryData, 'cat_slug', 'cat_name'), 
      countryOptions: formatOptions(countryData, 'ctr_slug', 'ctr_name')
  };

  return (
    <div className='bg-[#202c3c] p-2 rounded-md mb-4'>
      <HomeFilter optionState={optionState}/>
    </div>
  );
}

const fetchData = async()=>{
  const endpoints = ['category', 'year', 'country', 'type'];
  const responses = await Promise.all(
      endpoints.map(endpoint => fetchDataFromAPI(endpoint))
  );
  
  const [categoryData, yearData, countryData, typeData] = responses.map(res => res);
  return { categoryData, yearData, countryData, typeData };
}