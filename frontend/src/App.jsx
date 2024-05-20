import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Note from "./components/Note";
import Tasks from "./pages/Tasks";
import ProjectList from "./pages/ProjectList";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user as isLoggedIn } from "./redux/actions/authAction";
import { getNote, save } from "./redux/actions/noteAction";

function App() {
    const user = useSelector((state) => state.auth.user);
    const note = useSelector((state) => state.note);
    const dispatch = useDispatch();
    const dark = () => {
        if (!document.body.classList.contains("dark"))
            document.body.classList.add("dark");
        else document.body.classList.remove("dark");
    };
    useEffect(() => {
        if (document.cookie.match("(^|;)\\s*" + "user" + "\\s*=\\s*([^;]+)")) {
            dispatch(isLoggedIn()).then(() => {
                dispatch(getNote());
            });
        }
    }, []);
    return (
        <HashRouter>
            <Navbar user={user} dark={dark} />
            <Note
                note={user == null ? { content: "" } : note}
                loggedIn={user != null}
                save={(val) => {
                    if (note.content != val)
                        dispatch(save({ ...note, content: val }));
                }}
            />
            <Routes>
                <Route index path="/home" element={<Home />} />
                <Route
                    path="/sign-in"
                    element={<SignIn loggedIn={user != null} />}
                />
                <Route
                    path="/sign-up"
                    element={<SignUp loggedIn={user != null} />}
                />
                <Route
                    path="/tasks"
                    element={<Tasks loggedIn={user != null} />}
                />
                <Route
                    path="/projects"
                    element={<ProjectList loggedIn={user != null} />}
                />
                <Route path="/projects/create" element={<ProjectCreate />} />
                <Route path="/projects/edit" element={<ProjectEdit />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
