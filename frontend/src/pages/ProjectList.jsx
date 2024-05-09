import { useEffect, useState } from "react";
import { fetchProject, fetchProjects } from "../redux/actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Project from "./Project";

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
            {projects.loading ? (
                <p>loading</p>
            ) : (
                <ul>
                    {projects.projects.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    choose(item.id);
                                }}
                            >
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            )}
            <button onClick={() => navigate("/projects/create")}>new</button>
        </div>
    );
}
