import AdminLayout from '@/app/(layout)/AdminLayout';
import { baseOpenGraph } from '@/app/sharedMetadata';
import MovieDetailAdmin from '@/components/admin/movie/detail-movie/MovieDetailAdmin';
import { getMovieBySlug } from '@/services/movieService';
import React from 'react'

export async function generateMetadata({ params }) {
  const movie = await getMovieBySlug(params.slug);
  
  const url = process.env.NEXT_PUBLIC_URL + '/admin/movie/' + movie?movie.mov_slug:'';

  return {
    title: `Chỉnh sửa phim - ${movie?.mov_name} | Quản trị viên PhimVip.com`,
    description: `Quản trị viên có thể chỉnh sửa và cập nhật thông tin phim '${movie?.mov_name}', bao gồm tên phim, thể loại, quốc gia, và năm phát hành. Cung cấp trải nghiệm quản lý phim chuyên nghiệp trên PhimVip.com.`,
    openGraph: {
      ...baseOpenGraph,
      title: `Chỉnh sửa phim - ${movie?.mov_name} | Quản trị viên PhimVip.com`,
      description: `Quản trị viên có thể chỉnh sửa và cập nhật thông tin phim '${movie?.mov_name}', bao gồm tên phim, thể loại, quốc gia, và năm phát hành. Cung cấp trải nghiệm quản lý phim chuyên nghiệp trên PhimVip.com.`,
      url,
      images: [
        {
          url: movie?movie.poster_url:''
        }
      ]
    },
    alternates: {
      canonical: url
    }
  };
}

export default async function DetailMovie({ params }) {
    
    return (
        <AdminLayout>
            <MovieDetailAdmin slug={params.slug} />
        </AdminLayout>
    )
}
