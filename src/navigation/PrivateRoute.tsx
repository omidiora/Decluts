import 'react-native-gesture-handler';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnboardingScreen from '../../src/Screen/Onboarding/OnboardingScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigation from '../../src/navigation/AuthNavigation';
import HomeNavigation from '../../src/navigation/HomeNavigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import BottomTabNavigation from '../../src/navigation/BottomTabBar';
import OrderNavigation from '../../src/navigation/OrderNavigation';
import SingularOrderComponent from '../../src/component/SingularOrderComponent';
import Rating from '../../src/Screen/History/Rating';
import SearchScreen from '../../src/Screen/Search/SearchScreen';
import ProfileScreen from '../../src/Screen/Profile/ProfileScreen';
import {RootStackParamList} from '../../src/navigation/types/NavigationTypes';
import {Provider} from 'react-redux';
import {store} from '../../src/redux/store';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import AddItem1 from '../../src/Screen/Product/component/AddItem1';
import PreviewItem from '../../src/Screen/Product/PreviewItem ';
import LicenseScreen from '../../src/Screen/Licenses/LicenseScreen';
import ProductNavigation from '../../src/navigation/ProductNavigation';
import Setting from '../../src/Screen/Setting';
import {MenuProvider} from 'react-native-popup-menu';
import CategoryProductDetail from '../../src/Screen/Product/CategoryProductDetail';
// import PaymentInfo from './src/Screen/Preaayment/PaymentInfo';
import PaymentNavigation from '../../src/navigation/PaymentNavigation';
import OrderScreen from '../../src/Screen/Order/OrderScreen';
import UploadAllItem from '../../src/Screen/Product/UploadAllItem';
import {LocalStorage} from '../../src/Util/Storage';
import AddItem3 from '../../src/Screen/Product/component/AddItem3';
import AddItem2 from '../../src/Screen/Product/component/AddItem2';
import AddItem4 from '../../src/Screen/Product/component/AddItem4';
import {HP} from '../../src/Util/Util';
import {SheetProvider} from 'react-native-actions-sheet';
import '../../sheets';

const Stack = createStackNavigator<RootStackParamList>();

const RoutingRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Payment"
        component={PaymentNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OrderRating"
        component={Rating}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductNavigation"
        component={ProductNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UploadAllItem"
        component={UploadAllItem}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PreviewItem"
        component={PreviewItem}
        options={{
          headerShown: false,
        }}
      />
      {/* 
   

     */}

      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CategoryProductDetail"
        component={CategoryProductDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="License"
        component={LicenseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
      name="AddItem1"
      component={MainItem}
      options={{
        headerShown: false,
      }}
    /> */}

      <Stack.Screen
        name="OrderNavigation"
        component={OrderNavigation}
        options={{
          headerShown: false,
        }}
      />

      {/* OrderNavigation */}
    </Stack.Navigator>
  );
};

export default RoutingRoute;

const styles = StyleSheet.create({
  StatusBar: {
    height: HP(5),
    backgroundColor: 'white',
  },
});
