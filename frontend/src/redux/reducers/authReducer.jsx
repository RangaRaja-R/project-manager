import {
    SIGN_UP,
    SIGN_IN,
    USER,
    USERS,
    DELETE,
    ERROR,
    SIGN_OUT,
} from "../actions/authAction";
const initial = {
    user: null,
    error: null,
    all: [],
};

function authReducer(state = initial, action) {
    switch (action.type) {
        case USERS:
            return {
                ...state,
                all: action.payload,
            };
        case SIGN_UP:
            return {
                ...state,
                user: action.payload,
            };
        case SIGN_IN:
            return {
                ...state,
                user: action.payload,
                error: null,
            };
        case SIGN_OUT:
            return {
                ...state,
                user: null,
            };
        case USER:
            return {
                ...state,
                user: action.payload,
                error: null,
            };
        case DELETE:
            return {
                ...state,
                user: null,
            };
        case ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
export default authReducer;
