import UserLayout from "@/app/(layout)/UserLayout";
import { baseOpenGraph } from "@/app/sharedMetadata";
import HomeFilter from "@/components/fillter/HomeFilter";
import TableMovie from "@/components/movie/TableMovie";
import Pagination from "@/components/pagination/Pagination";
import { fetchDataFromAPI } from "@/lib/features/data/dataAPI";
import { filterMovie } from "@/services/movieService";

export async function generateMetadata() {
  const url = process.env.NEXT_PUBLIC_URL + '/movie/';

  return {
    title: "Trang chủ Phimvip - Xem phim chất lượng cao không quảng cáo - Cập nhật liên tục tại PhimVip.com",
    description: "PhimVip.com là trang xem phim chất lượng cao, không quảng cáo, cập nhật phim mới liên tục. Trải nghiệm giải trí hàng đầu với tốc độ nhanh và nội dung phong phú.",
    openGraph: {
      ...baseOpenGraph,
      title: "Trang chủ Phimvip - Xem phim chất lượng cao không quảng cáo - Cập nhật liên tục tại PhimVip.com",
      description: "PhimVip.com là trang xem phim chất lượng cao, không quảng cáo, cập nhật phim mới liên tục. Trải nghiệm giải trí hàng đầu với tốc độ nhanh và nội dung phong phú.",
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

export default async function Movie({ searchParams }) {
  const currentPage = parseInt(searchParams.page|| 1);
  const params = {
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
  
  return(
    <UserLayout>
      <div className="relative mt-2 pb-2">
        <DataFilterComponent DataFilterPromise={DataFilterPromise} paramState={params}/>
        
        <DataMovieComponent dataPromise={dataPromise} DataFilterPromise={DataFilterPromise} currentPage={currentPage} paramState={params}/>
      </div>
    </UserLayout>
  );
}

// Component để hiển thị dữ liệu
async function DataMovieComponent({ dataPromise, DataFilterPromise, currentPage, paramState }) {
  const dataMovie = await dataPromise;
  const dataFilter = await DataFilterPromise;

  const colDefs = [
    {headerName: "Tên"},
    {headerName: "Năm"},
    {headerName: "Tình trạng"},
    {headerName: "Thể loại"},
    {headerName: "Quốc gia"},
    {headerName: "Ngày cập nhật"},
  ];

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
    <div>
      <div className="overflow-x-auto mb-2">
        <p className='text-white text-[10px] xl:text-[14px] 3xl:text-[18px] mb-[8px]'>
          {validValues
            ?<span><strong>{dataMovie.totalMovies}</strong> kết quả lọc: <strong>{validValues}</strong></span>
            :<span><strong>{dataMovie.totalMovies}</strong> kết quả</span>
          }
        </p>
        <TableMovie colDefs={colDefs} movies={dataMovie.movies}/>
      </div>

      {/* pagination */}
      {dataMovie.totalMovies!==0&&<Pagination currentPage={currentPage} totalDatas={dataMovie.totalMovies} totalPages={dataMovie.totalPages} />}
    </div>
  );
}

// Component để hiển thị dữ liệu
async function DataFilterComponent({ DataFilterPromise, paramState }) {
  const { categoryData, yearData, countryData, typeData } = await DataFilterPromise;

  // Utility function to format options for select inputs
  const formatOptions = (data, valueField, labelField, slugField = null) => 
    data
      ?.filter(item => item[valueField] && item[labelField]) // Filter items with non-empty values ​​and labels
      .map(item => ({
        ...item,
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
      <HomeFilter optionState={optionState} paramState={paramState}/>
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