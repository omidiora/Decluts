import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
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
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {orderPaymentApi} from '../../redux/payment/api';
import {ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {upCreateProductApi} from '../../redux/product/api';

Ionicons.loadFont();

const UploadAllItem = () => {
  const width = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);
  const entries = [];
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {item, loading, error} = useAppSelector(state => state.product);
  //   const [loading, setloading] = useState(false);

  const UploadItem = () => {
    const formData = new FormData();
    formData.append('item_name', item.item_name);
    formData.append('category_id', item.category);
    formData.append('description', item.description);
    formData.append('state', item.state);
    formData.append('area', item.area);
    formData.append('price', item.price);
    formData.append('item_condition', item.condition);
    formData.append('defect_reason', item?.defect ? item?.defect : null);
    formData.append('brand', item.brand);
    formData.append('seller_address', 'Lagos state');
    formData.append('has_defect', item?.defect ? '1' : '0');
    formData.append('filepath[0]', item?.file?.payload[0]?.path);
    formData.append('filepath[1]', item?.file?.payload[1]?.path);
    formData.append('filepath[2]', item?.file?.payload[2]?.path);
    formData.append('filepath[3]', item?.file?.payload[3]?.path);

    dispatch(upCreateProductApi(formData, navigation));
  };

  console.log(item, 'adlmafl');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent rightComponent={' '} title={'Preview'} />
      </View>
      <ScrollView>
        <View style={{paddingTop: 30}}>
          <Carousel
            layout={'stack'}
            data={item?.previewImage?.payload?.imageTypes}
            sliderWidth={HP(50)}
            itemWidth={HP(45)}
            onSnapToItem={index => setActiveSlide(index)}
            renderItem={({item, index}) => (
              <>
                <View style={{width: '120%'}}>
                  <Image
                    source={{uri: item?.uri}}
                    style={{width: '100%', height: HP(30), right: 30}}
                    resizeMode="stretch"
                  />
                </View>
              </>
            )}
          />
          <View
            style={{
              position: 'absolute',
              top: HP(28),
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Pagination
              dotsLength={3}
              activeDotIndex={activeSlide}
              containerStyle={{backgroundColor: 'transparent'}}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'black',
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
            <Text style={styles.item_name}>{item?.item_name}</Text>

            <View style={{flexDirection: 'row', marginTop: -10}}>
              <Ionicons name="location-sharp" color={'#DB242D'} size={18} />
              <Text style={styles.address}>
                {item.address},{item?.state}
              </Text>
            </View>

            <View>
              <PostDetailComponent
                leftTitle="Description"
                rightTitle={item?.description}
                flexDirection="column"
              />
              <PostDetailComponent
                leftTitle="Brand:"
                rightTitle={item?.brand}
              />
              <PostDetailComponent
                leftTitle="Item Condition:"
                rightTitle={item?.condition}
              />
              <PostDetailComponent
                leftTitle="Defect:"
                rightTitle={item?.defect}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1.3,
          backgroundColor: 'white',
           marginTop: HP(-12),
          // borderTopWidth: 1,
          // backgroundColor: 'white',
          elevation: 5,
          shadowColor: 'grey',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          borderColor:"grey",
          // height:HP(1)
        }}>
        <View style={styles.totalPriceContainer}>
          <View>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.price}>
              {'\u20A6'}
              {item?.price}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.showContainer}
            onPress={() => UploadItem()}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.showText}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadAllItem;

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
    paddingTop: HP(3),
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
    fontWeight: 'bold',
    marginHorizontal: 10,
    fontSize: WP(4),
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
    backgroundColor: COLOR.mainColor,
    width: WP(40),
    height: HP(5.5),
  },
  showText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginLeft: -10,
    fontSize: WP(3.5),
    color: COLOR.white,
    paddingBottom: 30,
    // paddingLeft:10
  },
  totalPriceText: {
    color: COLOR.lightGrey,
    fontWeight: 'bold',
    fontSize: WP(4),
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
    color: COLOR.black,
    fontSize: WP(3),
    marginLeft: 3,
  },
  header: {marginTop: 30, marginLeft: 13},
});
