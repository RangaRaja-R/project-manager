import { useEffect, useState } from "react";
import {
    fetchProjects,
    createProject,
    updateProject,
} from "../redux/actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../redux/actions/authAction";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/projectmodify.css";

export default function ProjectModify() {
    const users = useSelector((state) => state.auth.all);
    const dispatch = useDispatch();
    const today = new Date().toISOString().split("T")[0];
    const [selected, setSelected] = useState(null);
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const editData = useSelector((state) => state.project.one);
    const { edit } = location.state || false;
    const [data, setData] = useState({
        title: "",
        description: "",
        due: "",
        group: false,
        members: [],
    });
    const handleCreateProject = (e) => {
        e.preventDefault();
        if (edit) {
            e.preventDefault();
            dispatch(updateProject(data)).then(() => {
                navigate("/projects");
            });
        } else {
            dispatch(createProject(data))
                .then(() => {
                    dispatch(fetchProjects());
                })
                .then(() => {
                    navigate("/projects");
                });
        }
    };
    useEffect(() => {
        dispatch(getAll());
        if (edit) {
            setData(editData);
            const newMembers = users
                .map((item) => {
                    if (data.members.includes(item.id)) return item.name;
                })
                .filter(Boolean);
            setMembers(newMembers);
        }
    }, []);
    return (
        <div className="project-modify">
            <form onSubmit={handleCreateProject}>
                <h2>Project</h2>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                    }
                    required
                    placeholder="Project Title"
                />
                <textarea
                    value={data.description}
                    onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                    }
                    required
                    placeholder="Project Description"
                />
                <input
                    type="date"
                    value={data.due}
                    min={today}
                    onChange={(e) => setData({ ...data, due: e.target.value })}
                />
                <div>
                    is this a group project?
                    <input
                        type="checkbox"
                        checked={data.group}
                        onClick={(e) => {
                            setData({ ...data, group: !data.group });
                            if (!data.group) {
                                setMembers([]);
                                setSelected(null);
                            }
                        }}
                    />
                </div>
                {data.group ? (
                    <>
                        <div>
                            <select
                                defaultValue={"Select"}
                                onChange={(e) => setSelected(e.target.value)}
                            >
                                <option disabled>Select</option>
                                {users.map((item, index) => {
                                    if (item.name != "myself")
                                        return (
                                            <option key={index} value={index}>
                                                {item.name} - {item.email}
                                            </option>
                                        );
                                })}
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    const user = users[selected];
                                    if (
                                        selected &&
                                        (!data.members.includes(user.id) ||
                                            !members.includes(user.name))
                                    ) {
                                        setData({
                                            ...data,
                                            members: [...data.members, user.id],
                                        });
                                        setMembers([...members, user.name]);
                                    }
                                }}
                            >
                                add member
                            </button>
                        </div>
                        <ul>
                            members:
                            {members.length == 0 ? " None" : ""}
                            {members.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            // remove from members
                                            const newMembers = members.filter(
                                                (member, ind) => ind !== index
                                            );
                                            setMembers(newMembers);
                                            const nayaMembers =
                                                data.members.filter(
                                                    (item, ind) => ind != index
                                                );
                                            setData({
                                                ...data,
                                                members: nayaMembers,
                                            });
                                        }}
                                    >
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                ) : (
                    <></>
                )}
                <div className="element">
                    <button onClick={() => navigate("/projects")}>
                        Cancel
                    </button>
                    <button type="submit">{edit ? "Update" : "Create"}</button>
                </div>
            </form>
        </div>
    );
}
