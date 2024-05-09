import projectService from "../services/projectService";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const FETCH_PROJECTS = "FETCH_PROJECTS";
export const FETCH_PROJECT = "FETCH_PROJECT";
export const LOADING = "LOADING_PROJECT";
import { getTasks } from "./projectTaskAction";

export const createProject = (data) => async (dispatch, getState) => {
    try {
        const id = getState().auth.user.id;
        dispatch({
            type: LOADING,
            payload: true,
        });
        if (data.due == "") data.due = null;
        const res = await projectService.createProject({ ...data, owner: id });
        dispatch({
            type: CREATE_PROJECT,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const fetchProjects = () => async (dispatch, getState) => {
    try {
        const id = getState().auth.user.id;
        dispatch({
            type: LOADING,
            payload: true,
        });
        const res = await projectService.getProjects(id);
        dispatch({
            type: FETCH_PROJECTS,
            payload: res.data,
        });
        if (res.data) {
            dispatch({
                type: FETCH_PROJECT,
                payload: res.data[0],
            });
            dispatch(getTasks());
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchProject = (id) => async (dispatch) => {
    const response = await projectService.getProject(id);
    if (response.data.due == null) response.data.due = "";
    dispatch({
        type: FETCH_PROJECT,
        payload: response.data,
    });
};

export const updateProject = (data) => async (dispatch) => {
    if (data.due == "") data.due = null;
    const response = await projectService.updateProject(data);
    await dispatch(fetchProjects());
};
