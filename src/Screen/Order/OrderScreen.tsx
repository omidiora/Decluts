import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import HeaderComponent from '../../component/HeaderComponent';
import {
  BODY_IMAGE,
  COLOR,
  HP,
  NAIRA_SYSMBOL,
  WP,
  callNumber,
  currencyFormatter,
  sendOnWhatsApp,
} from '../../Util/Util';

import Entypo from 'react-native-vector-icons/Entypo';
import LineComponent from '../../component/ LineComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormButton from '../../component/FormButton';
import moment from 'moment';

const OrderScreen = ({route}) => {
  console.log(route?.params?.params?.user?.phone_number, 'r');
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent
          title={route?.params?.params?.order?.order_no}
          rightComponent={true}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.paid}>
          <Text style={styles.item}>Item Paid For</Text>
          <TouchableOpacity>
            <Text style={styles.paidText}>
              {route?.params?.params?.order?.order_state}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image source={BODY_IMAGE.dummyImage1} />
          <View>
            <Text style={styles.seater}>
              {route?.params?.params?.item_name}
            </Text>
            <Text style={styles.naira}>
              {NAIRA_SYSMBOL}
              {currencyFormatter(route?.params?.params?.price)}
            </Text>
            <Text style={styles.location}>
              <Entypo name="location-pin" color={'red'} size={17} />
              {route?.params?.params?.area} , Lagos
            </Text>
            <Text style={styles.day}>
              Paid:{' '}
              {moment(route?.params?.params?.order?.updated_at).format(
                'ddd, Do MMMM, YYYY',
              )}
              .
            </Text>
          </View>
        </View>
        <LineComponent />

        <View style={styles.info}>
          <Text style={styles.sellerInfo}>{"Seller's Information"}</Text>

          <View style={styles.cardInfo}>
            <Image source={BODY_IMAGE.avatar} />
            <View style={styles.itemSold}>
              <Text>{route?.params?.params?.user?.name}</Text>
              <View style={styles.star}>
                <AntDesign name="star" size={22} color={COLOR.orange} />
                <Text style={styles.totalRating}>
                  {route?.params?.params?.user?.rating}(
                  {route?.params?.params?.user?.total_items_sold} items sold)
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* otal_items_sold */}
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>
            [{route?.params?.params?.user?.name}]’s contact information
          </Text>
          <Text style={styles.text}>
            {route?.params?.params?.user?.phone_number}
          </Text>

          <View style={styles.btn}>
            <TouchableOpacity
              style={[styles.btnInfo, {backgroundColor: 'black'}]}
              onPress={() =>
                callNumber(route?.params?.params?.user?.phone_number)
              }>
              <Text style={[styles.text, {fontSize: 13, color: COLOR.white}]}>
                Call Seller
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnInfo, {borderColor: 'grey', borderWidth: 0.2}]}
              onPress={() =>
                sendOnWhatsApp(route?.params?.params?.user?.phone_number)
              }>
              <Text style={[styles.text, {fontSize: 13}]}>Message seller</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dear}>
          <Text style={styles.sellerInfo}>Dear Buyer,</Text>
          <Text style={styles.dark}>
            Please feel free to get in touch with the seller promptly to arrange
            for item collection.{'\n'}
            {'\n'}We kindly advise you to personally inspect the item or guide
            the logistics company to verify its condition during the pick-up
            process. {'\n'}
            {'\n'} Upon the successful pick-up by either a designated logistic
            representative or yourself, the payment will be promptly transferred
            to the seller. It's important to note that any defects or
            discrepancies after the pick-up will not be the responsibility of
            Declut. {'\n'}
            {'\n'} If you're not fully satisfied with the item, we recommend
            refraining from initiating the pick-up.{'\n'}
            {'\n'}
            Thank you for your understanding and cooperation.
          </Text>
        </View>
        <View style={styles.btn2}>
          <FormButton btnTitle="Confirm Pickup" />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    marginTop: -1,
  },
  paid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: HP(3),
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  paidText: {
    color: COLOR.lightOrange,
    fontWeight: 'bold',
  },
  day: {
    color: COLOR.lightOrange,
    marginVertical: 2,
    fontWeight: 'bold',
    fontSize: WP(2.6),
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: WP(-13),
    marginVertical: 20,
  },
  item: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: WP(4),
  },
  info: {
    marginTop: HP(3),
  },
  sellerInfo: {
    color: COLOR.black,
    fontWeight: 'bold',
    fontSize: WP(4),
  },
  star: {
    flexDirection: 'row',
    marginTop: HP(0.5),
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: WP(-30),
    marginTop: 20,
  },
  itemSold: {
    marginLeft: -120,
  },
  detailsContainer: {
    borderWidth: 1,
    width: WP(95),
    height: HP(20),
    padding: 30,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderColor: COLOR.lightDeepBlue,
    backgroundColor: '#E0F7F6',
    marginLeft: -10,
  },
  text: {
    color: COLOR.black,
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: WP(4),
    textAlign: 'center',
  },
  btn: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  btnInfo: {
    borderWidth: 1,
    marginHorizontal: 20,
    padding: 4,
    width: WP(40),
    borderRadius: 5,
  },
  dear: {
    marginTop: HP(2),
    backgroundColor: '#FEF0C7',
    padding: 15,
    borderRadius: 20,
  },
  dark: {
    fontWeight: '500',
    marginVertical: 20,
    color: 'black',
  },
  btn2: {
    marginTop: HP(3),
    alignSelf: 'center',
    width: '100%',
    marginLeft: WP(4),
  },
  seater: {
    color: COLOR.lightGrey,
    fontWeight: 'bold',
    fontSize: WP(3.5),
    marginVertical: 4,
  },
  naira: {
    fontWeight: 'bold',
    marginLeft: WP(1),
  },
  location: {
    color: COLOR.lightGrey,
    fontWeight: '700',
  },
  totalRating: {
    marginTop: 4.5,
    color: COLOR.lightGrey,
    fontWeight: 'bold',
  },
});
