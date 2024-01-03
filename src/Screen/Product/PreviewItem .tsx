import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR, FontFamily, HP, WP} from '../../Util/Util';
import Onboarding from 'react-native-onboarding-swiper';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PostDetailComponent from '../../component/PostDetailComponent';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../component/HeaderComponent';
import {useAppDispatch} from '../../redux/hook';
import {orderPaymentApi} from '../../redux/payment/api';
import uuid from 'uuid-random';
import VideoPlayer from 'react-native-video';
import ViewContainer from '../../component/ViewContainer';

const PreviewItem = ({route: {params},showInterest}) => {
  const width = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);
  const entries = [];
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const product = useAppDispatch(state => state?.product);
  const [loading, setloading] = useState(false);
  // loading
  // console.log(uuid(),'11')
  const OrderItemFunc = () => {
    setloading(true);
    dispatch(
      orderPaymentApi({
        payload: {
          id: params?.item.id,
          trx_ref: uuid(),
          item_amount: params?.item?.price,
        },
        navigation,
      }),
    );
    //
  };

  console.log(params?.showInterest,'lamldml')
  return (
    <ScrollView style={styles.container}
     contentContainerStyle={{paddingBottom:130}}>
      <ViewContainer>
      <View >
        <HeaderComponent rightComponent={' '} title={params?.item?.item_name} />
      </View>
      <View style={{paddingTop: 30}}>
        <Carousel
          layout={'stack'}
          data={params?.item?.item_media}
          sliderWidth={HP(50)}
          itemWidth={HP(45)}
          onSnapToItem={index => setActiveSlide(index)}
          renderItem={({item, index}) => {
            if (
              item?.filepath?.endsWith('.jpg') ||
              item?.filepath?.endsWith('.jpeg') ||
              item?.filepath?.endsWith('.png')
            ) {
              return (
                <Image
                  source={{uri: item?.filepath}}
                  style={{width: WP(102), height: HP(30), right: 30}}
                />
              );
            } else if (item?.filepath?.endsWith('.mp4')) {
              return (
                <VideoPlayer
                  disableFocus={true}
                  muted={false}
                  // key={item?.media?.id}
                  source={{
                    uri: item?.filepath,
                  }}
                  style={{width: WP(102), height: HP(30), right: 30}}
                  controls={true}
                />
              );
            }
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: HP(31),
            alignSelf: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Pagination
            dotsLength={params?.item?.item_media?.length}
            activeDotIndex={activeSlide}
            containerStyle={{backgroundColor: 'transparent'}}
            dotStyle={{
              width: 20,
              height: 20,
              borderRadius: 10,
              marginHorizontal: 8,
              backgroundColor: COLOR.mainColor,
              opacity: 100,
              zIndex: 1,
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.1}
            inactiveDotScale={0.6}
          />
        </View>
      </View>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.posted}>Posted {params?.item?.listed}</Text>
          <Text style={styles.item_name}>{params?.item?.item_name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Entypo name="location-pin" color={'#DB242D'} size={15} />
            <Text style={styles.address}>Mile 12, Lagos</Text>
            <AntDesign name="star" color={COLOR.green} />
            <Text style={styles.rating}>4.5</Text>
          </View>

          <View>
            <PostDetailComponent
              leftTitle="Description"
              rightTitle={params?.item?.description}
              flexDirection="column"
            />
            <PostDetailComponent
              leftTitle="Brand:"
              rightTitle={params?.item?.brand}
            />
            <PostDetailComponent
              leftTitle="Item Condition:"
              rightTitle={params?.item?.item_condition}
            />
            <PostDetailComponent
              leftTitle="Defect:"
              rightTitle={params?.item?.defect_reason}
            />
            <View style={styles.totalPriceContainer}>
              <View>
                <Text style={styles.totalPriceText}>Total Price</Text>
                <Text style={styles.price}>
                  {'\u20A6'}
                  {params?.item?.price}
                </Text>
              </View>

              {params?.showInterest && (
                <>
                  <TouchableOpacity
                    style={styles.showContainer}
                    onPress={() => OrderItemFunc()}>
                    {loading ? (
                      <ActivityIndicator />
                    ) : (
                      <Text style={styles.showText}>Show Interest</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
      </ViewContainer>
    </ScrollView>
  );
};

export default PreviewItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  posted: {
    color: '#A28300',
    fontWeight: 'bold',
  },
  subContainer: {
    marginLeft: 30,
    paddingTop: HP(7),
  },
  item_name: {
    // fontWeight: 'bold',
    marginVertical: HP(2),
    fontSize: HP(3),
    lineHeight: 30,
    fontFamily: FontFamily.bold,
  },
  address: {
    color: COLOR.lightGrey,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  rating: {
    fontWeight: 'bold',
    marginHorizontal: 5.5,
  },
  totalPriceContainer: {
    // borderWidth:1,
    // borderTopWidth:1,
    alignSelf: 'center',
    width: '96%',
    paddingTop: HP(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  showContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: HP(2),
    // paddingLeft:HP(12),
    textAlign: 'centers',
    borderColor: 'transparent',
    backgroundColor: '#F2F4F7',
  },
  showText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginLeft: -10,
    fontSize: WP(6),
    color: COLOR.lightGrey,
    // paddingLeft:10
  },
  totalPriceText: {
    color: COLOR.lightGrey,
    fontWeight: 'bold',
    fontSize: WP(6),
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
    color: COLOR.black,
    fontSize: WP(4.5),
  },
  header: {marginTop: 30, marginLeft: 13},
});
