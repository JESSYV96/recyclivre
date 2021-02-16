import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Itinerary from '../components/Itinerary';
import { createOpenLink } from 'react-native-open-maps';
import { GOOGLE_KEY_API } from '../env';

import { getItineraryInfo } from '../store/itinerary/itinerary.actions';

import { getDistanceFromLatLonInKm } from '../utils/distanceBetweenTwoPoints';


const RouteMapScreen = () => {
    const route = useRoute()
    const dispatch = useDispatch();

    const location = route.params.location;
    const [shorterDestination, setShorterDestination] = useState(null);
    const { listBox } = useSelector(state => state.box)
    const { itineraryInfo } = useSelector(state => state.itinerary)
    const {
        startAddress,
        startLocation,
        endAddress,
        distance,
        duration } = itineraryInfo

    /**  
     * Get intenary from origin to destination, make sure to respect the format
     * https://developers.google.com/maps/documentation/directions/overview
     */
    useEffect(() => {
        const shorterDestination = getShorterDestination(location.latitude, location.longitude, listBox)
        shorterDestination.then(shorterDestination => {
            directionApiRequest(location, shorterDestination)
            setShorterDestination(shorterDestination)
        })
    }, [location])


    const openAppGoogleMaps = createOpenLink({
        start: startAddress !== '' ? startAddress : '',
        end: endAddress,
        navigate_mode: 'preview'
    });

    const directionApiRequest = (location, shorterDestination) => {
        if (location && shorterDestination) {
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
    }
    /**
     * @desc Get shorter distance betwween a start address and  A box list
     */
    const getShorterDestination = async (startLat, startLng, boxesList) => {
        var shortDistance = Number.MAX_SAFE_INTEGER
        var shorterDestination = null

        boxesList.map(box => {
            const distance = getDistanceFromLatLonInKm(startLat, startLng, box.coords.latitude, box.coords.longitude)
            if (distance < shortDistance) {
                shortDistance = distance
                shorterDestination = box
            }
        })

        return shorterDestination
    }

    return (
        <View style={styles.container}>
            {startLocation && shorterDestination && (
                <MapView
                    showsUserLocation={true}
                    style={styles.map}
                    initialRegion={{
                        latitude: shorterDestination.coords.latitude,
                        longitude: shorterDestination.coords.longitude,
                        latitudeDelta: 1.5,
                        longitudeDelta: 1.5,
                    }}>

                    <Marker
                        coordinate={{
                            latitude: startLocation.lat,
                            longitude: startLocation.lng
                        }} />

                    <Marker
                        coordinate={{
                            latitude: shorterDestination.coords.latitude,
                            longitude: shorterDestination.coords.longitude
                        }} />


                    <MapViewDirections
                        origin={{ latitude: startLocation.lat, longitude: startLocation.lng }}
                        destination={shorterDestination.coords}
                        strokeWidth={5}
                        strokeColor="red"
                        apikey={GOOGLE_KEY_API}
                        language='fr'
                    />
                </MapView>
            )}
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
