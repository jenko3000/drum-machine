import * as React from "react";
import { render } from "react-dom";
//import Hello from "./Hello";
import DrumMachine from "./app/DrumMachine";
import "./../styles/base.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <h1>Drum machine</h1>
    <DrumMachine />
  </div>
);

render(<App />, document.getElementById("root"));
