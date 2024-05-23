import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import taskReducer from "./reducers/taskReducer";
import authReducer from "./reducers/authReducer";
import noteReducer from "./reducers/noteReducer";
import projectReducer from "./reducers/projectReducer";
import projectTaskReducer from "./reducers/projectTaskReducer";
import { thunk } from "redux-thunk";
export default configureStore({
    reducer: {
        task: taskReducer,
        auth: authReducer,
        note: noteReducer,
        project: projectReducer,
        projectTask: projectTaskReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
