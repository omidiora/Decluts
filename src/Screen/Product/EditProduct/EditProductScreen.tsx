import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EditItem1 from './Editcomponent/EditItem1';
import EditItem2 from './Editcomponent/EditItem2';

const EditProductScreen = ({route}) => {
  const product = route?.params;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <EditItem1 productDetails={product} /> */}
      <EditItem2 productDetails={product} />
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({});
