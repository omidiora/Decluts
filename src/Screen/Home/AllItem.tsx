import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import {
  BODY_IMAGE,
  COLOR,
  FontFamily,
  HP,
  NAIRA_SYSMBOL,
  WP,
  currencyFormatter,
} from '../../Util/Util';
import MyPost from './MyPost';
import {useNavigation} from '@react-navigation/native';
import PostComponent from '../../component/PostComponent';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {fetchApiData, fetchCategoryProductById} from '../../redux/product/api';
import QuickCard from '../../component/QuickCard';
import LineComponent from '../../component/ LineComponent';
import Feather from 'react-native-vector-icons/Feather';
import ModalComponent from './component/ModalComponent';
import Spacer from '../../component/Spacer';
import Entypo from 'react-native-vector-icons/Entypo';
import Preloader from '../../component/Preloader';
import Electronics from '../../assets/images/svg/elect.svg';
import Furniture from '../../assets/images/svg/furniture.svg';
import Clothing from '../../assets/images/svg/Clothing.svg';
import Baby from '../../assets/images/svg/Baby.svg';
import Game from '../../assets/images/svg/Game.svg';
import Sport from '../../assets/images/svg/Sport.svg';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {AlertNofityError, notify} from '../../Util/notify';
import Location from '../../assets/images/svg/location.svg';
import {PostLoader} from 'react-native-preloader-shimmer';

Entypo.loadFont();
Feather.loadFont();
Feather.loadFont();

const AllItem = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {data, loading, error, category} = useAppSelector(
    state => state.product,
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const NavigateCategoryProduct = (id, title) => {
    navigation.navigate('CategoryProductDetail', {
      categoryId: id,
      categoryTitle: title,
    });
  };

  React.useEffect(() => {
    dispatch(fetchApiData());
    dispatch(fetchCategoryProductById(1));
  }, [dispatch]);

  if (error?.isAxiosError && error?.response === undefined) {
    AlertNofityError('Error', 'Check Your Network Connection!');
  } else if (error) {
    AlertNofityError('Error', error?.response?.data?.message);
  }

  // console.log(error.response.data?.message)
  return (
    <View style={styles.container}>
      <View style={styles.categories}>
        <Text style={styles.cate}>Categories</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.see}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickCardContainer}>
        <QuickCard
          image={<Electronics />}
          subTitle="Electronics"
          onPress={() => NavigateCategoryProduct(1, 'Electronics')}
        />
        <QuickCard
          image={<Furniture />}
          subTitle="Furniture"
          onPress={() => NavigateCategoryProduct(2, 'Furniture')}
        />
        <QuickCard
          image={<Clothing />}
          subTitle="Clothing"
          onPress={() => NavigateCategoryProduct(3, 'Clothing')}
        />

        <QuickCard
          image={<Game />}
          subTitle="Toys & Games"
          onPress={() => NavigateCategoryProduct(4, 'Toys & Games')}
        />
      </View>

      <LineComponent />

      <View style={styles.listing}>
        <Text style={styles.textList}>Listings</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Feather name="settings" color={COLOR.black} size={23} />
        </TouchableOpacity>
      </View>
      <Spacer height={130} />
      <ModalComponent
        visible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.flatlist}>
        <FlatList
          contentContainerStyle={{paddingBottom: HP(50)}}
          columnWrapperStyle={{width: '50%'}}
          numColumns={2}
          horizontal={false}
          data={category?.data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.categoryContainer}
              onPress={() =>
                navigation.navigate('PreviewItem', {
                  item: item,
                  showInterest: true,
                })
              }>
              <Image
                source={{
                  // uri: item?.item_media?.[0]?.filepath,
                  uri: item?.item_media[0]?.filepath,
                }}
                resizeMode="cover"
                style={styles.categoryImage}
              />
              <View style={styles.containerRowItem}>
                <Text style={styles.item_name}>{item.item_name}</Text>
                <Text style={styles.price}>
                  {NAIRA_SYSMBOL}
                  {''}
                  {currencyFormatter(item.price)}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginTop: 1.7, paddingHorizontal: 3}}>
                    <Location />
                  </View>
                  <Text style={styles.area}>
                    {item.area} {item.state}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <>
              {loading ? (
                <View style={styles.empty}>
                  <PostLoader
                    barStyle={'dark-content'} //---> StatusBar Icon color
                    animSpeed={100} //----> Animation Speed default 100
                    visible={true} //----> Visibility
                    backgroundColor={'white'}
                  />
                </View>
              ) : (
                <Text style={styles.noItem}>
                  No item in your location yet !{' '}
                </Text>
              )}
            </>
          )}
        />
      </View>

      {/*  */}
    </View>
  );
};

export default AllItem;

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
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 20,
    paddingTop: 25,
    marginTop: 5,
    paddingBottom: 20,
  },
  cate: {
    fontWeight: 'bold',
    color: COLOR.black,
    fontSize: WP(4),
  },
  see: {
    fontWeight: 'bold',
    color: COLOR.mainColor,
  },
  quickCardContainer: {
    marginTop: HP(2),
    marginBottom: HP(3),
    marginHorizontal: WP(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  listing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 20,
    paddingTop: 20,
  },
  textList: {
    // fontWeight: 'bold',
    color: COLOR.black,
    fontSize: WP(4),
    fontFamily: FontFamily.bold,
  },
  img: {
    width: WP(30),
    height: HP(30),
  },
  categoryImage: {
    width: WP(43),
    height: HP(16),
    borderRadius: 16,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  categoryContainer: {
    marginVertical: HP(1),
    alignSelf: 'center',
    marginLeft: 20,
  },
  item_name: {
    color: COLOR.lightGrey,
    // fontWeight: 'bold',
    marginVertical: 10,
    // textAlign: 'center',
    marginLeft: 5,
    fontFamily: FontFamily.bold,
  },
  present: {
    textAlign: 'center',
    paddingTop: HP(2),
  },
  price: {
    fontWeight: 'bold',
    color: COLOR.black,
    fontFamily: FontFamily.regular,

    width: '70%',
    marginLeft: 4,
    marginTop: -9,
    paddingBottom: 3,
  },
  location: {
    marginVertical: 5,
    width: '70%',
  },
  flatlist: {
    marginTop: HP(-11),
  },
  containerRowItem: {
    maxWidth: '100%',
    flexGrow: 1,
    flex: 2,
    // alignSelf: 'center',
  },
  empty: {
    alignSelf: 'center',
    marginTop: -101,
  },
  noItem: {
    alignSelf: 'center',
    fontSize: WP(4.5),
  },
  area: {
    fontFamily: FontFamily.bold,
    color: '#667085',
  },
});
