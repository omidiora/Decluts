import {
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, FontFamily, HP, WP} from '../Util/Util';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  Extrapolate,
  interpolate,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();

const HeaderComponent = ({
  title = 'Create account',
  rightComponent,
  rightText,
  rightFunc,
  step1,
  step2,
  step3,
  step4,
  showStep,
  animatingWidthValues = [0, 1020],
}) => {
  const navigation = useNavigation();

  const animatingValue = useSharedValue(0);

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      animatingValue.value = withSpring(1, {
        damping: 25,
        stiffness: 120,
        overshootClamping: true,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(
        animatingValue.value,
        [0, 1012],
        animatingWidthValues,
        Extrapolate.CLAMP,
      ),
      height: interpolate(
        animatingValue.value,
        [0, 310],
        animatingWidthValues,
        Extrapolate.CLAMP,
      ),
      borderWidth: interpolate(
        animatingValue.value,
        [10, 300],
        animatingWidthValues,
        Extrapolate.CLAMP,
      
      ),
      // borderColor: COLOR.black,
      // marginLeft:-14,
      
    };
  });

  return (
    <View style={{paddingBottom:50}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.icon}>
          <Ionicons name="chevron-back" size={32}   color={'#101828'}/>
        </TouchableOpacity>
        <View>
          <Text style={styles.create}>{title}</Text>
        </View>
        {rightComponent && (
          <TouchableOpacity style={styles.signIn} onPress={rightFunc}>
            <Text style={styles.signInText}>{rightText}</Text>
          </TouchableOpacity>
        )}
      </View>
      {showStep && <View style={{flexDirection:'row' ,paddingTop:34.5}}>
      {step1 &&      <View style={{width:WP(30),backgroundColor:COLOR.mainColor,height:4,borderRadius:10,marginLeft:-20}}></View>}
      {step2 &&      <View style={{width:WP(30),backgroundColor:COLOR.mainColor,height:4,borderRadius:10,marginLeft:-20}}></View>}
      {step3 &&      <View style={{width:WP(30),backgroundColor:COLOR.mainColor,height:4,borderRadius:10,marginLeft:-20}}></View>}
      {step4 &&      <View style={{width:WP(30),backgroundColor:COLOR.mainColor,height:4,borderRadius:10,marginLeft:-20}}></View>}
      </View>}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
     width: WP(90),
   
  },
  signIn: {
    paddingLeft: WP(-10),
    paddingTop: HP(-1),
  },
  signInText: {
    color: COLOR.black,
    // fontWeight: 'bold',
    fontSize: WP(4.5),
    fontWeight: 'bold',
  },

  create: {
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontSize: WP(5),
    fontWeight: 'bold',
  },
  pageHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    height: 300,
  },
  leftItem: {
    flex: 1,
    paddingLeft: 4,
    paddingTop: 4,
  },
  rightItem: {
    flex: 1,
    paddingRight: 4,
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  headerItem: {
    flex: 1,
    paddingTop: 4,
  },
  animatingBorder: {
    top: -1,
    borderColor: 'red',
    height: 300,
    width: 390,
  },
  icon: {
    marginTop: HP(-0.4),
  },
});
