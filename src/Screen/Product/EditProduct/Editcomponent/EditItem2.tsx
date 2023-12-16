import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useState} from 'react';
import ViewContainer from '../../../../component/ViewContainer';
import HeaderComponent from '../../../../component/HeaderComponent';
import {COLOR, HP, WP} from '../../../../Util/Util';
import FormInput from '../../../../component/FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../../component/FormButton';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ItemSchema2} from '../../Validation';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  updateItemSuccess,
  updateItemSuccess2,
} from '../../../../redux/product/api';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const data = [
  {label: 'New', value: 'New', search: 'New'},
  {label: 'Old', value: 'Old', search: 'Old'},
];

const DefectIMap = [
  {
    id: 1,
    title: 'Yes',
  },
  {
    id: 2,
    title: 'No',
  },
];

const EditItem2 = ({productDetails}) => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector(state => state.product?.item);

  const SetItemProduct = (values: any) => {
    dispatch(
      updateItemSuccess2({
        condition: values.condition,
        brand: values.brand,
        defect: values.defectReason ? values.defectReason : 'None',
      }),
    );
    navigation.navigate('Item3');
  };

  console.log(productDetails?.has_defect, 'a111111');
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 1310}}>
      <View style={styles.header}>
        <HeaderComponent
          rightComponent={true}
          title="Edit Product"
          rightText={'2/4'}
        />
      </View>
      <Formik
        validationSchema={ItemSchema2}
        initialValues={{
          condition: productDetails?.item_condition,
          brand: productDetails?.brand,
          selectedId: productDetails?.has_defect,
          defectReason: productDetails?.has_defect,
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
          <View style={styles.subContainer}>
            <Text style={styles.text}>Select Condition</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              minHeight={100}
              labelField="label"
              valueField="value"
              placeholder=""
              value={values.condition}
              // value={}
              // searchField="search"
              placeholder={!isFocus ? 'Select Condition' : '...'}
              searchPlaceholder="Search..."
              
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={e => setFieldValue('condition', e.value)}
              renderLeftIcon={() => <></>}
            />
            <Text style={{color: 'red'}}>{errors.condition}</Text>

            <View style={styles.FormInput}>
              <FormInput
                placeholder="e.g HP"
                label="Brand"
                onChangeText={handleChange('brand')}
                error={errors.brand}
                value={values.brand}
              />
            </View>

            <View
              style={{
                marginVertical: 30,
              }}>
              <Text style={styles.text}>Does the item have any defect(s)</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '40%',
                  marginVertical: 10,
                }}>
                {DefectIMap.map(item => (
                  <TouchableWithoutFeedback
                    style={{flexDirection: 'row'}}
                    onPress={() => setFieldValue('selectedId', item.title)}>
                    {/*   onChange={e => setFieldValue('condition', e.value)} */}
                    <MaterialCommunityIcons
                      name={
                        values.selectedId == item.title
                          ? 'checkbox-blank-circle'
                          : 'checkbox-blank-circle-outline'
                      }
                      size={30}
                      color={COLOR.mainColor}
                    />
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
              <Text style={{marginTop: 10, color: 'red'}}>
                {errors.selectedId}
              </Text>
              {values.selectedId == 'Yes'  && (
                <>
                  <FormInput
                    placeholder="Defect(issue)"
                    label="Defect(issue)"
                    multiline={true}
                    onChangeText={text => setFieldValue('defectReason', text)}
                    error={errors.defectReason}
                  />
                </>
              )}
            </View>

            <View>
              <FormButton btnTitle="Next" onPress={() => handleSubmit()} />
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default EditItem2;

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
    paddingLeft: WP(4),
    paddingTop: HP(5),
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.0,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLOR.lightBlue,
    width: '95%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
  },
  FormInput: {
    // paddingTop: HP(1),
    // paddingBottom: 50,
    width: '104%',
  },
  title: {
    marginTop: 7,
    color: COLOR.black,
  },
  header: {
    marginTop: HP(1),
    paddingHorizontal: 10,
  },
  text: {
    color: COLOR.black,
  },
});
