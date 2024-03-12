import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
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
import {useRegisterMutation} from '../../redux/auth/api';
import {Formik} from 'formik';
import {PasswordSchema} from './Validation/main';
import {LocalStorage} from '../../Util/Storage';
import {AlertNofity, AlertNofityError} from '../../Util/notify';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import LockIcon from '../../assets/images/svg/lock.svg';

const CreatePassword = props => {
  const {
    route: {params},
  } = props;
  const boxHeight = useSharedValue(60);
  const [maxLines, setMaxLines] = React.useState(2);
  const [changeLayout, setChangeLayout] = React.useState(false);
  const {navigate} = useNavigation();
  const [register, {isLoading, data, errors}] = useRegisterMutation();
  let name = LocalStorage.getString('userName') || 'a';

  const RegisterFunction = values => {
    register({
      name: name,
      phone_number: `+234${params.phone}`,
      email: params.email,
      password: values.password,
      avatar: '',
    })
      .unwrap()
      .then(response => {
        console.log(response,'response create the totla user')
        if (response?.code == 409) {
          AlertNofityError('Error', 'Email and Phone  is already Used');
        } else {
          LocalStorage.set('userId', response?.data?.id);
          navigate('Otp', {
            phone: params.phone,
          });
        }
      })
      .catch(err => {
        console.log(err,'error from reg')
        AlertNofityError('Error', 'Something Went Wrong!!');
      });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
     
        <ViewContainer>
        <HeaderComponent
          title="Security"
          rightComponent={true}
          rightText={'Sign in'}
          rightFunc={() =>
            navigation.navigate('Auth', {
              screen: 'Login',
            })
          }
        />
  
      <View
        style={[
          styles.imageContainerColumn,
          changeLayout && {flexDirection: 'row', width: HP(52),marginLeft:WP(20)},
        ]}>
        <LockIcon/>
        <View style={styles.let}>
          <Text
            style={[
              styles.text,
              changeLayout && {
                width: '70%',
                right: WP(5),

                fontSize: HP(2),
                textAlign: 'center',
                fontWeight: 'bold',
                color:COLOR.black
              },
            ]}>
            Lets get your account secured. This
          </Text>
          <Text
            style={[
              {
                fontSize: HP(2),
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: FontFamily.regular,
                marginLeft: 30,
                color:COLOR.black

              },

              changeLayout && {
                width: '70%',
                right: WP(12),
                paddingBottom: HP(-2),
                fontSize: HP(2),
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: FontFamily.regular,
                color:COLOR.black,
                // marginLeft: 30,

              },
            ]}>
            is the last step, we promise.
          </Text>
        </View>
      </View>
      <Formik
        initialValues={{password: '', confirmPassword: ''}}
        validationSchema={PasswordSchema}
        onSubmit={values => RegisterFunction(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          (
            <View style={styles.form}>
              <FormInput
                label="Password"
                placeholder="Password"
                onFocus={() => setChangeLayout(true)}
                onBlur={() => setChangeLayout(false)}
                showPassword={true}
                onChangeText={handleChange('password')}
                error={errors?.password}
                secureTextEntry={true}
              />
              <FormInput
                label="Confirm Password"
                placeholder="Confirm Password"
                showPassword={true}
                onChangeText={handleChange('confirmPassword')}
                onFocus={() => setChangeLayout(true)}
                onBlur={() => setChangeLayout(false)}
                error={errors?.confirmPassword}
              />
              <View style={styles.btn}>
                <FormButton
                  btnTitle="Continue"
                  onPress={handleSubmit}
                  loading={isLoading}
                  disabled={isLoading}
                />
              </View>
            </View>
          )
        )}
      </Formik>
        </ViewContainer>
    </KeyboardAwareScrollView>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  imageContainerColumn: {
    paddingTop: HP(5),
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: HP(5),
    marginLeft:-30
  },

  image: {
    resizeMode: 'contain',
    height: HP(6),
    marginLeft: 30,
  },
  let: {
    width: '90%',
    marginVertical: 20,
  },
  text: {
    textAlign: 'center',
    marginTop: HP(-0.5),
    fontWeight: 'bold',
    fontFamily: FontFamily.regular,
    fontSize: HP(2),
    marginLeft: 30,
    color:COLOR.black
  },
  form: {
    // alignSelf: 'center',
    // width: WP(104),
    // paddingLeft: WP(5),
     marginLeft: WP(4.5),
  },
  btn: {
    paddingTop: HP(3),
  },
  header: {
    marginTop: HP(3),
    width: '97%',
    marginLeft: 11,
  },
});
