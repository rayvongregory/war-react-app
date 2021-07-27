import React, { Component } from "react";
import "./Badge.css";

class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "label-army-green",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.color !== prevProps.color) {
      this.setState({ color: `label-${this.props.color}` });
    }
  }

  render() {
    return (
      <div className="badge">
        <label className={this.state.color}>{this.props.label}</label>
        <div className="score">{this.props.score}</div>
      </div>
    );
  }
}

export default Badge;
