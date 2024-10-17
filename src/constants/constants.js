let apiRoot = '';

if(process.env.NODE_ENV === 'development'){
    apiRoot = process.env.NEXT_PUBLIC_API_ENDPOINT;
}

if(process.env.NODE_ENV === 'production'){
    apiRoot = process.env.NEXT_PUBLIC_URL;
}

export const API_ROOT = apiRoot;