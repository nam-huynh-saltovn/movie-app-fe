"use client";
import { ErrorAlert, SuccessAlert, WarningAlert } from '@/components/alert/FlashAlert';
import { IconClose } from '@/components/icon/Icon';
import Loading from '@/components/loading/Loading';
import { login, setToken } from '@/services/authService';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function LoginForm() {
    const router = useRouter();

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // get message from cookie
        const toastMessage = document.cookie.split('; ').find(row => row.startsWith('toastMessage='))?.split('=')[1];

        if (toastMessage) {
            // Decode URL-encoded message
            const decodedMessage = decodeURIComponent(toastMessage);

            // show message
            WarningAlert(decodedMessage, 2000, "top-center");

            // delete cookie after displaying notification
            document.cookie = 'toastMessage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        }
    },[])

    const handleLogin = async () => {
        if(userName&&password){
            setIsLoading(true);
            try {
                const result = await login({user_name: userName, password});
                if(result.status === 200 || result.status === 201){
                    await setToken(result.data);

                    window.localStorage.setItem('auth', JSON.stringify({ token: result.data.accessToken }));

                    if(result.data.roles.includes("ROLE_ADMIN")){
                        router.push('/admin');
                    }else{
                        router.push('/');
                    }
                    router.refresh();
                    SuccessAlert(result.data.message || "Đăng nhập thành công", 1500, "top-center");
                }else {
                    ErrorAlert(result.data.message || "Đăng nhập không thành công", 2000, "top-right");
                }
            }catch(error){
                ErrorAlert("Không thể đăng nhập. Vui lòng thử lại.", 2000, "top-right");
            }finally{
                setIsLoading(false);
            }
        }else{
            setErrorMessage("Vui lòng nhập tên đăng nhập và mật khẩu");
        }
    }

    const handleVisiblePassword = () => {
        setIsVisiblePassword(!isVisiblePassword);
    }

    const handleChangeUserName = (e) => {
        if(errorMessage){
            setErrorMessage();
        }
        setUserName(e.target.value);
    }

    const handleChangePassword = (e) => {
        if(errorMessage){
            setErrorMessage();
        }
        setPassword(e.target.value);
    }
    
    return (
        isLoading
        ?
            <Loading />
        :
        <>
            <div className='flex justify-center items-center'>
                <h1 className='text-white font-bold text-[14px] xl:text-[18px] 3xl:text-[25px]'>ĐĂNG NHẬP</h1>
            </div>
            <div className='w-full xl:flex xl:justify-center'>
                <div className='px-[15px] sm:px-0 w-full xl:w-[50%]'>
                    <div className="flex items-end py-[6px] sm:py-[10px] h-[40px] sm:h-[50px]">
                        {errorMessage&&
                            <div className="bg-red-700 w-full p-[6px] flex items-center gap-[10px] rounded-md text-center">
                                <IconClose />
                                <p id="errorMessage" className="font-medium text-[10px] sm:text-[14px] 3xl:text-[20px] text-white">{errorMessage}</p>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col mb-[8px] sm:mb-[12px]">
                        <label className="block mb-[4px] lg:mb-[8px] font-bold text-[12px] sm:text-[16px] 3xl:text-[23px] text-[#1496d5]">Tên đăng nhập</label>
                        <input type="text" className="bg-[#374151] placeholder-slate-300 text-white text-[12px] sm:text-[16px] 3xl:text-[23px] rounded-md block w-full p-2 " placeholder="Tên đăng nhập"
                            value={userName} 
                            onChange={(e)=>{handleChangeUserName(e)}}
                        />
                    </div>
                    <div className="flex flex-col mb-[4px] sm:mb-[8px]">
                        <label className="block mb-[4px] sm:mb-[8px] font-bold text-[12px] sm:text-[16px] 3xl:text-[23px] text-[#1496d5]">Mật khẩu</label>
                        <div className='relative w-full'>
                            <input type={isVisiblePassword?"text":"password"} className="bg-[#374151] placeholder-slate-300 text-white text-[12px] sm:text-[16px] 3xl:text-[23px] rounded-md block w-full p-2 " placeholder="Mật khẩu"
                                value={password} 
                                onChange={(e)=>{handleChangePassword(e)}}
                            />
                            <span className='absolute inset-y-[6px] sm:inset-y-[8px] 3xl:inset-y-[10px] right-2'>
                                {isVisiblePassword
                                ?
                                <svg onClick={handleVisiblePassword} className="w-5 h-5 xl:w-6 xl:h-6 3xl:w-7 3xl:h-7 text-white dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                                :
                                <svg onClick={handleVisiblePassword} className="w-5 h-5 xl:w-6 xl:h-6 3xl:w-7 3xl:h-7 text-white dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                                }
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-[10px] mt-[20px]">
                        <Button disabled={isLoading?true:false} onClick={handleLogin}  variant="gradient" color='purple' 
                            className='w-full text-white rounded-xl font-md py-[6px] sm:py-[8px] 3xl:py-[16px] cursor-pointer text-[10px] sm:text-[14px] 3xl:text-[23px] mt-[10px]'>Đăng nhập
                        </Button>
                        <span className='text-white text-[10px] sm:text-[14px] 3xl:text-[20px]'>Bạn chưa có tài khoản?</span>
                        <Link href="/auth/register" className='text-white text-[10px] sm:text-[14px] 3xl:text-[20px] hover:text-blue-600 underline'>Đăng ký</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
