import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Itinerary = ({endAddress, duration, distance, goToDestination}) => {
    return (
        <View style={styles.container}>
            <View style={styles.itineraryInfo}>
                <Text>Votre boîte à lire la plus proche : </Text>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{endAddress}</Text>
                <Text>{duration} ({distance})</Text>
            </View>
            <View style={styles.itineraryButtons}>
                <Button
                    style={styles.buttons}
                    title='Etape' />
                <Button
                    onPress={goToDestination}
                    style={styles.buttons}
                    title='Itinéraire' />
            </View>
        </View>
    )
}

export default Itinerary

const styles = StyleSheet.create({
    container: {
        height: 130,
        backgroundColor: 'white',
        borderRadius: 10
    },
    itineraryInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    itineraryButtons: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
        width: '100%',
        borderRadius: 50
    }
})
