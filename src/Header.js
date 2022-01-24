import React, { Component } from "react"
import "./Header.css"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <header className={this.props.color}>War</header>
  }
}

export default Header
