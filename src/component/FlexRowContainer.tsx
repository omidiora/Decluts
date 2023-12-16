import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLOR, FontFamily, HP} from '../Util/Util';

interface FlexRowContainerProps {
  disabled?: boolean;
  leftText: string;
  rightText: string;
  onPress?: () => void;
  COLOR?: string;
}
const FlexRowContainer = ({
  disabled = false,
  leftText,
  rightText,
  onPress,
  COLOR,
}: FlexRowContainerProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.categories}>{leftText}</Text>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text style={[styles.see, {color: COLOR}]}>{rightText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlexRowContainer;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    paddingTop: HP(3),
  },
  categories: {
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
    color: COLOR.black,
  },
  see: {
    fontWeight: 'bold',
    fontFamily: FontFamily.regular,
  },
});
