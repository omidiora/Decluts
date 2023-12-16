import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentInfo from '../Screen/Payment/PaymentInfo';
import ConfirmPayment from '../Screen/Payment/ConfirmPayment';
const Stack = createNativeStackNavigator();

const PaymentNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PaymentInfo" component={PaymentInfo} />

      <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
    </Stack.Navigator>
  );
};
export default PaymentNavigation;
