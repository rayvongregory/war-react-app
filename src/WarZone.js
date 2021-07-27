import React, { Component } from "react";
import "./WarZone.css";

class WarZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 4,
      color: "army-green",
    };

    this.setWarZone = this.setWarZone.bind(this);
    this.handle = this.handle.bind(this);
  }

  setWarZone() {
    document.getElementById("body").className = this.props.color;
    const COLOR = this.props.color;
    const NUM = this.props.num;
    this.setState({
      num: NUM,
      color: COLOR,
    });
  }

  componentDidMount() {
    this.setWarZone();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.color !== prevProps.color ||
      this.props.num !== prevProps.num
    ) {
      this.setWarZone();
    } else {
      if (this.props.flip) {
        this.handle("flip");
      } else if (!this.props.flip && this.props.gameStarted) {
        this.handle("newRound");
      }
    }
  }

  handle(event) {
    const PLAYERS = [
      this.props.user,
      this.props.comp1,
      this.props.comp2,
      this.props.comp3,
    ];
    switch (event) {
      case "flip":
        switch (this.props.warInProgress) {
          case true:
            //slight issue with this, i think... cards keep flipping out of turn
            PLAYERS.forEach((player, x) => {
              if (player.inWar) {
                setTimeout(() => {
                  return (document.getElementsByClassName("card")[
                    x
                  ].src = `${player.deck[0]}.png`);
                }, 4000);
              }
            });
            break;
          case false:
            PLAYERS.forEach((player, x) => {
              let card = document.getElementsByClassName("card")[x];
              if (player.deck.length > 0) {
                return (card.src = `${player.deck[0]}.png`);
              } else {
                if (card) {
                  return (card.style.opacity = "0");
                }
              }
            });
            break;
          default:
            break;
        }
        break;
      case "newRound":
        PLAYERS.forEach((player, x) => {
          let card = document.getElementsByClassName("card")[x];
          if (player.deck.length > 0) {
            return (card.src = `${this.state.color}.png`);
          } else {
            if (card) {
              return (card.style.opacity = "0");
            }
          }
        });
        break;
      default:
        break;
    }
  }

  render() {
    if (this.state.num === 2) {
      return (
        <div className="warzone">
          <img
            id="user-card"
            className="two card"
            src={`${this.state.color}.png`}
            alt=""
          />
          <img
            id="comp1-card"
            className="two card"
            src={`${this.state.color}.png`}
            alt=""
          />
        </div>
      );
    } else {
      return (
        <div className="warzone">
          <img
            id="user-card"
            className="four card"
            src={`${this.state.color}.png`}
            alt=""
          />
          <img
            id="comp1-card"
            className="four card"
            src={`${this.state.color}.png`}
            alt=""
          />
          <img
            id="comp2-card"
            className="four card"
            src={`${this.state.color}.png`}
            alt=""
          />
          <img
            id="comp3-card"
            className="four card"
            src={`${this.state.color}.png`}
            alt=""
          />
        </div>
      );
    }
  }
}

export default WarZone;
