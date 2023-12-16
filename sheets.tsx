import { registerSheet } from 'react-native-actions-sheet';
import LoginScreen from './src/Screen/Auth/Login';
import MyProductSheet from './src/Screen/Product/Sheet/MyProductSheet';
 
registerSheet("myPostEditModal", MyProductSheet);
 
export {};