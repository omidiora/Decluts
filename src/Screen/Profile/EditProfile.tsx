import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import FormButton from '../../component/FormButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLOR, HP, WP} from '../../Util/Util';
import {Auth, setCredential, useSelectCurrentUser} from '../../redux/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-number-input';
import {useEditProfileApiMutation} from '../../redux/auth/api';
import {editProfileApi} from '../../redux/auth/profile';
import HeaderComponent from '../../component/HeaderComponent';

const EditProfile = () => {
  const {getItem} = useAsyncStorage('@declut_user');
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state?.auth?.user);
  const phoneInput = React.useRef<PhoneInput>(null);

  const retrieveStoredDetail = async () => {
    const json = await getItem();
    const user_data: Auth = json != null ? JSON.parse(json) : {};
    dispatch(setCredential(user_data ?? {}));
  };

  function removeCountryCode(phoneNumber, countryCode) {
    // Check if the phone number starts with the country code
    if (phoneNumber && phoneNumber.startsWith(countryCode)) {
      // Remove the country code by slicing the string
      return phoneNumber.slice(countryCode.length);
    }

    return phoneNumber;
  }

  React.useEffect(() => {
    retrieveStoredDetail();
  }, []);

  const updateUser = () => {
    dispatch(
      editProfileApi({
        name: 'string',
        email: 'omidioraemmanuel@gmail.com',
        phone_number: userDetail?.phone_number,
        password: 'oluwa123@',
      }),
    );
  };
  // const as=useSelector(state=>state);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop:40}}>
        <HeaderComponent rightComponent={true} rightText={' '} title="Edit Profile"/>
      </View>
      {userDetail ? (
        <ViewContainer>
          <KeyboardAwareScrollView 
          style={{marginLeft:-20}}>
            <FormInput label="Full name *" value={userDetail?.name} />

            <View style={{paddingTop: 40, height: 250,}}>
              <Text style={{marginVertical: 4, color: 'black'}}>
                Phone Number*
              </Text>
              <PhoneInput
                value={removeCountryCode(userDetail?.phone_number, '+234')}
                defaultCode="NG"
                textContainerStyle={{
                  backgroundColor: COLOR.lightBlue,
                }}
                containerStyle={{
                  backgroundColor: COLOR.lightBlue,
                  borderWidth: 0,
                  width: '90%',
                  height: Platform.OS == 'ios' ? '30%' : '18%',
                  paddingTop: 5,
                }}
                ref={phoneInput}
                // defaultValue={value}
                layout="first"
                onChangeText={() => {}}
                // onChangeFormattedText={text => {
                //   setFormattedValue(text);
                // }}
                withDarkTheme
              />
            </View>

            <View style={{marginTop: HP(-10)}}>
              <FormInput label="Email *" value={userDetail?.email} />
            </View>
            <View style={styles.btn}>
              <FormButton btnTitle="Save" onPress={() => updateUser()} />
            </View>
          </KeyboardAwareScrollView>
        </ViewContainer>
      ) : null}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  btn: {
    paddingTop: HP(20),
  },
});
