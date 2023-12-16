import {StyleSheet, Text, View, Platform, Animated} from 'react-native';
import React, {useState} from 'react';
import ViewContainer from '../../../../component/ViewContainer';
import HeaderComponent from '../../../../component/HeaderComponent';
import {COLOR, HP, WP} from '../../../../Util/Util';
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
const data = [
  {label: 'Neatly Used (Old)', value: 'Neatly Used'},
  {label: 'New', value: 'New'},
];

const EditItem1 = props => {
  var productDetails = props?.route?.params?.productDetails;

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector(state => state.product);
  const SetItemProduct = (values: any) => {
    dispatch(
      updateItemSuccess({
        item_name: values.name,
        description: values.description,
        area: values.area,
        states: values.state,
        address: values.address,
        condition: values.condition,
        price: values.price,
      }),
    );
    navigation.navigate('Item2');
  };

  let scrollOffsetY = React.useRef(new Animated.Value(0)).current;
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
        style={styles.container}
        contentContainerStyle={{paddingBottom: 10, marginLeft: 10}}>
        <View style={styles.subContainer}>
          <Formik
            validationSchema={ItemSchema1}
            initialValues={{
              name: '',
              description: '',
              area: '',
              state: '',
              address: '',
              condition: '',
            }}
            onSubmit={values => SetItemProduct(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
              touched,
            }) => (
              <View style={styles.formInput}>
                <FormInput
                  label="Enter item name *"
                  placeholder="Enter item name *"
                  onChangeText={handleChange('name')}
                  error={errors.name}
                />

                <FormInput
                  label="Description *"
                  placeholder="Description *"
                  onChangeText={handleChange('description')}
                  multiline={true}
                  error={errors.description && touched.description}
                />

                <View style={styles.dropItem}>
                  <Text style={styles.label}>State</Text>
                  <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={StateInNigeria}
                    search={true}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select State' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={e => setFieldValue('state', e.value)}
                    renderRightIcon={() => (
                      <Entypo
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="chevron-thin-down"
                        size={20}
                      />
                    )}
                  />
                  <Text style={styles.conditionError}>
                    {errors.state && touched.state}
                  </Text>
                </View>

                <View style={styles.dropItem}>
                  <Text style={styles.label}>Area(Local Goverment)</Text>
                  <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={LocalGoverment}
                    search={true}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Area' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={e => setFieldValue('area', e.value)}
                    renderRightIcon={() => (
                      <Entypo
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="chevron-thin-down"
                        size={20}
                      />
                    )}
                  />
                  <Text style={styles.conditionError}>
                    {errors.area && touched.area}
                  </Text>
                </View>
                <View style={styles.dropItem}>
                  <Text style={styles.label}>Item Condition *</Text>
                  <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Condition' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={e => setFieldValue('condition', e.value)}
                    renderRightIcon={() => (
                      <Entypo
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="chevron-thin-down"
                        size={20}
                      />
                    )}
                  />
                  <Text style={styles.conditionError}>
                    {errors.condition && touched.condition}
                  </Text>
                </View>

                <FormInput
                  label="Address *"
                  onChangeText={handleChange('address')}
                  error={errors.address}
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
    fontSize: 16,
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
});
