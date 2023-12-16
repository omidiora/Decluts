import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Post from '../Screen/Home/Post';
import AllItem from '../Screen/Home/AllItem';
import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Pending from '../Screen/History/Pending';
import OrderHistoryComponent from '../component/OrderHistoryComponent';
import PendingScreen from '../Screen/Order/PendingScreen';
import CompletedScreen from '../Screen/Order/CompletedScreen';
import { COLOR, WP } from '../Util/Util';

const Tab = createMaterialTopTabNavigator();
enum Status {
  Pending="pending",
  Completed="completed",
}

const OrderNavigation = () => {
  return (
   <View style={{flex:1,backgroundColor:"white"}}>
     <Tab.Navigator 
      screenOptions={{
        // tabBarStyle: { display: true },
        tabBarIndicatorStyle: {
          backgroundColor: COLOR.mainColor,
          // width: '20%',
        // marginLeft:WP(15)
        },
        
      }}>
      <Tab.Screen name="Pending" component={PendingScreen} initialParams={{ status: Status.Pending }} />
      <Tab.Screen name="completed" component={CompletedScreen} initialParams={{ status: Status.Completed }}  />
    </Tab.Navigator>
   </View>
  );
};
export default OrderNavigation;
