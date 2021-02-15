import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import boxToRead from '../data/boiteALire.json'
import AddressBox from '../components/AddressBox'
import ButtonFindBox from '../components/ButtonFindBox';
import { getUserLocation } from '../store/user/user.actions';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            dispatch(getUserLocation(location))
        })();
    }, [])

    const { loading: loadingGeoLocation, geoLocation } = useSelector(state => state.user)

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                style={styles.map}
                initialRegion={{
                    latitude: 48.856614,
                    longitude: 2.3522219,
                    latitudeDelta: 0.900,
                    longitudeDelta: 0.900,
                }}>
                {boxToRead.map(box => (
                    <Marker
                        title={box.Adresse}
                        key={`${box.Adresse}-${box.Code_Postal}`}
                        coordinate={{
                            latitude: parseFloat(box.Coord_GPS.split(',')[0]),
                            longitude: parseFloat(box.Coord_GPS.split(',')[1])
                        }} />
                ))}
            </MapView>
            <AddressBox navigation={navigation} />
            <View style={styles.bottom}>
                {!loadingGeoLocation && geoLocation && (
                <ButtonFindBox
                    placeId={null}
                    origin={{
                        latitude: geoLocation.latitude,
                        longitude: geoLocation.longitude
                    }}
                    navigation={navigation}
                />
            )}  
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 45
    }
})
