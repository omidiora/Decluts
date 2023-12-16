import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR, HP, WP} from '../Util/Util';

interface PostDetailComponent {
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  leftTitle: string;
  rightTitle: string;
}
const PostDetailComponent = ({
  flexDirection,
  leftTitle,
  rightTitle,
}: PostDetailComponent) => {


    
  return (
    <View
      style={[
        styles.post,
        flexDirection && {flexDirection: flexDirection, marginVertical: 30},
      ]}>
      <Text style={styles.leftTitle}>{leftTitle}</Text>
      <Text
        style={[
          styles.rightTitle,
          flexDirection && {
            flexDirection: flexDirection,
            marginVertical: 10,
            marginLeft: 0,
            width: '90%',
          },
        ]}>
        {rightTitle}
      </Text>
    </View>
  );
};

export default PostDetailComponent;

const styles = StyleSheet.create({
  post: {
    flexDirection: 'row',

    // justifyContent: 'space-around',
    marginVertical: 10,
  },
  leftTitle: {
    fontWeight: 'bold',
    color: COLOR.black,
    fontSize: HP(2),
    // paddingTop: HP(3),
  },
  rightTitle: {
    marginLeft: 'auto',
    width: '60%',
    // marginLeft:WP(14),
    paddingTop: HP(0.3),
    fontWeight:'bold'
  },
});
