import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask } from "../redux/actions/projectTaskAction";
import { useNavigate } from "react-router";
import { getAll } from "../redux/actions/authAction";
import DragNDrop from "../components/DragNDrop";

export default function Project({ close }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.auth.all);
    const project = useSelector((state) => state.project.one);
    const tasks = useSelector((state) => state.projectTask.tasks);
    const [additional, setAdditional] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        deadline: "",
        priority: null,
        difficulty: null,
        assigned_to: null,
    });

    const handleEditClick = () => {
        navigate("/projects/edit");
    };
    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(createTask(project.id, data));
        setData({
            title: "",
            description: "",
            completion: 0,
            deadline: "",
            priority: null,
            difficulty: null,
            assigned_to: null,
        });
    };
    const additionalValues = () => {
        if (additional) {
            setData({
                priority: null,
                difficulty: null,
                assigned_to: null,
            });
        }
        setAdditional(!additional);
    };
    useEffect(() => {
        dispatch(getTasks(project.id));
        dispatch(getAll());
    }, []);

    return (
        <>
            {project && (
                <>
                    <h1 onClick={close}>{project.title}</h1>
                    <button onClick={handleEditClick}>edit</button>
                </>
            )}
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                    }
                    required
                />
                <textarea
                    type="text"
                    value={data.description}
                    onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                    }
                />
                <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={data.deadline}
                    onChange={(e) =>
                        setData({ ...data, deadline: e.target.value })
                    }
                />
                <button type="submit">Create</button>
                <button onClick={additionalValues}>additional details</button>
                {additional && (
                    <>
                        priority
                        <select
                            defaultValue="default"
                            onChange={(e) =>
                                setData({ ...data, priority: e.target })
                            }
                        >
                            <option disabled>default</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        difficulty
                        <select
                            defaultValue="default"
                            onChange={(e) =>
                                setData({ ...data, priority: e.target })
                            }
                        >
                            <option disabled>default</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        assign to
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
                                else
                                    return (
                                        <option key={index} value={index}>
                                            {item.name}
                                        </option>
                                    );
                            })}
                        </select>
                    </>
                )}
            </form>
            <DragNDrop tasks={tasks} />
        </>
    );
}
