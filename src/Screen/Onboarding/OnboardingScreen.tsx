import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {BODY_IMAGE, COLOR, FontFamily, HP} from '../../Util/Util';
import Onboarding from 'react-native-onboarding-swiper';
import FormButton from '../../component/FormButton';
import {useNavigation} from '@react-navigation/native';
import {MMKV} from 'react-native-mmkv';
import {LocalStorage} from '../../Util/Storage';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const NavigateScreen = () => {
    navigation.navigate('Auth');
    LocalStorage.set('hideOnboardingScreen', true);
  };

  return (
    <View style={styles.container}>
      <Onboarding
        imageContainerStyles={{
          marginTop: HP(-30),
        }}
        NextButtonComponent={() => (
          <View style={styles.btn}>
            <FormButton
              btnTitle="Get Started"
              onPress={() => NavigateScreen()}
            />
          </View>
        )}
        DoneButtonComponent={() => (
          <View style={styles.btn}>
            <FormButton
              btnTitle="Get Started"
              onPress={() => NavigateScreen()}
            />
          </View>
        )}
        // bottomBarHeight={130}
        // showDone={false}
        titleStyles={{
          fontFamily: FontFamily.Mulish,
          color: COLOR.black,

          // fontWeight:"bold"
          // fontWeight: 'bold',
        }}
        subTitleStyles={{
          fontFamily: FontFamily.medium,
          color: COLOR.grey,
          lineHeight:30

        }}
        // showNext={false}
        showSkip={false}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={BODY_IMAGE.slider1} />,
            title: 'Welcome to Declut',
            subtitle:
              'Our platform connects buyers and sellers for seamless household item transactions. Post your items for sale, shop for quality goods, and schedule inspections effortlessly. Join us today and turn your household items into treasures!',
          },

          {
            backgroundColor: '#fff',
            image: <Image source={BODY_IMAGE.slider2} />,
            title: 'Discover & Sell with Declut',
            subtitle: `Unleash the potential of your unused household items! List them for sale on our platform and find eager buyers. From furniture to electronics, we've got you covered. Get started and watch your items find new homes.`,
          },
          {
            backgroundColor: '#fff',
            image: <Image source={BODY_IMAGE.slider3} />,
            title: 'Easy Buying & Inspections',
            subtitle:
              'Explore a world of household treasures on "Declut" Buy with confidence, knowing you can schedule inspections before making a decision. Finding your perfect piece has never been easier. Join now and indulge in smart buying experiences!',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btn: {
    alignSelf: 'center',
    marginTop: HP(-8),
    marginLeft: -200,
    width: '170%',
  },
});
