import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "button-army-green",
      label: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ label: `${this.props.label}` });
  }

  componentDidUpdate(prevProps) {
    if (this.props.color !== prevProps.color) {
      this.setState({ color: `button-${this.props.color}` });
    }
  }

  handleClick() {
    switch (this.state.label) {
      case "START GAME":
        this.setState({ label: "FLIP" });
        this.props.handleClick("start");
        break;
      case "FLIP":
        this.setState({ label: "START NEXT ROUND" });
        this.props.handleClick("flip");
        break;
      case "START NEXT ROUND":
        this.setState({ label: "FLIP" });
        this.props.handleClick("startnextround");
        break;
      case "PLAY AGAIN":
        this.setState({ label: "PLAY AGAIN" });
        break;
      case "END GAME":
        // this.setState({label: 'NO' })
        this.props.handleClick("end");

        //reset label on the other button to START GAME
        //you will need to pass the id of this label to app and
        //do something
        break;
      default:
        //do nothing? i guess?
        break;
    }
  }

  render() {
    return (
      <button
        id={this.props.id}
        className={this.state.color}
        onClick={this.handleClick}
      >
        {this.state.label}
      </button>
    );
  }
}

export default Button;
