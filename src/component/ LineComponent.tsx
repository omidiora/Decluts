import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LineComponent = ({width}) => {
  return (
    <View
      style={{
        borderBottomColor: '#D0D5DD',
        borderBottomWidth:width ? width:StyleSheet.hairlineWidth ,
      }}
    />
  );
};

export default  LineComponent;

const styles = StyleSheet.create({});
