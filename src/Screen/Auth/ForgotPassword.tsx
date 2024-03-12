import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {BODY_IMAGE, COLOR, HP, WP} from '../../Util/Util';
import FormInput from '../../component/FormInput';
import FormButton from '../../component/FormButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../component/HeaderComponent';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {
  forgotPasswordApi,
  useForgotPasswordApiMutation,
} from '../../redux/auth/api';
import {ForgotPasswordValidation} from './Validation/main';
import {AlertNofity} from '../../Util/notify';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [forgotPasswordApi] = useForgotPasswordApiMutation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const {navigate} = useNavigation();

  const ForgotPasswordRequest = values => {
    setLoading(true);
    forgotPasswordApi(values)
      .unwrap()
      .then(response => {
        setLoading(false);
        if (response.code == 200) {
          AlertNofity(
            'Otp',
            response.message ??
              'An OTP to reset your password has been sent to your email',
          );
          navigate('Login');
        } else {
          AlertNofity('Otp', response.message ?? 'Something Went Wrong');
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err, 'error from forgot password');
        AlertNofity('Otp', err.message ?? 'Check Your Internet Connection');
      });
  };

  console.log(loading, 'a');
  return (
    <Formik
      onSubmit={values => ForgotPasswordRequest(values)}
      initialValues={{email: ''}}
      validationSchema={ForgotPasswordValidation}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.header}>
            <HeaderComponent title="Forgot Password" rightComponent={' '} />
          </View>
          <View style={styles.subContainer}>
            <Image source={BODY_IMAGE.forgot} style={styles.image} />
            <View style={[styles.subContainer, styles.input]}>
              <FormInput
                placeholder="Email"
                label="Enter your email to  reset password"
                onChangeText={handleChange('email')}
                error={errors.email}
                bold
              />
             <View style={styles.btn}>
             <FormButton
                btnTitle="Continue"
                onPress={() => handleSubmit()}
                loading={loading}
              />
             </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  subContainer: {
    paddingTop: HP(3),
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: WP(5),
  },
  image: {
    alignSelf: 'center',
    // height:HP(30),
    // width:WP(60),
    resizeMode:'contain',
    marginTop:HP(-10)
  },
  input: {
    paddingTop: HP(6),
    marginVertical: HP(3),
  },
  header: {
    width: '70%',
    marginLeft: 20,
    paddingBottom: 30,
  },
  btn:{
    marginTop:HP(18)
  }
});
