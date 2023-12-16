import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLOR, FontFamily, HP, NAIRA_SYSMBOL, WP} from '../../Util/Util';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {orderHistoryApi, settingApi} from '../../redux/product/api';
import { useRoute } from '@react-navigation/native';
import Spacer from '../../component/Spacer';
// {
//     name: '7 Seater sofa (3,2,1,1)',
//     price: '210,000.00',
//     location: 'Mile 12, Lagos',
//     date: 'Posted 2 days ago',
//     img: BODY_IMAGE.dummyImage1,
//   },

const CompletedScreen = (props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {data, loading, error, orderHistory} = useAppSelector(
    state => state.product,
  );


  React.useEffect(() => {
    dispatch(orderHistoryApi('completed'));
  }, []);

  console.log(props.route?.params?.status,'props')
  return (
    <View style={styles.orderH}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={orderHistory?.data?.data}
        renderItem={({item}) => (
          <View>
            <View style={styles.order}>
              <View>
                <Text style={styles.name}>{item.item_name}</Text>
                <Spacer />
                <Text style={styles.price}>
                  {NAIRA_SYSMBOL}
                  {item?.price}
                </Text>
                <Spacer />
                <Text style={styles.paid}>Posted:{item?.listed}</Text>
              </View>

              <View>
                <Text style={styles.orderNo}>{item?.order?.order_no}</Text>
                <Spacer />
                {/* <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.view}>Pay</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.noOrderContainer}>
            <Text style={styles.noOrder}> No Completed Order Yet!!</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CompletedScreen;

const styles = StyleSheet.create({
  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    paddingTop: HP(3),
    paddingLeft: HP(2.1),
    paddingRight: HP(2.1),
    borderBottomWidth: 1,
    paddingBottom: HP(4),
    borderColor: COLOR.lightBlue,
  },
  name: {
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontSize: WP(4),
  },
  price: {
    fontWeight: 'bold',
  },
  paid: {
    color: COLOR.lightGrey,
    fontWeight: '600',
  },
  view: {
    color: COLOR.lightOrange,
    fontFamily: FontFamily.bold,
  },
  orderNo: {
    color: COLOR.black,
    fontWeight: '400',
  },
  orderH: {
    backgroundColor: COLOR.white,
    flex: 1,
  },
  noOrder: {
    fontSize: WP(4),
  },
  noOrderContainer: {
    alignSelf: 'center',
    paddingTop: HP(12),
  },
});
