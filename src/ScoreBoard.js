import React, { Component } from "react";
import "./ScoreBoard.css";
import Badge from "./Badge";

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.num === 2) {
      return (
        <div className="scoreboard">
          <Badge
            label={this.props.user.name}
            score={this.props.user.deck.length}
            color={this.props.color}
          />
          <Badge
            label={this.props.comp1.name}
            score={this.props.comp1.deck.length}
            color={this.props.color}
          />
          <br />
        </div>
      );
    } else {
      return (
        <div className="scoreboard">
          <Badge
            label={this.props.user.name}
            score={this.props.user.deck.length}
            color={this.props.color}
            gameStarted={this.props.gameStarted}
          />
          <Badge
            label={this.props.comp1.name}
            score={this.props.comp1.deck.length}
            color={this.props.color}
            gameStarted={this.props.gameStarted}
          />
          <Badge
            label={this.props.comp2.name}
            score={this.props.comp2.deck.length}
            color={this.props.color}
            gameStarted={this.props.gameStarted}
          />
          <Badge
            label={this.props.comp3.name}
            score={this.props.comp3.deck.length}
            color={this.props.color}
            gameStarted={this.props.gameStarted}
          />
          <br />
        </div>
      );
    }
  }
}

export default ScoreBoard;
