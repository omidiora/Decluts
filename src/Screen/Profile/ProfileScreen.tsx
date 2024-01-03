import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLOR, FontFamily, HP} from '../../Util/Util';
import HeaderComponent from '../../component/HeaderComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAppDispatch} from '../../redux/hook';
import {setCredential} from '../../redux/auth';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {AlertNofity, AlertNofityError, notify, notifySucess} from '../../Util/notify';
import { useNavigation } from '@react-navigation/native';

const Profile_Item = [
  {
    title: 'Account',
    data: [
      {
        subTitle: 'Account Detail',
        screen: 'EditProfile',
      },
      // {
      //   subTitle: 'Payment Information',
      // },
    ],
  },
  {
    title: 'Notifications',
    data: [
      {
        subTitle: 'Email',
      },
      {
        subTitle: 'Push notifications',
      },
    ],
  },
  {
    title: 'Contact us',
    data: [
      // {
      //   subTitle: 'Help & support',
      // },
      {
        subTitle: 'Help Desk',
      },
    ],
  },

  {
    title: 'Legal',
    data: [
      {
        subTitle: 'Licenses',
        screen: 'License',
      },
    ],
  },
];

const sendOnWhatsApp = () => {
  console.log('test');
  let msg = 'The Contact Number for your product!';
  let mobile = '08067031917';

  if (mobile) {
    if (msg) {
      let url = 'whatsapp://send?phone=234' + '09160006032' + '&text=' + msg;
      Linking.openURL(url)
        .then(() => {
          console.log('WhatasApp Opened');
        })
        .catch(() => {
          alert('Make Sure whatsapp is installed on your device');
        });
    } else {
      console.log('Please insert message to send');
    }
  } else {
    console.log('Please insert mobile no');
  }
};

const FlatListItemSeparator = () => {
  return (
    //Item Separator
    <View style={styles.listItemSeparatorStyle} />
  );
};

const ProfileScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const navigatio=useNavigation();

  const {removeItem} = useAsyncStorage('@declut_user');

  const AlertLogout = () => {
    Alert.alert('Logout', 'Confirm you want to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => LogoutAction()},
    ]);
  };

  const LogoutAction = async () => {
    console.log('lml')
    try {
      await removeItem();
      AlertNofity('Logout', 'Logout Successfully');
      navigation.navigate("Auth")
    } catch (e) {
      console.log(e,'aldmalmld')
      AlertNofityError('Logout', 'Something Went Wrong. Try again');
      // remove error
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <SectionList
          sections={Profile_Item}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeaderStyle}>{section.title}</Text>
          )}
          renderItem={({item}) => (
            // Item for the FlatListItems
            <View style={styles.sectionContainer}>
              <Text
                style={styles.sectionListItemStyle}
                //Item Separator View
                onPress={() => {
                  console.log(item?.subTitle == 'Help Desk', 'screen');
                  item?.subTitle == 'Help Desk'
                    ? sendOnWhatsApp()
                    : navigation.navigate(item.screen);
                }}>
                {item.subTitle}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{
            paddingTop: 10,
            marginHorizontal: 16,
          }}
          ListFooterComponent={() => (
            <>
              <TouchableOpacity
                style={styles.logoutContainer}
                onPress={() => AlertLogout()}>
                <View>
                  <FontAwesome5
                    name="door-open"
                    size={15}
                    color={COLOR.mainColor}
                  />
                </View>
                <Text style={styles.logout}>LOGOUT</Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: COLOR.white,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  sectionHeaderStyle: {
    fontSize: 18,
    padding: 4,
    color: COLOR.black,
    fontFamily: FontFamily.regular,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  sectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
  },
  sectionContainer: {
    backgroundColor: COLOR.white,
    borderRadius: HP(0.2),
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  logoutContainer: {
    marginTop: 30,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 1,
  },
  logout: {
    fontFamily: FontFamily.regular,
    color: COLOR.mainColor,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
