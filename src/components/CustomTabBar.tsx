import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { hp, wp } from '../utils/ResponsiveLayout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CustomTabBar = (props: BottomTabBarProps) => {

    const bottomSpace = useSafeAreaInsets()

  return (
    
    <BlurView intensity={90} tint='dark' style={[styles.container, {marginBottom: bottomSpace.bottom,}]}>
      <BottomTabBar {...props} />
    </BlurView>
    
  )
}

export default CustomTabBar

const styles = StyleSheet.create({
    container: {
        height: hp(62),
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: wp(26),
        borderRadius: 24,
    },
});