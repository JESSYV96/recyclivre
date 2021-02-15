import {
    GET_USER_LOCATION_REQUEST,
    GET_USER_LOCATION_SUCCESS
} from "./user.actions";

export default userReducer = (state = { geoLocation: {} }, action) => {
    switch (action.type) {
        case GET_USER_LOCATION_REQUEST:
            return {
                loading: true,
                ...state
            }
        case GET_USER_LOCATION_SUCCESS:
            return {
                loading: false,
                geoLocation: action.payload
            }
        default:
            return state;
    }
}