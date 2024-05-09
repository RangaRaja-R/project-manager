import { UPDATE } from "../actions/noteAction";
import { CLEAR } from "./rootReducer";
const initial = {
    content: "",
};

function noteReducer(state = initial, action) {
    switch (action.type) {
        case UPDATE:
            return action.payload;
        case CLEAR:
            return initial;
        default:
            return state;
    }
}

export default noteReducer;
