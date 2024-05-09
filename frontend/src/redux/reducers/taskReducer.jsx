import { CREATE_TASK, ALL_TASK, LOAD } from "../actions/taskAction";
import { CLEAR } from "./rootReducer";
const initial = {
    tasks: [],
    loading: false,
};

export default function (state = initial, action) {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case ALL_TASK:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            };
        case LOAD:
            return {
                ...state,
                loading: true,
            };
        case CLEAR:
            return initial;
        default:
            return state;
    }
}
