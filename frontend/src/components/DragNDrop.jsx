import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { taskStatus, deleteTask } from "../redux/actions/projectTaskAction";

export default function DragNDrop({ tasks = [], newTask, users = [] }) {
    const [todo, setTodo] = useState([]);
    const [inProgress, setInprogress] = useState([]);
    const [completed, setCompleted] = useState([]);
    const dispatch = useDispatch();
    const saveChanges = () => {
        try {
            todo.map((item) => {
                if (
                    tasks.find((task) => task.id == item.id).status != "To Do"
                ) {
                    dispatch(taskStatus(item.id, "To Do"));
                }
            });
            inProgress.map((item) => {
                if (
                    tasks.find((task) => task.id == item.id).status !=
                    "In Progress"
                ) {
                    dispatch(taskStatus(item.id, "In Progress"));
                }
            });
            completed.map((item) => {
                if (
                    tasks.find((task) => task.id == item.id).status !=
                    "Completed"
                ) {
                    dispatch(taskStatus(item.id, "Completed"));
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    const onDrag = (e, w) => {
        e.dataTransfer.setData("from", w.from);
        e.dataTransfer.setData("id", w.id);
    };
    const onDrop = (e, to) => {
        if (to == "delete") {
            dispatch(deleteTask(e.dataTransfer.getData("id")));
            return;
        }
        const from = e.dataTransfer.getData("from");
        const id = e.dataTransfer.getData("id");
        if (from == to) return;
        let val = null;
        if (from == "todo") {
            val = todo.find((item) => item.id == id);
            setTodo(todo.filter((item) => item.id != id));
        } else if (from == "in progress") {
            val = inProgress.find((item) => item.id == id);
            setInprogress(inProgress.filter((item) => item.id != id));
        } else if (from == "completed") {
            val = completed.find((item) => item.id == id);
            setCompleted(completed.filter((item) => item.id != id));
        }
        if (to == "todo") {
            setTodo([...todo, val]);
        } else if (to == "in progress") {
            setInprogress([...inProgress, val]);
        } else if (to == "completed") {
            setCompleted([...completed, val]);
        }
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        tasks.map((item) => {
            if (item.status === "To Do") setTodo((todo) => [...todo, item]);
            else if (item.status === "In Progress")
                setInprogress((inProgress) => [...inProgress, item]);
            else if (item.status === "Completed")
                setCompleted((completed) => [...completed, item]);
        });
        return () => {
            setTodo([]);
            setInprogress([]);
            setCompleted([]);
        };
    }, [tasks]);
    return (
        <>
            <div className="project-item-grid">
                <div className="project-task-title">todo</div>
                <div
                    className="project-task-list"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "todo")}
                >
                    {todo.map((item, index) => {
                        return (
                            <div
                                className="project-task-item"
                                draggable
                                onDragStart={(e) =>
                                    onDrag(e, { from: "todo", id: item.id })
                                }
                                key={index}
                                style={{
                                    borderBottom: `solid 4px rgb(var(--${item.difficulty.toLowerCase()}))`,
                                    backgroundImage:
                                        item.priority == "default"
                                            ? ""
                                            : `linear-gradient(rgba(var(--${item.priority.toLowerCase()}), 0.6), rgba(var(--${item.priority.toLowerCase()}), 0.3))`,
                                }}
                            >
                                <div className="task-title">
                                    <div className="title">{item.title}</div>
                                    <div className="deadline">
                                        {item.deadline}
                                    </div>
                                </div>
                                <div className="task-bottom">
                                    <div className="description">
                                        {item.description}
                                    </div>
                                    <div className="assign">
                                        {users &&
                                            item.assigned_to &&
                                            users[
                                                users.findIndex(
                                                    (user) =>
                                                        user.id ===
                                                        item.assigned_to
                                                )
                                            ].name}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="project-task-title">inprogress</div>
                <div
                    className="project-task-list"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "in progress")}
                >
                    {inProgress.map((item, index) => {
                        return (
                            <div
                                className="project-task-item"
                                draggable
                                onDragStart={(e) =>
                                    onDrag(e, {
                                        from: "in progress",
                                        id: item.id,
                                    })
                                }
                                key={index}
                                style={{
                                    borderBottom: `solid 4px rgb(var(--${item.difficulty.toLowerCase()}))`,
                                    backgroundImage:
                                        item.priority == "default"
                                            ? ""
                                            : `linear-gradient(rgba(var(--${item.priority.toLowerCase()}), 0.6), rgba(var(--${item.priority.toLowerCase()}), 0.3))`,
                                }}
                            >
                                <div className="task-title">
                                    <div className="title">{item.title}</div>
                                    <div className="deadline">
                                        {item.deadline}
                                    </div>
                                </div>
                                <div className="task-bottom">
                                    <div className="description">
                                        {item.description}
                                    </div>
                                    <div className="assign">
                                        {users &&
                                            item.assigned_to &&
                                            users[
                                                users.findIndex(
                                                    (user) =>
                                                        user.id ===
                                                        item.assigned_to
                                                )
                                            ].name}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="project-task-title">completed</div>
                <div
                    className="project-task-list"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "completed")}
                >
                    {completed.map((item, index) => {
                        return (
                            <div
                                className="project-task-item"
                                draggable
                                onDragStart={(e) =>
                                    onDrag(e, {
                                        from: "completed",
                                        id: item.id,
                                    })
                                }
                                key={index}
                                style={{
                                    borderBottom: `solid 4px rgb(var(--${item.difficulty.toLowerCase()}))`,
                                    backgroundImage:
                                        item.priority == "default"
                                            ? ""
                                            : `linear-gradient(rgba(var(--${item.priority.toLowerCase()}), 0.6), rgba(var(--${item.priority.toLowerCase()}), 0.3))`,
                                }}
                            >
                                <div className="task-title">
                                    <div className="title">{item.title}</div>
                                    <div className="deadline">
                                        {item.deadline}
                                    </div>
                                </div>
                                <div className="task-bottom">
                                    <div className="description">
                                        {item.description}
                                    </div>
                                    <div className="assign">
                                        {users &&
                                            item.assigned_to &&
                                            users[
                                                users.findIndex(
                                                    (user) =>
                                                        user.id ===
                                                        item.assigned_to
                                                )
                                            ].name}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    className="project-task-delete"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "delete")}
                >
                    delete
                </div>
                <div className="project-task-options">
                    <button className="tertiary-button" onClick={newTask}>
                        add Task
                    </button>
                    <button
                        className="tertiary-button"
                        onClick={() => saveChanges()}
                    >
                        save changes
                    </button>
                </div>
            </div>
        </>
    );
}
