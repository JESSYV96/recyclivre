import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useRoute } from '@react-navigation/native';
import Itinerary from '../components/Itinerary';
import { createOpenLink } from 'react-native-open-maps';
import { GOOGLE_KEY_API } from '../env';

const destination = { latitude: 49.019495, longitude: 2.1537956 };

const RouteMapScreen = () => {
    const route = useRoute()
    const [startAddress, setStartAddress] = useState('')
    const [addressEnd, setAddressEnd] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    
    const origin = route.params.origin
    const placeId = route.params.placeId
    const openAppGoogleMaps = createOpenLink({
        start: startAddress !== "" ? startAddress : null,
        end: addressEnd,
        provider:'google',
        navigate_mode: 'preview'
    });

    /**  
     * Get intenary from origin to destination, make sure to respect the format
     * https://developers.google.com/maps/documentation/directions/overview
     */
    useEffect(() => {
        if (origin !== undefined) {
            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude}, ${origin.longitude}&destination=${destination.latitude}, ${destination.longitude}&key=${GOOGLE_KEY_API}&language=fr`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setStartAddress(data.routes[0].legs[0].start_address)
                    setAddressEnd(data.routes[0].legs[0].end_address)
                    setDistance(data.routes[0].legs[0].distance.text)
                    setDuration(data.routes[0].legs[0].duration.text)
                });
        }
        if (placeId !== undefined) {
            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${placeId}&destination=${destination.latitude}, ${destination.longitude}&key=${GOOGLE_KEY_API}&language=fr`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setStartAddress(data.routes[0].legs[0].start_address)
                    setAddressEnd(data.routes[0].legs[0].end_address)
                    setDistance(data.routes[0].legs[0].distance.text)
                    setDuration(data.routes[0].legs[0].duration.text)
                });
        }
    }, [])


    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                zoomEnabled={false}
                zoomTapEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                style={styles.map}
                initialRegion={{
                    latitude: 48.856614,
                    longitude: 2.3522219,
                    latitudeDelta: 0.900,
                    longitudeDelta: 0.900,
                }}>
                <Marker
                    coordinate={{
                        latitude: destination.latitude,
                        longitude: destination.longitude
                    }} />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    strokeWidth={3}
                    strokeColor="orange"
                    apikey={GOOGLE_KEY_API}
                    language='fr'
                />
            </MapView>
            <View style={styles.itineraryContainer}>
                <Itinerary
                    goToDestination={openAppGoogleMaps}
                    endAddress={addressEnd}
                    distance={distance}
                    duration={duration} />
            </View>
        </View>
    )
}

export default RouteMapScreen

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1
    },
    itineraryContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }
})
