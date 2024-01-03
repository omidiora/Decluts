import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Animated,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Modal from 'react-native-modal';
import QuickCard from '../component/QuickCard';
import {BODY_IMAGE, COLOR, FontFamily, HP, WP} from '../Util/Util';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {
  DeleteProduct,
  editProductItemAction,
  fetchApiData,
} from '../redux/product/api';
// furniture.svg

interface ItemActionModalProps {
  onPress: () => void;
  setModalVisible: () => void;
  onClose: () => void;
  visible: boolean;
  item: {};
  onDelete: () => void;
}
const ItemActionModal = ({
  onPress,
  visible,
  setModalVisible,
  onClose,
  item,
  onDelete,
}: ItemActionModalProps) => {
  const navigation = useNavigation();

  const NavigateCategoryProduct = (id, title) => {
    setModalVisible(false);
    navigation.navigate('CategoryProductDetail', {
      categoryId: id,
      categoryTitle: title,
    });
  };

  const {data, loading, error, } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const Delete = async id => {
    setModalVisible();
    try {
      await dispatch(DeleteProduct(id));
    } catch (error) {}
  };

  const EditItem = item => {
    dispatch(editProductItemAction(item));
    setModalVisible();
    navigation.navigate('ProductNavigation', {
      screen: 'EditItem1',
      params: {
        productDetails: item,
      },
    });
  };
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const {dy} = gestureState;
        // Limit vertical movement
        if (dy > 0) {
          pan.setValue({x: 0, y: dy});
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const {dy} = gestureState;
        if (dy > 100) {
          onClose();
          pan.setValue({x: 0, y: 0});
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  // console.log(item?.id)
  return (
    <View>
      <Modal isVisible={visible}>
        <Animated.View
          style={[styles.container, {transform: [{translateY: pan.y}]}]}
          {...panResponder.panHandlers}>
          <Animated.View style={{alignSelf: 'center', marginTop: HP(-2)}}>
            <MaterialIcons name="remove" size={50} color={COLOR.lightGrey} />
          </Animated.View>
          <TouchableOpacity style={styles.row} onPress={() => EditItem(item)}>
            <Feather name="edit" color={'black'} size={20} />
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => Delete(item?.id)}>
            <AntDesign name="delete" color={'black'} size={20} />
            <Text style={styles.edit}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default ItemActionModal;

const styles = StyleSheet.create({
  container: {
    height: HP(30),
    width: WP(101),
    backgroundColor: 'white',
    marginLeft: -25,
    borderRadius: 20,
    marginTop: HP(70),
    // position: 'absolute',
    // bottom:0,
    // left:0,

    // alignSelf:"center"
  },
  row: {
    flexDirection: 'row',
    marginLeft: WP(5),
    paddingTop: HP(5),
  },
  edit: {
    color: COLOR.black,
    marginHorizontal: 10,
    fontSize: WP(4),
    fontFamily: FontFamily.medium,
  },
});
