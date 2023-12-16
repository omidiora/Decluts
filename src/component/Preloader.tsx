import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {BODY_IMAGE, HP, WP} from '../Util/Util';
interface PreloaderProps {
  loading: boolean;
}
const Preloader = ({loading}: PreloaderProps) => {
  return (
    <View style={styles.preloaderContainer}>
      {loading && (
        <>
          <Image source={BODY_IMAGE.preloader} style={styles.img} />
       
        </>
      )}
    </View>
  );
};

export default Preloader;

const styles = StyleSheet.create({
  preloaderContainer: {
    alignSelf: 'center',
  },
  img: {
    height: HP(40),
    width: WP(30),
    opacity: 0.3,
    zIndex: 20,
  },
});
