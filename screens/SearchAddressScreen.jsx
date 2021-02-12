import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const SearchAddressScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.inputSearch}>
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        style={styles.backIcon}
                        name="ios-arrow-back-outline"
                        size={24}
                        color="black" />
                    <TextInput
                        style={styles.addressText}
                        placeholder="Saisir une adresse" />
                </View>
            </View>
        </View>
    )
}

export default SearchAddressScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: Platform.OS === 'android' ? 30 : 50,
        height: 70,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    inputSearch: {
        backgroundColor: 'white',
        height: 47,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1
    },
    backIcon: {
        marginHorizontal: 15,
    },
    addressText: {
        fontSize: 18,
    }
})
