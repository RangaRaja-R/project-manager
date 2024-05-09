import noteService from "../services/noteService";
export const UPDATE = 'UPDATE';

export const getNote = () => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const response = await noteService.get(id);
        dispatch({
            type: UPDATE,
            payload: response.data
        })
    }catch(error){
        console.log(error)
    }
}

export const save = (data) => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const response = await noteService.update({...data, owner:id});
        dispatch({
            type: UPDATE,
            payload: response.data
        })
    }catch(error){
        console.log(error)
    }
}