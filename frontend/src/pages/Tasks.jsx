import { useEffect, useState } from "react";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../redux/actions/taskAction";
import { useDispatch, useSelector } from "react-redux";
import "../style/tasks.css";

function Tasks({ loggedIn }) {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        task: "",
        description: "",
        completion: 0,
        deadline: "",
    });
    const handleCreate = (e) => {
        e.preventDefault();
        console.log(data);
        if (update) {
            dispatch(updateTask(data)).then(() => {
                dispatch(getTasks());
            });
            setUpdate(false);
        } else {
            dispatch(createTask(data));
        }
        setOpen(false);
    };
    useEffect(() => {
        if (loggedIn) {
            dispatch(getTasks());
        }
    }, [loggedIn]);
    return (
        <div className="task-page">
            <div className="tasks-title">
                <h1>Tasks</h1>
                <div className="task-add">
                    <button
                        className="secondary-button"
                        onClick={() => setOpen(!open)}
                    >
                        New
                    </button>
                </div>
            </div>
            {open && (
                <div className="create-task">
                    <form onSubmit={handleCreate}>
                        <input
                            type="text"
                            value={data.task}
                            onChange={(e) =>
                                setData({ ...data, task: e.target.value })
                            }
                            placeholder="Task Name"
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
                            placeholder="Task Description"
                        />
                        <div className="task-completion">
                            <output
                                for="completion"
                                onforminput="value = completion.valueAsNumber;"
                            >
                                Completion: {data.completion}%
                            </output>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={data.completion}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        completion: e.target.value,
                                    })
                                }
                                name="completion"
                            />
                        </div>
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={data.deadline}
                            onChange={(e) =>
                                setData({ ...data, deadline: e.target.value })
                            }
                        />
                        <div className="element">
                            <button
                                onClick={() => {
                                    setUpdate(false);
                                    setOpen(false);
                                    setData({
                                        task: "",
                                        description: "",
                                        completion: 0,
                                        deadline: "",
                                    });
                                }}
                            >
                                cancel
                            </button>
                            <button type="submit">
                                {update ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="task-table-container">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>description</th>
                            <th>progress</th>
                            <th>deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr
                                key={task.id}
                                style={{
                                    backgroundColor: `rgba(var(--low), ${
                                        task.completion / 100
                                    })`,
                                }}
                            >
                                <td>{task.task}</td>
                                <td>{task.description}</td>
                                <td>{task.completion}%</td>
                                <td>{task.deadline && task.deadline}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setData({
                                                ...task,
                                                deadline:
                                                    task.deadline != null
                                                        ? task.deadline
                                                        : "",
                                            });
                                            setOpen(true);
                                            setUpdate(true);
                                        }}
                                    >
                                        update
                                    </button>
                                    <button
                                        onClick={() =>
                                            dispatch(deleteTask(index))
                                        }
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Tasks;
