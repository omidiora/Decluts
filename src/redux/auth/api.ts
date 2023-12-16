// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SERVER_URL} from '../../Util/Util';
import {RendOtpRequest, UserRequest, UserResponse} from '../interface';
import {axiosBaseQuery} from '../../Util';
import { LocalStorage } from '../../Util/Storage';

// Define a service using a base URL and expected endpoints
const userId=LocalStorage.getNumber('userId')
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({baseUrl: `${SERVER_URL}/auth`}),
  endpoints: builder => ({
    register: builder.mutation<UserResponse, UserRequest>({
      query: payload => ({
        url: `/register?provider=3`,
        method: 'post',
        body: payload,
      }),
    }),
    login: builder.mutation<any, any>({
      query: payload => ({
        url: `/login`,
        method: 'post',
        body: payload,
      }),
    }),

    //
    OtpAuth: builder.mutation<UserResponse, UserRequest>({
      query: payload => ({
        url: `/verify-code/${userId}?verif_code=${payload}`,
        method: 'post',
      }),
    }),

    ResendOtpAuth: builder.mutation<UserResponse, RendOtpRequest>({
      query: payload => ({
        url: `/resend-code/${payload}?provider=3`,
        method: 'post',
      }),
    }),

    forgotPasswordApi: builder.mutation<UserResponse, RendOtpRequest>({
      query: payload => ({
        url: `/forgot-password`,
        method: 'post',
        body: payload,
      }),
    }),

    editProfileApi: builder.mutation<UserResponse, RendOtpRequest>({
      query: payload => ({
        url: `/update-me/1`,
        method: 'post',
        body: payload,
      }),
    }),
    // {{host}}/auth/resend-code/1?provider=3

    // /auth/verify-code/1?verif_code=958506
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useOtpAuthMutation,
  useResendOtpAuthMutation,
  useLoginMutation,
  useForgotPasswordApiMutation,
  useEditProfileApiMutation
} = authApi;
