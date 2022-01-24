import React, { Component } from "react"
import "../styles/Numbr.css"

class Numbr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      numplayers: "",
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate() {
    if (this.props.reset) {
      return this.setState({
        id: "",
        numplayers: "",
      })
    }
  }

  handleClick() {
    this.props.handleDist(this.props.id)
  }

  render() {
    return (
      <div className="numbr" onClick={this.handleClick}>
        <strong>{this.props.id}</strong>
      </div>
    )
  }
}

export default Numbr
