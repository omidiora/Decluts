import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React, {useState, useRef} from 'react';
import {BODY_IMAGE, COLOR, HP, WP} from '../../Util/Util';
import FormInput from '../../component/FormInput';
import PhoneInput from 'react-native-international-phone-number';
import FormButton from '../../component/FormButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {EmailandPhoneSchema} from './Validation/main';
import HeaderComponent from '../../component/HeaderComponent';
import {useLoginMutation} from '../../redux/auth/api';
import {useNavigation} from '@react-navigation/native';
import ViewContainer from '../../component/ViewContainer';

interface AuthFunctionParam {
  email: string;
  password: string;
}
const Register2 = () => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const navigation = useNavigation();

  const AuthNavigation = (values: AuthFunctionParam) => {
    navigation.navigate('CreatePassword', {
      email: values.email,
      phone: values.phone
        .replace(/ /g, '')
        .replace('+234', '')
        .replace(/^0+/, '')
        .replace(/\D/g, ''),
    });
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState('');

  

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }



  return (
    // EmailandPhoneSchema
    <KeyboardAwareScrollView style={styles.container}>
      <ViewContainer>
        <HeaderComponent rightComponent={true} rightText={'Sign In'} />

        <View style={styles.subContainer}>
          <Image source={BODY_IMAGE.logo} style={styles.logo} />
          <Text style={styles.spam}>We will never spam you.</Text>
        </View>
        <Formik
          validationSchema={EmailandPhoneSchema}
          initialValues={{email: '', phone: ''}}
          onSubmit={values => AuthNavigation(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors ,setFieldValue}) => (
              
            <>
              <View style={styles.form}>
                <FormInput
                
                  label="Email"
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  required
                />
                {/* <FormInput label="Phone Number" placeholder="Phone Number *" /> */}

                <View style={{width:WP(80), }}>
              <View style={{flexDirection:'row'}}>
              <Text style={styles.phone}>Phone Number</Text>
              <Text style={styles.required}>*</Text>
              </View>
                <PhoneInput
                 placeholder="0000000000000"
                 defaultCountry="NG"
                  value={values.phone}
                  onChangePhoneNumber={(e)=>setFieldValue('phone',e)}
                  selectedCountry={selectedCountry}
                  onChangeSelectedCountry={handleSelectedCountry}
                  phoneInputStyles={{
                    container:{
                      height: HP(7),
                      // borderWidth:0.1,
                      borderColor:'#E4E7EC',
                    }
                  }}
                />
                </View>
                {/* <PhoneInput
                  value={value?.replace(/ /g, "").replace('+234', '')}
                  defaultCode="NG"
                  textContainerStyle={{
                    backgroundColor: COLOR.lightBlue,
                  }}
                  containerStyle={{
                    backgroundColor: COLOR.lightBlue,
                    borderWidth: 0,
                    width: '90%',
                    height:Platform.OS=='ios'? '15%': '18%',
                    paddingTop:5
                  }}  
                  ref={phoneInput}
                  defaultValue={value}
                  layout="first"
                  onChangeText={handleChange('phone')}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                  withDarkTheme
                 
                  
                /> */}
                <Text style={styles.errorPhone}>{errors.phone}</Text>
                <View style={styles.btn}>
                  <FormButton btnTitle="Continue" onPress={handleSubmit} />
                  {/* <FormButton btnTitle="Continue" onPress={handleSubmit} /> */}
                  {/* LoginFunc */}
                </View>
              </View>
            </>
          )}
        </Formik>
      </ViewContainer>
    </KeyboardAwareScrollView>
  );
};

export default Register2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  logo: {
    width: '15%',
    height: '10%',
    resizeMode: 'contain',
    alignSelf: 'center',
    paddingTop: HP(30),
  },
  subContainer: {
    flexDirection: 'row',
    paddingLeft: WP(7),
    marginTop: HP(-5),
  },
  spam: {
    paddingTop: HP(13.5),
    paddingLeft: WP(4.5),
    fontWeight: 'bold',
    color: COLOR.black,
  },
  form: {
    alignSelf: 'center',
    width: '100%',
    bottom: HP(5),
    paddingLeft: WP(5),
  },
  btn: {
    paddingTop: HP(7),
    marginTop:HP(15),
  },
  phone: {
    marginVertical: HP(1),
    color: COLOR.black,
  },
  errorPhone: {
    color: 'red',
    marginVertical: 3,
  },
  required:{
    marginTop:HP(1.2),
    marginLeft:WP(1.2),
    color:COLOR.mainColor
  }
});
