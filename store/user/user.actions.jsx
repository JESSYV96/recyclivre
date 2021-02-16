export const GET_USER_LOCATION_REQUEST = 'GET_USER_LOCATION_REQUEST'
export const GET_USER_LOCATION_SUCCESS = 'GET_USER_LOCATION_SUCCESS'
export const GET_USER_LOCATION_ERROR = 'GET_USER_LOCATION_ERROR'

/**
 * @desc Retrieve user's location
 */
export const userLocation = (location) => (dispatch) => {
    try {
        dispatch({
            type: GET_USER_LOCATION_REQUEST
        })

        return dispatch({
            type: GET_USER_LOCATION_SUCCESS,
            payload: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        })
    } catch (error) {
        dispatch({
            type: GET_USER_LOCATION_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}