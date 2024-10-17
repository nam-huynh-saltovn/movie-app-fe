import Fotter from '@/components/footer/Fotter';
import Loading from '@/components/loading/Loading';
import UserNavbar from '@/app/(layout)/UserNavbar';
import React, { Suspense } from 'react';
import Scroll from '@/components/common/Scroll';

export default function UserLayout({ children }) {
  
  return (
    <Suspense fallback={<Loading />}>
      <UserNavbar />
      <div className="min-h-screen h-full bg-[rgb(16,20,44)]">
          <div className="pt-[60px] sm:pt-[70px] 3xl:pt-[90px] p-[10px] sm:px-[64px] 3xl:px-[100px]">{children}</div>
      </div>
      <Scroll />
      <Fotter />
    </Suspense>
  )
}
