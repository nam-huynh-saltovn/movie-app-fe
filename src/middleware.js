import { NextResponse } from 'next/server';
 
const privatePaths = ['/admin'];
const authPaths = ['/auth/login', '/auth/register'];

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const {pathname} = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const isAdmin = request.cookies.get('isAdmin')?.value;

  let response = NextResponse.next();
  
  // check private path
  if(privatePaths.some(path => pathname.startsWith(path))){
    if(!token){
      response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.set('toastMessage', 'Bạn cần đăng nhập để truy cập trang này.', { path: '/' });
      return response;
    }
    if(token&&!isAdmin){
      response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.set('toastMessage', 'Bạn không có quyền truy cập trang admin.', { path: '/' });
      return response;
    }
  }

  //check auth path
  if(authPaths.some(path => pathname.startsWith(path)) && token){
    if (isAdmin) {
      response = NextResponse.redirect(new URL('/admin', request.url));
    } else {
      response = NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  }
  
  return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/auth/login', '/auth/register']
}