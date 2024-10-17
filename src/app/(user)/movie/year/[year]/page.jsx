import MovieComponent from '../../MovieComponent';
import MovieBreadcrumbs from '../../MovieBreadcrumbs';
import { getMovieByYear } from "@/services/movieService";
import UserLayout from "@/app/(layout)/UserLayout";
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata({ params }) {
  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.year;

  return {
    title: `Phim ${params.year||''} - Cập nhật nhanh chóng tại PhimVip.com`,
    description: `Xem các bộ phim mới nhất năm ${params.year||''} với chất lượng cao tại PhimVip.com. Cập nhật phim mới liên tục và không quảng cáo, mang lại trải nghiệm giải trí hàng đầu.`,
    openGraph: {
      ...baseOpenGraph,
      title: `Phim ${params.year||''} - Cập nhật nhanh chóng tại PhimVip.com`,
      description: `Xem các bộ phim mới nhất năm ${params.year||''} với chất lượng cao tại PhimVip.com. Cập nhật phim mới liên tục và không quảng cáo, mang lại trải nghiệm giải trí hàng đầu.`,
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

export default async function YearMovie({ params, searchParams }) {
  const currentPage= parseInt(searchParams.page) || 1;

  const dataPromise = await getMovieByYear(params.year, currentPage);
  
  return(
    <UserLayout>
      <div className="relative mt-2 pb-2">
        <MovieBreadcrumbs data={params.year} />

        <MovieComponent dataPromise={dataPromise} currentPage={currentPage}/>
      </div>
    </UserLayout>
  );
}