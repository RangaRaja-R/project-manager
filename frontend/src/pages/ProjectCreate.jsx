import { useEffect, useState } from "react";
import { fetchProjects, createProject } from "../redux/actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../redux/actions/authAction";
import { useNavigate } from "react-router";

export default function ProjectCreate() {
    const creater = useSelector((state) => state.auth.user);
    const users = useSelector((state) => state.auth.all);
    const dispatch = useDispatch();
    const today = new Date().toISOString().split("T")[0];
    const [selected, setSelected] = useState(null);
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        description: "",
        due: "",
        group: false,
        members: [],
    });
    const handleCreateProject = (e) => {
        e.preventDefault();
        dispatch(createProject(data))
            .then(() => {
                dispatch(fetchProjects());
            })
            .then(() => {
                navigate("/projects");
            });
    };
    useEffect(() => {
        dispatch(getAll());
    }, []);
    return (
        <form onSubmit={handleCreateProject}>
            <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                required
            />
            <textarea
                value={data.description}
                onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                }
            />
            <input
                type="date"
                value={data.due}
                min={today}
                onChange={(e) => setData({ ...data, due: e.target.value })}
            />
            <input
                type="checkbox"
                value={data.group}
                onChange={(e) => {
                    setData({ ...data, group: e.target.checked });
                    if (!data.group) {
                        setMembers([]);
                        setSelected(null);
                    }
                }}
            />
            {data.group ? (
                <>
                    <select
                        defaultValue={"Select"}
                        onChange={(e) => setSelected(e.target.value)}
                    >
                        <option disabled>Select</option>
                        {users.map((item, index) => {
                            if (item.id != creater.id)
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
                            return <li key={index}>{item}</li>;
                        })}
                    </ul>
                </>
            ) : (
                <></>
            )}
            <button type="submit">create</button>
        </form>
    );
}
