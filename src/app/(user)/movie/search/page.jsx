import { getMovieByNameOrSlug } from "@/services/movieService";
import { IconHome } from '@/components/icon/Icon';
import Link from 'next/link';
import MovieComponent from '../MovieComponent';
import UserLayout from "@/app/(layout)/UserLayout";
import { baseOpenGraph } from "@/app/sharedMetadata";

export async function generateMetadata() {
  const url = process.env.NEXT_PUBLIC_URL + '/movie/';

  return {
    title: "Phimvip - Xem phim chất lượng cao không quảng cáo - Cập nhật liên tục tại PhimVip.com",
    description: "PhimVip.com là trang xem phim chất lượng cao, không quảng cáo, cập nhật phim mới liên tục. Trải nghiệm giải trí hàng đầu với tốc độ nhanh và nội dung phong phú.",
    openGraph: {
      ...baseOpenGraph,
      title: "Phimvip - Xem phim chất lượng cao không quảng cáo - Cập nhật liên tục tại PhimVip.com",
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

export default async function SearchMovie({ searchParams }) {
  const currentPage= parseInt(searchParams.page) || 1;

  const dataPromise = await getMovieByNameOrSlug({query: searchParams.query}, currentPage);
  
  return(
    <UserLayout>
      <div className="relative mt-2 pb-2">
        <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
          <IconHome />
          <Link href="/" className=" text-[12px] sm:text-[14px] 3xl:text-[18px]">Trang chủ</Link>
          <span className="text-[12px] sm:text-[14px] 3xl:text-[18px]">{">"}</span>
          <span className="font-bold text-[12px] sm:text-[14px] 3xl:text-[18px]">Kết quả tìm kiếm: {searchParams.query}</span>
        </div>

        <MovieComponent dataPromise={dataPromise} currentPage={currentPage}/>
      </div>
    </UserLayout>
  );
}