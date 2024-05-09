import taskService from "../services/taskService";

export const CREATE_TASK= 'CREATE_TASK';
export const UPDATE_TASK= 'UPDATE_TASK';
export const DELETE_TASK= 'DELETE_TASK';
export const ALL_TASK= 'ALL_TASK';
export const ONE_TASK= 'ONE_TASK';
export const LOAD = 'LOAD_TASK'

export const createTask = (data) => async (dispatch, getState) => {
    // data should be an object with task attributes
    try{
        const id = getState().auth.user.id;
        if(data.deadline==""){
            data.deadline=null;
        }
        const res = await taskService.create({...data, owner: id});
        dispatch({
            type: CREATE_TASK,
            payload: res.data
        })
        await dispatch(getTasks());
        return Promise.resolve(res.data)
    }catch (error){
        return Promise.reject(error)
    }
}

export const getTasks = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: LOAD
        })
        const id = getState().auth.user.id;
        const res = await taskService.all(id);
        dispatch({
            type:ALL_TASK,
            payload: res.data
        })
        return Promise.resolve(res.data)
    }catch (error){
        return Promise.reject(error)
    }
}

export const updateTask = (data) => async (dispatch) =>{
    try{
        const res = await taskService.update(data);
        dispatch({
            type: UPDATE_TASK,
            payload: res.data
        })
        return getTasks();
    }catch (error){
        return Promise.reject(error)
    }
}

export const deleteTask = (id) => async (dispatch) =>{
    try{
        const res = await taskService.delete(id);
        dispatch({
            type: DELETE_TASK,
            payload: res.data
        })
        return getTasks();
    }catch (error){
        return Promise.reject(error);
    }
}