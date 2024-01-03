import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction , current} from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface User {
  email: string;
  phone: string;
  username: string;
  name: string;
  id: number;
  uid: number;
  referral_code: string;
  date_of_birth: string;
  pin: string | null;
  interests: number | Array<any>;
  photo: string | null;
  is_verified: number;
  otp_verified: number;
  email_verified: number;
  phone_verified: number;
}

export interface Auth {
  user?: User | null;
  access_token?: string | null;
  isLoading?: boolean;
  pushId?: string | null;
}

const initialState: Auth = { isLoading: true } as Auth;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setCredential(
      state,
      { payload: { user, access_token } }: PayloadAction<Auth>
    ) {
      AsyncStorage.setItem(
        '@declut_user',
        JSON.stringify({ user, access_token })
      );
      state.user = user;
      state.access_token = access_token;
      state.isLoading = false;
    },
    setPushToken(state, { payload: { token } }) {
      state.pushId = token;
    },
    userDetail(state,{payload:{user,access_token}}){
      state.user = user;
      state.access_token = access_token;
      state.isLoading = false;

    }
  }
});
export const {
  userDetail,
} = authSlice.actions;



export const { setCredential, setPushToken } = authSlice.actions;
export default authSlice.reducer;
export const useSelectCurrentUser = (
  state: RootState
): User | null | undefined => state;


export const useIsLoading = (state: RootState): boolean | undefined =>
  state.auth.isLoading;
  
export const useSelectAuthToken = (state: RootState): string | null | undefined => state.auth.access_token;

