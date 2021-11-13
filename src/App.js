import "./styles/main.css";
import { Stage, Layer, Line, Text } from "react-konva";
import { useState } from "react";
import { lines } from "./data.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const { horizontalLines, verticalLines } = lines;

  const [visibility, setVisibility] = useState(true);
  const [numOfLines, setNumOfLines] = useState(horizontalLines.length);
  const [line, setLine] = useState("");

  //  Error Msg Popup
  const msgPopup = (msg) => {
    toast.error(<h3>{msg}...</h3>, {
      position: "top-right",
      autoClose: 2200,
      closeOnClick: true,
      theme: "colored",
      rtl: true,
      pauseOnHover: false,
      newestOnTop: true,
    });
  };

  // Form validation
  const updateGrid = (e) => {
    e.preventDefault();
    const noOfLines = +e.target.line.value;
    if (!noOfLines) {
      msgPopup("Input field cannot be empty");
      return;
    }

    if (noOfLines > 21 || noOfLines < 1) {
      msgPopup("Enter Number between 1 and 21");
      e.target.line.value = "";
      return;
    }

    if (isNaN(noOfLines)) {
      msgPopup("Please Enter the numeric digit [1-21]");
      e.target.line.value = "";
      return;
    }

    setNumOfLines(noOfLines);
    e.target.line.value = "";
  };

  return (
    <div className="container">
      <h1 className="heading">Grid Controller App</h1>
      <div className="grid-wrapper">
        <div className="grid-box">
          {visibility ? (
            <Stage width={1010} height={1010}>
              <Layer>
                {/* <Text text="Grid lines" x={100} y={400} /> */}
                {horizontalLines.slice(0, numOfLines).map((line) => {
                  return (
                    <Line points={line.points} stroke="red" strokeWidth={5} />
                  );
                })}
                {verticalLines.slice(0, numOfLines).map((line) => {
                  return (
                    <Line points={line.points} stroke="blue" strokeWidth={5} />
                  );
                })}
              </Layer>
            </Stage>
          ) : (
            ""
          )}
        </div>
      </div>
      <h2 className="heading">Action Center</h2>
      <div className="action">
        <div className="grid-toggler">
          <button
            className="btn"
            onClick={() => setVisibility((prevState) => !prevState)}
          >
            Toggle Grid
          </button>
        </div>
        <form onSubmit={updateGrid} className="grid-controller">
          <input
            type="text"
            name="line"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            placeholder="Enter the number of Lines in grid"
          />
          <button className="btn">Apply</button>
        </form>
      </div>
    </div>
  );
}

export default App;
