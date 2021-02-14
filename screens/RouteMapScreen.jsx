import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useRoute } from '@react-navigation/native';
import Itinerary from '../components/Itinerary';
import { createOpenLink } from 'react-native-open-maps';

const yosemite = { latitude: 37.865101, longitude: -119.538330 };
const destination = { latitude: 49.019495, longitude: 2.1537956 };

const RouteMapScreen = () => {
    const route = useRoute()
    const [address, setAddress] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    
    const origin = route.params.origin
    const placeId = route.params.placeId
    const openYosemite = createOpenLink({
        end: address,
        provider:'google',
        navigate_mode: 'preview'
    });

    /**  
     * Get intenary from origin to destination, make sure to respect the format
     * https://developers.google.com/maps/documentation/directions/overview
     */
    useEffect(() => {
        if (origin !== undefined) {
            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude}, ${origin.longitude}&destination=${destination.latitude}, ${destination.longitude}&key=AIzaSyAfmOrInytBXJlDZ0_u1kqOFFxyo4Fzhb8&language=fr`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setAddress(data.routes[0].legs[0].end_address)
                    setDistance(data.routes[0].legs[0].distance.text)
                    setDuration(data.routes[0].legs[0].duration.text)
                });
        }
        if (placeId !== undefined) {
            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${placeId}}&destination=${destination.latitude}, ${destination.longitude}&key=AIzaSyAfmOrInytBXJlDZ0_u1kqOFFxyo4Fzhb8&language=fr`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setAddress(data.routes[0].legs[0].end_address)
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
                    latitude: origin.latitude,
                    longitude: origin.longitude,
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
                    apikey='AIzaSyAfmOrInytBXJlDZ0_u1kqOFFxyo4Fzhb8'
                    language='fr'
                />
            </MapView>
            <View style={styles.itineraryContainer}>
                <Itinerary
                    goToDestination={openYosemite}
                    address={address}
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
