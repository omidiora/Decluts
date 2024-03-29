import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLOR, FontFamily, HP, WP} from '../Util/Util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {PostLoader} from 'react-native-preloader-shimmer';

interface FormInputProps {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  showPassword?: boolean;
  forgotPassword: boolean;
  error: string;
  value: string | undefined;
  multiline: boolean;
  required?:boolean,
  bold?:boolean,
  labelColor:boolean,
}
const FormInput = ({
  label,
  placeholder,
  onChangeText,
  onFocus,
  onBlur,
  showPassword = false,
  forgotPassword,
  error,
  value,
  multiline = false,
  required,
  bold,
  labelColor,
  borderColor
}: FormInputProps) => {
  const [password, setPassword] = React.useState<boolean>(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topLabelContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.label,{fontFamily: bold ? FontFamily.bold:FontFamily.regular,color: labelColor? COLOR.mainColor:COLOR.black}]}>{label}</Text>
          {required && <Text style={styles.asterisk}>{'*'}</Text>}
        </View>
        {forgotPassword && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.label2}>{'Forgot Password?'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          numberOfLines={multiline ? 0 : 3}
          multiline={multiline ? true : false}
          autoCapitalize="none"
          placeholder={placeholder}
          style={[
            styles.textInput,
            {borderColor:borderColor?COLOR.mainColor:"#E4E7EC"},
            multiline && {
              height: HP(15),
              paddingTop: HP(2),
              textAlignVertical: 'top',
            },
          ]}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={!password && showPassword == true}
          // inputMode={password ? 'numeric' : 'text'}
          value={value}
        />

        {showPassword && (
          <TouchableOpacity
            style={styles.eye}
            onPress={() => setPassword(!password)}>
            <Ionicons name={password ? 'eye' : 'eye-off'} size={18} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View style={{top: multiline ? 1 : 3}}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: HP(2),
  },
  label: {
    paddingBottom: WP(2),
    color: COLOR.black,
    
    // fontWeight: '400',
    marginLeft:4,
    fontFamily:FontFamily.medium
  },
  textInput: {
    borderWidth: 1,
    width: Platform.OS == 'ios' ? '90%' : '90%',
    padding: HP(2),
    borderRadius: WP(2),
    backgroundColor: '#E4E7EC',
    height: HP(7),
    fontWeight:'bold'
  },
  eye: {
    paddingTop: HP(2),
    marginLeft: WP(-8),
  },
  topLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
  },
  label2: {
    fontFamily: FontFamily.bold,
    fontWeight: 'bold',
    color: COLOR.mainColor,
  },
  error: {
    color: 'red',
    // paddingTop: Platform.OS == 'ios' ? 15 : -160,
    // marginTop:-15
  },
  asterisk: {
    marginLeft: 3,
    color: COLOR.mainColor,
  },
});
