import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import authReducer from "./authReducer";
import noteReducer from "./noteReducer";
import projectReducer from "./projectReducer";
import projectTaskReducer from "./projectTaskReducer";

export const CLEAR = "CLEAR";

export default combineReducers({
    task: taskReducer,
    auth: authReducer,
    note: noteReducer,
    project: projectReducer,
    projectTask: projectTaskReducer,
});
