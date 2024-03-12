import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  COLOR,
  FontFamily,
  HP,
  NAIRA_SYSMBOL,
  WP,
  currencyFormatter,
} from '../../Util/Util';
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
import LineComponent from '../../component/ LineComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Location from '../../assets/images/svg/location.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PreviewItem = ({route: {params}, showInterest}) => {
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
    setloading(false);
  };

  console.log(params?.item, 'params?.item?');
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          zIndex: 100,
          top: HP(4),
          paddingHorizontal: 30,
        }}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" color={COLOR.white} size={25} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.dot}>
          <Entypo name="dots-three-vertical" color={COLOR.white}  size={20}  />
        </TouchableOpacity> */}
      </View>
      <Carousel
        layout={'stack'}
        data={params?.item?.item_media}
        sliderWidth={HP(50)}
        itemWidth={WP(105)}
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
                style={{
                  width: undefined,
                  height: HP(50),

                  resizeMode: 'cover',
                }}
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
                style={{width: WP(100), height: HP(30), right: 30}}
                controls={true}
              />
            );
          }
        }}
      />
      <View style={styles.dotPagin}>
        <Pagination
          dotsLength={params?.item?.item_media?.length}
          activeDotIndex={activeSlide}
          containerStyle={{backgroundColor: 'transparent'}}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.1}
          inactiveDotScale={0.6}
        />
      </View>
      <View>
        <ScrollView style={styles.subContainer}>
          <Text style={styles.posted}>Posted {params?.item?.listed}</Text>
          <Text style={styles.item_name}>{params?.item?.item_name}</Text>
          <View style={{flexDirection: 'row', marginVertical: HP(1)}}>
            <View style={styles.location}>
              <Location />
            </View>
            <Text style={styles.address}>
              {params?.item?.area}, {params?.item?.state}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descrtipionTitle}>Description</Text>
            <Text style={styles.descrip}>{params?.item?.description}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.brand}>Brand :</Text>
            <Text style={styles.branded}>{params?.item?.brand}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.brand}>Item Conditon : </Text>
            <Text style={styles.branded}>{params?.item?.item_condition}</Text>
          </View>
          <View>
            <Text style={styles.brand}>Defect</Text>
            <Text style={styles.defect}>
              {params?.item?.defect_reason == null
                ? 'None'
                : params?.item?.defect_reason}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.text}>Total Price</Text>
            <Text style={styles.price}>
              {NAIRA_SYSMBOL}
              {currencyFormatter(params?.item?.price)}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.showInterest}
              onPress={() => OrderItemFunc()}>
              {loading ? (
                <View style={styles.indicator}>
                  <ActivityIndicator color={'black'} size={'large'} />
                </View>
              ) : (
                <Text style={styles.interest}>Show Interest</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: WP(4),
  },
  dotStyle: {
    width: 25,
    height: 9,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor: COLOR.mainColor,
    opacity: 100,
    zIndex: 1,
  },
  dotPagin: {
    position: 'absolute',
    top: HP(42),
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  subContainer: {
    // top: HP(-10),
    paddingHorizontal: WP(4),
  },
  item_name: {
    fontFamily: 'Roboto-Bold',
    fontSize: WP(5),
    color: COLOR.black,
  },
  address: {
    fontFamily: 'Roboto-Bold',
    marginTop: -1,
  },
  location: {
    marginTop: 1,
    marginHorizontal: 3,
  },
  descriptionContainer: {
    marginTop: HP(3),
  },
  descrtipionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: WP(4),
    color: COLOR.black,
  },
  descrip: {
    fontFamily: 'Poppins-Light',
    fontSize: WP(4),
    color: COLOR.black,
  },
  brand: {
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontSize: WP(4),
  },
  branded: {
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontSize: WP(4),
  },
  rowItem: {
    flexDirection: 'row',
    marginVertical: WP(2),
  },
  defect: {
    fontFamily: 'Poppins-Light',
    fontSize: WP(4),
  },
  price: {
    fontFamily: FontFamily.bold,
    fontSize: WP(5.5),
    color: COLOR.black,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WP(95),
    borderTopWidth: 1,
    padding: HP(3),
    marginLeft: WP(2),
    borderColor: '#F2F4F7',
  },
  showInterest: {
    borderWidth: 1,
    width: WP(40),
    borderRadius: WP(12),
    borderColor: '#F2F4F7',
    height: HP(6),
  },
  interest: {
    color: '#98A2B3',

    textAlign: 'center',
    padding: HP(1.3),
    fontSize: WP(5),
  },
  text: {
    fontFamily: FontFamily.regular,
  },
  indicator: {
    marginTop: 10,
  },
  dot:{
    marginLeft:WP(80)
  }
});
