import "../style/macbook.css";
export default function Macbook({ src }) {
    return (
        <div className="device-container">
            <div className="macbook">
                <div
                    className="screen"
                    style={{
                        backgroundImage: `url(${src})`,
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
