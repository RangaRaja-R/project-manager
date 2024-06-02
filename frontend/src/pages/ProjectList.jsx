import { useEffect, useState } from "react";
import { fetchProject, fetchProjects } from "../redux/actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Project from "./Project";
import "../style/projectList.css";

export default function ProjectList({ loggedIn }) {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.project);
    const navigate = useNavigate();
    const [chose, setChose] = useState(false);
    useEffect(() => {
        if (loggedIn) {
            dispatch(fetchProjects());
        }
    }, [loggedIn]);
    const choose = (id) =>
        dispatch(fetchProject(id)).then(() => {
            setChose(true);
        });
    if (chose) {
        return <Project close={() => setChose(false)} />;
    }

    return (
        <div>
            <div className="projectListTitle">
                <h1>Projects</h1>
                <div className="projectListTitle--add">
                    <button
                        className="secondary-button"
                        onClick={() => navigate("/projects/modify")}
                    >
                        new
                    </button>
                </div>
            </div>
            {projects.loading ? (
                <p>loading</p>
            ) : (
                <div className="projectList">
                    {projects.projects.map((item, index) => {
                        console.log(item);
                        return (
                            <div
                                className="project"
                                key={index}
                                onClick={() => {
                                    choose(item.id);
                                }}
                            >
                                <div className="project-title">
                                    <div className="title">
                                        {item.title}

                                        {item.group && (
                                            <span className="material-symbols-outlined">
                                                group
                                            </span>
                                        )}
                                    </div>
                                    <div className="deadline">
                                        {item.deadline && item.deadline}
                                    </div>
                                </div>
                                <div className="project-description">
                                    {"Description: "}
                                    <br />
                                    {item.description || "empty"}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
