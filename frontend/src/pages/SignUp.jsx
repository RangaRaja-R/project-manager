import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/actions/authAction";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/signUp.css";
import Logo from "../components/Logo";

function SignUp({ loggedIn = false }) {
    const error = useSelector((state) => state.auth.error);
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        private: false,
    });
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(data));
    };
    useEffect(() => {
        if (loggedIn) {
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        }
    }, [loggedIn]);
    if (loggedIn) {
        return <p>please sign out first</p>;
    }
    return (
        <div className="signUpPage">
            <Logo scale={3} />
            <h1>TaskMaster</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={data.name}
                    placeholder="Name"
                    onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                    }}
                    required
                />
                <input
                    type="email"
                    value={data.email}
                    placeholder="Email"
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                    required
                />
                <input
                    type="password"
                    value={data.password}
                    placeholder="Password"
                    minLength={8}
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                    required
                />
                <div className="private">
                    <input
                        type="checkbox"
                        checked={data.private}
                        onClick={(e) => {
                            setData({ ...data, private: !data.private });
                        }}
                    />
                    <p>keep your account private?</p>
                </div>
                <p className="error">{error}</p>
                <button className="primary-button" type="submit">
                    sign in
                </button>
                <Link to="/sign-in"> already have an account? sign in</Link>
            </form>
        </div>
    );
}
export default SignUp;
