import {SERVER_URL} from './../../Util/Util';
// apiSlice.js
import {AnyAction, Dispatch, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Util/axiosInterceptors';
import {editProfilePayload, upLoadFileApiPayload} from '../interface';
import axios from 'axios';
import {getUserAsyncStorage} from '../../Util';

const ProfileApi = createSlice({
  name: 'productApi',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    editProfileStart(state) {
      state.loading = true;
    },
    editProfileSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    editProfileFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {editProfileStart, editProfileSuccess, editProfileFailure} =
  ProfileApi.actions;

// export const editProfileApi =
//   (payload: editProfilePayload, navigation: any) =>
//   async (dispatch: Dispatch<AnyAction>, navigation: any) => {
//     try {
//       dispatch(editProfileStart());
//       const response = await axiosInstance.post('/item/create', payload);
//       dispatch(editProfileSuccess(response.data));
//       return response;
//     } catch (error) {
//       dispatch(editProfileFailure(error));
//     }
//   };

export const editProfileApi = (payload) => async dispatch => {
    console.log(payload, 'payload')
  try {
    dispatch(editProfileStart());
    await axiosInstance({
      url: `${SERVER_URL}/auth/update-me/8`,
      method:"post",
      body:payload
    })
      .then(response => {
        console.log(response.data,'respone')
        dispatch(editProfileSuccess(response.data));
      })
      .catch(error => {
        console.log(error.data,'error')
        dispatch(editProfileFailure(error));
      });
  } catch (error) {
    dispatch(editProfileFailure(error));
  }
};

export default ProfileApi.reducer;
