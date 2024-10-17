import AdminLayout from '@/app/(layout)/AdminLayout';
import { baseOpenGraph } from '@/app/sharedMetadata';
import CreateMovieApi from '@/components/admin/movie/create-movie/CreateMovieApi';
import React from 'react';

export async function generateMetadata() {
  const url = process.env.NEXT_PUBLIC_URL + '/admin';

  return {
    title: "Tạo phim mới - Quản trị viên PhimVip.com",
    description: "Trang dành cho quản trị viên tạo mới dữ liệu phim. Nhập thông tin chi tiết như tên phim, thể loại, năm phát hành, quốc gia, và các thông số khác để quản lý nội dung phim hiệu quả trên PhimVip.com.",
    openGraph: {
      ...baseOpenGraph,
      title: "Tạo phim mới - Quản trị viên PhimVip.com",
      description: "Trang dành cho quản trị viên tạo mới dữ liệu phim. Nhập thông tin chi tiết như tên phim, thể loại, năm phát hành, quốc gia, và các thông số khác để quản lý nội dung phim hiệu quả trên PhimVip.com.",
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

export default function CreateMovie() {
  return (
    <AdminLayout>
        <CreateMovieApi />
    </AdminLayout>
  )
}