import {SERVER_URL} from './../../Util/Util';
// apiSlice.js
import {AnyAction, Dispatch, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Util/axiosInterceptors';
import {upLoadFileApiPayload} from '../interface';
import axios from 'axios';
import {getUserAsyncStorage} from '../../Util';
import {AlertNofity, AlertNofityError, notifySucess} from '../../Util/notify';

const paymentApi = createSlice({
  name: 'paymentApi',
  initialState: {
    data: null,
    loading: false,
    error: null,
    paystackUrl: null,
    paymentLoading: false,
    paymentSuccess: true,
    confirmPayment: {},
    statusConfirmPayment: '',
  },
  reducers: {
    orderPayment(state) {
      state.loading = true;
    },
    orderPaymentSuccess(state, action) {
      state.paystackUrl = action.payload;
      state.loading = false;
      state.error = null;
    },
    orderPaymentFailure(state, action) {
      state.paystackUrl = null;
      state.loading = false;
      state.error = action.payload;
    },

    confirmPaymentLoading(state) {
      state.paymentLoading = true;
      state.paymentSuccess = false;
      state.statusConfirmPayment = '';
    },
    confirmPaymentSuccess(state, action) {
      state.confirmPayment = action.payload;
      state.paymentSuccess = true;
      state.paymentLoading = true;
      state.error = null;
      state.statusConfirmPayment = 'Success';
    },
    confirmPaymentFailure(state, action) {
      state.confirmPayment = {};
      state.paymentLoading = true;
      state.error = action.payload;
      state.paymentSuccess = true;
      state.statusConfirmPayment = 'Failed';
    },
  },
});

export const {
  orderPayment,
  orderPaymentSuccess,
  orderPaymentFailure,
  confirmPaymentSuccess,
  confirmPaymentFailure,
  confirmPaymentLoading,
} = paymentApi.actions;

export const orderPaymentApi = payload => async dispatch => {
  try {
    dispatch(orderPayment());
    await axiosInstance({
      url: `${SERVER_URL}/payment/order-item/${payload?.payload?.id}`,
      method: 'POST',
      data: {
        item_amount: payload?.payload?.item_amount,
        trx_ref: payload?.payload?.trx_ref,
      },
    })
      .then(response => {
        console.log(response?.data, 'response');
        if (response?.data?.code == 200) {
          dispatch(orderPaymentSuccess(response));
          payload.navigation.navigate('Payment', {
            screen: 'PaymentInfo',
            params: {item: payload?.payload},
          });
        } else {
          AlertNofityError('Order', response?.message);
          dispatch(orderPaymentFailure(error));
        }
      })
      .catch(error => {
        AlertNofityError('Order', error?.data?.message);
        dispatch(orderPaymentFailure(error));
        // payload.navigation.navigate('Payment', {
        //   screen: 'PaymentInfo',
        //   params: { user: 'jane' },
        // });
      });
  } catch (error) {
    dispatch(orderPaymentFailure(error));
  }
};

export const confirmPayment = (payload, navigation) => async dispatch => {
  console.log(payload?.payload?.trx_ref, 'payload?.payload?.trx_ref');
  try {
    dispatch(confirmPaymentLoading());
    await axiosInstance({
      url: `${SERVER_URL}/payment/confirm?reference=${payload?.payload?.trx_ref}`,
      method: 'POST',
    })
      .then(response => {
        console.log(response?.data, 'response from confirm payment');
        if (response?.data?.code == 200) {
          dispatch(orderPaymentSuccess(response));
          navigation.navigate('OrderScreen', {
            params: response?.data?.data,
          });
        } else {
          AlertNofityError('Order', response?.message);
          navigation.navigate('BottomTabNavigation');
          dispatch(orderPaymentFailure(error));
        }
      })
      .catch(error => {
        console.log(error?.data, 'error from confirm payment');
        AlertNofityError('Order', error?.data?.message);
        dispatch(orderPaymentFailure(error));
        navigation.navigate('BottomTabNavigation');
      });
  } catch (error) {
    console.log(error,'error from confirm payment')
    dispatch(orderPaymentFailure(error));
  }
};

export default paymentApi.reducer;
