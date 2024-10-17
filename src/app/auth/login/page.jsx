import React from 'react';
import LoginForm from './LoginForm';
import UserLayout from '@/app/(layout)/UserLayout';
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata() {
  const url = process.env.NEXT_PUBLIC_URL + '/login/';

  return {
    title: "Đăng Nhập - Phimvip.com",
    description: "Truy cập tài khoản của bạn trên PhimVip.com để xem phim và cập nhật thông tin cá nhân. Đăng nhập dễ dàng và nhanh chóng với email và mật khẩu của bạn.",
    openGraph: {
      ...baseOpenGraph,
      title: "Đăng Nhập - Phimvip.com",
      description: "Truy cập tài khoản của bạn trên PhimVip.com để xem phim và cập nhật thông tin cá nhân. Đăng nhập dễ dàng và nhanh chóng với email và mật khẩu của bạn.",
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

export default async function Login() {
  
  return (
    <UserLayout>
        <LoginForm />
    </UserLayout>
  )
}
