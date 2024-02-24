import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {COLOR, FontFamily, HP} from '../Util/Util';
import Entypo from 'react-native-vector-icons/Entypo';
import {StateInNigeria} from '../Util/StateAndLga';

const DropDownSelect = ({
  onChange,
  placeholder,
  data,
  title,
  error,
  value,
  search,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.dropItem}>
      <Text style={styles.label}>{title}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search ? true : false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        // onChange={e => setFieldValue('state', e.value)}
        renderRightIcon={() => (
          <Entypo
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="chevron-thin-down"
            size={20}
          />
        )}
      />
      <Text style={styles.conditionError}>{error}</Text>
    </View>
  );
};

export default DropDownSelect;

const styles = StyleSheet.create({
  dropdown: {
    height:HP(7),
    borderColor: 'grey',

    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#E4E7EC',
    width: '90%',
  },
  conditionError: {
    color: 'red',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    paddingBottom: 10,
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontWeight: '400',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderWidth: 0,
  },
  btn: {
    paddingTop: HP(10),
  },
  dropItem: {
    paddingTop: HP(3),
  },
});
