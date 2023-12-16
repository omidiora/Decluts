import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {BODY_IMAGE, COLOR, HP, WP} from '../Util/Util';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {confirmPaymentLoading} from '../redux/payment/api';
import {useSelector} from 'react-redux';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

interface ProgressIndicatorComponent {
  text: string;
  visible: boolean;
  status: string;
}
const ProgressIndicator = ({
  text,
  visible,
  status,
}: ProgressIndicatorComponent) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {updateUploadProgress} = useAppSelector(state => state.product);

  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <View>
          <AnimatedCircularProgress
            size={100}
            width={3}
            fill={updateUploadProgress}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {fill => <Text>{updateUploadProgress}%</Text>}
          </AnimatedCircularProgress>
        </View>
        <Text style={styles.upload}>Uploading!!!. Kindly Wait</Text>
      </View>
    </Modal>
  );
};

export default ProgressIndicator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: HP(40),
    padding: 10,
    borderRadius: 10,
  },
  success: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 15,
    fontSize: WP(5),
  },
  congrat: {
    color: 'black',
    textAlign: 'center',
  },
  btn: {
    marginTop: HP(2),
    borderWidth: 1,
    width: '80%',
    borderRadius: 5,
    height: HP(5),
    paddingTop: 15,
    borderColor: '#D0D5DD',
  },
  close: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#667085',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  indicator: {
    color: COLOR.black,
    fontWeight: 'bold',
    fontSize: WP(5),
  },
  upload: {
    color: COLOR.black,
    marginVertical:10
  },
});
