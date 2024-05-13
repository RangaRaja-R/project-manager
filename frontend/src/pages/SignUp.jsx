import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/actions/authAction";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/signUp.css";

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
            <div className="logo">
                <p>logo here</p>
            </div>
            <h1>TaskMaster</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={data.name}
                    placeholder="Name"
                    onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                    }}
                />
                <input
                    type="email"
                    value={data.email}
                    placeholder="Email"
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    value={data.password}
                    placeholder="Password"
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                />
                <p>keep your account private?</p>
                <p>this will keep you from others adding you to project</p>
                <input
                    type="check"
                    checked={data.private}
                    onChange={(e) => {
                        setData({ ...data, private: e.target.value });
                    }}
                />
                <p color="red">{error}</p>
                <button className="primary-button" type="submit">
                    sign in
                </button>
                <Link to="/sign-in"> already have an account? sign in</Link>
            </form>
        </div>
    );
}
export default SignUp;
