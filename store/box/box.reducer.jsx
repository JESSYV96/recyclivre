import { 
    LIST_BOXES, 
} from "./box.actions";

const initialState = {
    listBox: []
}

export default boxesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_BOXES:
            return { 
                ...state, 
                listBox: action.payload 
            }
        default:
            return state;
    }
}