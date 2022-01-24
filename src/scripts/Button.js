import React, { Component } from "react"
import "../styles/Button.css"

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: "",
      gameOver: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({ label: `${this.props.label}` })
  }

  componentDidUpdate(prevProps) {
    if (this.props.reset) {
      return this.setState({
        label: `${this.props.label}`,
        gameOver: false,
      })
    }

    if (this.props.gameOver && !this.state.gameOver) {
      if (this.state.label !== "END GAME") {
        this.setState({ gameOver: true, label: "YES" })
        document.getElementById("end").classList.add("hide")
      }
    }
  }
  handleClick() {
    switch (this.state.label) {
      case "START GAME":
        this.setState({ label: "FLIP" })
        this.props.handleClick("start")
        break
      case "FLIP":
        this.setState({ label: "START NEXT ROUND" })
        this.props.handleClick("flip")
        break
      case "START NEXT ROUND":
        this.setState({ label: "FLIP" })
        this.props.handleClick("startnextround")
        break
      case "END GAME":
        this.props.handleClick("end")
        break
      case "YES":
        this.props.handleClick("yes")
        this.setState({ label: "START GAME" })
        break
      default:
        break
    }
  }

  render() {
    return (
      <button
        id={this.props.id}
        className={this.props.color}
        onClick={this.handleClick}
      >
        {this.state.label}
      </button>
    )
  }
}

export default Button
