import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import boxToRead from '../data/boiteALire.json'
import AddressBox from '../components/AddressBox'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 46.227638,
                    longitude: 2.213749,
                    latitudeDelta: 0.99,
                    longitudeDelta: 0.99,
                }}>
                {boxToRead.map(box => (
                    <Marker
                        key={`${box.Adresse}-${box.Code_Postal}`}
                        coordinate={{ latitude: parseFloat(box.Coord_GPS.split(',')[0]), longitude: parseFloat(box.Coord_GPS.split(',')[1]) }} />
                ))}
            </MapView>
            <AddressBox navigation={navigation} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1
    },
})
