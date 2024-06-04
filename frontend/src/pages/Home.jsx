import "../style/home.css";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Macbook from "../components/Macbook";

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
                        <h1 className="title">Manage Your Projects</h1>
                    </Reveal>
                </div>
                <Reveal late>
                    <Macbook src={"public/project.png"} />
                </Reveal>
            </div>
            <div className="sect">
                <Reveal late>
                    <Macbook src={"public/daily.png"} />
                </Reveal>
                <div className="content">
                    <Reveal>
                        <h1 className="title">Manage your Daily tasks</h1>
                    </Reveal>
                </div>
            </div>
            <div className="sect">
                <div className="content">
                    <Reveal>
                        <h1 className="title">Collabrate with your team</h1>
                    </Reveal>
                </div>
                <Reveal late>
                    <Macbook src={"public/group.png"} />
                </Reveal>
            </div>
        </div>
    );
}
export default Home;
