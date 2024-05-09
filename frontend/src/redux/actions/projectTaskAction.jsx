import projectTaskService from "../services/projectTaskService";

export const CREATE_PROJECT_TASK = "CREATE_PROJECT_TASK";
export const UPDATE_PROJECT_TASK = "UPDATE_PROJECT_TASK";
export const DELETE_PROJECT_TASK = "DELETE_PROJECT_TASK";
export const ALL_PROJECT_TASK = "ALL_PROJECT_TASK";
export const STATUS_TASK = "STATUS_PROJECT_TASK";
export const LOAD = "LOAD_PROJECT_TASK";

export const createTask = (id, data) => async (dispatch) => {
    // data should be an object with task attributes
    try {
        if (data.deadline == "") {
            data.deadline = null;
        }
        const res = await projectTaskService.create({ ...data, owner: id });
        await dispatch(getTasks());
    } catch (error) {
        console.log(error);
    }
};

export const getTasks = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOAD,
        });
        const id = getState().project.one.id;
        const res = await projectTaskService.all(id);
        dispatch({
            type: ALL_PROJECT_TASK,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (error) {
        console.log(error);
    }
};

export const updateTask = (data) => async (dispatch) => {
    try {
        const res = await projectTaskService.update(data);
        await dispatch(getTasks());
    } catch (error) {
        console.log(error);
    }
};

export const deleteTask = (id) => async (dispatch) => {
    try {
        const res = await projectTaskService.delete(id);
        await dispatch(getTasks());
    } catch (error) {
        console.log(error);
    }
};

export const taskStatus = (id, status) => async (dispatch) => {
    try {
        const res = await projectTaskService.status(id, status);
        await dispatch(getTasks());
    } catch (error) {
        console.log(error);
    }
};
