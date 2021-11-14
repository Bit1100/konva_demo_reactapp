import "./styles/main.css";
import { Stage, Layer, Line, Text } from "react-konva";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const toggleButton = useRef({});

  useEffect(() => {
    toggleButton.current.disabled = true;
  }, []);

  const [visibility, setVisibility] = useState(false);
  const [line, setLine] = useState("");
  const [gridLines, setGridLines] = useState(0);
  const [canvaWidth] = useState(768);
  const [canvaHeight] = useState(512);
  const [verticalSpace, setVerticalSpace] = useState(0);
  const [horizontalSpace, setHorizontalSpace] = useState(0);

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

  const arrayGenerator = () => {
    let numOfLines = [];
    for (let i = 0; i < gridLines; i++) {
      numOfLines.push(i);
    }
    return numOfLines;
  };

  // Form validation
  const updateGrid = (e) => {
    e.preventDefault();
    const noOfLines = +e.target.line.value;

    // Test for the empty submission
    if (!noOfLines) {
      msgPopup("Input field cannot be empty");
      return;
    }

    // Test for the whole number
    if (noOfLines - Math.floor(noOfLines) !== 0) {
      msgPopup("Please enter a whole number");
      e.target.line.value = "";
      return;
    }

    // Test for the value less than zero
    if (noOfLines < 0) {
      msgPopup("Please enter positive value");
      e.target.line.value = "";
      return;
    }

    // Test for the non-numeric value
    if (isNaN(noOfLines)) {
      msgPopup("Please Enter the numeric digit [1-21]");
      e.target.line.value = "";
      return;
    }

    setVisibility(true);

    setGridLines(noOfLines);

    toggleButton.current.disabled = false;

    /* Calculating the space based on the noOfLines entered by the user */
    setVerticalSpace(Math.ceil(canvaWidth / noOfLines));

    setHorizontalSpace(Math.ceil(canvaHeight / noOfLines));

    e.target.line.value = "";
  };

  return (
    <div className="container">
      <h1 className="heading">Grid Controller App</h1>
      <div className="grid-wrapper">
        <div className="grid-box">
          <Stage width={canvaWidth} height={canvaHeight}>
            <Layer>
              {visibility ? (
                <div>
                  {/* <Text text="Grid lines" x={100} y={400} /> */}
                  {arrayGenerator().map((item, index) => {
                    return (
                      <Line
                        key={item}
                        points={[
                          0,
                          horizontalSpace * index,
                          canvaWidth,
                          horizontalSpace * index,
                        ]}
                        stroke="red"
                        strokeWidth={1}
                      />
                    );
                  })}
                  {arrayGenerator().map((item, index) => {
                    return (
                      <Line
                        key={item}
                        points={[
                          index * verticalSpace,
                          0,
                          index * verticalSpace,
                          canvaHeight,
                        ]}
                        stroke="blue"
                        strokeWidth={1}
                      />
                    );
                  })}
                </div>
              ) : (
                <Text
                  x={225}
                  y={215}
                  text="Empty Canva"
                  fontSize={50}
                  fill="red"
                />
              )}
            </Layer>
          </Stage>
        </div>
      </div>
      <h2 className="heading">Action Center</h2>
      <div className="action">
        <div className="grid-toggler">
          <button
            ref={toggleButton}
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
