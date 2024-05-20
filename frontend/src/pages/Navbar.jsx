import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SideBar from "../components/SideBar";
import "../style/navbar.css";

function Navbar({ user, dark }) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const error = useSelector((state) => state.auth.error);
    if (location.pathname == "/sign-in" || location.pathname == "/sign-up") {
        return (
            <div
                className="navbar"
                style={{ position: "fixed", border: "none" }}
            >
                <button onClick={() => dark()}>svg</button>
            </div>
        );
    }
    return (
        <div className={open ? "top" : "top over"}>
            <nav className="navbar">
                <div className="projectTitle">
                    <div
                        className="sidebar__logo"
                        onClick={() => setOpen(!open)}
                    >
                        &#9776;
                    </div>
                    <div className="logo"></div>
                    <Link to="">TaskMaster{error}</Link>
                </div>
                {user != null ? (
                    <div className="user">
                        <button onClick={() => dark()}>svg</button>
                        <div>
                            <p id="user-name">{user.name}</p>
                        </div>
                    </div>
                ) : (
                    <div className="sign">
                        <button onClick={() => dark()}>svg</button>
                        <button className="tertiary-button signIn">
                            <Link to="/sign-in">Sign In</Link>
                        </button>
                        <button className="secondary-button signUp">
                            <Link to="/sign-up">Sign Up</Link>
                        </button>
                    </div>
                )}
            </nav>
            <SideBar
                setOpen={() => setOpen(!open)}
                open={open}
                user={user != null}
            />
        </div>
    );
}

export default Navbar;
