import { 
    ITINERARY_INFO_SUCCESS, 
    ITINERARY_INFO_REQUEST, 
    ITINERARY_INFO_RESET } from "./itinerary.actions";

const initialState = {
    itineraryInfo: {}
}

export default itineraryReducer = (state = initialState, action) => {
    switch(action.type) {
        case ITINERARY_INFO_REQUEST:
            return {
                loading: true, 
                ...state
            }
        case ITINERARY_INFO_SUCCESS:
            return {
                loading: false,
                itineraryInfo: action.payload
            }
        case ITINERARY_INFO_RESET:
            return {
                itineraryInfo: {}
            }
        default:
            return state;
    }
}