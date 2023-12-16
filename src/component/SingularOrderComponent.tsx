import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BODY_IMAGE,
  COLOR,
  FontFamily,
  HP,
  NAIRA_SYSMBOL,
  WP,
} from '../Util/Util';
import Spacer from './Spacer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FlexRowContainer from './FlexRowContainer';



const SingularOrderComponent = () => {
  return (
    <View style={styles.container}>
      <FlexRowContainer
        leftText="Item paid for"
        rightText="Completed"
        COLOR={COLOR.green}
      />
      <View style={styles.rowContainer}>
        <Image source={BODY_IMAGE.dummyImage1} />
        <View style={styles.ftcontainer}>
          <Text style={styles.name}>{'7 Seater sofa (3,2,1,1)'}</Text>
          <Text style={styles.price}>
            {NAIRA_SYSMBOL}
            210,000.00
          </Text>
          <Text style={styles.location}>{'Mile 12, Lagos'}</Text>
          <Text style={styles.date}>{'Paid: Sat, 27th May, 2023.'}</Text>
        </View>
      </View>
    </View>
  );
};

export default SingularOrderComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingBottom: 30,
    borderColor: COLOR.lightBlue,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: HP(4),
  },
  date: {
    color: COLOR.lightOrange,
    fontFamily: FontFamily.regular,
  },
  name: {
    color: COLOR.lightGrey,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  ftcontainer: {
    // right: HP(5),
  },
  price: {
    fontWeight: 'bold',
    color: COLOR.black,
    marginVertical: 4,
  },
  location: {
    color: COLOR.lightGrey,
    marginVertical: 3,
  },
});
