import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useRoute } from '@react-navigation/native'
import { categorizedToken } from './home'
import { colors } from '@/constants/style'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getImage } from '@/services/ImageService'

const TokenScreen = () => {

    const route = useRoute()
    const { tokenId } = route.params

    const allTokens = categorizedToken.flatMap(c => c.token)

    const token = allTokens.find(t => t.id === tokenId)

    if (!token) {
        return (
            <ActivityIndicator color={colors.primary} size={20}>

            </ActivityIndicator>
        )
    }

    return (
        <ScreenWrapper>

            <Header />

            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={getImage[token.logo]} style={styles.image} />

                    <View style={{ marginTop: verticalScale(10) }}>
                        {token.name.split("-").map((part, index) => (
                            <Text style={{ textAlign: 'center', fontSize: scale(15), fontWeight: 600 }}>{part.trim()}</Text>
                        ))}
                    </View>
                </View>

                <View style={styles.tokenInfo}>
                    <View style={{ flexDirection: 'row', gap: scale(5) }}>
                        <Text style={{ color: colors.neutral500, fontWeight: 600 }}>
                            Timing:
                        </Text>

                        <Text style={{ color: colors.primary, fontWeight: 600 }}>
                            8:00 <Text style={{ color: colors.neutral500 }}>AM - </Text> <Text>5:00</Text> <Text style={{ color: colors.neutral500 }}>PM</Text>
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: scale(5) }}>
                        <Text style={{ color: colors.neutral500, fontWeight: 600 }}>
                            Totla Queue Tickets:
                        </Text>

                        <Text style={{ color: colors.primary }}>
                            40
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: scale(5) }}>
                        <Text style={{ color: colors.neutral500, fontWeight: 600 }}>
                            Current Queue Number:
                        </Text>

                        <Text style={{ color: colors.primary }}>
                            23
                        </Text>
                    </View>
                </View>


                <View style={styles.Address}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: colors.primary, fontWeight: "600", marginRight: 5}}>
                            Address:
                        </Text>

                        <Text style={{ flexShrink: 1, flexWrap: 'wrap' }}>
                            1234 West Elm Street, Los Angeles, CA 90017, United States
                        </Text>
                    </View>
                </View>

                <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: colors.primary, padding: moderateScale(10), borderRadius: 10, alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Text style={{ color: colors.white, fontWeight: 600 }}>Apply Now</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScreenWrapper>
    )
}

export default TokenScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral200,
        marginTop: verticalScale(10),
        alignItems: 'center'
    },

    imageContainer: {
        alignItems: 'center',
        marginTop: verticalScale(20),
        width: "100%",
        height: 100,
        // backgroundColor: colors.primary
    },

    image: {
        alignItems: 'center',
        width: 100,
        height: 100
    },

    tokenInfo: {
        width: "90%",
        // marginHorizontal: scale(20),
        marginTop: verticalScale(70),
        backgroundColor: colors.white,
        borderRadius: scale(10),
        padding: moderateScale(10),
        gap: scale(8)
    },

    Address: {
        width: "90%",
        marginTop: verticalScale(20),
        backgroundColor: colors.white,
        borderRadius: scale(10),
        padding: moderateScale(10),
    }
})