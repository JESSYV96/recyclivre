import React from 'react'
import { StyleSheet, Pressable, View, Platform, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const ButtonFindBox = ({ navigation, location }) => {

    /**
     * 
     */
    const goToMapRoutesBox = () => {
        if (location) {
            navigation.navigate('RouteMap', { location });
        } 
    }

    return (
        <View>
            <Pressable
                onPress={goToMapRoutesBox}
                style={styles.locIcon}>
                <Text>Boite la plus proche </Text>
                <Entypo
                    name="open-book"
                    size={24} color="black" />
            </Pressable>
        </View>

    )
}

export default ButtonFindBox

const styles = StyleSheet.create({
    locIcon: {
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 5
    },
})
