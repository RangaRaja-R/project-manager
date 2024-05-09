import { useState, useEffect } from "react";
import { useLocation } from "react-router";

function Note({ note, save, loggedIn }) {
    const location = useLocation();
    const [val, setVal] = useState(note.content);
    useEffect(() => {
        setVal(note.content);
    }, [note]);
    if (location.pathname == "/sign-in" || location.pathname == "/sign-up") {
        return <></>;
    }
    return (
        <div>
            <h1>Note</h1>
            <button onClick={() => save(val)}>save</button>
            <textarea
                disabled={!loggedIn}
                value={val}
                onChange={(e) => setVal(e.target.value)}
            ></textarea>
        </div>
    );
}

export default Note;
