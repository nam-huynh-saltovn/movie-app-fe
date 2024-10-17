import MovieComponent from '../../MovieComponent';
import MovieBreadcrumbs from '../../MovieBreadcrumbs';
import { getMovieByType } from "@/services/movieService";
import { getData } from "@/services/dataService";
import UserLayout from "@/app/(layout)/UserLayout";
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata({ params }) {
  const types = await getData('type', params.type);
  const type = types?.filter(type => type.type_slug===params.type);

  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.type;

  return {
    title: `${type[0]?.type_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
    description: "Thưởng thức các bộ phim truyền hình hấp dẫn, đa dạng thể loại với chất lượng cao tại PhimVip.com. Cập nhật phim bộ mới liên tục và không quảng cáo, mang đến trải nghiệm xem phim tuyệt vời.",
    openGraph: {
      ...baseOpenGraph,
      title: `${type[0]?.type_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
      description: "Thưởng thức các bộ phim truyền hình hấp dẫn, đa dạng thể loại với chất lượng cao tại PhimVip.com. Cập nhật phim bộ mới liên tục và không quảng cáo, mang đến trải nghiệm xem phim tuyệt vời.",
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

export default async function TypeMovie({ params, searchParams }) {
  const currentPage= parseInt(searchParams.page) || 1;

  const dataPromise = await getMovieByType(params.type, currentPage);
  const types = await getData('type', params.type);

  const type = types?.filter(type => type.type_slug===params.type);
  
  return(
    <UserLayout>
      <div className="relative mt-2 pb-2">
        <MovieBreadcrumbs data={type[0].type_name} />
        <MovieComponent dataPromise={dataPromise} currentPage={currentPage}/>
      </div>
    </UserLayout>
  );
}