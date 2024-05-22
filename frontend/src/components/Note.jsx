import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import "../style/notes.css";

function Note({ note, save, loggedIn }) {
    const location = useLocation();
    const [val, setVal] = useState(note.content);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setVal(note.content);
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                save(val);
            } else if (e.key == "n") {
                setOpen(true);
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [note]);
    if (location.pathname == "/sign-in" || location.pathname == "/sign-up") {
        return <></>;
    }
    if (!open) {
        return (
            <div
                className="notes"
                style={{
                    height: "35px",
                    border: "1px solid rgb(var(--second))",
                }}
                onClick={() => setOpen(true)}
            >
                <img src="../notes.svg" alt="notes" />
            </div>
        );
    }
    return (
        <div className="notes">
            <div className="notes-options">
                <img
                    src="../close.svg"
                    alt="close"
                    onClick={() => {
                        setOpen(false);
                        save(val);
                    }}
                />
            </div>
            <textarea
                disabled={!loggedIn}
                value={val}
                onChange={(e) => setVal(e.target.value)}
            ></textarea>
        </div>
    );
}

export default Note;
