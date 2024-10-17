import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, login, logout, logoutFromNextClientToNextServer } from '../../../services/authService';
import { ErrorAlert, SuccessAlert } from '../../../components/alert/FlashAlert';


const initialState = {
  user: null,
  isLogin: false,
  isAdmin: false,
  status: 'idle',
};


const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = !!action.payload;
      state.isAdmin = action.payload?.roles.includes("ROLE_ADMIN");
      state.status = 'succeeded';
    },
    clearUser: (state) => {
      state.user = null;
      state.isLogin = false;
      state.isAdmin = false;
      state.status = 'idle';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state) => {
      state.status = 'failed';
    },
  },
});


export const { setUser, clearUser, setLoading, setError } = authSlice.actions;

// Thunk to handle updating the user state
export const updateUser = () => (dispatch) => {
  const user = getCurrentUser();
  if (user) {
    dispatch(setUser(user));
  }
};


export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const result = await logout();
    await logoutFromNextClientToNextServer(); //clear cookie token
    
    if (result.status === 200 || result.status === 201) {
      dispatch(clearUser());
      SuccessAlert(result.data.message || "Đăng xuất thành công", 1500, "top-center");
    } else {
      dispatch(setError());
      ErrorAlert(result.data.message || "Đăng xuất không thành công", 2000, "top-right");
    }
  } catch (error) {
    dispatch(setError());
    ErrorAlert("Không thể đăng xuất. Vui lòng thử lại.", 2000, "top-right");
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const result = await login(data);
    if (result.status === 200 || result.status === 201) {
      dispatch(setUser(result.data));
      SuccessAlert(result.data.message || "Đăng nhập thành công", 1500, "top-center");
      return result;
    } else {
      dispatch(setError());
      ErrorAlert(result.data.message || "Đăng nhập không thành công", 2000, "top-right");
    }
  } catch (error) {
    dispatch(setError());
    ErrorAlert("Không thể đăng nhập. Vui lòng thử lại.", 2000, "top-right");
  }
};

export const authReducer = authSlice.reducer;