import React, { Component } from "react";
import "./Numbr.css";

class Numbr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      numplayers: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleDist(this.props.id);
  }

  render() {
    return (
      <div className="numbr" onClick={this.handleClick}>
        <strong>{this.props.id}</strong>
      </div>
    );
  }
}

export default Numbr;
