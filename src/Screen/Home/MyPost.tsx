import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {FloatingAction} from 'react-native-floating-action';
import {BODY_IMAGE, COLOR, HP} from '../../Util/Util';
import {useNavigation} from '@react-navigation/native';
import PostComponent from '../../component/PostComponent';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {DeleteProduct, MyPostItem, fetchApiData} from '../../redux/product/api';
import { SheetManager } from 'react-native-actions-sheet';

const MyPost = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {data, loading, error, myPost} = useAppSelector(state => state.product);

 

  React.useEffect(() => {
    dispatch(MyPostItem());
  }, [dispatch]);

 

  return (
    <View style={styles.container}>
      <PostComponent postData={myPost?.data} showIcon={true} />
      <View style={styles.bodyImage}></View>
    </View>
  );
};

export default MyPost;

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
