import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import { COLORS } from '../utils/Colors'
import { hp, wp } from '../utils/ResponsiveLayout'


const HomeScreenLoader = () => {
  return (
    <View style={styles.container}>
        <MotiView
            transition={{
                type:"timing"
            }}
            style={styles.container}
        >
            <View style={styles.skeletonContainer}>
              <Skeleton colorMode='dark' radius={"square"} width={"50%"} />
            </View>
            
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: wp(22), marginTop: hp(16)}}>
              <Skeleton colorMode='dark' radius={"square"} width={166} height={240} />
              <Skeleton colorMode='dark' radius={"square"} width={166} height={240}  />
            </View>
            <View style={styles.skeletonContainer}>
              
              <Skeleton colorMode='dark' radius={"square"} width={"50%"} />
            </View>
            
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: wp(22), marginTop: hp(16)}}>
              <Skeleton colorMode='dark' radius={"square"} width={166} height={240} />
              <Skeleton colorMode='dark' radius={"square"} width={166} height={240}  />
            </View>
            <View style={styles.skeletonContainer}>
              
              <Skeleton colorMode='dark' radius={"square"} width={"50%"} />
            </View>
            
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: wp(22), marginTop: hp(16)}}>
              <Skeleton colorMode='dark' radius={"square"} width={166} height={240} />
              <Skeleton colorMode='dark' radius={"square"} width={166} height={240}  />
            </View>
        </MotiView>
      <Text>HomeScreenLoader</Text>
    </View>
  )
}

export default HomeScreenLoader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG_COLOR,
        
    },
    skeletonContainer: {
      width: "auto",
      height: "auto",
      borderRadius: 16,
      paddingHorizontal: wp(26),
      marginTop: hp(22)
    }
})