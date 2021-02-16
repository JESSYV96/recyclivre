export const ITINERARY_INFO_REQUEST = 'ITINERARY_INFO_REQUEST'
export const ITINERARY_INFO_SUCCESS = 'ITINERARY_INFO_SUCCESS'
export const ITINERARY_INFO_ERROR = 'ITINERARY_INFO_ERROR'
export const ITINERARY_INFO_RESET = 'ITINERARY_INFO_RESET'



/**
 * @desc Get information about itinerary
 */
export const getItineraryInfo = (startAddress, startLocation, endAddress, endLocation, duration, distance) => (dispatch) => {
    try {
        dispatch({
            type: ITINERARY_INFO_REQUEST
        })

        const intenaryInfo = {
            startAddress,
            startLocation,
            endAddress,
            endLocation,
            duration,
            distance
        }

        return dispatch({
            type: ITINERARY_INFO_SUCCESS,
            payload: intenaryInfo
        })
    } catch (error) {
        dispatch({
            type: ITINERARY_INFO_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}