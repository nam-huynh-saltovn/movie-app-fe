import MovieComponent from '../../MovieComponent';
import MovieBreadcrumbs from '../../MovieBreadcrumbs';
import { getMovieByCategory } from "@/services/movieService";
import { getData } from "@/services/dataService";
import UserLayout from '@/app/(layout)/UserLayout';
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata({ params }) {
  const categories = await getData('category',params.category);
  const category = categories?.filter(cat => cat.cat_slug===params.category);

  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.category;

  return {
    title: `Phim ${category[0]?.cat_name||''} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
    description: `Khám phá những bộ phim ${category[0]?.cat_name||''} sâu sắc và cuốn hút tại PhimVip.com. Chất lượng phim vượt trội, không quảng cáo và cập nhật liên tục, mang lại trải nghiệm xem phim hoàn hảo cho bạn.`,
    openGraph: {
      ...baseOpenGraph,
      title: `Phim ${category[0]?.cat_name||''} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
      description: `Khám phá những bộ phim ${category[0]?.cat_name||''} sâu sắc và cuốn hút tại PhimVip.com. Chất lượng phim vượt trội, không quảng cáo và cập nhật liên tục, mang lại trải nghiệm xem phim hoàn hảo cho bạn.`,
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

export default async function CategoryMovie({ params, searchParams }) {
  const currentPage= parseInt(searchParams.page) || 1;

  const dataPromise = await getMovieByCategory(params.category, currentPage);
  const categories = await getData('category',params.category);

  const category = categories?.filter(cat => cat.cat_slug===params.category);
  
  return(
    <UserLayout>
      <div className="relative mt-2 pb-2">
        <MovieBreadcrumbs data={category[0].cat_name} />

        <MovieComponent dataPromise={dataPromise} currentPage={currentPage}/>
      </div>
    </UserLayout>
  );
}
