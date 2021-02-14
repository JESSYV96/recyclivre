import React from 'react'
import { StyleSheet, Text, Pressable, View } from 'react-native'

const AddressBox = ({navigation}) => {
    return (
        <View style={styles.inputContainer}>
            <Pressable
                onPress={() => navigation.navigate('SearchAddress')}
                style={styles.searchInput}>
                <Text style={styles.buttonText}>Entrer une adresse</Text>
            </Pressable>
        </View>
    )
}

export default AddressBox

const styles = StyleSheet.create({
    searchInput: {
        marginTop: 52,
        marginHorizontal: 10,
        paddingLeft: 10,
        height: 47,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'gray'
    }
})
