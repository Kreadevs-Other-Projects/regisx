import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { CaretRightIcon } from 'phosphor-react-native'

type TokenOptionProps = {
    logo?: string,
    name?: string,
    forwardIcon?: React.ReactNode
    routeName?: string
}

const TokenOption = ({ logo, name, forwardIcon, routeName }: TokenOptionProps) => {
    return (
        <View>
            <View style={styles.tokenContainer}>
                <View>
                    <Image source={{ uri: logo }} style={{width: 100, height: 100}} />
                    <Text>{name}</Text>
                </View>
                <View>
                    <CaretRightIcon size={24} color='black' />
                </View>
            </View>
        </View>
    )
}

export default TokenOption

const styles = StyleSheet.create({
    tokenContainer:
    {
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})