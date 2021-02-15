import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import ButtonFindBox from '../components/ButtonFindBox';
import { GOOGLE_KEY_API } from '../env';

const SearchAddressScreen = () => {
    const [location, setSetLocation] = useState(null);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Ionicons
                onPress={() => navigation.goBack()}
                style={styles.backIcon}
                name="ios-arrow-back-outline"
                size={24}
                color="black" />
            <GooglePlacesAutocomplete
                placeholder='Entrer une adresse'
                fetchDetails={true}
                minLength={3}
                onPress={(_, details = null) => {
                    setSetLocation(details.geometry.location)
                }}
                query={{
                    key: GOOGLE_KEY_API,
                    language: 'fr',
                }}
            />
            {location && (
                <View style={styles.buttonContainer}>
                    <ButtonFindBox
                        navigation={navigation}
                        location={{
                            latitude: location.lat,
                            longitude: location.lng
                        }} />
                </View>
            )}

        </View>
    )
}

export default SearchAddressScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 30 : 50,
    },
    header: {

        height: 75,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    buttonContainer: {
        marginVertical: 15,
        justifyContent: 'flex-end'
    },
    inputSearch: {
        backgroundColor: 'white',
        height: 47,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1
    },
    locIcon: {
        textAlign: 'right',
    },
    backIcon: {

    },
    addressText: {
        fontSize: 18,
    }
})
