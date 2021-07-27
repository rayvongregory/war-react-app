import React, { Component } from "react";
import Numbr from "./Numbr";
import "./Welcome.css";
import { message } from "./WarFunctions.js";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: "show",
      numplayers: "hide",
      dist: "hide",
      colors: "hide",
      overlay: "show",
    };

    this.enterKey = this.enterKey.bind(this);
    this.handleReturnToStart = this.handleReturnToStart.bind(this);
    this.handleNumPlayers = this.handleNumPlayers.bind(this);
    this.handleDist = this.handleDist.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleNumPlayers);
    document.addEventListener("keypress", this.enterKey);
  }

  componentDidUpdate() {
    if (this.props.draw === "PLAY AGAIN") {
      document.removeEventListener("keypress", this.enterKey);
    }
  }

  enterKey(e) {
    if (e.keyCode === 13 && this.state.welcome === "show") {
      this.handleNumPlayers();
    } else if (e.keyCode === 13 && this.state.overlay === "hide") {
      e.preventDefault();
      document.getElementById("draw").click();
    }
  }

  handleReturnToStart() {
    this.setState({
      welcome: "show",
      numplayers: "hide",
      dist: "hide",
      colors: "hide",
      overlay: "show",
    });
    document.addEventListener("click", this.handleNumPlayers);
    document.addEventListener("keypress", this.enterKey);
  }

  handleNumPlayers() {
    document.removeEventListener("click", this.handleNumPlayers);
    this.setState({ numplayers: "show", welcome: "hide" });
  }

  handleDist(num) {
    this.props.pickNumPlayers(parseInt(num));
    this.setState({ numplayers: "hide", dist: "show" });
  }

  handleColor(event) {
    this.setState({ dist: "hide", colors: "show" });
    this.props.deckDist(`${event.target.id}`);
  }

  handleChanges(event) {
    //or show a "want to play again?" screen
    this.setState({ numplayers: "show", overlay: "hide" });
    this.props.chooseColor(`${event.target.id}`);
  }

  render() {
    const MESSAGE = message();
    return (
      <div className={`overlay ${this.state.overlay}`}>
        <div className={`welcomemessage ${this.state.welcome}`}>
          <h2>This is War</h2>
          <p>
            {MESSAGE[0]}
            <br />
            <br />
            {MESSAGE[1]}
            <br />
            <br />
            {MESSAGE[2]}
            <strong>{MESSAGE[3]}</strong>
            {MESSAGE[4]}
            <br />
            <br />
            {MESSAGE[5]}
            <br />
            <br />
            {MESSAGE[6]}
          </p>
        </div>
        <div className={`numplayers ${this.state.numplayers}`}>
          <h2>How many players?</h2>
          <div className="numbrcontainer">
            <Numbr handleDist={this.handleDist} id="2" />
            <Numbr handleDist={this.handleDist} id="4" />
          </div>
        </div>

        <div className={`distdiv ${this.state.dist}`}>
          <h2>
            <div className="redo" onClick={this.handleReturnToStart}>
              ⟲
            </div>
            How will the deck be distributed?
          </h2>
          <div className="distcontainer">
            <div className="dist" onClick={this.handleColor} id="u">
              <h2>Uniform</h2>
              <p>
                When the deck is uniformly distributed, each player will receive
                the same number of cards.
              </p>
            </div>
            <div className="dist" onClick={this.handleColor} id="r">
              <h2>Random</h2>
              <p>
                When the deck is randomly distributed, each player will receive
                the same number of Aces and a random number of lesser-ranked
                cards.
              </p>
            </div>
          </div>
        </div>

        <div className={`colors ${this.state.colors}`}>
          <h2>
            <div className="redo" onClick={this.handleReturnToStart}>
              ⟲
            </div>
            Choose your deck
          </h2>
          <div className="choices">
            <img
              onClick={this.handleChanges}
              src="pink.png"
              id="pink"
              alt="pink card"
            />
            <img
              onClick={this.handleChanges}
              src="red.png"
              id="red"
              alt="red card"
            />
            <img
              onClick={this.handleChanges}
              src="orange.png"
              id="orange"
              alt="orange card"
            />
            <img
              onClick={this.handleChanges}
              src="yellow.png"
              id="yellow"
              alt="yellow card"
            />
            <img
              onClick={this.handleChanges}
              src="army-green.png"
              id="army-green"
              alt="army green card"
            />
            <img
              onClick={this.handleChanges}
              src="green.png"
              id="green"
              alt="green card"
            />
            <img
              onClick={this.handleChanges}
              src="blue.png"
              id="blue"
              alt="blue card"
            />
            <img
              onClick={this.handleChanges}
              src="purple.png"
              id="purple"
              alt="purple card"
            />
            <img
              onClick={this.handleChanges}
              src="brown.png"
              id="brown"
              alt="brown card"
            />
            <img
              onClick={this.handleChanges}
              src="black.png"
              id="black"
              alt="black card"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
