import { useEffect, useState } from "react";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../redux/actions/taskAction";
import { useDispatch, useSelector } from "react-redux";

function Tasks({ loggedIn }) {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const [update, setUpdate] = useState(false);
    const [cur, setCur] = useState(null);
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
    };
    useEffect(() => {
        if (loggedIn) {
            dispatch(getTasks());
        }
    }, [loggedIn]);
    return (
        <div>
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    value={data.task}
                    onChange={(e) => setData({ ...data, task: e.target.value })}
                    required
                />
                <textarea
                    type="text"
                    value={data.description}
                    onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                    }
                />
                {data.completion}
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={data.completion}
                    onChange={(e) =>
                        setData({ ...data, completion: e.target.value })
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
                {update ? (
                    <>
                        <button
                            onClick={() => {
                                setUpdate(false);
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
                        <button type="submit">Update</button>
                    </>
                ) : (
                    <button type="submit">Create</button>
                )}
            </form>
            <ul>
                {tasks.map((item, index) => {
                    return (
                        <div key={index}>
                            <li
                                onClick={() => {
                                    setCur({
                                        ...item,
                                        deadline:
                                            item.deadline != null
                                                ? item.deadline
                                                : "",
                                    });
                                    console.log(item);
                                }}
                            >
                                {item.task}
                            </li>
                            <button
                                onClick={() => {
                                    setData({
                                        ...item,
                                        deadline:
                                            item.deadline != null
                                                ? item.deadline
                                                : "",
                                    });
                                    setUpdate(true);
                                }}
                            >
                                update
                            </button>
                            <button onClick={() => dispatch(deleteTask(index))}>
                                delete
                            </button>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
export default Tasks;
