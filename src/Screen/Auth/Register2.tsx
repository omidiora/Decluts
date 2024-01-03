import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React, {useState, useRef} from 'react';
import {BODY_IMAGE, COLOR, HP, WP} from '../../Util/Util';
import FormInput from '../../component/FormInput';
import PhoneInput from 'react-native-phone-number-input';
import FormButton from '../../component/FormButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {EmailandPhoneSchema} from './Validation/main';
import HeaderComponent from '../../component/HeaderComponent';
import { useLoginMutation } from '../../redux/auth/api';
import { useNavigation } from '@react-navigation/native';
import ViewContainer from '../../component/ViewContainer';

interface AuthFunctionParam{
  email:string,
  password:string
}
const Register2 = () => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const navigation = useNavigation();
  

    const AuthNavigation=(values:AuthFunctionParam)=>{
      navigation.navigate("CreatePassword",{
        email:values.email,
        phone:values.phone.replace(/ /g, "").replace('+234', '').replace(/^0+/, '').replace(/\D/g, '')
      })

    }


    


  
  return (
    // EmailandPhoneSchema
    <KeyboardAwareScrollView style={styles.container}>
     <ViewContainer>
     <HeaderComponent rightComponent={true} rightText={"Sign In"} />

      <View style={styles.subContainer}>
        <Image source={BODY_IMAGE.logo} style={styles.logo} />
        <Text style={styles.spam}>We will never spam you.</Text>
      </View>
      <Formik
        validationSchema={EmailandPhoneSchema}
        initialValues={{email: '', phone: ''}}
        onSubmit={values => AuthNavigation(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          (
            <>
              <View style={styles.form}>
                <FormInput
                  label="Email *"
                  placeholder='Email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                />
                {/* <FormInput label="Phone Number" placeholder="Phone Number *" /> */}

                <Text style={styles.phone}>Phone Number*</Text>
                <PhoneInput
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
                 
                  
                />
                <Text style={styles.errorPhone}>{errors.phone}</Text>
                <View style={styles.btn}>
                <FormButton btnTitle="Continue" onPress={handleSubmit} />
                {/* <FormButton btnTitle="Continue" onPress={handleSubmit} /> */}
                  {/* LoginFunc */}

                </View>

              </View>
            </>
          )
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
  },
  phone: {
    marginVertical: HP(1),
    color: COLOR.black,
  },
  errorPhone:{
    color:'red',
    marginVertical:3
  }
});
