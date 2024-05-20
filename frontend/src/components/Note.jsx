import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import "../style/notes.css";

function Note({ note, save, loggedIn }) {
    const location = useLocation();
    const [val, setVal] = useState(note.content);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setVal(note.content);
    }, [note]);
    if (location.pathname == "/sign-in" || location.pathname == "/sign-up") {
        return <></>;
    }
    if (!open) {
        return (
            <div className="notes" onClick={() => setOpen(true)}>
                <p onClick={() => setOpen(true)}>notes</p>
            </div>
        );
    }
    return (
        <div className="notes">
            <div className="notes-options">
                <button
                    onClick={() => {
                        setOpen(false);
                        save(val);
                    }}
                >
                    close
                </button>
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
