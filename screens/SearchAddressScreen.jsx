import React, { useState } from 'react';
import {
    StyleSheet,
    Button,
    View,
    Platform,
    FlatList,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ButtonFindBox from '../components/ButtonFindBox';
import { GOOGLE_KEY_API } from '../env';

const SearchAddressScreen = () => {
    const [placeId, setPlaceId] = useState(null);
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
                minLength={2}
                onPress={(data, details = null) => {
                    console.log(data, details);
                    setPlaceId(data.place_id)
                }}
                query={{
                    key: GOOGLE_KEY_API,
                    language: 'fr',
                }}
                currentLocation={true}
                currentLocationLabel='Position actuelle'
            />
            <View style={styles.buttonContainer}>
                <ButtonFindBox
                    navigation={navigation}
                    placeId={placeId} 
                    origin={null} />
            </View>
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
