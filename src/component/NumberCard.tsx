import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR, HP} from '../Util/Util';

const NumberCard = ({number, title, content}: number) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {(number)} {title}
      </Text>
      <Text style={styles.subTitle}>
        {content}
      </Text>
    </View>
  );
};

export default NumberCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: HP(1.5),
  },
  subTitle: {
    fontSize: HP(1.5),
    color: COLOR.black,
    paddingTop:HP(1)
  },
});
