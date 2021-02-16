import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import AddressBox from '../components/AddressBox'
import ButtonFindBox from '../components/ButtonFindBox';
import { userLocation } from '../store/user/user.actions';
import { getAllBoxes } from '../store/box/box.actions';

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
            dispatch(userLocation(location))
        })();
        dispatch(getAllBoxes())
    }, [])

    const { loading: loadingGeoLocation, geoLocation } = useSelector(state => state.user)
    const { listBox } = useSelector(state => state.box)

    return (
        <View style={styles.container}>
            <MapView
                showsUserLocation={true}
                style={styles.map}
                initialRegion={{
                    latitude: 48.856614,
                    longitude: 2.3522219,
                    latitudeDelta: 11,
                    longitudeDelta: 11,
                }}>
                {listBox.map(box => (
                    <Marker
                        title={box.address}
                        description={box.comment}
                        key={box.id}
                        coordinate={{
                            latitude: box.coords.latitude,
                            longitude: box.coords.longitude
                        }} />
                ))}
            </MapView>
            <AddressBox navigation={navigation} />
            <View style={styles.bottom}>
                {!loadingGeoLocation && geoLocation && (
                    <ButtonFindBox
                        location={{
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
