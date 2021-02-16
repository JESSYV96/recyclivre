import boxesToRead from '../../data/boiteALire.json';
import { getDistanceFromLatLonInKm } from '../../utils/distanceBetweenTwoPoints';

export const LIST_BOXES = 'LIST_BOXES'
export const SHORTER_DESTINATION_REQUEST = 'SHORTER_DESTINATION_REQUEST'
export const SHORTER_DESTINATION_SUCCESS = 'SHORTER_DESTINATION_SUCCESS'
/**
 * @desc Get All boxes 
 */
export const getAllBoxes = () => (dispatch) => {
    const boxesCoords = []
    boxesToRead.map(box => {
        boxesCoords.push({
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            address: box.Adresse,
            city: box.Ville,
            postalCode: box.Code_Postal,
            country: box.Ville,
            coords: {
                latitude: parseFloat(box.Coord_GPS.split(',')[0]),
                longitude: parseFloat(box.Coord_GPS.split(',')[1])
            },
            comment: box.Remarque
        })
    })

    return dispatch({
        type: LIST_BOXES,
        payload: boxesCoords
    })
}

/**
 * @desc Get shorter distance from box list
 */
export const getShorterDistance = (startLat, startLng, boxesList) => (dispatch) => {
    dispatch({
        type: SHORTER_DESTINATION_REQUEST
    })

    var shortDistance = Number.MAX_SAFE_INTEGER
    var shorterDestination = null

    boxesList.map(box => {
        const distance = getDistanceFromLatLonInKm(startLat, startLng, box.coords.latitude, box.coords.longitude)
        if (distance < shortDistance) {
            shortDistance = distance
            shorterDestination = box
        }
    })

    return dispatch({
        type: SHORTER_DESTINATION_SUCCESS,
        payload: shorterDestination
    })
}