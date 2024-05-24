import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Note from "./components/Note";
import Tasks from "./pages/Tasks";
import ProjectList from "./pages/ProjectList";
import ProjectModify from "./pages/ProjectModify";
import ProjectEdit from "./pages/ProjectEdit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, user as isLoggedIn } from "./redux/actions/authAction";
import { getNote, save } from "./redux/actions/noteAction";

function App() {
    const user = useSelector((state) => state.auth.user);
    const note = useSelector((state) => state.note);
    const dispatch = useDispatch();
    const [isDark, setDark] = useState(
        document.body.classList.contains("dark")
    );
    const dark = () => {
        if (!document.body.classList.contains("dark")) {
            document.body.classList.add("dark");
            setDark(true);
        } else {
            document.body.classList.remove("dark");
            setDark(false);
        }
    };
    useEffect(() => {
        let isMounted = true;
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme)").matches
        ) {
            if (isMounted) {
                setDark(true);
                document.body.classList.add("dark");
            }
        }
        if (document.cookie.match("(^|;)\\s*" + "user" + "\\s*=\\s*([^;]+)")) {
            dispatch(isLoggedIn()).then(() => {
                dispatch(getNote());
            });
            dispatch(getAll());
        }
        return () => (isMounted = false);
    }, []);
    return (
        <HashRouter>
            <Navbar user={user} dark={dark} isDark={isDark} />
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
                <Route path="/projects/modify" element={<ProjectModify />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
