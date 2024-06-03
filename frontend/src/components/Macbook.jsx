import "../style/macbook.css";
export default function Macbook({ id }) {
    return (
        <div className="device-container">
            <div className="macbook">
                <div
                    className="screen"
                    style={{
                        backgroundImage: `url(https://drive.google.com/thumbnail?id=${id}&sz=w1000)`,
                    }}
                >
                    <div className="notch">
                        <div className="camera"></div>
                    </div>
                </div>
                <div className="macbook-keyboard">
                    <div className="keyboard-body">
                        <div className="groove"></div>
                    </div>
                    <div className="keyboard-shadow"></div>
                </div>
            </div>
        </div>
    );
}
