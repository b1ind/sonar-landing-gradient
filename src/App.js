import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import countryCodes from "./country_codes.json";
import axios from "axios";

let instance = axios.create({
  baseURL: "https://dev.sonar.app",
  timeout: 10000,
  headers: {
    "x-sonar-api-key": process.env.REACT_APP_API_KEY,
    "X-Forwarded-For": "203.0.113.195",
  },
});

const Sonar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.02944 40.9706C11.3726 45.3137 17.3726 48 24 48C37.2548 48 48 37.2548 48 24H42C42 33.9411 33.9411 42 24 42C19.0294 42 14.5294 39.9853 11.2721 36.7279L7.02944 40.9706ZM0 24C0 10.7452 10.7452 0 24 0C30.6274 0 36.6274 2.68629 40.9706 7.02944L36.7279 11.2721C33.4706 8.01472 28.9706 6 24 6C14.0589 6 6 14.0589 6 24H0ZM15.5147 32.4853C17.6863 34.6569 20.6863 36 24 36C30.6274 36 36 30.6274 36 24H30C30 27.3137 27.3137 30 24 30C22.3431 30 20.8431 29.3284 19.7574 28.2426L15.5147 32.4853ZM18 24C18 20.6863 20.6863 18 24 18C25.6569 18 27.1569 18.6716 28.2426 19.7574L32.4853 15.5147C30.3137 13.3431 27.3137 12 24 12C17.3726 12 12 17.3726 12 24H18Z"
      fill="white"
    />
  </svg>
);

const Expand = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      opacity="0.6"
      d="M1.5 1.5L5 5L8.5 1.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Complete = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <circle cx="18" cy="18" r="18" fill="currentColor" />
    <path
      d="M23.5 15L17 21.5L13 17.5"
      stroke="#444444"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Music = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 17V5.5C21 4.39543 20.1046 3.5 19 3.5H10C8.89543 3.5 8 4.39543 8 5.5V13.8368C7.54537 13.6208 7.0368 13.5 6.5 13.5C4.567 13.5 3 15.067 3 17C3 18.933 4.567 20.5 6.5 20.5C8.433 20.5 10 18.933 10 17V7H19V13.8368C18.5454 13.6208 18.0368 13.5 17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17Z"
      fill="white"
    />
  </svg>
);

const MusicOff = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 8.5V17C21 18.933 19.433 20.5 17.5 20.5C15.567 20.5 14 18.933 14 17C14 15.067 15.567 13.5 17.5 13.5C18.0368 13.5 18.5454 13.6208 19 13.8368V10.5L21 8.5ZM20.4142 4.08579C20.0523 3.72386 19.5523 3.5 19 3.5H10C8.89543 3.5 8 4.39543 8 5.5V13.8368C7.54537 13.6208 7.0368 13.5 6.5 13.5C4.567 13.5 3 15.067 3 17C3 18.2222 3.6265 19.2982 4.57588 19.9241L10 14.5V8H16.5L20.4142 4.08579Z"
      fill="white"
    />
    <path
      d="M21.3839 4.38388C21.872 3.89573 21.872 3.10427 21.3839 2.61612C20.8957 2.12796 20.1043 2.12796 19.6161 2.61612L21.3839 4.38388ZM2.61612 19.6161C2.12796 20.1043 2.12796 20.8957 2.61612 21.3839C3.10427 21.872 3.89573 21.872 4.38388 21.3839L2.61612 19.6161ZM19.6161 2.61612L2.61612 19.6161L4.38388 21.3839L21.3839 4.38388L19.6161 2.61612Z"
      fill="white"
    />
  </svg>
);

class App extends Component {
  state = {
    countryCode: "+1",
    phoneNumber: "",
    music: false,
    submitted: false,
    username: "",
    error: "",
    numError: false,
    invalid: false,
  };

  componentDidMount = async () => {
    window.addEventListener("keydown", this._handleKeydown);
    if (this.props.code) {
      try {
        let response = await instance({
          method: "get",
          url: "/v1/invites/verify?code=" + this.props.code,
        });
        this.setState({
          username: response.data.data.username,
        });
      } catch (error) {
        if (error.response) {
          this.setState({
            error:
              error.response &&
              error.response.data &&
              error.response.data.error &&
              error.response.data.error.reason
                ? error.response.data.error.reason
                : "We're having issues connecting right now. Please try again later",
            invalid: true,
          });
        }
      }
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this._handleKeydown);
  };

  _handleChange = (e) => {
    this.setState({ countryCode: e.target.value });
  };

  _handleInputChange = (e) => {
    const regex = /^[0-9]*$/;
    if (e.target.value.match(regex)) {
      this.setState({ phoneNumber: e.target.value });
    }
  };

  _handleKeydown = (e) => {
    if (e.keyCode === 13 && this.state.phoneNumber.length >= 7) {
      this._handleSubmit();
    }
  };

  _handleSubmit = async (e) => {
    let url;
    let data;
    if (this.props.code && this.state.username) {
      url = "/v1/invites/consume";
      data = {
        phone_number: this.state.countryCode + this.state.phoneNumber,
        code: this.props.code,
      };
    } else {
      url = "/v1/users/waitlist";
      data = {
        phone_number: this.state.countryCode + this.state.phoneNumber,
      };
    }
    try {
      let response = await instance({
        method: "post",
        url: url,
        data: data,
      });
      this.setState({ submitted: true, error: null, numError: false });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.code === 6002
      ) {
        this.setState({ numError: true });
      } else {
        this.setState({
          error:
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.reason
              ? error.response.data.error.reason
              : "We're having issues connecting right now. Please try again later",
        });
      }
    }
  };

  _handleMusic = (e) => {
    if (this.state.music) {
      document.getElementById("audio").pause();
    } else {
      document.getElementById("audio").play();
    }
    this.setState({ music: !this.state.music });
  };

  render() {
    return (
      <div className="App">
        <div className="circles">
          <div
            className="circle-container"
            style={this.props.code ? { top: "117px", left: "102px" } : {}}
            id="yellow-container"
          >
            <div className="circle" id="yellow" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "213px", left: "42px" } : {}}
            id="green-pink-container"
          >
            <div className="circle" id="green-pink" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "245px", left: "77px" } : {}}
            id="violet-container"
          >
            <div className="circle" id="violet" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "22px", left: "159px" } : {}}
            id="blue-pink-yellow-container"
          >
            <div className="circle" id="blue-pink-yellow" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "209px", left: "157px" } : {}}
            id="magenta-container"
          >
            <div className="circle" id="magenta" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "313px", left: "220px" } : {}}
            id="pink-container"
          >
            <div className="circle" id="pink" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "53px", left: "367px" } : {}}
            id="orange-container"
          >
            <div className="circle" id="orange" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "246px", left: "418px" } : {}}
            id="violet-2-container"
          >
            <div className="circle" id="violet-2" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "147px", left: "470px" } : {}}
            id="green-pink-2-container"
          >
            <div className="circle" id="green-pink-2" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "272px", left: "514px" } : {}}
            id="red-blue-container"
          >
            <div className="circle" id="red-blue" />
          </div>
          <div
            className="circle-container"
            style={this.props.code ? { top: "115px", left: "562px" } : {}}
            id="mint-container"
          >
            <div className="circle" id="mint" />
          </div>
        </div>
        <div className="logo" style={{ marginBottom: "40px" }}>
          <Sonar />
        </div>
        {this.state.error ? (
          <div className="text error">{this.state.error}</div>
        ) : this.state.username ? (
          <div className="text">
            Enter your # to confirm your invite from @{this.state.username}
          </div>
        ) : null}
        {this.state.invalid ? null : (
          <div className="input-pill">
            <div className={this.state.submitted ? "transition-up" : ""}>
              <div /* this is the source of the problem */
                className={this.state.submitted ? "fade-out" : ""}
              >
                <div className="country-code-container">
                  {this.state.countryCode}
                  <div className="expand">
                    <Expand />
                  </div>
                </div>

                <select
                  className={
                    this.state.submitted ? "dropdown no-pointer" : "dropdown"
                  }
                  value={this.state.countryCode}
                  disabled={this.state.submitted}
                  name="countryCode"
                  onChange={this._handleChange}
                >
                  {countryCodes.map((country) => (
                    <option
                      className="option"
                      default={country.code === "US"}
                      value={country.dial_code}
                      key={country.code}
                    >
                      {country.name} {country.dial_code}
                    </option>
                  ))}
                </select>

                <input
                  className={
                    this.state.submitted ? "input no-pointer" : "input"
                  }
                  type="text"
                  disabled={this.state.submitted}
                  name="phoneNumber"
                  placeholder="000 000 0000"
                  maxLength="13"
                  value={this.state.phoneNumber}
                  onChange={this._handleInputChange}
                  style={this.state.error ? { color: "#FF6363" } : null}
                />
              </div>
              <div
                className="message"
              >
                {this.props.code ? "Invite sent" : "We'll talk soon"}
              </div>
            </div>

            {this.state.phoneNumber.length >= 7 ? (
              <div
                className={
                  this.state.submitted ? "checkmark dark" : "checkmark"
                }
                onClick={this._handleSubmit}
              >
                <Complete />
              </div>
            ) : null}
          </div>
        )}
        {this.state.music ? (
          <div className="music" onClick={this._handleMusic}>
            <div className="ripples">
              <div style={{ animationDelay: "0s" }} />
              <div style={{ animationDelay: "1s" }} />
              <div style={{ animationDelay: "2s" }} />
              <div style={{ animationDelay: "3s" }} />
            </div>
            <Music />
          </div>
        ) : (
          <div
            className="music"
            style={{ opacity: "60%" }}
            onClick={this._handleMusic}
          >
            <MusicOff />
          </div>
        )}
        <audio
          id="audio"
          autoPlay={false}
          src="https://mcdn.podbean.com/mf/biorg/c57444/2_AM_Study_Session_-_lofi_hip_hopchill_beats__8s9lw.mp3"
        />
      </div>
    );
  }
}

// function Invite(props) {
//   return <Page code={props.match.params.code} />;
// }

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Switch>
//           <Route exact path="/:code" component={Invite} />
//           <Route component={Page} />
//         </Switch>
//       </Router>
//     );
//   }
// }

export default App;
