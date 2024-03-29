import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useState} from 'react';
import ViewContainer from '../../../component/ViewContainer';
import HeaderComponent from '../../../component/HeaderComponent';
import {COLOR, FontFamily, HP, WP} from '../../../Util/Util';
import FormInput from '../../../component/FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../component/FormButton';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ItemSchema2} from '../Validation';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  updateItemSuccess,
  updateItemSuccess2,
} from '../../../redux/product/api';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DropDownSelect from '../../../component/DropDownSelect';

const data = [
  {id: 1, label: 'Electronice', value: '1'},
  {id: 2, label: 'Furniture', value: '2'},
  {id: 3, label: 'Sport & Outdoor', value: '3'},
  {id: 4, label: 'Babies & Kids', value: '4'},
  {id: 5, label: 'Pets', value: '5'},
  {id: 6, label: 'Antiques', value: '5'},
  {id: 7, label: 'Health & Beauty', value: '6'},
  {id: 8, label: 'KitchenWares', value: '7'},
  {id: 9, label: 'Office Supplies', value: '8'},
  {id: 10, label: 'Books & Supplies', value: '9'},
  {id: 11, label: 'Books & Media', value: '10'},
  {id: 12, label: 'Automobile', value: '11'},
  {id: 13, label: 'Garden', value: '12'},
  {id: 14, label: 'Musical Instrument', value: '13'},
  {id: 15, label: 'Toys & Games', value: '14'},
  {id: 16, label: 'Arts', value: '15'},
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

const AddItem2 = () => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector(state => state.product?.item);

  const SetItemProduct = (values: any) => {
    dispatch(
      updateItemSuccess2({
        category: values.category,
        brand: values.brand,
      }),
    );
    navigation.navigate('Item3');
  };

  //  console.log(values.selectedId ,'v')
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent
          rightComponent={true}
          title="Add Item"
          rightText={'2/4'}
          showStep={true}
          step1={true}
          step2={true}
        />
      </View>
      <View style={styles.itemCon}>
        <Text style={styles.item}>Item Categorization</Text>
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 1310}}>
        <Formik
          validationSchema={ItemSchema2}
          initialValues={{
            category: '',
            brand: '',
            selectedId: '',
            defectReason: '',
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
            console.log(errors),
            <View style={styles.subContainer}>
              <View style={{width: WP(98.8)}}>
                <DropDownSelect
                  placeholder={'Select Category'}
                  onChange={e => setFieldValue('category', e.value)}
                  title={'Select Category'}
                  data={data}
                  error={errors.category}
                />
              </View>

              <View style={styles.FormInput}>
                <FormInput
                  placeholder="e.g HP"
                  label="Brand"
                  onChangeText={handleChange('brand')}
                  error={errors.brand}
                />
              </View>

           
              <View style={styles.btn}>
                <FormButton btnTitle="Next" onPress={() => handleSubmit()} />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddItem2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    // alignSelf:'center',
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
    paddingLeft: WP(5),
    marginTop: HP(-3),
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
    // marginTop: HP(1),
    paddingHorizontal: 10,
    height:HP(8)
  },
  text: {
    color: COLOR.black,
  },
  btn: {
    marginTop: HP(40),
    width: WP(100),
  },
  itemCon:{
    marginLeft:WP(4)
  },
  item:{
    fontSize:WP(4),
    color:COLOR.black,
    fontFamily:FontFamily.bold,
    marginVertical:20
  }
});
