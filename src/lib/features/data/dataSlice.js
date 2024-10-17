import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataFromAPI } from "./dataAPI";

const initialState = {
  category: [],
  country: [],
  actor: [],
  director: [],
  year: [],
  type: [],
  status: "idle",
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async () => {
    const endpoints = ['category', 'year', 'country', 'type', 'actor', 'director'];
    const responses = await Promise.all(
      endpoints.map(endpoint => fetchDataFromAPI(endpoint))
    );
    
    const [categoryData, yearData, countryData, typeData, actorData, directorData] = responses.map(res => res);
    return { categoryData, yearData, countryData, typeData, actorData, directorData };
  }
);


const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { categoryData, yearData, countryData, typeData, actorData, directorData } = action.payload;
        state.category = categoryData;
        state.year = yearData;
        state.country = countryData;
        state.type = typeData;
        state.actor = actorData;
        state.director = directorData;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const dataReducer = dataSlice.reducer;