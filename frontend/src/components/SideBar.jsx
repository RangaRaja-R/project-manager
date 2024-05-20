import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut as mainOut } from "../redux/actions/authAction";
import { CLEAR } from "../redux/reducers/rootReducer";
import "../style/sidebar.css";

function SideBar({ setOpen, open, user }) {
    const options = ["home", "projects", "tasks"];
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateTo = (e) => {
        navigate(e.target.id);
        setOpen();
    };
    const signOut = () => {
        dispatch({
            type: CLEAR,
        });
        dispatch(mainOut());
    };
    return (
        <div className="sidebar" style={{ left: open ? 0 : "" }}>
            <div className="sidebar__options">
                {options.map((option, index) => (
                    <div
                        onClick={navigateTo}
                        id={option}
                        key={index}
                        className={
                            location.pathname.includes(option)
                                ? "sidebar__option active"
                                : "sidebar__option"
                        }
                    >
                        {option}
                    </div>
                ))}
            </div>
            {user && (
                <div onClick={signOut} color="red">
                    sign Out
                </div>
            )}
        </div>
    );
}
export default SideBar;