
export async function POST(request){
    const data = await request.json();

    const token = data.accessToken;
    const user = data.user_name;
    const isAdmin = data.roles?.includes("ROLE_ADMIN")?true:false;

    if(!token){
        return Response.json(
            {message: 'Không nhận được token'},
            {status: 400}
        )
    }

    const headers = new Headers()
    headers.append('Set-Cookie', `token=${token}; Path=/`)
    headers.append('Set-Cookie', `user=${user}; Path=/`)
    isAdmin&&headers.append('Set-Cookie', `isAdmin=${isAdmin}; Path=/`)

    return Response.json(
        { token },
        {
            status: 200,
            headers
        }
    )
}