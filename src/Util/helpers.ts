import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Auth} from '../../store/auth';
import { AlertNofityError } from './notify';
// import { getDeviceInfo } from "../device";

export const getUserAsyncStorage = async () => {
  const {getItem} = useAsyncStorage('@declut_user');
  const result = await getItem();
  const user = result ? (JSON.parse(result) as Auth) : null;

  return user;
};

export const ErrorCheckPath = (response, message, navigation, path) => {
  console.log(message, 'olamdlmldmlam');
  if (response == 200) {
    navigation.navigate('BottomTabNavigation');
  } else {
    AlertNofityError(
      'Request Failed',
      message ?? 'Kindly check your internet connection and try again',
    );
  }
};


export const Kobolized = (balance) => {
  return Number(balance / 100).toFixed(2);
};
