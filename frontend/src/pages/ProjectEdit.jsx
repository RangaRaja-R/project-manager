import { useEffect, useState } from "react";
import { fetchProjects, updateProject } from "../redux/actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import LoginPlease from "./LoginPlease";

export default function ProjectEdit() {
    const users = useSelector((state) => state.auth.all);
    const dispatch = useDispatch();
    const today = new Date().toISOString().split("T")[0];
    const [selected, setSelected] = useState(null);
    const [members, setMembers] = useState([]);
    const [data, setData] = useState(useSelector((state) => state.project.one));
    const navigate = useNavigate();
    const handleCreateProject = (e) => {
        e.preventDefault();
        dispatch(updateProject(data)).then(() => {
            navigate("/projects");
        });
    };
    useEffect(() => {
        dispatch(fetchProjects()).then(() => {
            dispatch(getAll()).then(() => {
                const newMembers = users
                    .map((item) => {
                        if (data.members.includes(item.id)) return item.name;
                    })
                    .filter(Boolean);
                setMembers(newMembers);
            });
        });
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
            navigate("/projects"); // Redirect using navigate function
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            //window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    if (data == null) {
        return <LoginPlease />;
    }
    return (
        <form onSubmit={handleCreateProject}>
            <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
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
                    type="radio"
                    checked={data.group}
                    onChange={(e) => {
                        setData({ ...data, group: e.target.checked });
                        if (!data.group) {
                            setMembers([]);
                            setSelected(null);
                        }
                    }}
                />
            </div>
            {data.group ? (
                <>
                    <select
                        //value={member}
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
                            if (selected && !data.members.includes(user.id)) {
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
                    <ul>
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
                                        const nayaMembers = data.members.filter(
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
            <button type="submit">update</button>
        </form>
    );
}
