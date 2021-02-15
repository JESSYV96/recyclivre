import { 
    LIST_BOXES, 
    SHORTER_DESTINATION_REQUEST, 
    SHORTER_DESTINATION_SUCCESS 
} from "./box.actions";

const initialState = {
    listBox: [],
    shorterDestination: {}
}

export default boxesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_BOXES:
            return { ...state, listBox: action.payload }
        case SHORTER_DESTINATION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SHORTER_DESTINATION_SUCCESS:
            return {
                ...state,
                loading: false,
                shorterDestination: action.payload
            }
        default:
            return state;
    }
}