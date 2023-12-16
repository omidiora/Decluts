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

TouchableOpacity;
TouchableOpacity;
interface FormInputProps {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  showPassword?: boolean;
  forgotPassword: boolean;
  error: string;
  value:string | undefined,
  multiline:boolean
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
  multiline=false
}: FormInputProps) => {
  const [password, setPassword] = React.useState<boolean>(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topLabelContainer}>
        <Text style={styles.label}>{label}</Text>
        {forgotPassword && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.label2}>{'Forgot Password?'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{flexDirection: 'row'}}>
   
        <TextInput
         numberOfLines={multiline?0:3}
          multiline={multiline?true:false}
          autoCapitalize="none"
          placeholder={placeholder}
          style={[styles.textInput,multiline&&{height:HP(15),paddingTop:HP(2)}]}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={!password && showPassword==true}
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
        <View>
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
    fontFamily: FontFamily.bold,
    fontWeight: '400',
  },
  textInput: {
    borderWidth: 0,
    width: Platform.OS == 'ios' ? '90%' : '90%',
    padding: HP(2),
    borderRadius: WP(1),
    backgroundColor: '#E4E7EC',
    height: Platform.OS == 'ios' ? '124%' : '70%',
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
     paddingTop:Platform.OS=='ios'?15:-30
    // marginTop:-15
  },
});
