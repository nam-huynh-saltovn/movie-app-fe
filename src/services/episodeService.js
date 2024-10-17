import axios from "axios";
import { API_ROOT } from '../constants/constants';
import axiosInstance from "../common/axiosConfig";

const apiUrl = API_ROOT;
// Function get episode by id
export const getEpisodeById = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/api/v1/episode/${id}`,
            headers: { }
          };
          
        const result = await axios.request(config)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function get episode by movie id
export const getEpisodeByMovieId = async (movId, query, order, currentPage) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/api/v1/episode/mv/${movId}`,
            headers: { },
            params: {
              query: query,
              order: order,
              page: currentPage,
              limit: 10       
          },
          };
          
        const result = await axios.request(config)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function get episode by movie id -> ROLE_ADMIN
export const getAllEpisodeByMovieId = async (movId) => {
    try {
        const result = await axiosInstance.get(`/api/v1/episode/mv/all/${movId}`);
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function update episode -> ROLE_ADMIN
export const createEpisode = async (data) => {
  try {
      const result = await axiosInstance.post(`/api/v1/episode`, data);
      
      return result;
  } catch (error) {
      return error.response;
  }
}

// Function update episode -> ROLE_ADMIN
export const updateEpisode = async (data) => {
    try {
        const result = await axiosInstance.put(`/api/v1/episode`, data);
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function update episode sort_order -> ROLE_ADMIN
export const updateEpisodeSortOrder = async (id, sortOrder) => {
  try {
      const result = await axiosInstance.put(`/api/v1/episode/sort-oder/${id}`, {sort_order: sortOrder});
      return result;
  } catch (error) {
      throw error.response;
  }
}

// Function delete episode -> ROLE_ADMIN
export const deleteEpisode = async (id) => {
    try {
        const result = await axiosInstance.delete(`/api/v1/episode/${id}`);
        
        return result;
    } catch (error) {
        return error.response;
    }
}