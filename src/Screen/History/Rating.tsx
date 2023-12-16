import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {BODY_IMAGE, COLOR, HP, WP} from '../../Util/Util';
import SingularOrderComponent from '../../component/SingularOrderComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import FormButton from '../../component/FormButton';
const Emoji = [
  {
    id: 1,
    emoji: BODY_IMAGE.emoji1,
  },
  {
    id: 2,
    emoji: BODY_IMAGE.emoji2,
  },
  {
    id: 3,
    emoji: BODY_IMAGE.emoji3,
  },
  {
    id: 4,
    emoji: BODY_IMAGE.emoji4,
  },
  {
    id: 5,
    emoji: BODY_IMAGE.emoji5,
  },
];

const Rating = () => {
  return (
    <ScrollView style={styles.container}>
      <SingularOrderComponent />
      <View style={styles.ratingContainer}>
        <Text style={styles.rateSeller}>Rate seller</Text>
        <Image source={BODY_IMAGE.avatar} style={styles.seller} />
        <Text
          style={[
            styles.rateSeller,
            {marginVertical: 0, paddingTop: 10, paddingBottom: 10},
          ]}>
          Angelica Jackson
        </Text>
        <View style={styles.star}>
          <AntDesign name="star" color={COLOR.lightOrange} />
          <Text style={styles.sold}>4.0 (100 items sold)</Text>
        </View>
      </View>

      <View style={styles.experience}>
        <Text style={[styles.rateSeller, {paddingTop: HP(2)}]}>
          How’s your experience so far?{' '}
        </Text>
        <Text style={[styles.sold, {textAlign: 'center'}]}>
          We’d love to know!
        </Text>

        <View style={styles.emoji}>
          {Emoji.map((symbol, index) => (
            <TouchableOpacity key={index}>
              <Image source={symbol.emoji} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.btn}>
          <FormButton btnTitle="Support" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  ratingContainer: {
    alignSelf: 'center',
    paddingTop: HP(3),
  },
  rateSeller: {
    fontSize: WP(5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: HP(2),
  },
  seller: {
    alignSelf: 'center',
  },
  star: {
    flexDirection: 'row',
    paddingLeft: WP(1),
  },
  sold: {
    bottom: HP(0.3),
    left: WP(1.3),
  },
  emoji: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: HP(4),
  },
  image: {marginHorizontal: 10},
  experience: {
    borderTopWidth: 1,
    borderColor: COLOR.lightBlue,
    marginTop: WP(15),
  },
  btn: {
    alignSelf: 'center',
    width: '100%',
    paddingTop: HP(4),
    paddingLeft: WP(5),
  },
});
