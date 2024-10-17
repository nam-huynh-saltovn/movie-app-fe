import AdminLayout from '../(layout)/AdminLayout';
import MovieCardList from '@/components/admin/movie/list-movie/MovieCardList';
import Pagination from '@/components/pagination/Pagination';
import DropDownFilter from '@/components/common/DropDownFilter';
import AdminFilter from '@/components/fillter/AdminFilter';
import { filterMovie } from '@/services/movieService';
import { fetchDataFromAPI } from '@/lib/features/data/dataAPI';
import { baseOpenGraph } from '../sharedMetadata';

export async function generateMetadata() {
  const url = process.env.NEXT_PUBLIC_URL + '/admin';

  return {
    title: "Trang quản trị - Quản lý nội dung PhimVip.com",
    description: "Truy cập trang quản trị để quản lý và cập nhật nội dung phim, người dùng và các chức năng hệ thống của PhimVip.com. Dành riêng cho quản trị viên với quyền hạn cao.",
    openGraph: {
      ...baseOpenGraph,
      title: "Trang quản trị - Quản lý nội dung PhimVip.com",
      description: "Truy cập trang quản trị để quản lý và cập nhật nội dung phim, người dùng và các chức năng hệ thống của PhimVip.com. Dành riêng cho quản trị viên với quyền hạn cao.",
      url,
      images: [
        {
          url: '/public/thumb.png'
        }
      ]
    },
    alternates: {
      canonical: url
    }
  };
}
export default async function AdminHome({ searchParams }) {
  const currentPage = parseInt(searchParams.page|| 1);
  const sort = parseInt(searchParams.sort) || 1;
  const params = {
    sort,
    query: searchParams.query,
    year: searchParams.year,
    type: searchParams.type,
    category: searchParams.cat,
    country: searchParams.ctr,
    lang: searchParams.lang,
    quality: searchParams.qua,
    actor: searchParams.act,
    director: searchParams.dir,
  };

  const dataPromise = await filterMovie(params, currentPage);
  const DataFilterPromise = await fetchData();

  return (
    <AdminLayout index={0}>
      <div className="h-full min-h-[583px] 2xl:min-h-[1000px]">

        <FilterComponent DataFilterPromise={DataFilterPromise} paramState={params}/>

        <DropdownSort sort={sort} searchParams={searchParams}/>

        <DataMovieComponent dataPromise={dataPromise} DataFilterPromise={DataFilterPromise} currentPage={currentPage} paramState={params}/>
      </div>
    </AdminLayout>
  )
}

// Component để hiển thị dữ liệu
async function DataMovieComponent({ dataPromise, DataFilterPromise, currentPage, paramState }) {
  const dataMovie = await dataPromise;
  const dataFilter = await DataFilterPromise;

  const validResult = [
    paramState?.query,
    paramState?.lang,
    paramState?.quality,
    paramState?.year,
    dataFilter.typeData&&dataFilter.typeData.length>0?dataFilter.typeData.filter(t => t.type_slug === paramState?.type).map(t => t.type_name).join(", "):'',
    dataFilter.categoryData&&dataFilter.categoryData.length>0?dataFilter.categoryData.filter(cate => cate.cat_slug === paramState?.category).map(cate => cate.cat_name).join(", "):'',
    dataFilter.countryData&&dataFilter.countryData.length>0?dataFilter.countryData.filter(coun => coun.ctr_slug === paramState?.country).map(coun => coun.ctr_name).join(", "):'',
    paramState?.actor,
    paramState?.director
  ];
  
  const validValues = validResult.filter(value => value && value.length > 0).join(', ');

  return (
    !dataMovie
      ?
        <div className="flex justify-center items-center h-screen text-white">
          <p>Không tìm thấy phim nào</p>
        </div>
      :
        <>
          <p className='text-white text-[10px] xl:text-[14px] 3xl:text-[18px] mb-[8px]'>
            {validValues
              ?<span><strong>{dataMovie.totalMovies}</strong> kết quả lọc: <strong>{validValues}</strong></span>
              :<span><strong>{dataMovie.totalMovies}</strong> kết quả</span>
            }
          </p>
          {dataMovie.movies.map((movie) => (
            <MovieCardList key={movie.mov_id} movie={movie}/>
          ))}
          {dataMovie.totalMovies!=0&&<Pagination currentPage={currentPage} totalDatas={dataMovie.totalMovies} totalPages={dataMovie.totalPages}/>}
        </>
  );
}

async function FilterComponent({ DataFilterPromise, paramState }){
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

  return(
    <div className='bg-[#202c3c] p-4 rounded-lg'>
      <AdminFilter optionState={optionState} paramState={paramState}/>
    </div>
  )
}

async function DropdownSort ({ sort, searchParams }){
  const updateSortParameter = (sortValue) => {
    const validSortValues = [1, 2, 3]; // Define valid values ​​for sort
    if (!validSortValues.includes(sortValue)) {
      return; // Avoid changing URL if value is invalid
    }
    const params = new URLSearchParams(searchParams)
    params.set('sort', sortValue); // Update or add sort value
    return `?${params.toString()}`; // Returns new URL
  };

  const sortOptions = [
    { name: 'Mới nhất', href: updateSortParameter(1), value: 1 },
    { name: 'Cũ nhất', href: updateSortParameter(2), value: 2 },
    { name: 'A-Z', href: updateSortParameter(3), value: 3 },
  ];

  return(
    <div className='flex gap-3 items-center mt-4'>
      <DropDownFilter curent={sort} sortOptions={sortOptions} />
    </div>
  )
}

const fetchData = async()=>{
  const endpoints = ['category', 'year', 'country', 'type'];
  const responses = await Promise.all(
      endpoints.map(endpoint => fetchDataFromAPI(endpoint))
  );
  
  const [categoryData, yearData, countryData, typeData] = responses.map(res => res);
  return { categoryData, yearData, countryData, typeData };
}