import React from 'react';
import RegisterForm from './RegisterForm';
import UserLayout from '@/app/(layout)/UserLayout';
import { baseOpenGraph } from '@/app/sharedMetadata';


export async function generateMetadata() {
  const url = process.env.NEXT_PUBLIC_URL + '/register/';

  return {
    title: "Đăng Ký - Tạo Tài Khoản PhimVip.com",
    description: "Tạo tài khoản miễn phí trên PhimVip.com để tận hưởng những bộ phim chất lượng cao và cập nhật mới nhất. Điền thông tin cá nhân để bắt đầu trải nghiệm xem phim tuyệt vời.",
    openGraph: {
      ...baseOpenGraph,
      title: "Đăng Ký - Tạo Tài Khoản PhimVip.com",
      description: "Tạo tài khoản miễn phí trên PhimVip.com để tận hưởng những bộ phim chất lượng cao và cập nhật mới nhất. Điền thông tin cá nhân để bắt đầu trải nghiệm xem phim tuyệt vời.",
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

export default function Register() {
  return (
    <UserLayout>
      <div className='flex justify-center items-center'>
          <h1 className='text-white font-bold text-[14px] xl:text-[18px] 3xl:text-[25px]'>ĐĂNG KÝ</h1>
      </div>
      <div className='w-full xl:flex xl:justify-center'>
        <RegisterForm />
      </div>
    </UserLayout>
  )
}
