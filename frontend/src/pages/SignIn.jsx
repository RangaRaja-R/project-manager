import { useEffect, useState } from "react";
import { signIn } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../style/signIn.css";
import Logo from "../components/Logo";

function SignIn({ loggedIn = false }) {
    const error = useSelector((state) => state.auth.error);
    const navigate = useNavigate();
    const [showpassword, setShowpassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(data));
    };
    useEffect(() => {
        if (loggedIn) {
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        }
    }, [loggedIn]);
    if (loggedIn) {
        return <p>please sign out first</p>;
    }
    return (
        <div className="signInPage">
            <Logo scale={3} />
            <h1>TaskMaster</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={data.email}
                    placeholder="Email"
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                />
                <div className="pass">
                    <input
                        type={showpassword ? "text" : "password"}
                        value={data.password}
                        placeholder="Password"
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                    {showpassword ? (
                        <span
                            className="material-symbols-outlined"
                            onClick={() => setShowpassword(!showpassword)}
                        >
                            visibility
                        </span>
                    ) : (
                        <span
                            className="material-symbols-outlined"
                            onClick={() => setShowpassword(!showpassword)}
                        >
                            visibility_off
                        </span>
                    )}
                </div>
                <p className="error">{error}</p>
                <button className="primary-button" type="submit">
                    sign in
                </button>
                <Link to="/sign-up"> don't have an account? sign up</Link>
            </form>
        </div>
    );
}
export default SignIn;
