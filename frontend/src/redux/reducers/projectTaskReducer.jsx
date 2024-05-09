import { ALL_PROJECT_TASK } from "../actions/projectTaskAction";
import { CLEAR } from "./rootReducer";
const initial = {
    tasks: [],
};

export default function projectTaskReducer(state = initial, action) {
    switch (action.type) {
        case ALL_PROJECT_TASK:
            return {
                ...state,
                tasks: action.payload,
            };
        case CLEAR:
            return initial;
        default:
            return state;
    }
}
