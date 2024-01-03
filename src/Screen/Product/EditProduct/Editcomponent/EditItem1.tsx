import {StyleSheet, Text, View, Platform, Animated} from 'react-native';
import React, {useState} from 'react';
import ViewContainer from '../../../../component/ViewContainer';
import HeaderComponent from '../../../../component/HeaderComponent';
import {COLOR, FontFamily, HP, WP} from '../../../../Util/Util';
import FormInput from '../../../../component/FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../../component/FormButton';
import {Dropdown} from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import {ItemSchema1} from '../../Validation';
import {useDispatch, useSelector} from 'react-redux';
import {updateItemSuccess} from '../../../../redux/product/api';
import {useNavigation} from '@react-navigation/native';
import {
  LocalGoverment,
  StateAndCapital,
  StateInNigeria,
} from '../../../../Util/StateAndLga';
import DropDownSelect from '../../../../component/DropDownSelect';
const data = [
  {label: 'Neatly Used (Old)', value: 'Neatly Used'},
  {label: 'New', value: 'New'},
];

const EditItem1 = ( props ) => {
  var productDetails = props?.route?.params?.productDetails;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {editProductListItem }= useSelector(state => state.product);
  const SetItemProduct = (values: any) => {
    dispatch(
      updateItemSuccess({
        item_name: values.name,
        description: values.description,
        area: values.area,
        states: values.state,
        // address: values.address,
        condition: values.condition,
        price: values.price,
      }),
    );
    navigation.navigate('EditItem2');
  };


  // console.log(editProductListItem ,'productDetails')
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <HeaderComponent
          rightComponent={true}
          title="Edit Item"
          rightText={'1/4'}
        />
      </View>
      <KeyboardAwareScrollView
        stickyHeaderIndices={[1]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{paddingBottom: 13, marginLeft: 10}}>
        <View style={styles.subContainer}>
          <Text style={styles.basicInfo}>Basic Info</Text>
          <Formik
            validationSchema={ItemSchema1}
            initialValues={{
              name: productDetails?.item_name,
              description: productDetails?.description,
              area: productDetails?.area,
              state: productDetails?.state,
              address: productDetails?.seller_address,
              condition: productDetails?.item_condition,
            }}
            onSubmit={values => SetItemProduct(values)}>
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
                  label="Enter item name *"
                  placeholder="Enter item name *"
                  onChangeText={handleChange('name')}
                  error={errors.name}
                  value={values?.name}
                />

                <FormInput
                  label="Description *"
                  placeholder="Description *"
                  onChangeText={handleChange('description')}
                  multiline={true}
                  error={errors.description}
                  value={values?.description}
                />
                  <DropDownSelect
                  placeholder={'Select State'}
                  onChange={e => setFieldValue('state', e.value)}
                  title={'State'}
                  data={StateInNigeria}
                  error={errors.area}
                  value={values?.state}
                />

                {/* <DropDownSelect
                  placeholder={'Select Staadafadte'}
                  onChange={e => setFieldValue('state', e.value)}
                  title={'State'}
                  data={StateInNigeria}
                  error={errors.state}
                  value={'adfd'}
                /> */}

                <DropDownSelect
                  placeholder={'Select Local Goverment'}
                  onChange={e => setFieldValue('area', e.value)}
                  title={'Area(Local Goverment)'}
                  data={LocalGoverment}
                  error={errors.area}
                  value={values?.area}
                />
                <DropDownSelect
                  placeholder={'Select Condition'}
                  onChange={e => setFieldValue('condition', e.value)}
                  title={'Item Condition'}
                  data={data}
                  error={errors.condition}
                  value={values?.condition}
                />

               

                <View style={styles.btn}>
                  <FormButton btnTitle="Next" onPress={() => handleSubmit()} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditItem1;

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
    paddingTop: HP(10),
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
  },
  basicInfo: {
    fontSize: WP(6.6),
    //  fontWeight:'bold',
    color: '#344054',
    fontFamily: FontFamily.bold,
  },
});

