import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLOR, FontFamily, WP} from '../../../Util/Util';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MyProductSheet = () => {
  return (
    <View style={{height: 400 ,borderRadius:10,borderTopRightRadius:30,borderWidth:1,zIndex:2000}}>
      <View style={styles.row}>
        <FontAwesome name="edit" size={22} color={COLOR.black} />
        <Text style={styles.edit}>Edit</Text>
      </View>
      <View style={styles.row}>
        <AntDesign name="delete" size={22} color={COLOR.black} />
        <Text style={styles.edit}>Delete</Text>
      </View>
    </View>
  );
};

export default MyProductSheet;

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:"20%",
    marginVertical:10,
    
  },
  edit:{
    color:COLOR.black,
    fontFamily:FontFamily.medium,
    fontSize:WP(3.5),
    // marginTop:10
  }
});
