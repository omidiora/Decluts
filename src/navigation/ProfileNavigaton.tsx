import {createMaterialTopStackNavigator} from '@react-navigation/material-top-Stacks';
import Post from '../Screen/Home/Post';
import AllItem from '../Screen/Home/AllItem';
import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import EditProfile from '../Screen/Profile/EditProfile';
import ProfileScreen from '../Screen/Profile/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyProfile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="My Posts" component={Post} />
    </Stack.Navigator>
  );
};
export default ProfileNavigation;
