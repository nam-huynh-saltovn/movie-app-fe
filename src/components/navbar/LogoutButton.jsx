"use client"
import { logout, logoutFromNextClientToNextServer } from '@/services/authService';
import { ErrorAlert, SuccessAlert } from '../alert/FlashAlert';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ mode }) {
    const router = useRouter();

    const handleLogout = async() => {
        try {
            const [logoutResult, logoutServerResult] = await Promise.all([
                logout(),
                logoutFromNextClientToNextServer(),
            ]);
            
            if ((logoutResult.status === 200 || logoutResult.status === 201)&&(logoutServerResult.status === 200 || logoutServerResult.status === 201)) {
                window.localStorage.removeItem('auth');
                router.push("/auth/login");
                router.refresh();
                SuccessAlert(logoutResult.data.message || "Đăng xuất thành công", 1500, "top-center");
            } else {
                ErrorAlert(logoutResult.data.message || "Đăng xuất không thành công", 2000, "top-right");
            }
        } catch (error) {
            console.log(error);
            ErrorAlert("Không thể đăng xuất. Vui lòng thử lại.", 2000, "top-right");
        }
    }

    return(
    mode&&mode==="mobile"
    ?
        <button className="w-fit mx-[12px]" onClick={()=>{handleLogout()}}>
            <div as="a" className='block rounded-md sm:py-2 text-[10px] sm:text-[13px] font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                Đăng xuất
            </div>
        </button>
    :
        <button onClick={()=>{handleLogout()}} className="rounded-md px-2 py-2 text-[14px] 3xl:text-[20px] font-bold text-gray-300 hover:text-[#1496d5]">
            Đăng xuất
        </button>
    )
}
