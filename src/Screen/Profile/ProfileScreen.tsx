import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Linking,
} from 'react-native';
import {COLOR, FontFamily, HP} from '../../Util/Util';
import HeaderComponent from '../../component/HeaderComponent';

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
  let msg = 's';
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
});
