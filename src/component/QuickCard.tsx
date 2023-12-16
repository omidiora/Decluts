import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {BODY_IMAGE, COLOR, HP, WP} from '../Util/Util';

interface QuickCardProps {
  image: React.ReactElement;
  subTitle: string;
}

const QuickCard = ({image, subTitle, onPress, url}: QuickCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width: WP(20), marginLeft: 10}}>
      <View>
        <Text>{image}</Text>
      </View>
      {/* <Image source={image}  style={styles.image}/> */}
      <Text style={styles.text}>{subTitle}</Text>
    </TouchableOpacity>
  );
};

export default QuickCard;

const styles = StyleSheet.create({
  //   card: {
  //     marginTop: HP(1),
  //     marginBottom: HP(3),
  //     marginHorizontal: WP(2),
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     flexWrap: 'wrap',
  //   },
  text: {
    fontWeight: 'bold',
    paddingTop: 2,
    color: COLOR.black,
    fontSize: HP(1.4),
    width: WP(23),
    textAlign: 'center',
    marginLeft: -15,
  },

  image: {
    alignSelf: 'center',
    width: WP(12),
    height: HP(8),
    // height:'25%',
    // resizeMode:'cover'
  },
});
