import {StyleSheet, Text, View, Platform, Animated} from 'react-native';
import React, {useState} from 'react';
import ViewContainer from '../../../component/ViewContainer';
import HeaderComponent from '../../../component/HeaderComponent';
import {COLOR, FontFamily, HP, WP} from '../../../Util/Util';
import FormInput from '../../../component/FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../component/FormButton';
import {Dropdown} from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import {ItemSchema1} from '../Validation';
import {useDispatch, useSelector} from 'react-redux';
import {updateItemSuccess, updateItemSuccess4} from '../../../redux/product/api';
import {useNavigation} from '@react-navigation/native';
import {
  LocalGoverment,
  StateAndCapital,
  StateInNigeria,
} from '../../../Util/StateAndLga';
import DropDownSelect from '../../../component/DropDownSelect';
import AuthNavigation from '../../../navigation/AuthNavigation';
const data = [
  {label: 'Neatly Used (Old)', value: 'Neatly Used'},
  {label: 'New', value: 'New'},
];

const AddItem4 = () => {
  const [discountPice, setDiscountPice] = React.useState<number>(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector(state => state?.product);

  const CreateItemFunction = async values => {
    dispatch(
      updateItemSuccess4({
        price: values?.price,
      }),
    );
    navigation.navigate('UploadAllItem');
  };

  const Eightpercentage = (num: number) => {
    let value = ((8 / 100) * num).toFixed(1);
    setDiscountPice(num - Number(value));
    return value;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <HeaderComponent
          rightComponent={true}
          title="Add Item"
          rightText={'4/4'}
          showStep={true}
          step1={true}
          step2={true}
          step3={true}
          step4={true}
        />
      </View>
      <KeyboardAwareScrollView
        stickyHeaderIndices={[1]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{paddingBottom: 13, marginLeft: 10}}>
        <View style={styles.subContainer}>
          <Text style={styles.basicInfo}>Pricing</Text>
          <Formik
            // validationSchema={ItemSchema1}
            initialValues={{
              price:'',
            }}
            onSubmit={values => AuthNavigation(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => (
              <View style={styles.formInput}>
                <FormInput
                  value={values.price}
                  label="Enter price *"
                  placeholder="Enter 2500 *"
                  onChangeText={handleChange('price')}
                  handleBlur={Eightpercentage(values.price)}
                />

                <FormInput
                 label="You’ll get *"
                 placeholder="Enter 2500 *"
                 onChangeText={() => {}}
                 value={String(discountPice)}
                />


                <View style={styles.btn}>
                <FormButton
                    btnTitle="Preview"
                    onPress={() => CreateItemFunction(values)}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddItem4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  addItem: {
    color: COLOR.black,
    fontWeight: 'bold',
    paddingBottom: HP(4),
  },
  headerComponent: {
    // paddingLeft:-100
  },
  subContainer: {
    paddingLeft: WP(3),
    paddingTop: HP(2),
    width: WP(104),
  },
  dropdown: {
    height: 50,
    borderColor: 'grey',

    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#E4E7EC',
    width: '90%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    paddingBottom: 10,
    color: COLOR.black,
    // position: 'absolute',
    // backgroundColor: 'white',
    // left: 22,
    // top: 8,
    // zIndex: 999,
    // paddingHorizontal: 8,
    // fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderWidth: 0,
  },
  btn: {
    marginTop: HP(35),
  },
  dropItem: {
    paddingTop: HP(3),
  },
  conditionError: {
    color: 'red',
  },
  header: {
    // marginTop: HP(3),
    width: '90%',
    marginLeft: 20,
    height:HP(8)
  },
  basicInfo: {
    fontSize: WP(6.6),
    //  fontWeight:'bold',
    color: '#344054',
    fontFamily: FontFamily.bold,
  },
});
