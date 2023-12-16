import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../component/HeaderComponent';
import LineComponent from '../component/ LineComponent';
import Spacer from '../component/Spacer';
import {COLOR, FontFamily, HP} from '../Util/Util';
import Switcher from '../component/Switcher';
import {useAppDispatch} from '../redux/hook';
import {settingApi} from '../redux/product/api';
import {useNavigation} from '@react-navigation/native';


const Setting = () => {
  const [newCondition, setNewCondition] = React.useState(0);
  const [oldCondition, setOldCondition] = React.useState(0);
  const [locationCondition, setLocationCondition] = React.useState(0);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const Setting = () => {
    dispatch(
      settingApi(
        {
          by_current_location: locationCondition,
          by_condition_new: newCondition,
          by_condition_neatly_used: oldCondition,
        },
        navigation,
      ),
    );
  };

  return (
    <View style={styles.container}>
     <View style={styles.header}>
     <HeaderComponent
        title="Settings"
        rightComponent={true}
        rightText={'Done'}
        rightFunc={() => Setting()}
      />
     </View>
      <Spacer height={15} />
      <LineComponent />
      <View style={styles.subContainer}>
        <Text style={styles.location}>Location</Text>
        <Switcher
          text="Show content in your current location"
          subText="When this is on, you’ll see listings around you right now."
          toggle={locationCondition}
          onPress={() => setLocationCondition(locationCondition == 0 ? 1 : 0)}
        />

        <Spacer height={20} />
        <Text style={styles.location}>Item Condition</Text>

        <Spacer height={10} />
        <Switcher
          text="New"
          toggle={newCondition}
          onPress={() => setNewCondition(newCondition == 0 ? 1 : 0)}
        />
        <Switcher
          text="Old"
          toggle={oldCondition}
          onPress={() => setOldCondition(oldCondition == 0 ? 1 : 0)}
        />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  location: {
    color: COLOR.black,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  subContainer: {
    marginVertical: HP(2),
    width: '80%',
    margin: 15,
  },
 
});
