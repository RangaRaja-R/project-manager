import { useSelector, useDispatch } from "react-redux";
import { signOut as mainOut } from "../redux/actions/authAction";
import { CLEAR } from "../redux/reducers/rootReducer";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../style/navbar.css";
import { useState } from "react";

function Navbar({ user, dark }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const signOut = () => {
        dispatch({
            type: CLEAR,
        });
        dispatch(mainOut());
    };
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
        <div className="navbar">
            <div className="projectTitle">
                <div className="logo"></div>
                <Link to="">TaskMaster{error}</Link>
            </div>
            {user != null ? (
                <div className="user">
                    <button onClick={() => dark()}>svg</button>
                    <div>
                        <p id="user-name">{user.name}</p>
                    </div>
                    <div>
                        <p onClick={signOut}>exit button</p>
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
        </div>
    );
}

export default Navbar;
