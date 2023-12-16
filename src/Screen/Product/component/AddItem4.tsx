import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import ViewContainer from '../../../component/ViewContainer';
import HeaderComponent from '../../../component/HeaderComponent';
import {COLOR, HP, WP} from '../../../Util/Util';
import FormInput from '../../../component/FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../component/FormButton';
import {Dropdown} from 'react-native-element-dropdown';
import {number} from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  upCreateProductApi,
  updateItemSuccess,
  updateItemSuccess4,
} from '../../../redux/product/api';

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
    setDiscountPice((num)-Number(value));
    return value;
  };
  return (
    <View style={styles.container}>
      <HeaderComponent
        animatingWidthValues={[0, 111]}
        title="Upload Item"
        rightComponent={true}
        rightText={'4/4'}
      />
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 10}}>
        <View style={styles.subContainer}>
          <View style={styles.header}></View>
          <Formik
            // validationSchema={EmailandPhoneSchema}
            initialValues={{price: ''}}
            // onSubmit={values => AuthNavigation(values)}
          >
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
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
                <FormButton
                  btnTitle="Next"
                  onPress={() => CreateItemFunction(values)}
                />
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
    paddingLeft: WP(4),
    paddingTop: HP(2),
  },
  header: {
    paddingHorizontal: 10,
  },
  formInput: {
    width: '107%',
  },
});
