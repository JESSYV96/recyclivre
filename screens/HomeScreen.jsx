import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import boxToRead from '../data/boiteALire.json'
import AddressBox from '../components/AddressBox'
import ButtonFindBox from '../components/ButtonFindBox';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);
          })()
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                style={styles.map}
                initialRegion={{
                    latitude:  48.856614,
                    longitude: 2.3522219,
                    latitudeDelta: 0.900,
                    longitudeDelta: 0.900,
                }}>
                {boxToRead.map(box => (
                    <Marker
                        title={box.Adresse}
                        description={box.Remarque}
                        key={`${box.Adresse}-${box.Code_Postal}`}
                        coordinate={{
                            latitude: parseFloat(box.Coord_GPS.split(',')[0]),
                            longitude: parseFloat(box.Coord_GPS.split(',')[1])
                        }} />
                ))}
            </MapView>
            <AddressBox navigation={navigation} />
            <View style={styles.bottom}>
            {userLocation && (
                <ButtonFindBox
                    placeId={null}
                    origin={{
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude
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
