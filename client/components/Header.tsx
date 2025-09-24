import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListIcon, MagnifyingGlassIcon } from 'phosphor-react-native'
import { verticalScale, scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { colors } from '@/constants/style'

type HeaderProps = {
    hamBurger?: React.ReactNode,
    logo?: string
}

const Header = ({ hamBurger, logo }: HeaderProps) => {
    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: moderateScale(20), alignItems: 'center', backgroundColor: colors.neutral100 }}>
            <ListIcon
                size={24}
                color='black'
            />
            <Text style={{ textAlign: 'center', paddingHorizontal: moderateScale(110), fontSize: scale(18), fontWeight: 600, color: colors.neutral500 }}>
                Regis
                <Text style={{ color: "#25d303ff" }}>
                    X
                </Text>
            </Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({

})