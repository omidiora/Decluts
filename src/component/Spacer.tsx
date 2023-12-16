import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HP, WP} from '../Util/Util';

const Spacer = ({height = WP(1.5)}: {height?: number}) => {
  return <View style={{height: height}}></View>;
};

export default Spacer;

const styles = StyleSheet.create({});
