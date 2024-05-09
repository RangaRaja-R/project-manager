import authService from "../services/authService";

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";
export const USER = "USER";
export const USERS = "USERS";
export const DELETE = "DELETE";
export const ERROR = "ERROR";

export const getAll = () => async (dispatch, getState) => {
    const user = getState().auth.user;
    const response = await authService.getAll(user.id);
    const users = response.data;
    dispatch({
        type: USERS,
        payload: users.map((item) => {
            if (user.id != item.id) return item;
            else
                return {
                    ...item,
                    name: "myself",
                };
        }),
    });
};

export const user = () => async (dispatch) => {
    const response = await authService.isLoggedIn();
    if (response.data.message !== "success") {
        dispatch({
            type: ERROR,
            payload: response.data.message,
        });
    } else {
        dispatch({
            type: USER,
            payload: response.data.user,
        });
    }
};

export const signIn = (data) => async (dispatch) => {
    const response = await authService.signIn(data);
    if (response.data.message !== "success") {
        dispatch({
            type: ERROR,
            payload: response.data.message,
        });
    } else {
        dispatch({
            type: SIGN_IN,
            payload: response.data,
        });
        await dispatch(user());
    }
};

export const signUp = (data) => async (dispatch) => {
    const response = await authService.signUp(data);
    if (response.data.message !== "success") {
        dispatch({
            type: ERROR,
            payload: response.data.message,
        });
    } else {
        dispatch({
            type: SIGN_UP,
            payload: response.data,
        });
    }
};

export const signOut = () => async (dispatch) => {
    const response = await authService.signOut();
    if (response.data.message !== "success") {
        dispatch({
            type: ERROR,
            payload: response.data.message,
        });
    } else {
        dispatch({
            type: SIGN_OUT,
            payload: response.data,
        });
    }
};

export const deleteUser = () => async (dispatch) => {
    const response = await authService.delete();
    if (response.data.message !== "success") {
        dispatch({
            type: ERROR,
            payload: response.data.message,
        });
    } else {
        dispatch({
            type: DELETE,
            payload: response.data,
        });
    }
};
