import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Post from '../Screen/Home/Post';
import AllItem from '../Screen/Home/AllItem';
import {Text, View, Image, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {BODY_IMAGE, COLOR, HP, WP} from '../Util/Util';
import React from 'react';
import Search from '../assets/images/svg/search.svg';

const Tab = createMaterialTopTabNavigator();

const HomeNavigation = () => {

  return (
    <>
<StatusBar  backgroundColor="white" barStyle={"dark-content"} />
      <View 
        style={{
          backgroundColor: 'white',
        }}>
        <Image source={BODY_IMAGE.logo} style={styles.logo} />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontWeight:'bold'},
          // tabBarStyle: { display: true },
          tabBarIndicatorStyle: {
            backgroundColor: COLOR.mainColor,
            width: '20%',
          marginLeft:WP(15),

          },
          
        }}>
        <Tab.Screen name="All items" component={AllItem}   />
        <Tab.Screen name="My Posts" component={Post}  />
      </Tab.Navigator>
    </>
  );
};
export default HomeNavigation;

const styles = StyleSheet.create({
  logo: {
    width: WP(10),
    height: HP(6),
    resizeMode: 'contain',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
