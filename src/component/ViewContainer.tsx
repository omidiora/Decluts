import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, HP, WP } from '../Util/Util'

const ViewContainer = ({
  children,
  paddingVertical,
}: {
  children: React.ReactNode[];
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          paddingVertical && {paddingTop: paddingVertical},
        ]}>
        {React.Children.toArray(children)}
      </View>
    </View>
  );
};


export default ViewContainer

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLOR.white
    },

    content:{
      paddingHorizontal:WP(13.5),
      // paddingTop:HP(5),
       width:HP(60),
       alignSelf:"center",
       marginLeft:25,
      
    }
})