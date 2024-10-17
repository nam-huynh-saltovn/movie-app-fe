import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-[rgb(16,20,44)] text-white'>
      <h1 className='text-[50px]'>OOP!</h1>
      <h2 className='text-[30px]'>KHÔNG TÌM THẤY TRANG</h2>
      <p>Không tìm thấy tài nguyên được yêu cầu</p>
      <Link href="/" className='underline hover:text-blue-700'>Trở về trang chủ</Link>
    </div>
  )
}