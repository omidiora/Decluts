import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {BODY_IMAGE, HP, WP} from '../Util/Util';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../redux/hook';
import {confirmPaymentLoading} from '../redux/payment/api';

interface MessageModalComponent {
  text: string;
  visible: boolean;
  status: string;
}
const MessageModalComponent = ({
  text,
  visible,
  status,
}: MessageModalComponent) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <Image source={BODY_IMAGE.circular} />
       
      </View>
    </Modal>
  );
};

export default MessageModalComponent;

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
});
