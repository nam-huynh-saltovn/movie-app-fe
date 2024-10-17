import axios from "axios";
import { API_ROOT } from '../constants/constants';
import axiosInstance from "../common/axiosConfig";

const apiUrl = API_ROOT;

// Function login
export const login = async (data) => {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}/api/v1/auth/signin`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        const result = await axios.request(config);

        if (result.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(result.data));
        }
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function register
export const register = async (data) => {
    try {
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${apiUrl}/api/v1/auth/signup`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        
        const result = await axios.request(config);
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function login
export const logout = async () => {
    try {
        const result = await axiosInstance.post("/api/v1/auth/signout");
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function get current user
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}


// Function login
export const setToken = async (data) => {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `/api/auth`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        const result = await axios.request(config);
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function login
export const logoutFromNextClientToNextServer = async () => {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `/api/auth/logout`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : {}
        };
        
        const result = await axios.request(config);
        
        return result;
    } catch (error) {
        return error.response;
    }
}