import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="circles">
        <div id="yellow-container">
          <div className="circle" id="yellow" />
        </div>
        <div id="green-pink-container">
          <div className="circle" id="green-pink" />
        </div>
        <div id="violet-container">
          <div className="circle" id="violet" />
        </div>
        <div id="blue-pink-yellow-container">
          <div className="circle" id="blue-pink-yellow" />
        </div>
        <div id="magenta-container">
          <div className="circle" id="magenta" />
        </div>
        <div id="pink-container">
          <div className="circle" id="pink" />
        </div>
        <div id="orange-container">
          <div className="circle" id="orange" />
        </div>
        <div id="violet-2-container">
          <div className="circle" id="violet-2" />
        </div>
        <div id="green-pink-2-container">
          <div className="circle" id="green-pink-2" />
        </div>
        <div id="red-blue-container">
          <div className="circle" id="red-blue" />
        </div>
        <div id="mint-container">
          <div className="circle" id="mint" />
        </div>
      </div>
      <div className="sonar">
        <div style={{ marginBottom: "40px" }}>Sonar</div>
        <div>
          <div className="input-pill-container">
            <div className="input-pill" />
          </div>
          <input className="input" type="text" placeholder=".EDU EMAIL" />
        </div>
      </div>
    </div>
  );
}

export default App;
