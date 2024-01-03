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

import Pricing from '../../../assets/images/pricing.svg';

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
    <View style={styles.container}>
      <HeaderComponent
        animatingWidthValues={[0, 111]}
        title="Upload Item"
        rightComponent={true}
        rightText={'4/4'}
        showStep={true}
        step1={true}
        step2={true}
        step3={true}
        step4={true}
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
                <View>
                  <Text style={styles.addItem}>Pricing</Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginLeft: 10,
                      paddingBottom: 50,
                    }}>
                    <Pricing
                      width={WP(95)}
                      height={HP(11)}
                      style={{
                        alignSelf: 'center',

                        paddingBottom: 50,
                        marginLeft: -50,
                      }}
                    />
                  </View>
                </View>
                <View style={{marginTop: -50}}>
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
                  <View style={{marginTop:220}}>
                  <FormButton
                    btnTitle="Preview"
                    onPress={() => CreateItemFunction(values)}
                  />
                  </View>
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
     paddingBottom: HP(0.5),
    fontSize: WP(5),
  },
  headerComponent: {
    // paddingLeft:-100
  },
  subContainer: {
    paddingLeft: WP(4),
    paddingTop: HP(1.4),
  },
  header: {
    paddingHorizontal: 10,
  },
  formInput: {
    width: '107%',
    marginTop: HP(-2),
  },
});
