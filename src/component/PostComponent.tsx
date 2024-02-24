import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  BODY_IMAGE,
  COLOR,
  FontFamily,
  HP,
  NAIRA_SYSMBOL,
  WP,
  currencyFormatter,
} from '../Util/Util';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {DeleteProduct, fetchApiData} from '../redux/product/api';
import {checkMediaTypes} from '../Util/checkMediaTypes';
import {Auth, setCredential} from '../redux/auth';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
import {PostLoader} from 'react-native-preloader-shimmer';
import BottomSheet, {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {SheetManager} from 'react-native-actions-sheet';
import ModalComponent from '../Screen/Home/component/ModalComponent';
import ItemActionModal from './ItemActionModal';
import Location from '../assets/images/svg/location.svg'
import { Kobolized } from '../Util';

interface PostComponentProps {
  postData: {
    item_name: string;
    price: string;
    listed: string;
    area: string;
    state: string;

    //  {item.area} {item.state}
  }[];
  message: string;
  showIcon: boolean;
}

const PostComponent = ({
  postData = [],
  showIcon,
  message,
}: PostComponentProps) => {
  const dispatch = useAppDispatch();
  const {data, loading, error} = useAppSelector(state => state.product);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [ItemValue, setItemValue] = useState({});

  React.useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    dispatch(fetchApiData());
    //set isRefreshing to true
    setIsRefreshing(true);
    // callApiMethod()
    // and set isRefreshing to false at the end of your callApiMethod()
  };

  // console.log(postData, 'postData');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <PostLoader
          barStyle={'dark-content'} //---> StatusBar Icon color
          animSpeed={300} //----> Animation Speed default 100
          visible={true} //----> Visibility
          backgroundColor={'white'}
        />
      ) : (
        <>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={postData}
            contentContainerStyle={{paddingBottom: HP(1)}}
            // onRefresh={onRefresh}
            // refreshing={isRefreshing}
            renderItem={({item}) => {
              return (
                <View style={styles.rowItem}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PreviewItem', {
                        item,
                      })
                    }>
                    <Image
                      source={{
                        uri: item?.item_media?.[0]?.filepath,
                        // uri: 'https://loremflickr.com/640/360',
                      }}
                      resizeMode="cover"
                      style={{
                        width: WP(35),
                        height: HP(15),
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.item_name}</Text>
                    <Text style={styles.price}>
                      {NAIRA_SYSMBOL}
                      {''}
                      {currencyFormatter( Kobolized(item.price))}
                    </Text>
                    <View style={{flexDirection:'row',paddingTop:5}}>
                    <View style={{marginTop:4}}>
                    <Location/>
                    </View>
                      <Text   style={styles.location}> {item.area} {item.state}</Text>
                    </View>
                    {/* <Text style={styles.location}>
                      <Location /><Text> {item.area} {item.state}</Text>
                    </Text> */}
                    <Text style={styles.date}>Posted {item.listed}</Text>
                  </View>
                  {showIcon && (
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                        setItemValue(item);
                      }}>
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={25}
                        color={COLOR.black}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
            ListEmptyComponent={() => (
              <View style={styles.empty}>
                <Image source={BODY_IMAGE.emptyMyPost} style={styles.img} />
                <Text style={styles.present}>
                  {message
                    ? message
                    : 'You don’t have any items listed. Use the plus ‘+’ button below to add an item.'}
                </Text>
              </View>
            )}
          />
        </>
      )}

      <ItemActionModal
        visible={modalVisible}
        item={ItemValue}
        onClose={() => setModalVisible(false)}
        setModalVisible={() => setModalVisible(false)}
      />
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: HP(3),
    marginHorizontal: 10,
  },
  name: {
    flexShrink: 1,
    color: COLOR.lightGrey,
    fontSize: WP(4.6),
    fontFamily: FontFamily.medium,
  },
  textContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1,
    paddingLeft: WP(5),
  },
  empty: {
    paddingTop: HP(4),
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
  },
  present: {
    textAlign: 'center',
    paddingTop: HP(2),
    fontSize: 18,
  },
  price: {
    fontWeight: 'bold',
    marginVertical: 4,
    color: COLOR.black,
    fontSize:WP(5)
  },
  location: {
    // marginVertical: 2,
    marginLeft: HP(0.3),
    color: COLOR.lightGrey,
    fontFamily: FontFamily.bold,
    fontSize:WP(4)
  },
  date: {
    color: COLOR.lightOrange,
    fontWeight: 'bold',
    marginTop: 4,
  },
  menuText: {
    marginLeft: 10,
    paddingTop: 6,
  },
});
