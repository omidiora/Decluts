import React, {useRef} from 'react';
import {LogBox, View} from 'react-native';
import {Paystack} from 'react-native-paystack-webview';
import {useNavigation} from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Warning: ViewPropTypes']);

const PaymentInfo = props => {
  console.log(props?.route?.params?.item?.trx_ref, 'props');
  const {navigate} = useNavigation();
  const { getItem, setItem } = useAsyncStorage('@declut_user');

  const readItemFromStorage = async () => {
    const item = await getItem();
    console.log(JSON.parse(item)?.user?.email, '1');
  };

  React.useEffect(() => {
    readItemFromStorage();
  }, [])
  

  // {"item":{"id":5,"trx_ref":"3936bc94-dd35-46b7-9ff5-366f4a44bfde","item_amount":100000}}}}

  return (
    <View style={{flex: 1}}>
      <Paystack
        paystackKey="pk_test_e5b13c56e9123a925fcd776a01c28cd000038ceb"
        amount={props?.route?.params?.item?.item_amount}
        billingEmail="omidioraemmanuel@gmail.com"
        activityIndicatorColor="green"
        onCancel={e => {
          // handle response here
        }}
        onSuccess={res => {
          console.log(res, 'aldmaldmlamdlmlamlmlmmlalmalmlmlll')
          navigate('ConfirmPayment', {
            item: props?.route?.params?.item,
          });
          // handle response here
        }}
        refNumber={props?.route?.params?.item?.trx_ref}
        autoStart={true}
      />
    </View>
  );
};

export default PaymentInfo;
