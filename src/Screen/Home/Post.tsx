import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {FloatingAction} from 'react-native-floating-action';
import {BODY_IMAGE, COLOR, HP} from '../../Util/Util';
import MyPost from './MyPost';
import {useNavigation} from '@react-navigation/native';

const Post = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyPost />
      <View style={styles.bodyImage}>
        {/* <Image source={BODY_IMAGE.emptyMyPost} />
        <Text style={styles.plus}>
          You don’t have any items listed. Use the plus ‘+’ button below to add
          an item.
        </Text> */}
      </View>
      <FloatingAction
        showBackground={false}
        color={COLOR.mainColor}
        distanceToEdge={{
          vertical: 110,
          horizontal: 20,
        }}
        actions={[]}
        onPressMain={name => {
          navigation.navigate('ProductNavigation');
        }}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  bodyImage: {
    alignSelf: 'center',
    paddingTop: HP(4),
    alignItems: 'center',
  },
  plus: {
    textAlign: 'center',
    paddingTop: HP(3),
  },
});
