import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../Screen/Auth/Register';
import {Text} from 'react-native';
import HeaderComponent from '../component/HeaderComponent';
import Register2 from '../Screen/Auth/Register2';
import OtpScreen from '../Screen/Auth/OtpScreen';
import CreatePassword from '../Screen/Auth/CreatePassword';
import ForgotPassword from '../Screen/Auth/ForgotPassword';
import LoginScreen from '../Screen/Auth/Login';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <SafeAreaProvider style={{ flex: 1, }}>
    <SafeAreaView style={{ flex: 1,  paddingTop:40, backgroundColor: 'white' }} >
    <Stack.Navigator>
      {/**/}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Register2"
        component={Register2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{
          headerShown: false,
        }}
      />
     

      <Stack.Screen
        name="CreatePassword"
        component={CreatePassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};



export default AuthNavigation;
