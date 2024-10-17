import { cookies } from "next/headers";

export async function POST(request){
    const cookieStore = cookies()
    const token = cookieStore.get('token');
    const isAdmin = cookieStore.get('isAdmin');

    if (!token) {
        return Response.json(
          { message: 'Không nhận được token' },
          {
            status: 401
          }
        )
    }

    const headers = new Headers()
    headers.append('Set-Cookie', `token=; Path=/; Max-Age=0`)
    headers.append('Set-Cookie', `user=; Path=/; Max-Age=0`)
    isAdmin&&headers.append('Set-Cookie', `isAdmin=; Path=/; Max-Age=0`)

    try {
        return Response.json(token, {
            status: 200,
            headers
        })
    } catch (error) {
        return Response.json(error, { status: error.status });
    }
}