import "../style/home.css";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

function Home({ loggedIn }) {
    return (
        <div className="homePage">
            <div className="sect">
                <div className="content">
                    <Reveal>
                        <h1 className="main-title">Task Master</h1>
                        <h2 className="sub-title">
                            Your productivity sidekick
                        </h2>
                    </Reveal>
                    <Reveal late>
                        <button className="started secondary-button">
                            <Link to={loggedIn ? "/projects" : "/sign-up"}>
                                Get Started
                            </Link>
                        </button>
                    </Reveal>
                </div>
            </div>
            <div className="sect">
                <div className="content">
                    <Reveal>
                        <h1>Manage Your Projects</h1>
                    </Reveal>
                </div>
                <div className="image"></div>
            </div>
            <div className="sect">
                <div className="image"></div>
                <div className="content">
                    <Reveal>
                        <h1>Manage your Daily tasks</h1>
                    </Reveal>
                </div>
            </div>
            <div className="sect">
                <div className="content">
                    <Reveal>
                        <h1>Collabrate with your team</h1>
                    </Reveal>
                </div>
                <div className="image"></div>
            </div>
        </div>
    );
}
export default Home;
