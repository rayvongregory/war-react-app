import React, { Component } from "react";
import "./WarPile.css";

class WarPile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.warpile) {
      return <div className="warpile">{this.props.warpile}</div>;
    } else {
      return <div className="warpile">{this.props.warpile.join(" ")}</div>;
    }
  }
}

export default WarPile;
