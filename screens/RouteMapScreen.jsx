import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Itinerary from '../components/Itinerary';
import { createOpenLink } from 'react-native-open-maps';
import { GOOGLE_KEY_API } from '../env';

import { getItineraryInfo } from '../store/itinerary/itinerary.actions';
import { getShorterDistance } from '../store/box/box.actions';

const RouteMapScreen = () => {
    const route = useRoute()
    const dispatch = useDispatch();

    const location = route.params.location;

    const { listBox, shorterDestination, loading: loadingShorterDestination } = useSelector(state => state.box)

    /**  
     * Get intenary from origin to destination, make sure to respect the format
     * https://developers.google.com/maps/documentation/directions/overview
     */
    useEffect(() => {
        dispatch(getShorterDistance(location.latitude, location.longitude, listBox))
        if (shorterDestination) {
            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${location.latitude}, ${location.longitude}&destination=${shorterDestination.coords.latitude}, ${shorterDestination.coords.longitude}&key=${GOOGLE_KEY_API}&language=fr`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    dispatch(getItineraryInfo(
                        data.routes[0].legs[0].start_address,
                        data.routes[0].legs[0].start_location,
                        data.routes[0].legs[0].end_address,
                        data.routes[0].legs[0].end_location,
                        data.routes[0].legs[0].duration.text,
                        data.routes[0].legs[0].distance.text
                    ))
                });
        }

    }, [])

    const { loading: loadingLocation, itineraryInfo } = useSelector(state => state.itinerary)
    const {
        startAddress,
        startLocation,
        endAddress,
        distance,
        duration } = itineraryInfo

    const openAppGoogleMaps = createOpenLink({
        start: startAddress !== '' ? startAddress : '',
        end: endAddress,
        navigate_mode: 'preview'
    });

    return (
        <View style={styles.container}>
            <MapView
                showsUserLocation={true}
                style={styles.map}
                initialRegion={{
                    latitude: 48.856614,
                    longitude: 2.3522219,
                    latitudeDelta: 0.900,
                    longitudeDelta: 0.900,
                }}>
                {!loadingLocation && startLocation && (
                    <Marker
                        coordinate={{
                            latitude: startLocation.lat,
                            longitude: startLocation.lng
                        }} />
                )}
                {!loadingShorterDestination && (
                   <Marker
                    coordinate={{
                        latitude: shorterDestination.coords.latitude,
                        longitude: shorterDestination.coords.longitude
                    }} /> 
                )}
                
                {!loadingLocation && !loadingShorterDestination && (
                    <MapViewDirections
                        origin={{ latitude: startLocation.lat, longitude: startLocation.lng }}
                        destination={shorterDestination.coords}
                        strokeWidth={4}
                        strokeColor="orange"
                        apikey={GOOGLE_KEY_API}
                        language='fr'
                    />
                )}
            </MapView>
            <View style={styles.itineraryContainer}>
                <Itinerary
                    goToDestination={openAppGoogleMaps}
                    endAddress={endAddress}
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
