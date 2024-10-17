import MovieComponent from '../../MovieComponent';
import MovieBreadcrumbs from '../../MovieBreadcrumbs';
import { getMovieByCountry } from "@/services/movieService";
import { getData } from "@/services/dataService";
import UserLayout from "@/app/(layout)/UserLayout";
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata({ params }) {
  const countries = await getData('country', params.country);
  const country = countries?.filter(ctr => ctr.ctr_slug===params.country);

  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.country;

  return {
    title: `Phim ${country[0]?.ctr_name||''} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
    description: `Thưởng thức những bộ phim ${country[0]?.ctr_name||''} chất lượng cao với nhiều thể loại đặc sắc tại PhimVip.com. Cập nhật phim Việt mới liên tục và không quảng cáo, đảm bảo trải nghiệm xem phim tuyệt vời.`,
    openGraph: {
      ...baseOpenGraph,
      title: `Phim ${country[0]?.ctr_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
      description: `Thưởng thức những bộ phim ${country[0]?.ctr_name||''} chất lượng cao với nhiều thể loại đặc sắc tại PhimVip.com. Cập nhật phim Việt mới liên tục và không quảng cáo, đảm bảo trải nghiệm xem phim tuyệt vời.`,
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

export default async function CountryMovie({ params, searchParams }) {
  const currentPage= parseInt(searchParams.page) || 1;

  const dataPromise = await getMovieByCountry(params.country, currentPage);
  const countries = await getData('country', params.country);

  const country = countries?.filter(ctr => ctr.ctr_slug===params.country);
  
  return(
    <UserLayout>
      <div className="relative mt-2 pb-2">
        <MovieBreadcrumbs data={country[0].ctr_name} />

        <MovieComponent dataPromise={dataPromise} currentPage={currentPage}/>
      </div>
    </UserLayout>
  );
}
