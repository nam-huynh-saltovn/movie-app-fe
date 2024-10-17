import { getMovieBySlug } from '@/services/movieService';
import React from 'react';
import MovieDetail from './MovieDetail';
import { baseOpenGraph } from '@/app/sharedMetadata';
import UserLayout from '@/app/(layout)/UserLayout';

export async function generateMetadata({ params }) {
  const movie = await getMovieBySlug(params.slug);
  
  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + movie&&movie.mov_slug;

  return {
    title: movie?movie.mov_name:'',
    description: movie?movie.content:'',
    openGraph: {
      ...baseOpenGraph,
      title: movie?`${movie.mov_name} - ${movie.ori_name} (${movie.Year.year_name})`:'',
      description: movie?movie.content:'',
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
  const movie = await getMovieBySlug(params.slug);
  return (
    <UserLayout>
      <MovieDetail movie={movie} />
    </UserLayout>
  )
}
