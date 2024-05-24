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
    const [sw, setSw] = useState(<LightMode />);
    const error = useSelector((state) => state.auth.error);
    useEffect(() => {
        if (isDark) {
            setSw(<DarkMode />);
        } else {
            setSw(<LightMode />);
        }
    }, [isDark]);
    if (location.pathname == "/sign-in" || location.pathname == "/sign-up") {
        return (
            <div
                className="navbar"
                style={{ position: "fixed", border: "none" }}
            >
                <img src={sw} alt="switch" onClick={() => dark()} />
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
                    <Logo />
                    <Link to="">TaskMaster{error}</Link>
                </div>
                {user != null ? (
                    <div className="user">
                        <img src={sw} alt="switch" onClick={() => dark()} />
                        <div>
                            <p id="user-name">{user.name}</p>
                        </div>
                    </div>
                ) : (
                    <div className="sign">
                        <img src={sw} alt="switch" onClick={() => dark()} />
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
