import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {COLOR, HP, WP} from '../Util/Util';

interface SwitchProps {
  onPress: () => void;
  toggle: boolean;
  text: string;
}
FontAwesome.loadFont();

const Switcher = ({onPress, toggle, text,subText}: SwitchProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <View>
          <Text style={styles.switchText}>{text}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <FontAwesome
            name={toggle ? 'toggle-on' : 'toggle-off'}
            size={32}
            color={'green'}
          />
        </TouchableWithoutFeedback>
    
      </View>
    {subText &&  <Text style={styles.subTitle}>{subText}</Text>}
    </View>
  );
};

export default Switcher;

const styles = StyleSheet.create({
  container:{
    marginVertical:20
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:WP(92),
    
    
    //
  },
  switchText: {
    fontWeight: 'bold',
    color: COLOR.black,
    top: HP(1),
  },
  subTitle:{
    color: COLOR.lightGrey,
    paddingTop:HP(0.6)
  }
});
