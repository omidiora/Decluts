import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BODY_IMAGE, HP, WP} from '../../Util/Util';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {confirmPayment} from '../../redux/payment/api';
import {useAppDispatch} from '../../redux/hook';
import {useSelector} from 'react-redux';
import MessageModalComponent from '../../component/MessageModalComponent';

const ConfirmPayment = props => {
  const {
    route: {params},
  } = props;
  const dispatch = useAppDispatch();
  const [displayText, setDisplayText] = useState('Text 1');
  const [toggle, setToggle] = useState(false);

  const navigation = useNavigation();

  const state = useSelector(state => state?.payment);
  const {
    confirmPayment: confirmPaymentResult,
    paymentLoading,
    paymentSuccess,
    statusConfirmPayment,
  } = useSelector(state => state?.payment);

  useEffect(() => {
    dispatch(
      confirmPayment(
        {
          payload: {
            trx_ref: params?.item?.trx_ref,
          },
        },
        navigation,
      ),
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setToggle(prevToggle => !prevToggle);
      //   setDisplayText(prevText => (prevText === 'Text 1' ? 'Text 2' : 'Text 1'));
    }, 3000); // Change text every 10 seconds (10000 milliseconds)
    return () => clearInterval(interval);
  }, []);

  console.log(paymentSuccess, 'paymentSucces');
  return (
    <View style={styles.container}>
      <MessageModalComponent
        visible={paymentSuccess}
        status={statusConfirmPayment}
        text={
          'Congratulations! Your products are now live and available for potential buyers to explore. Best of luck with your sales!'
        }
      />
      <Image source={BODY_IMAGE.paymentGif} style={styles.img} />
      {toggle ? (
        <Text style={styles.payment}>{'Validating Payment!!!!'}</Text>
      ) : (
        <Text style={styles.payment}>Please do not cancel!!!!!</Text>
      )}
    </View>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    width: WP(20),
    height: HP(10),
    alignSelf: 'center',
    paddingHorizontal: 130,
    resizeMode: 'contain',
    marginTop: HP(30),
  },
  payment: {
    textAlign: 'center',
    fontSize: WP(5),
    marginHorizontal: 13,
  },
});
