import {AlertNofityError, notify} from './../../Util/notify';
import {SERVER_URL} from './../../Util/Util';
// apiSlice.js
import {AnyAction, Dispatch, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Util/axiosInterceptors';
import {upLoadFileApiPayload} from '../interface';
import axios from 'axios';
import {getUserAsyncStorage} from '../../Util';
import {AlertNofity, notifySucess} from '../../Util/notify';

const productApi = createSlice({
  name: 'productApi',
  initialState: {
    data: null,
    myPost: null,
    loading: false,
    error: null,
    paystackUrl: null,
    updateUploadProgress: 0,
    item: {
      item_name: '',
      description: '',
      area: '',
      state: '',
      address: '',
      condition: '',
      brand: '',
      price: '',
      defect: '',
      file: {},
      previewImage: {},
      category: '',
    },
    category: {},
    setting: null,
    orderHistory: [],
    orderHistoryPendingArray: [],
    deleteSucess: {},
    searchHistory: [],
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },

    myPostLoading(state) {
      state.loading = true;
    },
    myPostSuccess(state, action) {
      state.myPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    myPostFailure(state, action) {
      state.myPost = null;
      state.loading = false;
      state.error = action.payload;
    },

    upLoadFileStart(state) {
      state.loading = true;
    },
    upLoadFileSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    upLoadFileFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },

    updateItemStart(state) {
      state.loading = true;
    },
    updateItemSuccess(
      state,
      {
        payload: {
          item_name,
          description,
          area,
          states,
          address,
          condition,
          brand,
          price,
          image1,
          image2,
          image3,
          video,
        },
      },
    ) {
      state.item.item_name = item_name;
      state.item.description = description;
      state.item.area = area;
      state.item.state = states;
      state.item.address = address;
      state.item.condition = condition;
      state.item.brand = brand;
      state.item.price = price;
    },
    updateItemFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },

    updateItemLoading2(state) {
      state.loading = true;
    },
    updateItemSuccess2(state, {payload: {category, brand, defect}}) {
      state.item.category = category;
      state.item.brand = brand;
      state.item.defect = defect;
    },
    updateItemFailure2(state, action) {
      state.item.category == null;
      state.item.brand = '';
      state.loading = false;
      state.error = action.payload;
    },

    updateItemSuccess3(state, payload) {
      state.item.file = payload;
    },
    updateItemFailure3(state, action) {
      state.item.file = {};
      state.loading = false;
      state.error = action.payload;
    },

    updateImagePreView(state, action) {
      state.item.previewImage = action.payload;
    },

    updateItemLoading4(state) {
      state.loading = true;
    },
    updateItemSuccess4(state, {payload: {price}}) {
      state.item.price = price;
    },
    updateItemFailure4(state, action) {
      state.item.price = '';
      state.loading = false;
      state.error = action.payload;
    },

    // cAtegory
    categoryItemLoading(state) {
      state.loading = true;
    },

    categoryItemSuccess(state, action) {
      state.category = action.payload;
      state.loading = false;
      state.error = null;
    },
    categoryItemFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    settingLoading(state) {
      state.loading = true;
    },

    settingSuccess(state, action) {
      state.setting = action.payload;
      state.loading = false;
      state.error = null;
    },
    settingFailure(state, action) {
      state.setting = null;
      state.loading = false;
      state.error = action.payload;
    },

    orderHistoryLoading(state) {
      state.loading = true;
    },

    orderHistorySuccess(state, action) {
      state.orderHistory = action.payload;
      state.loading = false;
      state.error = null;
    },
    orderHistoryFailure(state, action) {
      state.orderHistory = [];
      state.loading = false;
      state.error = action.payload;
    },

    orderHistoryPendingLoading(state) {
      state.loading = true;
    },

    orderHistoryPendingSuccess(state, action) {
      state.orderHistoryPendingArray = action.payload;
      state.loading = false;
      state.error = null;
    },
    orderHistoryPendingFailure(state, action) {
      state.orderHistoryPendingArray = [];
      state.loading = false;
      state.error = action.payload;
    },

    deleteItemLoading(state) {
      state.loading = true;
    },

    delteItemSuccess(state, action) {
      state.deleteSucess = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    searchHistoryLoading(state) {
      state.loading = true;
    },

    searchHistorySuccess(state, action) {
      state.searchHistory = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchHistoryFailure(state, action) {
      state.searchHistory = [];
      state.loading = false;
      state.error = action.payload;
    },
    updateUploadProgress(state, action) {
      state.updateUploadProgress = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,

  myPostLoading,
  myPostSuccess,
  myPostFailure,
  upLoadFileStart,
  upLoadFileSuccess,
  upLoadFileFailure,
  updateItemStart,
  updateItemSuccess,
  updateItemFailure,

  categoryItemLoading,
  categoryItemSuccess,
  categoryItemFailure,
  settingLoading,
  settingSuccess,
  settingFailure,
  orderHistoryLoading,
  orderHistorySuccess,
  orderHistoryFailure,
  updateItemLoading2,
  updateItemSuccess2,
  updateItemFailure2,

  updateItemSuccess3,
  updateItemFailure3,

  updateItemLoading4,
  updateItemSuccess4,
  updateItemFailure4,

  updateImagePreView,

  deleteItemLoading,
  delteItemSuccess,
  deleteItemFailure,

  searchHistoryLoading,
  searchHistorySuccess,
  searchHistoryFailure,

  orderHistoryPendingLoading,
  orderHistoryPendingSuccess,
  orderHistoryPendingFailure,
  updateUploadProgress,
} = productApi.actions;

export const fetchApiData = () => async dispatch => {
  try {
    dispatch(fetchDataStart());
    await axiosInstance({
      url: `${SERVER_URL}/item/list?viewer=buyer`,
    })
      .then(response => {
        // console.log(response.data,'111')
        dispatch(fetchDataSuccess(response));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error));
      });
  } catch (error) {
    notify('Network Failed', 'No network connection detected!!');
    dispatch(fetchDataFailure(error));
  }
};

export const MyPostItem = () => async dispatch => {
  try {
    dispatch(myPostLoading());
    await axiosInstance({
      url: `${SERVER_URL}/item/list?viewer=owner`,
    })
      .then(response => {
        dispatch(myPostSuccess(response.data));
      })
      .catch(error => {
        dispatch(myPostFailure(error));
      });
  } catch (error) {
    dispatch(myPostFailure(error));
  }
};

export const DeleteProduct = (id: string) => (dispatch: Dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(deleteItemLoading());

    axiosInstance({
      url: `${SERVER_URL}/item/delete/${id}`,
      method: 'DELETE',
    })
      .then((response) => {
        
       if(response?.data?.code==200){
        AlertNofity('Product ', 'Item Deleted Successfully');
        dispatch(delteItemSuccess(response.data));
        dispatch(MyPostItem());
        resolve(response);
       }
       else{
        AlertNofityError('Error Product ', response?.message ?? 'Something went wrong!');
        dispatch(deleteItemFailure(response?.data));
       }
      })
      .catch((error) => {
        AlertNofityError('Error Product ', error.message ?? 'Check your internet connection!');
        dispatch(deleteItemFailure(error));
        reject(error);
      });
  });
};


export const upLoadFileApi =
  (payload: upLoadFileApiPayload, navigation: any) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(upLoadFileStart());

      const response = await axiosInstance.post(
        `${SERVER_URL}/files/upload`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            // Calculate the percentage
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );

            console.log(progress,'progress')
            // Dispatch an action to handle the progress
            dispatch(updateUploadProgress(progress));
          },
        },
      ); // Adjust endpoint as needed

      console.log(response?.data?.data, 'response');
      dispatch(upLoadFileSuccess(response));
      dispatch(updateItemSuccess3(response?.data?.data));

      if (response.data.data) {
        navigation.navigate('Item4');
      }
    } catch (error) {
      console.log(error.data, 'error from');
      dispatch(upLoadFileFailure(error));
    }
  };

export const upCreateProductApi =
  (payload: upLoadFileApiPayload, navigation: any) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(upLoadFileStart());
      const response = await axiosInstance.post(
        `${SERVER_URL}/item/create`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      );
      AlertNofity('Upload', 'Product Upload Success');
      // Adjust endpoint as needed
      dispatch(upLoadFileSuccess(response.data));
      navigation.navigate('BottomTabNavigation');
    } catch (error) {
      AlertNofityError('Upload Failed', error.data?.message);
      dispatch(upLoadFileFailure(error));
    }
  };

export const orderHistoryPendingApi = payload => async dispatch => {
  try {
    dispatch(orderHistoryPendingLoading());
    await axiosInstance({
      url: `${SERVER_URL}/order/histories?status=pending`,
    })
      .then(response => {
        console.log(response.data, 'response from order history');
        dispatch(orderHistoryPendingSuccess(response.data));
      })
      .catch(error => {
        dispatch(orderHistoryPendingFailure(error));
      });
  } catch (error) {
    dispatch(orderHistoryPendingFailure(error));
  }
};

export const orderHistoryApi = payload => async dispatch => {
  try {
    dispatch(orderHistoryLoading());
    await axiosInstance({
      url: `${SERVER_URL}/order/histories?status=resolved`,
    })
      .then(response => {
        console.log(response.data, 'response from order history');
        dispatch(orderHistorySuccess(response.data));
      })
      .catch(error => {
        dispatch(orderHistoryFailure(error));
      });
  } catch (error) {
    dispatch(orderHistoryFailure(error));
  }
};

export const fetchCategoryProduct = () => async dispatch => {
  try {
    dispatch(categoryItemLoading());
    await axiosInstance({
      url: `${SERVER_URL}/category/all`,
    })
      .then(response => {
        dispatch(categoryItemSuccess(response?.data));
      })
      .catch(error => {
        dispatch(categoryItemFailure(error));
      });
  } catch (error) {
    dispatch(categoryItemFailure(error));
  }
};

export const fetchCategoryProductById = payload => async dispatch => {
  try {
    dispatch(categoryItemLoading());
    await axiosInstance({
      url: `${SERVER_URL}/item/category/${payload}/list?viewer=buyer`,
    })
      .then(response => {
        dispatch(categoryItemSuccess(response?.data));
      })
      .catch(error => {
        dispatch(categoryItemFailure(error));
      });
  } catch (error) {
    dispatch(categoryItemFailure(error));
  }
};

export const settingApi = (payload, navigation) => async dispatch => {
  console.log(navigation);
  try {
    dispatch(settingLoading());
    await axiosInstance
      .post(`${SERVER_URL}/item/listing/settings`, payload)
      .then(response => {
        dispatch(settingSuccess(response?.data));
        AlertNofity('Setting', 'Setting Updated Successfully');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error.data, 'error from settting');
        dispatch(settingFailure(error));
      });
  } catch (error) {
    dispatch(settingFailure(error));
  }
};

export const SaveSearchKeyWord = () => async dispatch => {
  try {
    dispatch(searchHistoryLoading());
    await axiosInstance
      .get(`${SERVER_URL}/item/search-history`)
      .then(response => {
        dispatch(searchHistorySuccess(response?.data));
      })
      .catch(error => {
        console.log(error, 'error from settting');
        dispatch(searchHistoryFailure(error));
      });
  } catch (error) {
    dispatch(searchHistoryFailure(error));
  }
};

// searchHistoryLoading,
//   searchHistorySuccess,
//   searchHistoryFailure,
export default productApi.reducer;
