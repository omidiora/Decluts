import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BODY_IMAGE, COLOR, FontFamily, HP, WP} from '../../Util/Util';
import FormInput from '../../component/FormInput';
import FormButton from '../../component/FormButton';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import {useAppDispatch} from '../../redux/hook';
import {Formik} from 'formik';
import {LoginSchema} from './Validation/main';
import {useLoginMutation} from '../../redux/auth/api';
import {setCredential, userDetail} from '../../redux/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import HeaderComponent from '../../component/HeaderComponent';
import {AlertNofityError} from '../../Util/notify';
import {ErrorCheckPath} from '../../Util';
import {Platform} from 'react-native';
// import {PUSHER_BEAMS_INSTANCE_ID} from "react-native-dotenv";
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';

const LoginScreen = () => {
  const boxHeight = useSharedValue(60);
  const [maxLines, setMaxLines] = React.useState(2);
  const [changeLayout, setChangeLayout] = React.useState(false);
  const dispatch = useAppDispatch();
  const [login, {error, isLoading, data}] = useLoginMutation();
  const navigation = useNavigation();
  const phoneInput = React.useRef<PhoneInput>(null);
  const [formattedValue, setFormattedValue] = useState('');

  const UserLogin = values => {
    login({
      phone_number: `+234${values.phone
        .replace(/ /g, '')
        .replace('+234', '')
        .replace(/^0+/, '')
        .replace(/\D/g, '')}`,
      password: values.password,
    })
      .unwrap()
      .then(response => {
        console.log(response, 'response');
        if (response.code == 200) {
          dispatch(
            setCredential({
              user: response?.data?.user,
              access_token: response?.data?.authorisation?.token,
            }),
          );
          navigation.navigate('RoutingRoute', {
            screen: 'BottomTabNavigation',
          });
        } else {
          AlertNofityError('Login Failed', 'Incorrect Login Detail');
        }
      })
      .catch(err => {
        console.log(err, 'ere');
        AlertNofityError('Login Failed', 'Check Your Internet Connection!');
      });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <HeaderComponent
          title="Sign in"
          rightComponent={true}
          rightText={'Sign up'}
          rightFunc={() =>
            navigation.navigate('Auth', {
              screen: 'Register',
            })
          }
        />
      </View>
      <View
        style={[
          styles.imageContainerColumn,
          changeLayout && {flexDirection: 'row', width: HP(50)},
        ]}>
        <Image source={BODY_IMAGE.logo} style={styles.image} />
        <View style={styles.let}>
          <Text
            style={[
              styles.text,
              changeLayout && {
                width: '70%',
                right: WP(20),
                paddingBottom: HP(2),
                fontSize: HP(2),
                textAlign: 'center',
              },
            ]}>
            Welcome Back! {'\n'}<Text style={{fontFamily:FontFamily.medium,fontSize:HP(1.9), color:COLOR.black}}>Lets get you in</Text>
          </Text>
        </View>
      </View>
      <Formik
        validationSchema={LoginSchema}
        onSubmit={values => UserLogin(values)}
        initialValues={{phone: '', password: ''}}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <View style={styles.form}>
              <FormInput
                placeholder="Phone Number"
                label="Phone"
                onChangeText={handleChange('phone')}
                required
              />
              <Text style={styles.phone}>{errors.phone}</Text>
              {/* <FormInput
                label="Phone *"
                placeholder="Phone"
                onFocus={() => setChangeLayout(true)}
                onBlur={() => setChangeLayout(false)}
                onChangeText={handleChange('phone')}
              /> */}
              <FormInput
                forgotPassword={true}
                label="Password"
                required
                placeholder="Password"
                onChangeText={handleChange('password')}
                onFocus={() => setChangeLayout(true)}
                onBlur={() => setChangeLayout(false)}
                showPassword={true}
                error={errors.password}
              />
              <View style={styles.btn}>
                <FormButton
                  btnTitle="Sign in"
                  onPress={() => handleSubmit(values)}
                  loading={isLoading}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  imageContainerColumn: {
    paddingTop: HP(1),
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: HP(5),
  },

  image: {
    resizeMode: 'contain',
    height: HP(10),
  },
  let: {
    width: '90%',
  },
  text: {
    textAlign: 'center',
    paddingTop: HP(3),
    fontWeight: 'bold',
    fontFamily: FontFamily.regular,
    fontSize: HP(2.5),
    color: 'black',
  },
  form: {
    alignSelf: 'center',
    width: '100%',
    paddingLeft: WP(8),
  },
  btn: {
    marginTop: HP(14),
  },
  getIn: {
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    fontSize: HP(2),
  },
  phone: {
    color: 'red',
  },
  header: {
    paddingHorizontal: 20,
    //  position:'absolute',
    //  top:3100
  },
});
