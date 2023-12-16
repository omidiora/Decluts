import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BODY_IMAGE, COLOR, HP, WP} from '../../Util/Util';
import ViewContainer from '../../component/ViewContainer';
import OTPTextView from 'react-native-otp-textinput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../component/FormButton';
import {
  useOtpAuthMutation,
  useResendOtpAuthMutation,
} from '../../redux/auth/api';
import {AlertNofity, AlertNofityError} from '../../Util/notify';
import HeaderComponent from '../../component/HeaderComponent';
import {LocalStorage} from '../../Util/Storage';
import {useNavigation} from '@react-navigation/native';

const OtpScreen = (props) => {

  const [count, setCount] = useState(1);
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(120);

  const [OtpAuth, {isLoading, errors, data}] = useOtpAuthMutation();
  const [ResendOtpAuth] = useResendOtpAuthMutation();
  const userId = LocalStorage.getNumber('userId');
  // useResendOtpAuthMutation
  const [otpNumber, setOtpNumber] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds == 0) {
        clearInterval(interval);
        // setSeconds(10);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const VerifyOtp = () => {
    OtpAuth(otpNumber)
      .unwrap()
      .then(response => {
        console.log(response,'response from verify otp')
        AlertNofity('Success', 'Account Verified Successfully');
        navigation.navigate('BottomTabNavigation',{
          screen:"Login"
        });
      })
      .catch(err => {
        console.log(err, 'a');
        AlertNofityError(
          'Invalid',
          'Invalid Otp Code. Kindly Check your email',
        );
      });
  };

  const ResendOtpCode = () => {
    ResendOtpAuth(userId)
      .unwrap()
      .then(response => {
        console.log(response, 'resonse');
        AlertNofity('Otp', 'Otp Resent Successfully');
        setSeconds(120);
      })
      .catch(err => {
        console.log(err, 'eee');
        AlertNofityError('Otp', 'Something weng wrong. Kindly Retry');
      });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.input}>
      <HeaderComponent rightComponent={true} rightText={'Sign In'} />

      <View style={styles.dottedContainer}>
        <Image source={BODY_IMAGE.dotted} style={styles.dotted} />
      </View>

      <View>
        <Text style={styles.phone}>Please input the code we sent to </Text>
        <View style={styles.row}>
          <Text style={styles.phoneNumber}>0{props.route?.params?.phone}</Text>
          {/* <TouchableOpacity>
            <Text style={styles.change}>Change Number</Text>
          </TouchableOpacity> */}
        </View>

        <OTPTextView
          handleTextChange={value => setOtpNumber(value)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
          inputCellLength={1}
        />

        <View style={styles.code}>
          <Text>
            The code expires in{' '}
            <Text style={styles.sec}> {seconds} seconds.</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.resend} onPress={() => ResendOtpCode()}>
          <Text> Resend code</Text>
        </TouchableOpacity>

        <View style={styles.verify}>
          <FormButton
            btnTitle="Verify"
            onPress={() => VerifyOtp()}
            loading={isLoading}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  dottedContainer: {
    paddingTop: HP(13),
  },
  dotted: {
    width: HP(12),
    height: HP(5),
    alignSelf: 'center',
    borderRadius: WP(1),
  },
  phone: {
    textAlign: 'center',
    width: '87%',
    paddingTop: HP(5),
    paddingLeft: WP(20),
    color: COLOR.black,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  change: {
    textDecorationLine: 'underline',
    color: COLOR.mainColor,
    paddingLeft: WP(2),
  },
  textInputContainer: {
    marginBottom: 20,
    alignSelf: 'center',
    marginVertical: HP(2),
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 3,
  },
  code: {
    alignSelf: 'center',
  },
  sec: {
    color: COLOR.mainColor,
    fontWeight: 'bold',
  },
  resend: {
    alignSelf: 'center',
    padding: HP(2),
  },
  verify: {
    alignSelf: 'center',
    padding: HP(2),
    width: '100%',
    marginLeft: HP(4),
  },
  input: {
    paddingLeft: WP(3),
    alignSelf: 'center',
    width: '95%',
    paddingTop: HP(5),
  },
  phoneNumber:{
    color:COLOR.mainColor
  }
});
