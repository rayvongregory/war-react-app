import React, { Component } from "react"
import "../styles/Badge.css"

class Badge extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className="badge">
        <label className={this.props.color}>{this.props.label}</label>
        <div className="score">{this.props.score}</div>
      </div>
    )
  }
}

export default Badge
