import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import { colors } from '@/constants/style'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { CaretRightIcon, MagnifyingGlassIcon } from 'phosphor-react-native'
import { Image } from 'react-native'
import TokenOption from '@/components/TokenOption'
import { getImage } from '@/services/ImageService'
import { router } from 'expo-router'


export const categorizedToken = [
        {
            category: "Governments",
            token: [
                {
                    id: '1',
                    logo: "DMV",
                    name: "DMV-Los Angeles Downtown"
                },

                {
                    id: '2',
                    logo: "USCIS",
                    name: "USCIS-New York Field Office"
                }

            ]
        },

        {
            category: "Health Care",
            token: [
                {
                    id: '3',
                    logo: "Cleveland",
                    name: "Cleveland Clinic-Ohio"
                }
            ]
        },

        {
            category: "Banks",
            token: [
                {
                    id: '4',
                    logo: "ChaseBank",
                    name: "Chase Bank-Houstan Downtown"
                }
            ]
        }
    ]

const Home = () => {

    return (
        <ScreenWrapper>
            <Header />
            <View style={styles.container}>
                <View style={styles.SearchBar}>
                    <View>
                        <MagnifyingGlassIcon
                            size={24}
                            color={colors.neutral100}
                            style={styles.icon}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Search for jobs e.g. Full Stack"
                            placeholderTextColor={colors.neutral400}
                            style={styles.searchInput}
                        >
                        </TextInput>
                    </View>
                </View>

                <View style={{ margin: moderateScale(20) }}>
                    <View>
                        {
                            categorizedToken.map((category, index) => (
                                <View>
                                    <Text style={{ fontSize: scale(20), fontWeight: 600, color: colors.neutral600 }}>{category.category}</Text>

                                    {
                                        category.token.map((item, index) => (

                                            <View style={{backgroundColor: colors.white, padding: 10, borderRadius: 10, marginVertical: 10}}>
                                                <TouchableOpacity activeOpacity={1} key={item.id} onPress={() => router.push(`/tokenScreen?tokenId=${item.id}`)}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                    <Image source={getImage[item.logo]}/>
                                                    <Text>{item.name}</Text>
                                                    <TouchableOpacity>
                                                        <CaretRightIcon size={24} />
                                                    </TouchableOpacity>
                                                </View>
                                                </TouchableOpacity>
                                            </View>
                                        
                                    ))
                                    }
                                </View>


                            ))
                        }
                    </View>

                    {/* <View >
                        <Text style={{ fontSize: scale(20), fontWeight: 600, color: colors.neutral600 }}>Health Care</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: scale(20), fontWeight: 600, color: colors.neutral600 }}>Banks</Text>
                    </View> */}
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral200,
        marginTop: verticalScale(15)
    },

    SearchBar: {
        alignItems: "center",
        borderRadius: verticalScale(10),
        width: "90%",
        backgroundColor: colors.neutral100,
        flexDirection: "row",
        shadowColor: "#000",
        borderColor: colors.primary,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: verticalScale(15),
        marginHorizontal: moderateScale(20)

    },
    icon: {
        marginHorizontal: moderateScale(10),
        color: colors.neutral400
    },

    searchInput: {
        height: 50,
        fontSize: 16,
        color: colors.neutral800
    },
})