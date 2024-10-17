"use client";
import { SuccessAlert } from '@/components/alert/FlashAlert';
import Loading from '@/components/loading/Loading';
import { register } from '@/services/authService';
import { validateConfirmPassword, validatePassword, validateRegisterForm, validUsername } from '@/services/validator';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function RegisterForm() {
    const router = useRouter();

    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [errorMessage, setErrorMessage] = useState();
    const [validation, setValidation] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        symbol: false
    });

    const updateValidation = (key, value) => {
        setValidation(prev => ({ ...prev, [key]: value })); // Update filters
    };

    const [isRegisting, setIsRegisting] = useState(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

    const handleRegister = async () => {
        if(validateRegisterForm({name, userName, password, confirmPassword}, setErrorMessage)&&
            validUsername(userName, setErrorMessage)&&
            validatePassword(password, updateValidation, setErrorMessage)&&
            validateConfirmPassword(password, confirmPassword, setErrorMessage)){
            setIsRegisting(true);    
            try {
                const result = await register({name, user_name:userName, password, status: true});
                if(result.status===200||result.status===201){
                    router.push('/auth/login');
                    router.refresh();
                    SuccessAlert(result.data.message||"Đăng ký thành công",1500,"top-right");
                }else{
                    setErrorMessage(result.data.message||"Đăng ký thất bại");
                }
            } catch (error) {
                ErrorAlert("Không thể đăng ký. Vui lòng thử lại",2000,"top-right");
            }finally{
                setIsRegisting(false);
            }
        }
    }

    const handleVisiblePassword = () => {
        setIsVisiblePassword(!isVisiblePassword);
    }

    const handleVisibleConfirmPassword = () => {
        setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
    }

    const handleChangeName = (e) => {
        if(errorMessage){
            setErrorMessage();
        }
        setName(e.target.value);
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
        validatePassword(e.target.value, updateValidation, setErrorMessage);
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e) => {
        if(errorMessage){
            setErrorMessage();
        }
        validateConfirmPassword(password, e.target.value, setErrorMessage);
        setConfirmPassword(e.target.value);
    }

    return (
        isRegisting
        ?
            <Loading />
        :
        <div className='px-[15px] sm:px-0 w-full xl:w-[50%] '>
            <div className="flex flex-col mb-[8px] sm:mb-[12px]">
                <label htmlFor="name" className="block mb-[4px] lg:mb-[8px] font-bold text-[12px] sm:text-[16px] 3xl:text-[23px] text-[#1496d5]">Họ và tên</label>
                <input type="text" id="name" className="bg-[#374151] placeholder-slate-300 text-white text-[12px] sm:text-[16px] 3xl:text-[23px] rounded-md block w-full p-2 " placeholder="Tên đăng nhập"
                    value={name} 
                    onChange={(e)=>{handleChangeName(e)}}
                />
            </div>
            <div className="flex flex-col mb-[8px] sm:mb-[12px]">
                <label htmlFor="userName" className="block mb-[4px] lg:mb-[8px] font-bold text-[12px] sm:text-[16px] 3xl:text-[23px] text-[#1496d5]">Tên đăng nhập</label>
                <input type="text" id="userName" className="bg-[#374151] placeholder-slate-300 text-white text-[12px] sm:text-[16px] 3xl:text-[23px] rounded-md block w-full p-2 " placeholder="Tên đăng nhập"
                    value={userName} 
                    onChange={(e)=>{handleChangeUserName(e)}}
                />
            </div>
            <div className="flex flex-col mb-[4px] sm:mb-[8px]">
                <label htmlFor="password" className="block mb-[4px] sm:mb-[8px] font-bold text-[12px] sm:text-[16px] 3xl:text-[23px] text-[#1496d5]">Mật khẩu</label>
                <div className='relative w-full'>
                    <input type={isVisiblePassword?"text":"password"} id="password" className="bg-[#374151] placeholder-slate-300 text-white text-[12px] sm:text-[16px] 3xl:text-[23px] rounded-md block w-full p-2 " placeholder="Mật khẩu"
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
            <div className="flex flex-col mb-[4px] sm:mb-[8px]">
                <label htmlFor="confrimPassword" className="block mb-[4px] sm:mb-[8px] font-bold text-[12px] sm:text-[16px] 3xl:text-[23px] text-[#1496d5]">Nhập lại mật khẩu</label>
                <div className='relative w-full'>
                    <input type={isVisibleConfirmPassword?"text":"password"} id="confrimPassword" className="bg-[#374151] placeholder-slate-300 text-white text-[12px] sm:text-[16px] 3xl:text-[23px] rounded-md block w-full p-2 " placeholder="Mật khẩu"
                        value={confirmPassword} 
                        onChange={(e)=>{handleChangeConfirmPassword(e)}}
                    />
                    <span className='absolute inset-y-[6px] sm:inset-y-[8px] 3xl:inset-y-[10px] right-2'>
                        {isVisibleConfirmPassword
                        ?
                        <svg onClick={handleVisibleConfirmPassword} className="w-5 h-5 xl:w-6 xl:h-6 3xl:w-7 3xl:h-7 text-white dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        :
                        <svg onClick={handleVisibleConfirmPassword} className="w-5 h-5 xl:w-6 xl:h-6 3xl:w-7 3xl:h-7 text-white dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        }
                    </span>
                </div>
            </div>
            <p id="errorMessage" className="font-semibold text-[12px] lg:text-[16px] 3xl:text-[23px] text-red-500">{errorMessage}</p>
            <ul className='my-[12px]'>
                <li className='text-white text-[10px] lg:text-[14px] 3xl:text-[20px] flex items-center gap-2'>
                    {validation.minLength
                    ? <svg className="w-3 h-3 xl:w-4 xl:h-4 3xl:w-6 3xl:h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 11.917 9.724 16.5 19 7.5"/></svg>
                    : <svg className="w-3 h-3 xl:w-4 xl:h-4 3xl:w-6 3xl:h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 18 17.94 6M18 18 6.06 6"/></svg>}
                    Tối thiểu 8 ký tự
                </li>
                <li className='text-white text-[10px] lg:text-[14px] 3xl:text-[20px] flex items-center gap-2'>
                    {validation.lowercase
                    ? <svg className="w-3 h-3 xl:w-4 xl:h-4 3xl:w-6 3xl:h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 11.917 9.724 16.5 19 7.5"/></svg>
                    : <svg className="w-3 h-3 xl:w-4 xl:h-4 3xl:w-6 3xl:h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 18 17.94 6M18 18 6.06 6"/></svg>}
                    Có ít nhất 1 chữ viết thường
                </li>
                <li className='text-white text-[10px] lg:text-[14px] 3xl:text-[20px] flex items-center gap-2'>
                    {validation.uppercase
                    ? <svg className="w-3 h-3 xl:w-4 xl:h-4 3xl:w-6 3xl:h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 11.917 9.724 16.5 19 7.5"/></svg>
                    : <svg className="w-3 h-3 xl:w-4 xl:h-4 3xl:w-6 3xl:h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 18 17.94 6M18 18 6.06 6"/></svg>}
                    Có ít nhất 1 chữ viết hoa
                </li>
                <li className='text-white text-[10px] lg:text-[14px] 3xl:text-[20px] flex items-center gap-2'>
                    {validation.symbol
                    ? <svg className="w-3 h-3 xl:w-4 xl:h-4 3xl:w-6 3xl:h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 11.917 9.724 16.5 19 7.5"/></svg>
                    : <svg className="w-3 h-3 xl:w-4 xl:h-4 3xl:w-6 3xl:h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 18 17.94 6M18 18 6.06 6"/></svg>}
                    Có ít nhất 1 ký tự đặc biệt
                </li>
            </ul>
            <div className="flex flex-col justify-center items-center gap-[10px]">
                <Button disabled={isRegisting?true:false} onClick={handleRegister}  variant="gradient" color='purple' 
                    className='w-full text-white rounded-xl font-md py-[6px] sm:py-[8px] 3xl:py-[16px] cursor-pointer text-[10px] sm:text-[14px] 3xl:text-[23px]'>Đăng ký
                </Button>
                <Link href="/auth/login" className='text-white text-[10px] sm:text-[14px] 3xl:text-[20px] hover:text-blue-600 underline'>Đăng nhập</Link>
            </div>
        </div>
    )
}
