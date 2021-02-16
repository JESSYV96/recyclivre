import boxesToRead from '../../data/boiteALire.json';

export const LIST_BOXES = 'LIST_BOXES'

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