import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import "../style/navbar.css";
import Logo from "../components/Logo";
import { LightMode, DarkMode } from "../components/Svg";

function Navbar({ user, dark, isDark }) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const error = useSelector((state) => state.auth.error);
    useEffect(() => {}, [isDark]);
    if (location.pathname == "/sign-in" || location.pathname == "/sign-up") {
        return (
            <div
                className="navbar"
                id="navbar"
                style={{ position: "fixed", border: "none" }}
                onClick={() => dark()}
            >
                {isDark ? (
                    <DarkMode onClick={() => dark()} />
                ) : (
                    <LightMode onClick={() => dark()} />
                )}
            </div>
        );
    }
    return (
        <div className={open ? "top" : "top over"}>
            <nav className="navbar" id="navbar">
                <div className="projectTitle">
                    <div
                        className="sidebar__logo"
                        onClick={() => setOpen(!open)}
                    >
                        &#9776;
                    </div>
                    <Logo />
                    <Link to="">TaskMaster</Link>
                </div>
                {user != null ? (
                    <div className="user">
                        <div onClick={() => dark()}>
                            {isDark ? (
                                <DarkMode onClick={dark} />
                            ) : (
                                <LightMode onClick={() => dark()} />
                            )}
                        </div>
                        <div>
                            <p id="user-name">{user.name}</p>
                        </div>
                    </div>
                ) : (
                    <div className="sign">
                        <div onClick={() => dark()}>
                            {isDark ? (
                                <DarkMode onClick={() => dark()} />
                            ) : (
                                <LightMode onClick={() => dark()} />
                            )}
                        </div>
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
