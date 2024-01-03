import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BODY_IMAGE, COLOR, FontFamily, HP, WP} from '../../Util/Util';
import FormInput from '../../component/FormInput';
import FormButton from '../../component/FormButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {LocalStorage} from '../../Util/Storage';
import HeaderComponent from '../../component/HeaderComponent';
import {useFormik} from 'formik';
import {NameValidtion} from './Validation/main';

Icon.loadFont();

const Register = () => {
  const [name, setName] = React.useState('');
  const navigation = useNavigation();

  const nameValidation = () => {
    if (name == '' || name < 2) {
      Alert.alert('Enter a valid name');
    } else {
    }
  };

  const {handleChange, handleSubmit, values, errors} = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: NameValidtion,
    onSubmit: (values)=>{
      LocalStorage.set('userName', name);
      navigation.navigate('Auth', {
        screen: 'Register2',
      });
    }
  });

   return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: COLOR.white}}
      contentContainerStyle={styles.input}>
      <HeaderComponent
        rightComponent={true}
        rightText={'Sign In'}
        rightFunc={() => navigation.navigate('Login')}
      />
      <Image source={BODY_IMAGE.logo} style={styles.logo} />
      <Text style={styles.letGo}>
        Lets get to know you and get your account created.
      </Text>
      <View style={styles.input}>
        <FormInput
          label="What is your name?"
          placeholder="Name"
          onChangeText={handleChange('name')}
          error={errors.name}
        />
        <View style={styles.btn}>
          <FormButton btnTitle="Continue" onPress={() => handleSubmit()} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  logo: {
    width: '20%',
    height: '30%',
    resizeMode: 'contain',
    alignSelf: 'center',
    paddingTop: HP(30),
  },
  letGo: {
    textAlign: 'center',
    marginTop: HP(-7),
    width: '90%',
    alignSelf: 'center',
    fontFamily: FontFamily.bold,
    fontWeight: 'bold',
    fontSize: WP(4.5),
    color: COLOR.black,
  },
  input: {
    paddingLeft: WP(3),
    alignSelf: 'center',
    width: '95%',
 
  },
  btn: {
    paddingTop: HP(25),
  },
});
