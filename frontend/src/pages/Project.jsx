import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask } from "../redux/actions/projectTaskAction";
import { useNavigate } from "react-router";
import { getAll } from "../redux/actions/authAction";
import DragNDrop from "../components/DragNDrop";
import "../style/project.css";

export default function Project({ close }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.auth.all);
    const project = useSelector((state) => state.project.one);
    const tasks = useSelector((state) => state.projectTask.tasks);
    const [open, setOpen] = useState(false);
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
        console.log("created");
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
        setOpen(false);
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

    if (users == null || project == null || tasks == null) {
        return <h1>Loading</h1>;
    }
    return (
        <>
            {project && (
                <div className="projectListTitle">
                    <h1>{project.title}</h1>
                    <div className="projectListTitle--add">
                        <button
                            className="secondary-button"
                            onClick={handleEditClick}
                        >
                            edit
                        </button>
                    </div>
                </div>
            )}
            {open && (
                <div className="create-project-task">
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
                                setData({
                                    ...data,
                                    description: e.target.value,
                                })
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
                        {additional && (
                            <>
                                <div className="element">
                                    <label for="priority">Priority</label>
                                    <select
                                        id="priority"
                                        defaultValue="default"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                priority:
                                                    e.target.value.toLowerCase(),
                                            })
                                        }
                                    >
                                        <option disabled>default</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <div className="element">
                                    <label htmlFor="difficulty">
                                        difficulty
                                    </label>
                                    <select
                                        id="difficulty"
                                        defaultValue="default"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                difficulty:
                                                    e.target.value.toLowerCase(),
                                            })
                                        }
                                    >
                                        <option disabled>default</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <div className="element">
                                    <label htmlFor="assign">Assign to</label>
                                    <select
                                        id="assign"
                                        defaultValue={"Select"}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                assigned_to:
                                                    e.target.value.toLowerCase(),
                                            })
                                        }
                                    >
                                        <option disabled>Select</option>
                                        {users.map((item, index) => {
                                            if (item.name != "myself")
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item.id}
                                                    >
                                                        {item.name} -{" "}
                                                        {item.email}
                                                    </option>
                                                );
                                            else
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                </div>
                            </>
                        )}
                        <p onClick={additionalValues}>additional details</p>
                        <div className="element">
                            <button onClick={() => setOpen(false)}>
                                cancel
                            </button>
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
            )}
            <DragNDrop
                tasks={tasks}
                newTask={() => setOpen(true)}
                users={users}
            />
        </>
    );
}
