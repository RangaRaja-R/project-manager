import {
    LOADING,
    CREATE_PROJECT,
    FETCH_PROJECTS,
    FETCH_PROJECT,
} from "../actions/projectAction";
import { CLEAR } from "./rootReducer";
const initial = {
    projects: [],
    loading: false,
    one: null,
};
export default function (state = initial, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
            };
        case FETCH_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false,
            };
        case FETCH_PROJECT:
            return {
                ...state,
                one: action.payload,
            };
        case CLEAR:
            return initial;
        default:
            return state;
    }
}
