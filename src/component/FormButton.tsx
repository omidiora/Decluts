import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLOR, FontFamily, HP, WP} from '../Util/Util';

interface Props {
  btnTitle: string;
  COLOR?: string;
  onPress: () => void;
  loading: boolean;
  disabled: boolean;
  btnColor: string;
}
const FormButton: React.FC<Props> = ({
  btnTitle,
  COLOR = 'white',
  onPress,
  loading = false,
  disabled = false,
  btnColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        {backgroundColor: btnColor ? btnColor : '#02A89E'},
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="white" />
        </>
      ) : (
        <Text style={[styles.btnTitle, {color: COLOR}]}>{btnTitle}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLOR.mainColor,
    width: '90%',
    padding: HP(1.8),
    borderRadius: WP(1.2),
    height: HP(7),
  },
  btnTitle: {
    textAlign: 'center',
    fontFamily: FontFamily.bold,
    fontSize: WP(5),
    // fontWeight:'600'
  },
});
