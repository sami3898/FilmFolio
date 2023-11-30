import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Poster } from '../utils/Types'
import { DEVICE_WIDTH, hp, wp } from '../utils/ResponsiveLayout'
import { Image } from 'expo-image'
import Carousel from 'react-native-reanimated-carousel'
import { COLORS } from '../utils/Colors'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

interface ImageSliderProps {
    images: Poster[] | undefined
}

const ImageSlider = (props: ImageSliderProps) => {

    const { images } = props;

    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const translateX = useSharedValue((DEVICE_WIDTH - wp(48)) / images?.length!)

    const animatedStytle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}]
    }))

    useEffect(() => {
        translateX.value =  withSpring(currentIndex * (DEVICE_WIDTH - wp(48)) / images?.length!, {velocity: 2, mass: 0.5})
    }, [currentIndex])


    const _renderItem = ({item, index}: { item: Poster; index: number }) => {
        return (
            <Image 
                source={{ uri: `https://image.tmdb.org/t/p/original${item.file_path}`}}
                style={[styles.posterStyle, { aspectRatio: item.aspect_ratio}]}
                cachePolicy={'memory-disk'}
                contentFit='cover'
            />
        )
    }

  return (
    <View style={styles.container}>
        <Carousel 
            loop
            width={DEVICE_WIDTH - wp(48)}
            height={hp(200)}
            data={images!}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={_renderItem}
            autoPlay={true}
            autoPlayInterval={1500}
            pagingEnabled={true}
            // style={{backgroundColor: "red"}}
        />
        <View style={styles.progressView}>
            <Animated.View style={[styles.progressBar, {width: (DEVICE_WIDTH - wp(48)) / images?.length!}, animatedStytle]}>
            <LinearGradient
                    style={[styles.progressBar, {width: (DEVICE_WIDTH - wp(48)) / images?.length!}]}
                    colors={["#43A8D4", "#3b5998", "#3F377F"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View>
        </View>
    </View>
  )
}

export default ImageSlider

const styles = StyleSheet.create({
    container: {
        margin: hp(24),
        alignItems: 'center',
    },
    posterStyle: {
        borderRadius: 16
    },
    progressView: {
        height: 10,
        width: "100%",
        // borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.CYAN_BLUE,
        borderRadius: 16
    },
    progressBar: {
        height: 10,
        backgroundColor: COLORS.MAXIMUM_BLUE,
        borderRadius: 16
    }
})