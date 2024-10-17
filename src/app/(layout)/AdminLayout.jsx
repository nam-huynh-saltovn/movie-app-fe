import Loading from '@/components/loading/Loading';
import React, { Suspense } from 'react';
import AdminNavbar from './AdminNavbar';
import Scroll from '@/components/common/Scroll';

export default function AdminLayout({ children, index }) {
    return (
        <Suspense fallback={<Loading />}>
            <div className="bg-[rgb(16,20,44)] w-full h-full">
                <div className="py-4">
                    <AdminNavbar page={index}/>
                </div>
                <div className="py-[20px] sm:py-[28px] 3xl:py-[56px]">
                    <div className="p-[10px] sm:px-[64px] 3xl:px-[100px] rounded-lg backdrop-blur-lg">
                        { children }
                    </div>
                </div>
                <Scroll />
            </div>
        </Suspense>
    )
}
